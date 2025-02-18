const Redis = require('ioredis');

const publisher = new Redis();

function createSubscriber() {
  return new Redis();
}

module.exports = { publisher, createSubscriber };