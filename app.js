var textSearch = document.getElementById("text");
var searchBtn = document.getElementById("search");

searchBtn.addEventListener("click", clickedBtn);



function clickedBtn(event) {
  event.preventDefault();
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
  textSearch.value = ""; 
  function getWiki() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=&list=search&meta=&srsearch=' + rdyString + '&origin=*', true);
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var data = xhr.responseText;
        var json = JSON.parse(data);
        var mainDiv = document.getElementById("test");
        var a = document.getElementsByTagName("a");
        for (var i = 0; i < json.query.search.length; i++) {
          a[i].innerHTML = json.query.search[i].snippet;
          a[i].href = window.open("https://en.wikipedia.org/wiki/Dog");
          a[i].target = "_blank";
        }   
      }
    }
  }
  getWiki();
}
