const form = document.querySelector("form");
const searchplace = document.querySelector(".searchplace");
const city = document.querySelector(".city p");
const temperature = document.querySelector(".temp");
const emoji_cdtn = document.querySelector("#png");
const temp_condition = document.querySelector(".condition span");
const dateTime= document.querySelector(".Date_Time span");


async function fetchData(location){
    
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=9a935d30dbcb4c838b923632241304&q=${location} &aqi=no`;

    const respone = await fetch(url);
    const responebody = await respone.json();
    
    const currTemp = responebody.current.temp_c;
    const currCondition = responebody.current.condition.text;
    const currEmoji = responebody.current.condition.icon;
    const currDate = responebody.location.localtime;
    const currLocation = responebody.location.name;
    
    const day = currDate.split(" ")[0];
    const time =currDate.split(" ")[1];

    const dayName = (new Date(day)).toLocaleDateString('en-us', {weekday:'long'})
    // console.log(time);

    // console.log({
    //     currTemp,
    //     currCondition,
    //     currEmoji,
    //     currDate,
    //     currLocation
    // })
    UpdateUI(currTemp + " °C" , currCondition, currEmoji, `${dayName}   ${time}`, currLocation)

    } catch (error) {
        console.log(error);
    }
    
}

form.addEventListener("submit", handleSearch);

function handleSearch(e){
    e.preventDefault();
    const cityName = searchplace.value;
    fetchData(cityName);
}

function UpdateUI(temp, condition, emoji, date, loc){
    temperature.innerText = temp;
    temp_condition.innerText = condition;
    emoji_cdtn.src = emoji;
    dateTime.innerText = date;
    city.innerText = loc;
}