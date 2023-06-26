const searchInput = document.getElementById("searchInput");
const search = document.getElementById("search");

search.addEventListener("click", (e) => {
  e.preventDefault();
 
  getWeather(searchInput.value); // Call the getWeather() function

  // Clear the input field
  searchInput.value = "";
});

async function getWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=3c982ee6e6f30e8d5251d76afac21c71&units=imperial`;

    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data);

    // Get Time and Date

    let timeStamp = data.dt
    let date = new Date(timeStamp * 1000) // Get Time and date
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    //Change Time form Military Time

    let formattedHours = hours % 12; // Convert to 12-hour format
    formattedHours = formattedHours === 0 ? 12 : formattedHours; // Handle midnight (0) as 12

    const amPm = hours >= 12 ? 'PM' : 'AM';


    const formattedDate = `${month}-${day}-${year}`
    const formattedTime = `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${amPm}`;

    
    // Update the DOM elements with the weather data

    document.getElementById("time").innerText = formattedTime
    document.getElementById("dateTime").innerText = formattedDate  
    document.getElementById("cityName").innerText = data.name;
    document.getElementById("city").innerText = data.name;
    document.getElementById("currentTemp").innerText = Math.round(data.main.temp);
    document.getElementById("currentcondition").innerText = Math.round(data.main.humidity) + "%";
    document.getElementById("windSpeed").innerText = Math.round(data.wind.speed) + " MPH";
    
    const imageDisplay = document.getElementById("imageDisplay")
    
    if (data.weather[0].main === "Clouds") {
      imageDisplay.innerHTML = `<img src="img/clouds.png" alt="" width= 80>` + "Cloudy";
    } else if(data.weather[0].main === "Clear"){
      imageDisplay.innerHTML = `<img src="img/sunny.png" alt="" width= 75>` + "Clear";
    } else if(data.weather[0].main === "Sunny"){
      imageDisplay.innerHTML = `<img src="img/sunny.png" alt="" width= 75>` + "Sunny";
    } else if(data.weather[0].main === "Rain") {
      imageDisplay.innerHTML = `<img src="img/rain.png" alt="" width= 75>` + "Rain";
    } else if(data.weather[0].main === "Snow"){
      imageDisplay.innerHTML = `<img src="img/rain.png" alt="" width= 75>` + "Snow"
    } else if(data.weather[0].main === "Sunny Cloud"){
      imageDisplay.innerHTML = `<img src="img/sunny clouds.png" alt="" width= 75>` + "Sunny Clouds"
    } 

  } catch (error) {
    console.log(error);
  }
}



