module.exports = {
  apps : [{
    name: 'TuyaController',
    script: 'app.js',
    error_file: 'log/err.log',
    out_file: 'log/out.log',
    log_file: 'log/combined.log',
    time: true,
    instances: 1,
    autorestart: true,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

};

