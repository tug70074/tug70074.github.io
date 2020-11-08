const axios = require('axios')

axios
	.get('https://www.scrapingbee.com/blog/web-scraping-javascript/')
	.then((response) => {
		console.log("Here is the response from the Url : ")
		console.log(response)
	})
	.catch((error) => {
		console.error(error)
	});