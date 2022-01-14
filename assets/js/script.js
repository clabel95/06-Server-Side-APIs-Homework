//set the text in the input to be whatever is stored in local storage.

document.getElementById("input").value = localStorage.getItem("Search_City");

//initialize and define all variables 
var Search_City = "";


//create variables for the elements in the html that we will be changing often. 
var today_city = document.getElementById("city_date");
var today_temp = document.getElementById("current_temp");
var today_wind = document.getElementById("current_wind");
var today_humidity = document.getElementById("current_humidity");
var today_uv = document.getElementById("current_UV");
var today_icon = document.getElementById("current_icon")

var d1_date = document.getElementById("day_1_date");
var d1_icon = document.getElementById("day_1_icon");
var d1_temp = document.getElementById("day_1_temp");
var d1_wind = document.getElementById("day_1_wind");
var d1_humi = document.getElementById("day_1_humidity");

var d2_date = document.getElementById("day_2_date");
var d2_icon = document.getElementById("day_2_icon");
var d2_temp = document.getElementById("day_2_temp");
var d2_wind = document.getElementById("day_2_wind");
var d2_humi = document.getElementById("day_2_humidity");

var d3_date = document.getElementById("day_3_date");
var d3_icon = document.getElementById("day_3_icon");
var d3_temp = document.getElementById("day_3_temp");
var d3_wind = document.getElementById("day_3_wind");
var d3_humi = document.getElementById("day_3_humidity");

var d4_date = document.getElementById("day_4_date");
var d4_icon = document.getElementById("day_4_icon");
var d4_temp = document.getElementById("day_4_temp");
var d4_wind = document.getElementById("day_4_wind");
var d4_humi = document.getElementById("day_4_humidity");

var d5_date = document.getElementById("day_5_date");
var d5_icon = document.getElementById("day_5_icon");
var d5_temp = document.getElementById("day_5_temp");
var d5_wind = document.getElementById("day_5_wind");
var d5_humi = document.getElementById("day_5_humidity");

document.querySelector("#Search").addEventListener("click", function(event){
  event.preventDefault();
  Search_City = document.getElementById("input").value;
 
  localStorage.setItem("Search_City",document.getElementById("input").value);//use local storage to save the users inputs
  
  //the following block of code is used to send the VIN provided by the user to the api and propagate the page based on the response.
  $.ajax({
	  url: "https://salty-mountain-68764.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=" + Search_City + "&appid=59a63259df023b7597639c43e89ae417&units=imperial",
	  type: "GET",
	  dataType: "JSON",
	  success: function(result)
	  {

      var myElement = document.getElementById(Search_City.toUpperCase());
      


      if(!myElement){
        //doesnt exist yet
        var btn = document.createElement("button");
        btn.type = "button";
        // Search_City = result.
        btn.innerHTML = Search_City;
        btn.id = Search_City.toUpperCase();
        btn.className = "btn grey";
        btn.style.width = "100%";
        btn.style.margin = "5px";

        btn.onclick = function(){
          event.preventDefault();
          //localStorage.setItem("Search_City", btn.value);
          
          //Search_City = this.value;
          console.log("-----------------------")
          console.log($(this)[0].innerHTML);
          console.log("-----------------------")
          Search_City = $(this)[0].innerHTML
          $.ajax({
            url: "https://salty-mountain-68764.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=" + $(this)[0].innerHTML + "&appid=59a63259df023b7597639c43e89ae417&units=imperial",
            type: "GET",
            dataType: "JSON",
            success: function(result)
            {
              get_weather();
            },
            error: function(xhr, ajaxOptions, thrownError){ 
              console.log(xhr.status); 
              console.log(thrownError);}
            }); 
          };
          
          
        var container = document.getElementById("container");
        container.appendChild(btn);
        var total_btns = document.getElementById("container").childNodes;
        var rem_btn = document.getElementById("container");

        if(total_btns.length > 6){
          rem_btn.removeChild(rem_btn.firstChild)
        }



        }
      
      localStorage.setItem(Search_City+"lat",result.coord.lat);
      localStorage.setItem(Search_City+"lon",result.coord.lon);

      // code to create a button for each city searched. not sure how to go about this yet
      
      get_weather();
    },
	error: function(xhr, ajaxOptions, thrownError){ 
    console.log(xhr.status); 
    console.log(thrownError);}
  }); 
});

