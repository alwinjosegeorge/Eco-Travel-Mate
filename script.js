/* ---------- Carbon ---------- */
const factors={car:0.17,bus:0.089,train:0.041,plane:0.255};
function calcCO2(){
  const mode=document.getElementById('transport').value;
  const km=+document.getElementById('distance').value;
  const co2=(factors[mode]*km).toFixed(2);
  const trees=Math.ceil(co2/21);
  document.getElementById('co2-result').textContent=${co2} kg CO₂ ≈ plant ${trees} tree${trees>1?'s':''}.;
}

/* ---------- India Cities AQI ---------- */
async function getIndiaAQI(city){
  if(!city){document.getElementById('aqi-result').textContent='Select a city above.';return;}
  document.getElementById('aqi-result').textContent='Loading…';
  try{
    const res=await fetch(https://api.waqi.info/feed/${encodeURIComponent(city)}/?token=demo);
    const data=await res.json();
    if(data.status==='ok'){
      const aqi=data.data.aqi;
      const level=['','Good','Moderate','Unhealthy for Sensitive','Unhealthy','Very Unhealthy','Hazardous'][Math.floor(aqi/50)+1]||'Unknown';
      document.getElementById('aqi-result').innerHTML=
        <strong>AQI: ${aqi}</strong> – ${level}<br>City: ${city};
    }else{
      document.getElementById('aqi-result').textContent='Data unavailable';
    }
  }catch(e){
    document.getElementById('aqi-result').textContent='Error fetching data';
  }
}

/* ---------- Mapbox ---------- */
function loadMap(){
  const token=document.getElementById('mb-token').value.trim();
  if(!token){alert('Mapbox token required');return;}
  mapboxgl.accessToken=token;
  const mapDiv=document.getElementById('map');
  mapDiv.style.height='400px';
  new mapboxgl.Map({container:'map',style:'mapbox://styles/mapbox/streets-v11',center:[78,20],zoom:4});
}

/* ---------- Smooth scroll nav ---------- */
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('nav a').forEach(a=>{
    a.addEventListener('click',e=>{
      e.preventDefault();
      document.querySelector(a.getAttribute('href'))?.scrollIntoView({behavior:'smooth'});
    });
  });
});
