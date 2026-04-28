import { Octokit } from "@octokit/rest";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.GITHUB_TOKEN || "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";
const REPO_FULL_NAME = process.env.GITHUB_REPO || "mayfieldcellphone/gemini-website-";

console.log(`Debug: REPO_FULL_NAME is "${REPO_FULL_NAME}"`);

if (!TOKEN || !REPO_FULL_NAME) {
  console.error("Error: GITHUB_TOKEN and GITHUB_REPO must be set in .env file");
  process.exit(1);
}

const cleanedRepoPath = REPO_FULL_NAME.replace(/^https:\/\/github\.com\//, "").replace(/\/$/, "");
const [OWNER, REPO] = cleanedRepoPath.split("/");

console.log(`Debug: OWNER="${OWNER}", REPO="${REPO}"`);

const octokit = new Octokit({ auth: TOKEN });

async function getFiles(dir: string, allFiles: string[] = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      if (file !== "node_modules" && file !== "dist" && file !== ".git") {
        getFiles(filePath, allFiles);
      }
    } else {
      allFiles.push(filePath);
    }
  }
  return allFiles;
}

async function exportToGithub() {
  console.log(`Starting export to ${OWNER}/${REPO}...`);

  try {
    const files = await getFiles(process.cwd());
    const branch = "main"; // Assume main branch

    // Get current commit and tree
    let baseCommitSha: string | undefined;
    let baseTreeSha: string | undefined;
    try {
      const { data: refData } = await octokit.rest.git.getRef({
        owner: OWNER,
        repo: REPO,
        ref: `heads/${branch}`,
      });
      baseCommitSha = refData.object.sha;
      const { data: commitData } = await octokit.rest.git.getCommit({
        owner: OWNER,
        repo: REPO,
        commit_sha: baseCommitSha,
      });
      baseTreeSha = commitData.tree.sha;
    } catch (e) {
      console.log("Branch might not exist or repo is empty. Creating initial commit if possible.");
    }

    const tree: any[] = [];

    for (const filePath of files) {
      const relativePath = path.relative(process.cwd(), filePath);
      const content = fs.readFileSync(filePath, "utf8");
      
      console.log(`- Adding ${relativePath}`);
      
      tree.push({
        path: relativePath,
        mode: "100644",
        type: "blob",
        content: content,
      });
    }

    const { data: newTree } = await octokit.rest.git.createTree({
      owner: OWNER,
      repo: REPO,
      base_tree: baseTreeSha,
      tree: tree,
    });

    const { data: newCommit } = await octokit.rest.git.createCommit({
      owner: OWNER,
      repo: REPO,
      message: "Sync changes from AI Studio",
      tree: newTree.sha,
      parents: baseCommitSha ? [baseCommitSha] : [],
    });

    await octokit.rest.git.updateRef({
      owner: OWNER,
      repo: REPO,
      ref: `heads/${branch}`,
      sha: newCommit.sha,
      force: true, // We want to ensure it's updated even if history diverged
    });

    console.log("Export successful! New commit:", newCommit.sha);
  } catch (error) {
    console.error("Export failed:", error);
  }
}

exportToGithub();
