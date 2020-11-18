jQuery.ajax({ 
	type: "GET", 
	url: "https://phl.carto.com/api/v2/sql?q=SELECT * FROM covid_hospitalizations_by_sex", 
	dataType: "json", 
	success: function(data) {
		console.log(data);
	} 
}); 