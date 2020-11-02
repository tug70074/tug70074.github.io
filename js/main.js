const { Console } = require("console");

window.onload = () => {
  'use strict';
  console.log("SW started");
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js');
  }
}