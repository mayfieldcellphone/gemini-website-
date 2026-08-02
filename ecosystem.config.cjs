module.exports = {
  apps: [
    {
      name: "mayfield-phone-repair",
      script: "dist/server.cjs",
      cwd: "/var/www/mayfieldphonerepair.com.au",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};
