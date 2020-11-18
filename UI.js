let data;
(function getInfo(){
    let requestURL = "test_data.json";
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);

    request.responseType = 'json';
    request.send();

    request.onload = function() {
        data = request.response;
        console.log(data["case 1"]["count"]);
    }
})()

function featureFunction(num){
    num = num -1;
    var modal = document.getElementsByClassName("myModal")[0];
    // Get the button that opens the modal
    var btn = document.getElementsByClassName("feature") 
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks the button, open the modal 
    btn[num].onclick = function() {
    modal.style.display = "block";
    }
    injectFunction(num);
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            }
    }
}
function injectFunction(num){
    var content;
    var inject = document.getElementsByClassName("txtSection")[0];
    switch(num){
        case 0:
            content = feature1_inject();
            inject.innerHTML = content;
            var ctx = document.getElementById("chartjs-4").getContext('2d');
            var myChart= new Chart(ctx,
            {"type":"doughnut",
            "data":{
            "labels":[
                "Male","Female"],
            "datasets":[{
                "label":"My First Dataset",
            "data":[150,50],"backgroundColor":[
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)"]}]}});
            break;
        case 1:
            content = "THIS IS TEST FEATURE 2";
            inject.innerHTML = content;
            break;
        case 2:
            content = "THIS IS TEST FEATURE 3";
            inject.innerHTML = content;
            break;
        case 3:
            content = "THIS IS TEST FEATURE 4";
            inject.innerHTML = content;
            break;
        default:
            content = "THIS IS A FEATURE";
            inject.innerHTML = content;
    }
    
}

function feature1_inject(){
    var male = 0;
    var female = 0; 
    jQuery.ajax({ 
        type: "GET", 
        url: "https://phl.carto.com/api/v2/sql?q=SELECT * FROM covid_hospitalizations_by_sex", 
        dataType: "json", 
        success: function(data) {
            console.log(data);
            var rows = data.rows;

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
            console.log("female = " + female); 
        }

    });
    var content = '<canvas id="chartjs-4" class="chartjs" width="250" height="125" style="display: block; width: 250px; height: 125px;"></canvas>';
    
    return content;
};