// async function getImage() {
//   const response = await fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
//   const data = await response.json()
//     document.body.style.backgroundImage = `url(${data.urls.full})`;
//     console.log(data);
  
//   if(data.location.title === null) {
//     document.getElementById('author').textContent = `
//       Created by: ${data.user.name}`
//   } else {
//     document.getElementById('author').innerHTML = `
//       Created by: ${data.user.name} <br>
//       Location: ${data.location.title}`
//   }

// }

// ========================================================
// = Fetch background from UnSplash
// ========================================================
fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=bromo')
.then (response => response.json())
.then (data => {
  document.body.style.backgroundImage = `url(${data.urls.full})`;
  console.log(data.urls.full);
  
  if(data.location.title === null) {
    document.getElementById('author').textContent = `
    Created by: ${data.user.name}`
  } else {
    document.getElementById('author').innerHTML = `
    Created by: ${data.user.name} <br>
    Location: ${data.location.title}`
  };
})
.catch(err => {
  console.log(err)
  document.body.style.backgroundImage = `url('https://images.unsplash.com/photo-1500534623283-312aade485b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDk1OTgwNzM&ixlib=rb-1.2.1&q=80&w=1080')`
});

// ========================================================
// = Fetch Crypto's from CoinGecko
// ========================================================
// BTC
fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
.then(response => {
  if(!response.ok) {
    throw Error('Something went wrong!')
  }
  return response.json()
})
.then(data => {
  document.getElementById('crypto-top').innerHTML = `
    <img src=${data.image.small} />
    <span>$ ${data.market_data.current_price.usd} (current)</span>
    <span>$ ${data.market_data.high_24h.usd} (high)</span>
    <span>$ ${data.market_data.low_24h.usd} (low)</span>`
})
.catch(err => console.log(err))

// ========================================================
// = Fetch Crypto's from CoinGecko
// ========================================================
// = ETH
fetch('https://api.coingecko.com/api/v3/coins/ethereum')
.then(response => {
  if(!response.ok) {
    throw Error('Something went wrong!')
  }
  return response.json()
})
.then(data => {
  document.getElementById('crypto-middle').innerHTML = `
    <img src=${data.image.small} />
    <span>$ ${data.market_data.current_price.usd}</span>
    <span>₿ ${data.market_data.current_price.btc}`
})
.catch(err => console.log(err))

// ========================================================
// = Fetch Crypto's from CoinGecko
// ========================================================
// CARDANO
fetch('https://api.coingecko.com/api/v3/coins/cardano')
.then(response => {
  if(!response.ok) {
    throw Error('Something went wrong!')
  }
  return response.json()
})
.then(data => {
  document.getElementById('crypto-bottom').innerHTML = `
    <img src=${data.image.small} />
    <span>$ ${data.market_data.current_price.usd}</span>
    <span>₿ ${data.market_data.current_price.btc}`
  })
.catch(err => console.log(err))

// ========================================================
// = Print current date/time
// ========================================================
function setTime() {
  const date = new Date
  document.getElementById('time').textContent = date.toLocaleTimeString('nl', {
    timeStyle: 'short'
    //dateStyle: 'short'
  });
}

setInterval(setTime, 1000);

// ========================================================
// = Get weather info based upon the geo location api
// ========================================================
navigator.geolocation.getCurrentPosition((e) => {
  const coords = e.coords

  fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric`)
  .then(res => {
    if(!res.ok) {
      throw Error('Weather data is not available')
    }
    return res.json()
  })
  .then(data => {
    console.log(data)
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    
    document.getElementById('weather').innerHTML = `
      <img src=${iconUrl} />
      <p class='weather-temp'> ${Math.floor(data.main.temp)}℃ </p>
      <p class='weather-city'> ${data.sys.country}, ${data.name} </p>`
  })
  .catch(err => {
    console.error(err);
  })
})