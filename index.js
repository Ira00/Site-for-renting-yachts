function onmousehoverYacht1(){
  document.getElementById("indexyacht1").src = "img/catamaran.png";
}

function onmouseoutYacht1(){
  document.getElementById("indexyacht1").src = "img/yacht1.png";
}

function onmousehoverYacht2(){
  document.getElementById("indexyacht2").src = "img/motorboat.png";
}

function onmouseoutYacht2(){
  document.getElementById("indexyacht2").src = "img/yacht2.png";
}

function onmousehoverYacht3(){
  document.getElementById("indexyacht3").src = "img/yacht.png";
}

function onmouseoutYacht3(){
  document.getElementById("indexyacht3").src = "img/yacht3.png";
}

function onmousehoverRegion1(){
  document.getElementById("indexregion1").src = "img/Region1Hover.png";
}

function onmouseoutRegion1(){
  document.getElementById("indexregion1").src = "img/Region1.png";
}

function onmousehoverRegion2(){
  document.getElementById("indexregion2").src = "img/Region2Hover.png";
}

function onmouseoutRegion2(){
  document.getElementById("indexregion2").src = "img/Region2.png";
}

function onmousehoverRegion3(){
  document.getElementById("indexregion3").src = "img/Region3Hover.png";
}

function onmouseoutRegion3(){
  document.getElementById("indexregion3").src = "img/Region3.png";
}

function onmousehoverRegion4(){
  document.getElementById("indexregion4").src = "img/Region4Hover.png";
}

function onmouseoutRegion4(){
  document.getElementById("indexregion4").src = "img/Region4.png";
}

let countyList = ["Хорватія", "Туреччина", "Греція", "Франція", "Іспанія", "Сейшели", "Чорногорія", "Італія", "Кіпр"];
let countryActiveList = [];
let html = "";

function dropList(){
  let text = document.getElementById("place-input").value;
  document.getElementById("search_block").innerHTML = "";
  counter = 0;
  document.getElementById("search_block").style.display = "block";
  if (text != ''){
      countyList.forEach(function(elem){
          
          if((elem.toLowerCase()).search(text.toLowerCase()) > -1){
              countryActiveList.push(elem);
          }
      });
      countryActiveList.forEach(function(elem){
          html += "<hr width=\"100%\" size=\"1\" color=\"#d9d9d9\" />"
          html += "<div id = \"search_result\"";
          html += "<p>" + elem + "</p>";
          html += "</div>";
          
          counter += 1;
      });
      document.getElementById("search_block").innerHTML = html;
      html = "";
      countryActiveList = [];
  }
}
window.onload = function(){
  document.querySelector("#search_block").onclick = function(elem){
      document.getElementById("place-input").value = elem.target.innerText;
      document.getElementById("search_block").style.display = "none";
  }
}

function saveInfo(){
  localStorage.setItem("place", document.getElementById("place-input").value);
  localStorage.setItem("type", document.getElementById("type_yacht-input").value)
  localStorage.setItem("dateFrom", document.getElementsByClassName("data_begin-input")[0].value)
  localStorage.setItem("dateTo", document.getElementsByClassName("data_end-input")[0].value)
}