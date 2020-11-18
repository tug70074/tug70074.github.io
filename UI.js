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
            break;
        case 1:
            content = "THIS IS TEST FEATURE 2";
            break;
        case 2:
            content = "THIS IS TEST FEATURE 3";
            break;
        case 3:
            content = "THIS IS TEST FEATURE 4";
            break;
        default:
            content = "THIS IS A FEATURE";
    }
    
    inject.innerHTML = content;
}

function feature1_inject(){
    var content = `
        <image class="modalImage" src="/images/presentation.png"></image>
        <div id = "injectID" class="injectContent">
        </div>
    `;

    document.getElementsByClassName("injectContent").innerHTML = data["case 1"]["count"];

    return content;
};