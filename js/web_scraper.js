const fetch = require('isomorphic-fetch');
console.log("helloworld");
(async () => {
	const response = await fetch('https://example.com');
	const text = await response.text();
	console.log(text.match(/(?<=\<h1>).*(?=\<\/h1>)/));
  })()