let map;
let lostPets = [];
let markers = [];

function initMap() {
    map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    document.getElementById('reportLostPet').addEventListener('click', reportLostPet);
    document.getElementById('searchMyPet').addEventListener('click', searchMyPet);
}

function reportLostPet() {
    // El usuario puede hacer clic en el mapa para reportar una mascota perdida
    map.once('click', function(event) {
        const location = event.latlng;
        const photo = prompt('Sube la URL de la foto de la mascota:'); // Usa un input real si prefieres
        if (photo) {
            const marker = L.marker(location, {
                icon: L.icon({
                    iconUrl: 'paw-icon.png',
                    iconSize: [40, 40]
                })
            }).addTo(map);
            marker.bindPopup(`<img src="${photo}" width="100"><br>Reportado aquí.`).openPopup();
            lostPets.push({ photo, location });
            addToLostPetsList(photo);
        }
    });
}

function searchMyPet() {
    // El usuario puede hacer clic en el mapa para reportar la última ubicación de su mascota
    map.once('click', function(event) {
        const location = event.latlng;
        const marker = L.marker(location, {
            icon: L.icon({
                iconUrl: 'warning-icon.png',  // Un ícono de advertencia en rojo
                iconSize: [40, 40]
            })
        }).addTo(map);
        marker.bindPopup('Última ubicación conocida.').openPopup();
    });
}

function addToLostPetsList(photo) {
    const lostPetsList = document.getElementById('lostPetsList');
    const listItem = document.createElement('li');
    const img = document.createElement('img');
    img.src = photo;
    listItem.appendChild(img);
    lostPetsList.appendChild(listItem);
}

initMap();

