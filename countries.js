
let countries = ['Sao Paulo', 'Aruba', 'London', 'Paris', 'Hawaii', 'New York', 'Madrid', 'Sydney', 'Tokyo', 'Los Angeles', 'Boston', 'Chicago'];
let unload = [];
const countryListElement = document.getElementById("country-list");
const countryInputElement = document.getElementById("country-input");


function fetchCountries() {
        //fetch("https://restcountries.com/v3.1/all")
        //.then((response) => response.json())
       // .then((data) => {
        //  console.log(data);
         // countries = data.map((x) => x.name.common);
          countries.sort();
          loadData(countries, countryListElement);
          console.log(countries);
        //});
}


function loadData(data, element) {
        if(data) {
            element.innerHTML = "";
            let innerElement = "";
            data.forEach((item) => {
                innerElement += `
                <li value=${item} onclick="select('${item}')">${item}</li>;
                `
            });
        element.innerHTML = innerElement;
        }
    }

function filterData(data, searchText) {
    return data.filter((x) => x.toLowerCase().includes(searchText.toLowerCase()));
}

function select(item) {
    console.log(`selected:` + item);
    countryInputElement.innerHTML = item;
    countryInputElement.placeholder = item;
    countryInputElement.value = item;
    loadData(unload, countryListElement);
}

countryInputElement.addEventListener("focus", function() {
    fetchCountries();
  });

countryInputElement.addEventListener("input", function() {
    const filteredData = filterData(countries, countryInputElement.value);
    loadData(filteredData, countryListElement);
});



