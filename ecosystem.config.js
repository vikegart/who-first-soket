module.exports = {
  apps : [
      {
        name: "si-game",
        script: "./server/index.js",
        instances: 4,
        exec_mode: "cluster",
        watch: true,
        increment_var : 'PORT',
        env: {
            "PORT": 4000,
            "NODE_ENV": "development"
        }
      }
  ]
}

