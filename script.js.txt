let map;
let marker;

// Inicializa el mapa usando Leaflet y OpenStreetMap
function initMap() {
    map = L.map('map').setView([51.505, -0.09], 13); // Coordenadas por defecto (Londres)

    // Capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Obtener la geolocalización del usuario y centrar el mapa
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const userLocation = [position.coords.latitude, position.coords.longitude];
            map.setView(userLocation, 13);

            // Añadir un marcador en la ubicación del usuario
            L.marker(userLocation).addTo(map)
                .bindPopup('You are here')
                .openPopup();
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }

    // Añadir un evento para colocar un marcador cuando el usuario haga clic en el mapa
    map.on('click', function(e) {
        placeMarker(e.latlng);
    });
}

function placeMarker(location) {
    if (marker) {
        marker.setLatLng(location);  // Si ya existe un marcador, mueve su posición
    } else {
        marker = L.marker(location, {
            icon: L.icon({
                iconUrl: 'paw-icon.png', // Asegúrate de tener un ícono de pata de perro llamado "paw-icon.png"
                iconSize: [40, 40]  // Tamaño del ícono
            })
        }).addTo(map).bindPopup("Pet sighting location").openPopup();
    }
}

document.getElementById('pet-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const photo = document.getElementById('photo').files[0];

    if (marker && photo) {
        const reader = new FileReader();
        reader.onloadend = function () {
            // Aquí podrías enviar la foto y la ubicación a un servidor para guardarlos
            alert('Pet sighting reported with photo!');
        };
        reader.readAsDataURL(photo);
    } else {
        alert('Please upload a photo and select a location on the map');
    }
});

// Inicializar el mapa al cargar la página
initMap();
