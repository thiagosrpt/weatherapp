window.addEventListener("load", function() {
const form = document.getElementById("form");
form.addEventListener('click', Submit);

  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let temperatureDegreeC = document.querySelector(".temperature-degree-celcius");
  let locationTimezone = document.querySelector(".location-timezone");
  let locationRegion = document.querySelector(".city-name");
  let locationLocalTime = document.querySelector(".localtime");
  let currentHumidity = document.querySelector(".humidity");
  let icon2 = document.getElementById("icon2");
  

  const proxy = "https://cros-anywhere.herokuapp.com/";
  let ip_response = `${[[proxy]]}https://api.ipify.org?format=json`;
  fetch(ip_response)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const { ip } = data;
      getCoordinates(ip);
    });

  function getCoordinates(ip) {
    const location = `${[[proxy]]}http://ip-api.com/json/${ip}`;
    fetch(location)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const { city } = data;
        getWeather(city);
      });
  }



  function getWeather(location) {
    const api = `${[[proxy]]}https://api.weatherapi.com/v1/forecast.json?key=c2ef9cc9ff124396863165707220705&q=${location}&days=7&aqi=no&alerts=no`; // REAL REQUEST
    

    //must be place here bc the const api is not available outise of this bracket scope.
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const { temp_f, temp_c, condition, humidity } = data.current;
        const { tz_id, name , country, localtime} = data.location;
        const { icon } = data.current.condition;
        const { forecastday } = data.forecast;
        //set DOM Elements from the API:
        temperatureDegree.textContent = Math.round(temp_f);
        temperatureDegreeC.textContent = Math.round(temp_c);
        locationRegion.textContent = `${name}, ${country}`;
        currentHumidity.textContent = `${humidity}% humidity`;
        temperatureDescription.textContent = condition.text.toLowerCase();
        locationTimezone.textContent = tz_id;
        icon2.src = `https:${icon.replace("64x64", "128x128")}`;
        document.getElementById('forecast').innerHTML = "";

        console.log(data);
        forecastday.forEach((day) => {
          let date = new Date(day.date).toLocaleDateString(undefined, {
            day:    'numeric',
            month:  'numeric',
            timeZone: "UTC"
          });
          let forecastTempC = day.day.avgtemp_c;
          let forecastTempF = day.day.avgtemp_f;
          let icon = `https:${day.day.condition.icon}`;
          let text = day.day.condition.text;
          let newDiv = document.createElement('div');
          newDiv.classList.add('day');

          newDiv.innerHTML = `
          <h3>${date}</h3>
          <h3>${Math.round(forecastTempF)}F  |  ${Math.round(forecastTempC)}C</h3>
          <img src="${icon}" width="64" height="64">
          <p>${text}</p>
          `
  
          document.getElementById('forecast').appendChild(newDiv);


        });




        const currentDate1 = new Date(localtime).toLocaleTimeString(undefined, {
          timeZone: "UTC",
          weekday: 'long',
          month: 'long',
          day: 'numeric'
        });


        //found this formula to convert time here https://www.toptal.com/software/definitive-guide-to-datetime-manipulation#:~:text=Getting%20the%20Current%20Time%20Stamp&text=const%20currentDate%20%3D%20new%20Date()%3B%20const%20timestamp%20%3D%20currentDate.,IE8%2C%20you%20can%20use%20Date.
        locationLocalTime.textContent = `Local Time: ${currentDate1}`

      });
  }

    function Submit() {
        //API Syntax q means querry
        const location = document.getElementById("country-input").placeholder;
        console.log(location);
        getWeather(location);
    }

});





