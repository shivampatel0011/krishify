
let ads = [];
let selectedAd = null;

async function loadAds(type) {
  const res = await fetch(`http://localhost:3000/ads?type=${type}`);
  ads = await res.json();
  const container = document.getElementById('adsContainer');
  container.innerHTML = '';
  ads.forEach(ad => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${ad.crop} (${ad.type.toUpperCase()})</h3>
      <p>Qty: ${ad.quantity}</p>
      <p>Price: ₹${ad.price}</p>
      <p>${ad.type === 'sell' ? 'Seller' : 'Buyer'}: ${ad.seller}</p>
      <button onclick="openModal(${ad.id})">View Deal</button>
    `;
    container.appendChild(card);
  });
}

function openModal(id) {
  selectedAd = ads.find(ad => ad.id === id);
  document.getElementById('modalTitle').innerText = `${selectedAd.crop} Deal`;
  document.getElementById('modalDetails').innerText = `${selectedAd.quantity}, Price: ₹${selectedAd.price}`;
  document.getElementById('orderModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('orderModal').style.display = 'none';
}

function placeOrder() {
  alert('Order Placed! You will be connected to the seller.');
  closeModal();
}
