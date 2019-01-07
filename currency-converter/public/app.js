const API = 'https://api.exchangeratesapi.io/latest?base=ZAR';

let selectedToCurrency;
let selectedFromCurrency;

async function fetchRates() {
  const res = await fetch(API);
  const json = await res.json();

  buildRateDropdown(json, "from_currency");
  buildRateDropdown(json, "to_currency");
}

function buildRateDropdown(ratesJson, rateType) {
    let rates = ratesJson.rates;

    for(let key in rates) {
        const fromCurrencySelect = document.getElementById(rateType)
        const option = document.createElement("option")
        option.value = rates[key]
        option.innerHTML = key
        fromCurrencySelect.appendChild(option)
    }
}

function onSelectChange() {
    selectedFromCurrency = document.getElementById("from_currency").value;
    selectedToCurrency = document.getElementById("to_currency").value;
}

function convertCurrency() {
    let amount = document.getElementById("amount").value
    let conversionValue
    if(selectedFromCurrency === undefined 
        || selectedToCurrency === undefined
        || amount === '' ) {
        conversionValue = "Please enter an amount and select a From and To currency"
    } else {
        const conversion = amount / selectedFromCurrency * selectedToCurrency
        const result = Math.round(conversion * 100) / 100;
        conversionValue = `Converted currency amount: ${result}`
    }
    document.getElementById("currency_conversion").innerHTML= conversionValue;
}

window.addEventListener('load', async e => {
  await fetchRates();

  if ('serviceWorker' in navigator) {
      try {
          navigator.serviceWorker.register('serviceworker.js');
          console.log('SW registered');
      } catch (error) {
          console.log('SW failed');
      }
  }
});