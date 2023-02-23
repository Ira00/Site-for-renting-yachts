let yachtHtml = "";

var request = new XMLHttpRequest();
request.open("GET", "edit.json", false);
request.send(null)
var yachts = JSON.parse(request.responseText);

window.addEventListener('load', mExternalJsLoadFunc, false);
function mExternalJsLoadFunc()
{
    document.getElementsByClassName("data_begin-input")[0].setAttribute("min", new Date());
    document.getElementById("place-input").value = localStorage.getItem("place");
    document.getElementById("type_yacht-input").value = localStorage.getItem("type");
    document.getElementsByClassName("data_begin-input")[0].value = localStorage.getItem("dateFrom");
    document.getElementsByClassName("data_end-input")[0].value = localStorage.getItem("dateTo");
    
    searchYacht();
}


function searchYacht(){
    let check = true;
    let checkAv = false;

    if (document.getElementsByClassName("data_begin-input")[0].value == "" || document.getElementsByClassName("data_end-input")[0].value == ""){
    setDateToday();
    }

    
    if (document.getElementById("priceFrom").value == ""){
        document.getElementById("priceFrom").value = 0;
    }
    if (document.getElementById("priceTo").value == ""){
        document.getElementById("priceTo").value = 120000;
    }

    
    let dateFromInput = Date.parse(document.getElementsByClassName("data_begin-input")[0].value);
    let dateToInput = Date.parse(document.getElementsByClassName("data_end-input")[0].value);
    
    if(dateFromInput > dateToInput){
        alert("Введіть дати правильно");
        setDateToday();
    }

    for (let i = 0; i < Object.keys(yachts).length; i++){

        for(let j = 0; j < yachts[i].booked.length; j+=2){
            let dateFromBooked = Date.parse(yachts[i].booked[j]);
            let dateToBooked = Date.parse(yachts[i].booked[j+1]);
            console.log(dateFromBooked)
            if ((dateToBooked <= dateFromInput || dateFromBooked >= dateToInput)){
                check = true;
            }else{
                check = false;
                break;
            }
            
        }
        
        if (yachts[i].country == document.getElementById("place-input").value &&
            yachts[i].price >= document.getElementById("priceFrom").value &&
            yachts[i].price <= document.getElementById("priceTo").value &&
            yachts[i].type == document.getElementById("type_yacht-input").value&&
            check
            ){
            
            

            yachtHtml += "<div id = 'yachtResult'>"
                yachtHtml += "<div id = 'yachtimg'>"
                    yachtHtml += "<img src = '" + yachts[i].img + "' alt = 'yacht' id = 'yachtim'>"
                yachtHtml += "</div>"
                yachtHtml += "<div id = 'yachtinfo'>"
                    yachtHtml += "<div id = 'yachtname'>"
                        yachtHtml += "<p>" + yachts[i].name + "</p>"
                        yachtHtml += "<p>" + yachts[i].country + "</p>"
                    yachtHtml += "</div>"
                    yachtHtml += "<div id = 'yachtorder'>"
                        yachtHtml += "<div id = 'yachtprice'>"
                            yachtHtml += "<p>" + yachts[i].price + "€</p>"
                            yachtHtml += "<p>" + yachts[i].price*30 + "грн. </p>"
                            yachtHtml += "<p> За 7 днів </p>"
                        yachtHtml += "</div>"
                        yachtHtml += "<a href = 'order.html' onclick ='mailSet(\"" + yachts[i].name + "\")'><button >Замовити</button></a>"
                        
                    yachtHtml += "</div>"
                yachtHtml += "</div>"
            yachtHtml += "</div>"

            checkAv = true;
        }
        check = true;
        
    }

    if(checkAv == false){
        yachtHtml = "<label>Немає доступних яхт по вашому запиту</label>"
    }
    document.getElementsByClassName("search_results")[0].innerHTML = yachtHtml;
    yachtHtml = "";
    
}

function setDateToday(){
    let today = new Date();
    let nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    let day = ""
    if (today.getDate().toString().length == 1){
        day = "0" + today.getDate()
    }else {
        day = today.getDate().toString()
    }
    
    document.getElementsByClassName("data_begin-input")[0].value = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+day;
    
    if (nextWeek.getDate().toString().length == 1){
        day = "0" + nextWeek.getDate().toString()
    }else {
        day = today.getDate().toString()
    }
    document.getElementsByClassName("data_end-input")[0].value = nextWeek.getFullYear()+'-'+(nextWeek.getMonth()+1)+'-'+day;

}
function mailSet(name){
    console.log(name)
    localStorage.setItem('yacht', name); 
    localStorage.setItem('dateBegin', document.getElementsByClassName("data_begin-input")[0].value); 
    localStorage.setItem('dateEnd', document.getElementsByClassName("data_end-input")[0].value);

}