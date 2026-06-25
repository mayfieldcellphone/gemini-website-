import SftpClient from 'ssh2-sftp-client';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: true });

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

const config = {
  host: process.env.HOSTINGER_SFTP_HOST?.trim(),
  username: process.env.HOSTINGER_SFTP_USER?.trim(),
  password: process.env.HOSTINGER_SFTP_PASSWORD?.trim(),
  port: parseInt((process.env.HOSTINGER_SFTP_PORT || '22').trim()),
};

const remoteDir = '/home/u479262663/domains/mayfieldphonerepair.com.au/public_html';

async function deploy() {
  if (!config.host || !config.username || !config.password) {
    console.error('❌ Error: Hostinger SFTP credentials missing in environment variables.');
    console.log('Please ensure HOSTINGER_SFTP_HOST, HOSTINGER_SFTP_USER, and HOSTINGER_SFTP_PASSWORD are set.');
    process.exit(1);
  }

  const sftp = new SftpClient();
  const localDir = path.join(process.cwd(), 'dist');

  try {
    console.log('🚀 Starting deployment to Hostinger...');
    
    // 1. Build the project
    console.log('📦 Building project...');
    execSync('npm run build', { stdio: 'inherit' });

    if (!fs.existsSync(localDir)) {
      throw new Error('Build failed: dist directory not found.');
    }

    // 2. Connect to server
    console.log(`🔗 Connecting to ${config.host}:${config.port}...`);
    try {
      await sftp.connect({
        ...config,
        readyTimeout: 30000,
        retries: 2,
      });
      
      console.log('📍 Connected successfully.');
    } catch (err) {
      if (err instanceof Error && err.message.includes('authentication methods failed')) {
        console.error('❌ Login Denied: The server rejected the username or password.');
      }
      throw err;
    }

    const localFiles = getAllFiles(localDir);

    // 3. Deploy to domain
    console.log(`\n==============================================`);
    console.log(`🚀 Starting deployment...`);
    console.log(`==============================================\n`);

    console.log(`🔍 Target directory: ${remoteDir}`);
    
    let exists = false;
    try {
       exists = await sftp.exists(remoteDir) !== false;
    } catch (e) {
       console.log(`⚠️ Could not check if ${remoteDir} exists because: ${(e as Error).message}`);
    }

    if (!exists) {
      console.log(`📁 Creating remote directory: ${remoteDir}`);
      try {
        await sftp.mkdir(remoteDir, true);
      } catch (e) {
        console.log(`⚠️ Directory could not be created/found.`);
      }
    } else {
      const assetsPath = `${remoteDir}/assets`;
      if (await sftp.exists(assetsPath)) {
        console.log('🧹 Clearing remote assets folder...');
        try {
          const files = await sftp.list(assetsPath);
          for (const file of files) {
            await sftp.delete(`${assetsPath}/${file.name}`);
          }
        } catch (e) {
          console.warn('⚠️ Could not clear assets folder:', (e as Error).message);
        }
      }
    }

    // Pre-calculate all unique directories to create
    console.log('📂 Cataloging remote directory paths to build...');
    const uniqueDirs = new Set<string>();
    for (const file of localFiles) {
      const relativePath = path.relative(localDir, file);
      const remotePath = path.join(remoteDir, relativePath).replace(/\\/g, '/');
      uniqueDirs.add(path.dirname(remotePath));
    }

    // Sort paths by depth/length to prevent nested folder creation order issues
    const sortedDirs = Array.from(uniqueDirs).sort((a, b) => a.length - b.length);
    console.log(`📁 Ensuring ${sortedDirs.length} remote subdirectories exist in parallel batches...`);
    const DIR_CONCURRENCY = 40;
    for (let i = 0; i < sortedDirs.length; i += DIR_CONCURRENCY) {
      const batch = sortedDirs.slice(i, i + DIR_CONCURRENCY);
      await Promise.all(batch.map(async (dir) => {
        if (dir !== remoteDir) {
          const dirExists = await sftp.exists(dir);
          if (!dirExists) {
            await sftp.mkdir(dir, true);
          }
        }
      }));
    }

    // Bulk transfer files with high concurrency
    console.log(`🚀 Starting high-speed parallel file upload (${localFiles.length} files total)...`);
    const CONCURRENCY_LIMIT = 45;
    let completedCount = 0;

    for (let i = 0; i < localFiles.length; i += CONCURRENCY_LIMIT) {
      const batch = localFiles.slice(i, i + CONCURRENCY_LIMIT);
      await Promise.all(batch.map(async (file) => {
        const relativePath = path.relative(localDir, file);
        const remotePath = path.join(remoteDir, relativePath).replace(/\\/g, '/');
        await sftp.fastPut(file, remotePath);
        completedCount++;
      }));
      
      if (i === 0 || completedCount % 180 === 0 || completedCount === localFiles.length) {
        console.log(`   Progress: [${completedCount}/${localFiles.length}] files safely transferred.`);
      }
    }
    console.log(`✅ Parallel SFTP upload finished successfully!`);

    // 4. Handle index.php / default.php priority issues
    console.log('🔄 Checking for files that might override index.html...');
    const remoteFiles = await sftp.list(remoteDir);
    const overrides = ['index.php', 'default.php'];
    
    for (const file of overrides) {
      if (remoteFiles.some(f => f.name === file)) {
        console.log(`- Renaming ${file} to ${file}.bak to allow index.html to take priority...`);
        try {
          if (remoteFiles.some(f => f.name === `${file}.bak`)) {
            await sftp.delete(`${remoteDir}/${file}.bak`);
          }
          await sftp.rename(`${remoteDir}/${file}`, `${remoteDir}/${file}.bak`);
        } catch (e) {
          console.warn(`  ⚠️ Failed to rename ${file}:`, (e as Error).message);
        }
      }
    }

    console.log('✅ Deployment successful!');
  } catch (err) {
    console.error('❌ Deployment failed:', err instanceof Error ? err.message : String(err));
    process.exit(1);
  } finally {
    await sftp.end();
  }
}

deploy();
