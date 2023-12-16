const apiKey="b54a18e2c4fb8ece09bf748f78ac4d5a";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
const weatherIcon=document.querySelector(".temp img");
const overallWeather=document.querySelector(".weather");
const errorMessage=document.querySelector(".error");

// async Keyword: The async keyword is used before the function keyword to indicate that the function will be asynchronous. This means it can work with await, and the function will always return a promise.

// In summary, asynchronous programming allows tasks to be executed independently, without waiting for each other to complete, enhancing the efficiency and responsiveness of programs, especially in scenarios where operations might take time, such as network requests or file access.

// In JavaScript, a Promise is an object that represents the eventual completion or failure of an asynchronous operation and its resulting value. It is a way to handle asynchronous code in a more structured and manageable manner. Promises are especially useful when dealing with tasks such as fetching data from an API, reading a file, or any other operation that might take some time to complete.

// A Promise can be in one of three states:

// Pending: The initial state; the promise is neither fulfilled nor rejected.
// Fulfilled: The operation completed successfully, and the promise has a resulting value.
// Rejected: The operation failed, and the promise has a reason for the failure.

async function checkWeather(cityName){
    const response=await fetch(apiUrl+cityName+"&appid="+apiKey);
    var data=await response.json();
    if(response.status==404||response.status==400)
    {
        errorMessage.style.display="block";
        overallWeather.style.display="none";
    }
    else
    {
        document.querySelector(".city").innerHTML=data.name;
        document.querySelector(".temp-value").innerHTML=Math.round(data.main.temp)+"°c";
        document.querySelector(".humidity-value").innerHTML=data.main.humidity+"%";
        document.querySelector(".wind-speed-value").innerHTML=data.wind.speed+" Km/hr";
        if(data.weather[0].main=="Clouds")
        {
            weatherIcon.src="./images/clouds.png";
        }
        else if(data.weather[0].main=="Clear")
        {
            weatherIcon.src="./images/clear.png";
        }
        else if(data.weather[0].main=="Drizzle")
        {
            weatherIcon.src="./images/drizzle.png";
        }
        else if(data.weather[0].main=="Mist")
        {
            weatherIcon.src="./images/mist.png";
        }
        else if(data.weather[0].main=="Rain")
        {
            weatherIcon.src="./images/rain.png";
        }
        else if(data.weather[0].main=="Snow")
        {
            weatherIcon.src="./images/snow.png";
        }
        overallWeather.style.display="block";
        errorMessage.style.display="none";
    }
}
searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
})
document.addEventListener("keydown",function(event){
    if(event.key=="Enter")
    checkWeather(searchBox.value);
})