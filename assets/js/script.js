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
      localStorage.setItem(Search_City+"lat",result.coord.lat);
      localStorage.setItem(Search_City+"lon",result.coord.lon);
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
      today_city.innerHTML = Search_City +" "+ moment(result.current.dt, 'X' ).format('M/D/YYYY');
      console.log(result.current.temp);
      today_temp.innerHTML = result.current.temp;
      console.log(result.current.wind_speed);
      today_wind.innerHTML = result.current.wind_speed;
      console.log(result.current.humidity);
      today_humidity.innerHTML = result.current.humidity;
      console.log(result.current.uvi);
      today_uv.innerHTML = result.current.uvi;
      
      console.log("--------------------------")
      //Day 1-------------------------------------------------------------------------------
      console.log(result.daily[1].dt);
      d1_date.innerHTML = moment(result.daily[1].dt , 'X').format('M/D/YYYY');
      console.log(result.daily[1].weather[0].main);
      // d1_icon. not sure how to change the icon yet.------------------------------------
      console.log(result.daily[1].temp.day);
      d1_temp.innerHTML = result.daily[1].temp.day;
      console.log(result.daily[1].wind_speed);
      d1_wind.innerHTML = result.daily[1].wind_speed;
      console.log(result.daily[1].humidity);
      d1_humi.innerHTML = result.daily[1].humidity;
      //------------------------------------------------------------------------------------
      
      console.log("--------------------------")
      
      //Day 2-------------------------------------------------------------------------------
      console.log(result.daily[2].dt);
      d2_date.innerHTML = moment(result.daily[2].dt , 'X').format('M/D/YYYY');
      console.log(result.daily[2].weather[0].main);
      // d2_icon. not sure how to change the icon yet.------------------------------------
      console.log(result.daily[2].temp.day);
      d2_temp.innerHTML = result.daily[2].temp.day;
      console.log(result.daily[2].wind_speed);
      d2_wind.innerHTML = result.daily[2].wind_speed;
      console.log(result.daily[2].humidity);
      d2_humi.innerHTML = result.daily[2].humidity;
      //------------------------------------------------------------------------------------





     
    },
	error: function(xhr, ajaxOptions, thrownError){ 
    console.log(xhr.status); 
    console.log(thrownError);}
  });

}


