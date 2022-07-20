# Weather App

- This is an experiment to learn how to manipulate JSON payloads with JavaScript and displaying the data using HTML and CSS. The app utilized data source from 3 endpoints.
- The app identifies the user's IP > with the IP, it identifies the user's location and returns the current and forecasted weather of the determined location. In addition to that it will also get the weather for the location selected by the user thorugh a type-ahead dropdown menu.

<img src="https://github.com/thiagosrpt/weatherapp/blob/c236c2303c8925ce5bed859eb4521eb8e303f14c/weather-app-img.png" height="400">

## Description

- The App utilize the following APIs Endpoints:

- https://api.ipify.org?format=json : This identify user's IP.

- http://ip-api.com/json/${ip} : with the IP from the first endpoint, this endpoint is used to identify the location of the user.

- https://api.weatherapi.com/v1/forecast.json?key=c2ef9cc9ff124396863165707220705&q=${location}&days=7&aqi=no&alerts=no : Once the location is determined this endpoint is leveraged to request the current and forecasted weather using user's current location.

- In addition to that, the app contains a dropdown with typeahead developed using JS. DropDown contains a few extra location options that will refresh the page with the current and forecasted wheather conditions of the selected location.

## Getting Started

- This shoud run on an browser and is rendered on client side.

### Installing

* Download files
* Open index.html on the browser of your choice.


