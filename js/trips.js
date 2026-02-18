/* ============================================
   TRIPS PAGE — Leaflet Map with Trip Markers
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Initialize map centered on India
  const map = L.map('tripMap', {
    scrollWheelZoom: false,
  }).setView([22.5, 80], 5);

  // Dark-themed tile layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 19,
  }).addTo(map);

  // Custom marker icon
  const markerIcon = L.divIcon({
    className: 'custom-marker',
    html: '<div style="width:14px;height:14px;background:#d4a373;border-radius:50%;border:3px solid #1a1814;box-shadow:0 0 10px rgba(212,163,115,0.5)"></div>',
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });

  const homeIcon = L.divIcon({
    className: 'custom-marker',
    html: '<div style="width:18px;height:18px;background:#6b9b5a;border-radius:50%;border:3px solid #1a1814;box-shadow:0 0 12px rgba(107,155,90,0.5)"></div>',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });

  // Trips data
  const trips = [
    { lat: 19.7667, lng: 74.4750, name: 'Shirdi, Maharashtra', date: 'May 2019' },
    { lat: 26.8467, lng: 80.9462, name: 'Lucknow, Uttar Pradesh', date: 'Dec 2020' },
    { lat: 24.8333, lng: 92.7789, name: 'Silchar, Assam', date: 'Nov 2022' },
    { lat: 19.8135, lng: 85.8312, name: 'Puri, Odisha', date: 'Mar 2023' },
    { lat: 23.7957, lng: 86.4304, name: 'Dhanbad, Jharkhand', date: 'Feb 2025' },
    { lat: 21.1702, lng: 72.8311, name: 'Surat, Gujarat', date: 'Apr 2025' },
    { lat: 12.9716, lng: 77.5946, name: 'Bangalore, Karnataka', date: 'Aug 2025' },
  ];

  // Home base
  L.marker([22.0797, 82.1409], { icon: homeIcon })
    .addTo(map)
    .bindPopup('<strong>Home Base</strong><br>Bilaspur, Chhattisgarh');

  // Add trip markers
  trips.forEach(trip => {
    L.marker([trip.lat, trip.lng], { icon: markerIcon })
      .addTo(map)
      .bindPopup(`<strong>${trip.name}</strong><br>${trip.date}`);
  });

  // Draw lines from home to each trip
  const home = [22.0797, 82.1409];
  trips.forEach(trip => {
    L.polyline([home, [trip.lat, trip.lng]], {
      color: '#d4a373',
      weight: 1,
      opacity: 0.3,
      dashArray: '5, 10',
    }).addTo(map);
  });

});
