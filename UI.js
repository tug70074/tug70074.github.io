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
    var male = 1;
    var female = 0; 
    var maleNH=0;
    var femaleNH=0;
    var inject = document.getElementsByClassName("txtSection")[0];
    switch(num){
        case 0:
            //content = Covid_Gender_inject();
            break;
        case 1:
            content = Covid_Timeline_inject();
            
            break;
        case 2:
            content = Covid_AgeGraph_inject();
            
            break;
        case 3:
            content = "THIS IS A FEATURE";   
            //content = Covid_RaceGraph_inject();
            
            break;
        default:
            content = "THIS IS A FEATURE";   
    }
    
    //insert element to be in document
    inject.innerHTML = content;

    switch(num){
        /*case 0:
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
                                maleNH += element.count;
                                break;
                            case 4:
                                femaleNH += element.count;//NH=Non-Hospitalize
                                break;
            
                            default:
                                break;
                        }
                    });
                    var ctx=document.getElementById("chartjs-4").getContext("2d")
                    var myChart= new Chart(ctx,
                    {"type":"doughnut",
                    "data":{
                      "labels":[
                        "Male","Female", "Male not Hostpitalized", "Female not Hostpitalized"],
                      "datasets":[{
                        "label":"My First Dataset",
                      "data":[male,female,maleNH,femaleNH],"backgroundColor":[
                      "rgb(255, 99, 132)",
                      "rgb(54, 162, 235)",
                      "rgb(255, 55, 100)",
                      "rgb(54, 45, 235)"]}]}});
                    console.log("male = " + male); 
                    console.log("female = " + female); 
                }
            });
            break;*/
        case 1:
            jQuery.ajax({ 
                type: "GET", 
                url: "https://phl.carto.com/api/v2/sql?q=SELECT * FROM covid_hospitalizations_by_date ORDER BY date", 
                dataType: "json", 
                success: function(data) {
                    var rows = data.rows;
                
                    var timelineChart = echarts.init(document.getElementById("echarts-timeline"));
                    var xAxisData = [];
                    var data1 = [];
                    var data2 = [];
                    console.log(data["rows"]);
                    data["rows"].forEach(element => {
                        var date = element.date;
                        if (!xAxisData.includes(date) && (date != null)) //if the next row is the same date as previous but just
                            xAxisData.push(date.substring(0,10));

                        if (element.hospitalized === "Yes") 
                            data1.push(element.count);
                        else   
                            data2.push(element.count)
                    });
                    console.log(data1);
                    console.log(data2);
                    var option = {
                        title: {
                            text: 'Timeline Covid'
                        },
                        legend: {
                            data: ['Hospitlized', 'Not Hospitlized']
                        },
                        toolbox: {
                            // y: 'bottom',
                            feature: {
                                magicType: {
                                    type: ['stack', 'tiled']
                                },
                                dataView: {},
                                saveAsImage: {
                                    pixelRatio: 2
                                }
                            }
                        },
                        tooltip: {},
                        xAxis: {
                            data: xAxisData,
                            splitLine: {
                                show: false
                            }
                        },
                        yAxis: {
                        },
                        series: [{
                            name: 'Hospitlized',
                            type: 'bar',
                            data: data1,
                            animationDelay: function (idx) {
                                return idx * 10;
                            }
                        }, {
                            name: 'Not Hospitlized',
                            type: 'bar',
                            data: data2,
                            animationDelay: function (idx) {
                                return idx * 10 + 100;
                            }
                        }],
                        animationEasing: 'elasticOut',
                        animationDelayUpdate: function (idx) {
                            return idx * 5;
                        }
                    };

                    timelineChart.setOption(option);
                }
            });
            
            break;
        case 2:
            jQuery.ajax({ 
                type: "GET", 
                url: "https://phl.carto.com/api/v2/sql?q=SELECT * FROM covid_hospitalizations_by_age ORDER BY age", 
                dataType: "json", 
                success: function(data) {
                    var rows = data.rows;
                
                    var timelineChart = echarts.init(document.getElementById("echarts-agegraph"));
                    var xAxisData = [];
                    var data1 = [];
                    var data2 = [];
                    console.log(data["rows"]);
                    data["rows"].forEach(element => {
                        var age = element.age;
                        switch (age) {
                            case "<20":
                                if (element.hospitalized.includes("Yes"))
                                    data1[0] = element.count;
                                else 
                                    data2[0] = element.count;
                                break;
                            case "21-34":
                                if (element.hospitalized.includes("Yes"))
                                    data1[1] = element.count;
                                else 
                                    data2[1] = element.count;
                                break;
                            case "35-54":
                                if (element.hospitalized.includes("Yes"))
                                    data1[2] = element.count;
                                else 
                                    data2[2] = element.count;
                                break;
                            case "55-74":
                                if (element.hospitalized.includes("Yes"))
                                    data1[3] = element.count;
                                else 
                                    data2[3] = element.count;
                                break;
                            case "75+":
                                if (element.hospitalized.includes("Yes"))
                                    data1[4] = element.count;
                                else 
                                    data2[4] = element.count;
                                break;
                            default:
                                break;
                        }
                    });
                    console.log(data1);
                    console.log(data2);

                    option = {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {          
                                type: 'shadow'      
                            }
                        },
                        legend: {
                            data: ['Hospitalized', 'Not Hospitalized/Unknown']
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'value'
                        },
                        yAxis: {
                            type: 'category',
                            data: ['<20', '21-34', '35-54', '55-74', '75+']
                        },
                        series: [
                            {
                                name: 'Hospitalized',
                                type: 'bar',
                                stack: 'total',
                                label: {
                                    show: false,
                                    position: 'insideRight'
                                },
                                data: data1
                            },
                            {
                                name: 'Not Hospitalized/Unknown',
                                type: 'bar',
                                stack: 'total',
                                label: {
                                    show: false,
                                    position: 'insideRight'
                                },
                                data: data2
                            }
                        ]
                    };

                    timelineChart.setOption(option);
                }
            });
            
            break;
        case 3:
            jQuery.ajax({ 
                type: "GET", 
                url: "https://phl.carto.com/api/v2/sql?q=SELECT * FROM covid_hospitalizations_by_race ORDER BY racial_identity", 
                dataType: "json", 
                success: function(data) {
                    var rows = data.rows;
                
                    var timelineChart = echarts.init(document.getElementById("echarts-racegraph"));
                    var xAxisData = [];
                    var data1 = [];
                    var data2 = [];
                    console.log(data["rows"]);
                    data["rows"].forEach(element => {
                        var racial_identity = element.racial_identity;
                        switch (racial_identity) {
                            case "AFRICAN AMERICAN":
                                if (element.hospitalized.includes("Yes"))
                                    data1[0] = element.count;
                                else 
                                    data2[0] = element.count;
                                break;
                            case "AMERICAN INDIAN":
                                if (element.hospitalized.includes("Yes"))
                                    data1[1] = element.count;
                                else 
                                    data2[1] = element.count;
                                break;
                            case "Asian":
                                if (element.hospitalized.includes("Yes"))
                                    data1[2] = element.count;
                                else 
                                    data2[2] = element.count;
                                break;
                            case "DECLINE":
                                if (element.hospitalized.includes("Yes"))
                                    data1[3] = element.count;
                                else 
                                    data2[3] = element.count;
                                break;
                            case "HISPANIC":
                                if (element.hospitalized.includes("Yes"))
                                    data1[4] = element.count;
                                else 
                                    data2[4] = element.count;
                                break;
                            case "Native American":
                                if (element.hospitalized.includes("Yes"))
                                    data1[5] = element.count;
                                else 
                                    data2[5] = element.count;
                                break;
                            case "OTHER":
                                if (element.hospitalized.includes("Yes"))
                                    data1[6] = element.count;
                                else 
                                    data2[6] = element.count;
                                break;
                            case "Pacific Islander":
                                if (element.hospitalized.includes("Yes"))
                                    data1[7] = element.count;
                                else 
                                    data2[7] = element.count;
                                break;
                            case "UNKNOWN":
                                if (element.hospitalized.includes("Yes")) {
                                    if (data1[8] != null)
                                        data1[8] += element.count;
                                    else
                                        data1[8] = element.count
                                }
                                else {
                                    if (data2[8] != null)
                                        data2[8] += element.count;
                                    else
                                        data2[8] = element.count
                                }
                                break;
                            case "White":
                                if (element.hospitalized.includes("Yes"))
                                    data1[9] = element.count;
                                else 
                                    data2[9] = element.count;
                                break;
                            case null:
                                if (element.hospitalized.includes("Yes")) {
                                    if (data1[8] != null)
                                        data1[8] += element.count;
                                    else
                                        data1[8] = element.count
                                }
                                else {
                                    if (data2[8] != null)
                                        data2[8] += element.count;
                                    else
                                        data2[8] = element.count
                                }
                                break;
                            default:
                                break;
                        }
                    });
                    console.log(data1);
                    console.log(data2);

                    option = {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {          
                                type: 'shadow'      
                            }
                        },
                        backgroundColor: '#2c343c',
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        legend: {
                            data: ['Hospitalized', 'Not Hospitalized/Unknown']
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        yAxis: {
                            type: 'value'
                        },
                        xAxis: {
                            type: 'category',
                            data: ['AFRICAN AMERICAN', 'AMERICAN INDIAN', 'Asian', 'DECLINE', 'HISPANIC', 'Native American', 'OTHER', 'Pacific Islander', 'UNKNOWN', 'White']
                        },
                        series: [
                            {
                                name: 'Hospitalized',
                                type: 'bar',
                                stack: 'total',
                                label: {
                                    show: false,
                                    position: 'insideRight'
                                },
                                data: data1
                            },
                            {
                                name: 'Not Hospitalized/Unknown',
                                type: 'bar',
                                stack: 'total',
                                label: {
                                    show: false,
                                    position: 'insideRight'
                                },
                                data: data2
                            }
                        ]
                    };

                    timelineChart.setOption(option);
                }
            });
            
            break;
        default:
            content = "THIS IS A FEATURE";   
    }
   
}

function Covid_Gender_inject(){//////////////////Look here to insert the pie chart
    var content = '<canvas id="chartjs-4" class="chartjs" width="250" height="125" style="display: block; width: 250px; height: 125px;"></canvas>';
   
    return content;
};

function Covid_Timeline_inject(){//////////////////Look here to insert the pie chart
    var content = '<div id="echarts-timeline" style="width: 100%;height:400px;"></div>'; //fix width to be container
   
    return content;
};

function Covid_AgeGraph_inject(){//////////////////Look here to insert the pie chart
    var content = '<div id="echarts-agegraph" style="width: 100%;height:400px;"></div>'; //fix width to be container
   
    return content;
};

function Covid_RaceGraph_inject(){//////////////////Look here to insert the pie chart
    var content = '<div id="echarts-racegraph" style="width: 100%;height:400px;"></div>'; //fix width to be container
   
    return content;
};