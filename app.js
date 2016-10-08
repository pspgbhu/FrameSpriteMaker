var koa = require('koa');
var app = koa();

function* generator() {
  console.log('first!')
}
var g = generator();
generator().next();
