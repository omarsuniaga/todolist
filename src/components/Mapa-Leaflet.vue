<template>
  <div id="map" class="map" style="height: 700px; padding: 10px, 12px"></div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet-routing-machine";
// Obtener la posición actual del usuario utilizando la API de geolocalización del navegador
navigator.geolocation.getCurrentPosition(function (position) {
  // La posición actual del usuario está disponible en la variable "position"

  // Calcular la distancia entre la posición actual del usuario y cada una de las paradas de bus
  var paradasDeBus = [
    { lat: 18.590347276619344, lng: -68.40622221955326 }, //Bomba Total
    { lat: 18.58572850052625, lng: -68.4011388745794 }, //  Propagas
    { lat: 18.58462051319536, lng: -68.39978732855883 }, // Francis Gas
    { lat: 18.58493389590886, lng: -68.39926166978967 }, // 18.58493389590886, -68.39926166978967
  ];

  var distanciaMinima = Number.MAX_VALUE;
  var paradaMasCercana = null;

  paradasDeBus.forEach(function (parada) {
    var distancia = Math.sqrt(
      Math.pow(parada.lat - position.coords.latitude, 2) +
        Math.pow(parada.lng - position.coords.longitude, 2)
    );

    if (distancia < distanciaMinima) {
      distanciaMinima = distancia;
      paradaMasCercana = parada;
    }
  });

  // Navegar hacia la parada de bus más cercana utilizando una biblioteca de mapas como Leaflet
  var map = L.map("map").setView(
    [position.coords.latitude, position.coords.longitude],
    13
  );
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
  }).addTo(map);
  var paradaMarker = L.marker([
    paradaMasCercana.lat,
    paradaMasCercana.lng,
  ]).addTo(map);

  var control = L.Routing.control({
    waypoints: [
      L.latLng(position.coords.latitude, position.coords.longitude),
      L.latLng(paradaMasCercana.lat, paradaMasCercana.lng),
    ],
    routeWhileDragging: true,
    language: "es",
    profile: "foot",
    showAlternatives: true,
    addWaypoints: false,
    geocoder: "Nominatim",
  }).addTo(map);
});
</script>
