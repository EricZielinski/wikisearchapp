var textSearch = document.getElementById("text");
var searchBtn = document.getElementById("search");
searchBtn.addEventListener("click", clickedBtn);

function accessWikiDatabase(clickedBtn) {
  console.log(clickedBtn);
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://en.wikipedia.org/w/api.php?action=opensearch&search=new%20york&format=json&origin=*", true);
  xhr.send();
  xhr.onreadystatechange = processServerResponse;
    
    function processServerResponse () {
      var response;
      if (xhr.readyState === 4 && xhr.status === 200) {
        response = xhr.responseText;
        console.log(response);        
      }
      textSearch.value.length = "";
    };
}

function clickedBtn() {
  function rdyQueryString() {
    var rdyString = "";
    var len = textSearch.value.length;
    var queryString = textSearch.value;
    for (var i = 0; i < len; i++) {
      if (queryString[i] === " ") {
        rdyString += "%20";
      }
      else {
        rdyString += queryString[i];
      }
    }
    console.log(rdyString);
    return rdyString;  
  }
  rdyQueryString();
}
