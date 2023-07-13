module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { esmodules: true } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};

// Gist for config
// https://gist.github.com/Klerith/ca7e57fae3c9ab92ad08baadc6c26177