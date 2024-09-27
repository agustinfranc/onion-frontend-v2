module.exports = {
  apps: [
    {
      name: "Onion2",
      port: "3002",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
};
