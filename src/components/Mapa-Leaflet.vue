<template>
  <div id="map"></div>
</template>

<script>
import L from "leaflet";
import "leaflet-routing-machine";

export default {
  mounted() {
    const map = L.map("map").setView([37.7749, -122.4194], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    let control = L.Routing.control({
      waypoints: [L.latLng(37.7749, -122.4194), L.latLng(37.7812, -122.4076)],
      routeWhileDragging: true,
    }).addTo(map);

    map.on("click", function (e) {
      let waypoints = control.getWaypoints();

      if (waypoints.length === 2) {
        waypoints.splice(0, 2);
      }

      waypoints.push(L.latLng(e.latlng));
      control.setWaypoints(waypoints);
    });
  },
};
</script>
