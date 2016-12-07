var app = function() {
    var url = 'https://restcountries.eu/rest/v1/all';
    makeRequest(url, requestComplete);
    var country = JSON.parse(localStorage.getItem('country')) || " ";
    displayDetails(country);
}

var makeRequest = function(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = callback;
    request.send();
}

var requestComplete = function() {
    console.log("woop! success");
    if (this.status !== 200) return;

    var jsonString = this.responseText;
    var countries = JSON.parse(jsonString);
    console.log(countries);
    populateList(countries);
}

var populateList = function(countries) {
    var select = document.getElementById('country-list');

    select.onchange = function() {
        displayDetails(countries[this.value]);
    }

    for (var i = 0; i < countries.length; i++) {
        var option = document.createElement('option');
        option.innerText = countries[i].name;
        option.value = i;
        select.appendChild(option);
    }
}

var displayDetails = function(country) {
    var pTag = document.getElementById('country-details');
    pTag.innerText = "Country: " + country.name + "\nCapital: " + country.capital + "\nPopulation: " + country.population;
    localStorage.setItem('country', JSON.stringify(country));
}

window.onload = app;















