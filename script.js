const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select")
const tocurr = document.querySelector(".to select")
const msg = document.querySelector(".msg"); 


for(let select of dropdowns){
    for(let currcode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;
    if(select.name === "from" && currcode ==="USD"){
        newOption.selected = "selected"
    }
    else if(select.name === "to" && currcode ==="INR"){
        newOption.selected = "selected"
    }
    select.append(newOption);   
}
select.addEventListener("change", (evt)=>{
    updateFlag(evt.target);
})
}

const updateFlag = (element) => {
    let currcode =element.value;
    let countrycode = countryList[currcode]
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async () =>{
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value ="1";
    }
    
    const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromcurr.value.toLowerCase()}.json`;

    try {
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
        let finalAmount = amtVal * rate;
        msg.innerText = `${amtVal} ${fromcurr.value} = ${finalAmount.toFixed(2)} ${tocurr.value}`;
    } catch (error) {
        msg.innerText = "Failed to fetch exchange rate. Please try again.";
        console.error("Exchange rate error:", error);
    }
};

window.addEventListener("load", () =>{
    updateExchangeRate();
})