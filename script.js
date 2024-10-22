let fromOptionsBox = document.querySelector(".container .from-country-options");
let toOptionsBox = document.querySelector(".container .to-country-options");
let fromInputBox = document.querySelector(".container .from-input");
let toInputBox = document.querySelector(".container .to-input");
let fromInputFlag = document.querySelector(".container .from-flag img");
let toInputFlag = document.querySelector(".container .to-flag img");
let fromInput = document.querySelector(".container .from-input input");
let toInput = document.querySelector(".container .to-input input");
let convertBtn = document.querySelector(".container .convert-btn");
let amount = document.querySelector(".container .amount input");
let resultBox =document.querySelector(".container .result-box");
let result =document.querySelector(".container .result-box .result");
let switchBtn =document.querySelector(".container .switch-btn");

let currFromValue, currToValue, currFromFlagSrc, currToFlagSrc;

//Getting Symbols
let getSymbols =()=>{
    let fromLi ="";
    let toLi ="";
    for(currency_code in country_list){
      fromLi += `<li onclick="getFromValue('${currency_code}')"><img src="https://flagsapi.com/${country_list[currency_code]}/flat/64.png" alt="">${currency_code}</li>`;
      toLi += `<li onclick="getToValue('${currency_code}')"><img src="https://flagsapi.com/${country_list[currency_code]}/flat/64.png" alt="">${currency_code}</li>`;
    }
    fromOptionsBox.innerHTML = fromLi;
    toOptionsBox.innerHTML = toLi;

}
//showing/hiding From-options box
fromInputBox.addEventListener("click",()=>{
    fromOptionsBox.classList.toggle("active");
    toOptionsBox.classList.remove("active");
})

//showing/hiding to-options box
toInputBox.addEventListener("click",()=>{
    toOptionsBox.classList.toggle("active");
    fromOptionsBox.classList.remove("active");
})
let getFromValue =(country)=>{
    fromInputFlag.src = `https://flagsapi.com/${country_list[country]}/flat/64.png`
    fromInput.value = country;
    fromOptionsBox.classList.remove("active");
}

let getToValue =(country)=>{
    toInputFlag.src = `https://flagsapi.com/${country_list[country]}/flat/64.png`
    toInput.value = country;
    toOptionsBox.classList.remove("active");
}



let getExchangeRate =()=>{
    result.innerHTML ="Getting Exchange Rates...";
    result.style.fontsize ="12px";
    //Exchange rate api
    let apikey = "4f34e4867937d60661bd3d6a";
    let url = `https://v6.exchangerate-api.com/v6/${apikey}/latest/${fromInput.value}`;
    fetch(url).then((res)=>res.json()).then((data) =>{
        //Getting exchange rate
        let exchangeRate = data.conversion_rates[toInput.value];
        //getting totalexchange rate
        let totalExchangeRate = (amount.value * exchangeRate).toFixed(2);
        result.innerHTML = `${amount.value} ${fromInput.value} = ${totalExchangeRate} ${toInput.value}`;
        result.style.fontsize = "25px";
    })
    resultBox.style.display = "block";
}

switchBtn.addEventListener("click",()=>{
    //setting select boxes values in global variable
    currFromValue = fromInput.value;
    currToValue = toInput.value;
    //setting select boxes flag url in global variable
    // currFromFlagSrc = fromInputFlag.src;
    // currToFlagSrc = toInputFlag.src;
    //exchanging the select boxes values
    fromInput.value = currToValue;
    toInput.value = currFromValue;
    //exchanging select boxes flag url
    // fromInputFlag.src = currToFlagSrc;
    // toInputFlag.src == currFromFlagSrc;
    let temp;
    temp = fromInputFlag.src;
    fromInputFlag.src = toInputFlag.src;
    toInputFlag.src = temp;
    getExchangeRate();
})



convertBtn.addEventListener("click",()=>{
    if(amount.value!= ""){
        getExchangeRate();
    }
})
getSymbols();