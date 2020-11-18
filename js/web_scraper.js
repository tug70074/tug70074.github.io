const request = require('request');
const cheerio = require('cheerio');

request('https://phl.carto.com/api/v2/sql?q=SELECT * FROM covid_hospitalizations_by_sex', (error, response, html) => {
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
		success: function(data) {
			console.log(data);
			var table = document.getElementById("covid_data_example");
			var data_split = data.split(/\r\n|\r|\n/);
			var row_count = 0;
			var cell_count = 0;
			data_split.forEach(element => {
				var data_row_split = element.split(",")
				if (row_count != 0){
					var row = table.insertRow(row_count);
				
					data_row_split.forEach(elment_cell => {
						var cell = row.insertCell(cell_count);
						cell.innerHTML = elment_cell;
					});
				}
				row_count++;
				cell_count = 0;
			});
		} 
	}); 
}

