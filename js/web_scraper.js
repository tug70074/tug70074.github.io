const request = require('request');
const cheerio = require('cheerio');

request('https://www.opendataphilly.org/dataset/covid-hospitalizations/resource/be0f3aa9-c4d5-461d-ac55-245872de69ba', (error, response, html) => {
	if(!error && response.statusCode == 200) { //200 means successfful http response
		//console.log(html);
		const $ = cheerio.load(html);
		
		const resourceURLAnalytics = $('.resource-url-analytics').attr('href');
		console.log(resourceURLAnalytics);
		//const csvLink = "http://websitescraper.herokuapp.com/?url=" + resourceURLAnalytics + "&callback=jsCallback";
		fetchCSVfile(resourceURLAnalytics);
		
	}
});

function fetchCSVfile(resourceURL) {
	jQuery.ajax({ 
		type: "GET", 
		url: resourceURL, 
		dataType: "text", 
		success: function(data) {console.log(data);} 
	}); 
}

