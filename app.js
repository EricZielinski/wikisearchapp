var textSearch = document.getElementById("text");
var searchBtn = document.getElementById("search");
var randomBtn = document.getElementById("random");
var searchTitle = document.getElementById("title");
var container = document.getElementById("container");
var aLinks = document.getElementsByTagName("a");
var titleDivs = document.getElementsByClassName("block");
var scrollBtn = document.getElementById("scroll");


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
  textSearchCheck(rdyString, queryString);
  styleContainer();
  addScrollBtn();

  function getWiki() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch=' + rdyString + '&gsrlimit=10&prop=extracts&exintro&explaintext&exchars=140&exlimit=max&origin=*', true);
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var data = xhr.responseText;
        var json = JSON.parse(data)
        var keys = Object.keys(json.query.pages);
        for (var i = 0; i < keys.length; i++) {
          titleDivs[i].childNodes[1].innerHTML = (json.query.pages[keys[i]].title.search("(disambiguation)") ? json.query.pages[keys[i]].title.replace("(disambiguation)", ""):json.query.pages[keys[i]].title) + "<br>" + json.query.pages[keys[i]].extract;
          titleDivs[i].childNodes[1].href = "https://en.wikipedia.org/wiki/" + json.query.pages[keys[i]].title;
          titleDivs[i].childNodes[1].setAttribute("class", "links");
          checkBlankDescrip(i, json.query.pages[keys[i]].extract, json.query.pages[keys[i]].title);
        }
      }
    }
  }
  getWiki();
}

function checkBlankDescrip(i, extract, title) {
  if (extract.length < 4) {
    return titleDivs[i].childNodes[1].innerHTML = title + "<br>" + "Click here for more information on " + title + ".";
  } 
}

function textSearchCheck(rdyString, queryString) {
  textSearch.value = "";
  queryString === "" ? searchTitle.innerHTML = "Please enter a new search": searchTitle.innerHTML = "You searched for: " + queryString;
  searchTitle.href = "https://en.wikipedia.org/wiki/" + rdyString;
}

function styleContainer() {
  container.style.backgroundColor = "rgb(93, 51, 110)";
  container.style.border = "2px solid white";
}

function addScrollBtn() {
  scrollBtn.innerHTML = "<a href='#text'><i class='fa fa-arrow-circle-up fa-1' aria-hidden='true'></i></a>";
}