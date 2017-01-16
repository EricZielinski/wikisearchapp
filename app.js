var textSearch = document.getElementById("text");
var searchBtn = document.getElementById("search");
var randomBtn = document.getElementById("random");
var searchTitle = document.getElementById("title");

searchBtn.addEventListener("click", clickedBtn);
randomBtn.addEventListener("click", findRandom);

function findRandom() {
  window.open("http://en.wikipedia.org/wiki/Special:Random");
}

function clickedBtn(event) {
  event.preventDefault();
  var rdyString = "";
  var len = textSearch.value.length;
  var queryString = textSearch.value;
  for (var i = 0; i < len; i++) {
    if (queryString[i] === " ") {
      rdyString += "%20";
    } else {
      rdyString += queryString[i];
    }
  }
  textSearch.value = "";
  searchTitle.innerHTML = "Search = " + queryString;
  searchTitle.href = "https://en.wikipedia.org/wiki/" + rdyString;

  function getWiki() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch=' + rdyString + '&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&origin=*', true);
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var data = xhr.responseText;
        var json = JSON.parse(data)
        var keys = Object.keys(json.query.pages);
        var mainDiv = document.getElementById("test");
        var a = document.getElementsByTagName("a");
        for (var i = 1; i < keys.length; i++) {
          a[i].innerHTML = (json.query.pages[keys[i]].title + "<br />") + json.query.pages[keys[i]].extract;
          a[i].href = "https://en.wikipedia.org/wiki/" + json.query.pages[keys[i]].title;
        }
      }
    }
  }
  getWiki();
}