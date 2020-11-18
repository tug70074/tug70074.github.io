jQuery.ajax({ 
	type: "GET", 
	url: "https://phl.carto.com/api/v2/sql?q=SELECT * FROM covid_hospitalizations_by_sex", 
	dataType: "json", 
	success: function(data) {
		console.log(data);
		var rows = data.rows;
		var male = 0;
		var female = 0; 
		rows.forEach(element => {
			switch (element["cartodb_id"]) {
				case 1:
					male += element.count;
					break;
				case 2:
					female += element.count;
					break;
				case 3:
					male += element.count;
					break;
				case 4:
					female += element.count;
					break;
			
				default:
					break;
			}
		});
		console.log("male = " + male); 
		console.log("female = " + male); 
	}
	
}); 