function get_weather(){
  
  $.ajax({
	  url: "https://salty-mountain-68764.herokuapp.com/https://api.openweathermap.org/data/2.5/onecall?lat=" + localStorage.getItem(Search_City+"lat") + "&lon="+localStorage.getItem(Search_City+"lon") +"&appid=59a63259df023b7597639c43e89ae417&units=imperial&exclude=minutely,hourly,alerts",
	  type: "GET",
	  dataType: "JSON",
	  success: function(result)
	  {
      console.log(result);
      today_city.innerHTML = Search_City.toUpperCase() +" "+ moment(result.current.dt, 'X' ).format('M/D/YYYY');
      console.log(result.current.temp);
      today_temp.innerHTML = result.current.temp;
      console.log(result.current.wind_speed);
      today_wind.innerHTML = result.current.wind_speed;
      console.log(result.current.humidity);
      today_humidity.innerHTML = result.current.humidity;
      console.log("uv " + parseInt(result.current.uvi) );
      today_uv.innerHTML = result.current.uvi;



      switch(parseInt(result.current.uvi)){
        case 0: today_uv.style.backgroundColor = "#00a500"; break;
        case 1: today_uv.style.backgroundColor = "#00a500"; break;
        case 2: today_uv.style.backgroundColor = "#00a500"; break;
        case 3: today_uv.style.backgroundColor = "#ee8700"; break;
        case 4: today_uv.style.backgroundColor = "#ee8700"; break;
        case 5: today_uv.style.backgroundColor = "#ee8700"; break;
        case 6: today_uv.style.backgroundColor = "#ee8700"; break;
        case 7: today_uv.style.backgroundColor = "#ee8700"; break;
        case 8: today_uv.style.backgroundColor = "#da0000"; break;
        case 9: today_uv.style.backgroundColor = "#da0000"; break;
        default: today_uv.style.backgroundColor = "#da0000"; break;
      }
      


      today_icon.src = "http://openweathermap.org/img/wn/"+ result.current.weather[0].icon +"@2x.png"
      
      console.log("--------------------------")
      //Day 1-------------------------------------------------------------------------------
      console.log(result.daily[1].dt);
      d1_date.innerHTML = moment(result.daily[1].dt , 'X').format('M/D/YYYY');
      console.log(result.daily[1].weather[0].main);
      // d1_icon. not sure how to change the icon yet.------------------------------------
      d1_icon.src = "http://openweathermap.org/img/wn/"+ result.daily[1].weather[0].icon +".png"
      console.log(result.daily[1].temp.day);
      d1_temp.innerHTML = "Temp: "+result.daily[1].temp.day + "°F";
      console.log(result.daily[1].wind_speed);
      d1_wind.innerHTML = "Wind: "+result.daily[1].wind_speed +" MPH";
      console.log(result.daily[1].humidity);
      d1_humi.innerHTML = "Humidity: "+result.daily[1].humidity +"%";
      //------------------------------------------------------------------------------------
      
      console.log("--------------------------")
      
      //Day 2-------------------------------------------------------------------------------
      console.log(result.daily[2].dt);
      d2_date.innerHTML = moment(result.daily[2].dt , 'X').format('M/D/YYYY');
      console.log(result.daily[2].weather[0].main);
      // d2_icon. not sure how to change the icon yet.------------------------------------
      d2_icon.src = "http://openweathermap.org/img/wn/"+ result.daily[2].weather[0].icon +".png"
      console.log(result.daily[2].temp.day);
      d2_temp.innerHTML = "Temp: "+result.daily[2].temp.day + "°F";
      console.log(result.daily[2].wind_speed);
      d2_wind.innerHTML = "Wind: "+result.daily[2].wind_speed +" MPH";
      console.log(result.daily[2].humidity);
      d2_humi.innerHTML = "Humidity: "+result.daily[2].humidity +"%";
      //------------------------------------------------------------------------------------

      //Day 3-------------------------------------------------------------------------------
      console.log(result.daily[3].dt);
      d3_date.innerHTML = moment(result.daily[3].dt , 'X').format('M/D/YYYY');
      console.log(result.daily[3].weather[0].main);
      // d3_icon. not sure how to change the icon yet.------------------------------------
      d3_icon.src = "http://openweathermap.org/img/wn/"+ result.daily[3].weather[0].icon +".png"
      console.log(result.daily[3].temp.day);
      d3_temp.innerHTML = "Temp: "+result.daily[3].temp.day + "°F";
      console.log(result.daily[3].wind_speed);
      d3_wind.innerHTML = "Wind: "+result.daily[3].wind_speed +" MPH";
      console.log(result.daily[3].humidity);
      d3_humi.innerHTML = "Humidity: "+result.daily[3].humidity +"%";
      //------------------------------------------------------------------------------------

      //Day 4-------------------------------------------------------------------------------
      console.log(result.daily[4].dt);
      d4_date.innerHTML = moment(result.daily[4].dt , 'X').format('M/D/YYYY');
      console.log(result.daily[4].weather[0].main);
      // d4_icon. not sure how to change the icon yet.------------------------------------
      d4_icon.src = "http://openweathermap.org/img/wn/"+ result.daily[4].weather[0].icon +".png"
      console.log(result.daily[4].temp.day);
      d4_temp.innerHTML = "Temp: "+result.daily[4].temp.day + "°F";
      console.log(result.daily[4].wind_speed);
      d4_wind.innerHTML = "Wind: "+result.daily[4].wind_speed +" MPH";
      console.log(result.daily[4].humidity);
      d4_humi.innerHTML = "Humidity: "+result.daily[4].humidity +"%";
      //------------------------------------------------------------------------------------

      //Day 5-------------------------------------------------------------------------------
      console.log(result.daily[5].dt);
      d5_date.innerHTML = moment(result.daily[5].dt , 'X').format('M/D/YYYY');
      console.log(result.daily[5].weather[0].main);
      d5_icon.src = "http://openweathermap.org/img/wn/"+ result.daily[5].weather[0].icon +".png" 
      console.log(result.daily[5].temp.day);
      d5_temp.innerHTML = "Temp: "+result.daily[5].temp.day + "°F";
      console.log(result.daily[5].wind_speed);
      d5_wind.innerHTML = "Wind: "+result.daily[5].wind_speed +" MPH";
      console.log(result.daily[5].humidity);
      d5_humi.innerHTML = "Humidity: "+result.daily[5].humidity +"%";
      //------------------------------------------------------------------------------------


     
    },
	error: function(xhr, ajaxOptions, thrownError){ 
    console.log(xhr.status); 
    console.log(thrownError);}
  });

}


