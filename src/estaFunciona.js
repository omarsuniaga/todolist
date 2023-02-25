var map = L.map("map").locate({ setView: true, maxZoom: 18 });
// Agregar una capa de OpenStreetMap al mapa
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "Map data &copy; OpenStreetMap contributors",
  maxZoom: 18,
}).addTo(map);
let BusSalida = [];//la coordenada del Punto A
let BusLlegada = []; //La coordenada del punto B
let BusAhora = []; 
let tuUbicacion = [];
let estaciones = paradas.map((elem) => [elem.coor.lat, elem.coor.lng]);
// Inicializar la distancia previa como null

// Crear un marcador para el punto de inicio y ocultarlo
let startMarker = L.marker([0, 0], { opacity: 0 }).addTo(map);
// Crear un marcador para el punto final y ocultarlo
let endMarker = L.marker([0, 0], { opacity: 0 }).addTo(map);
// Función para fijar la ubicación
function fixLocation(latlng) {
  if (startMarker) {
    map.removeLayer(startMarker);
    //obtener las propiedades de getBus
    getBus().then((e) => {
      e.forEach((bus) => {
        BusSalida = L.marker([bus.coor.salida.lat, bus.coor.salida.lng])
          .addTo(map)
          .bindPopup(`<b>Salida</b>`)
          .openPopup();
        BusLlegada = L.marker([bus.coor.llegada.lat, bus.coor.llegada.lng])
          .addTo(map)
          .bindPopup(`<b>Llegada</b>`)
          .openPopup();
        L.Routing.control({
          // waypoints: [BusSalida.getLatLng(), BusLlegada.getLatLng()].concat(
          //   estaciones
          // ),
          waypoints: paradas.map((elem) => [elem.coor.lat, elem.coor.lng]),
          routeWhileDragging: true,
          lengujes: "es",
          geocoder: L.Control.Geocoder.nominatim(),
          // reverseWaypoints: true,
          // showAlternatives: true,
        })
          .on("routesfound", function (e) {
            var routes = e.routes;
            // console.log(routes);
            e.routes[0].coordinates.forEach(function (coord, index) {
              setTimeout(function () {
                startMarker.setLatLng([coord.lat, coord.lng]);
                BusAhora = L.marker([coord.lat, coord.lng]);
                bus.coor.actual = BusAhora._latlng;
                // para cada elemento de estaciones, ejecutar la funcion checkDistance
                checkDistance();
                // checkDistance(bus.coor.actual);
                // setTimeout(() => UpdateBus(bus), 5000);
              }, 1000 * index);
            });
          })
          .a ddTo(map);
      });
    });
  }
  startMarker = L.marker(latlng).addTo(map);
}

// Función que se ejecuta al hacer click en un botón o de forma periódica
let previousDistance = null;
function checkDistance() {
  // Obtener la distancia entre los marcadores de estaciones
  paradas.forEach((elem) => {
    let distancia = BusAhora.getLatLng().distanceTo([
      elem.coor.lat,
      elem.coor.lng,
    ]);
    // Si la distancia previa es null, se actualiza con la distancia actual
    if (previousDistance === null) {
      previousDistance = distancia;
      console.log("Distancia para llegar a: ", elem.nombre);
      if (distancia < 200) {
        console.log("Estas cerca de la estacion: ", elem.nombre);
        // previousDistance = null;
      }
      return;
    }

    // Si la distancia actual es menor a la distancia previa, mostrar una alerta
    if (distancia < previousDistance) {
      console.log(distancia);
    }

    // Si la distancia actual es mayor a la distancia previa, actualizar la distancia previa
    if (distancia > previousDistance) {
      previousDistance = distancia;
    }
  });
}

// si una persona esta en una parada, debe detenerse el bus 10 segundos

map.on("mousedown", function (e) {
  let timeoutId = setTimeout(function () {
    fixLocation(e.latlng);
  }, 2000);

  map.on("mouseup", function () {
    clearTimeout(timeoutId);
  });
});

// Agregar controlador de eventos click para el punto final
map.on("dblclick", function (e) {
  // Obtener la ubicación del click
  const { lat, lng } = e.latlng;

  // Actualizar la ubicación del marcador de fin
  endMarker.setLatLng([lat, lng]);

  // Mostrar el marcador de fin
  endMarker.setOpacity(1);

  tuUbicacion = L.marker([lat, lng]).addTo(map);
  // Obtenemos la distancia entre los marcadores
  // var distance = BusAhora.getLatLng().distanceTo(tuUbicacion.getLatLng());

  // console.log("distance", distance);
  // Si la distancia es menor que 500 metros, mostramos una alerta
  // if (distance < 500) {
  // alert("Los marcadores están muy cerca.");
  // }
  // L.Routing.control(
  //   L.extend(window.lrmConfig, {
  //     waypoints: [startMarker.getLatLng(), endMarker.getLatLng()],
  //     geocoder: L.Control.Geocoder.nominatim(),
  //     routeWhileDragging: true,
  //     reverseWaypoints: true,
  //     showAlternatives: true,
  //   })
  // )
  // .on("routesfound", function (e) {
  //   var routes = e.routes;
  //   console.log(routes);
  //   e.routes[0].coordinates.forEach(function (coord, index) {
  //     setTimeout(function () {
  //       startMarker.setLatLng([coord.lat, coord.lng]);
  //       var distance = BusAhora.getLatLng().distanceTo(endMarker.getLatLng());
  //       if (distance < 500) {
  //         alert("Los marcadores están muy cerca.");
  //       }
  //     }, 1000 * index);
  //   });
  // })
  // .addTo(map);
});

// L.Routing.errorControl(control).addTo(map);

// Crear la capa de grupo
let estacionesGroup = L.layerGroup();

// Iteramos sobre el array de coordenadas y creamos una marca para cada una
for (let i = 0; i < estaciones.length; i++) {
  let marker = L.marker(estaciones[i]).addTo(estacionesGroup);
  // console.log(marker);
}

// Agregamos el objeto L.layerGroup al mapa
estacionesGroup.addTo(map);


//El turista abre la app 
//El turista selecciona la ruta de destino
//La app le indica la parada mas cercana de acuerdo a la ruta y a la ubicacion del turista
//La app Buscar la guagua de ruta seleccionada
//Muestra la ruta del recorrido de la guagua y trakea la guagua
//El Conductor, recibe una alerta de parada en pantalla.*
//El turista recibe el tiempo estimado para llegar la guagua
//El turista selecciona que esta embarcado
//El turista ve el tiempo y la distancia para llegar al destino.
//Muestra el recorrido en tiempo real de la guagua 
//Mostrar el horario de ida y retorno
//Promediar el horario y mostrar su efectividad 



//El turista


//Desde la vista del conductor
//El Conductor recibe una alerta de parada en pantalla.
//El tiempo que dura conductor en la parada
//calcular el tiempo de la guagua en cada parada*











let map = L.map("map").setView([37.7749, -122.4194], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  tileSize: 512,
  zoomOffset: -1,
}).addTo(map);

let busIcon = L.icon({
  iconUrl:
    "https://png.pngtree.com/element_our/20190528/ourmid/pngtree-yellow-bus-icon-image_1140478.jpg",
  iconSize: [38, 38],
  iconAnchor: [22, 22],
});

// Define las coordenadas de las diferentes paradas del bus
let stops = [
  { name: "Stop 1", location: [37.7749, -122.4194] },
  { name: "Stop 2", location: [37.7848, -122.4064] },
  { name: "Stop 3", location: [37.7894, -122.4118] },
  { name: "Stop 4", location: [37.7947, -122.4214] },
  { name: "Stop 5", location: [37.7763, -122.4176] },
];

let stopMarkers = L.layerGroup();

for (let i = 0; i < stops.length; i++) {
  let stopMarker = L.marker(stops[i].location).bindPopup(stops[i].name);
  stopMarkers.addLayer(stopMarker);
}

stopMarkers.addTo(map);

let currentStopIndex = 0;

// Crea un objeto de la clase L.Routing.control() para generar la ruta entre las paradas
var routingControl = L.Routing.control({
  waypoints: stops.map((stop) => L.latLng(stop.location)),
  routeWhileDragging: true,
}).addTo(map);

// Crea un marcador en la posición inicial del bus (Estación A)
let busMarker = L.marker(stops[0].location, {
  icon: busIcon,
}).addTo(map);
let currentStop = 0; // Variable para controlar la parada actual del bus
let currentDelay = 0; // Variable para controlar el tiempo de espera actual

// Función para mover el marcador entre dos paradas
function moveMarker(start, end) {
  // Obtener las coordenadas de la parada de inicio y fin
  const startCoords = busStops[start].coords;
  const endCoords = busStops[end].coords;

  // Calcular la distancia entre las dos paradas
  const distance = startCoords.distanceTo(endCoords);

  // Calcular la duración del viaje en función de la distancia
  const duration = (distance / busSpeed) * 3600;

  // Crear una animación de movimiento del marcador entre las dos paradas
  marker
    .setLatLng(startCoords) // Colocar el marcador en la parada de inicio
    .animate({
      // Animación de movimiento del marcador
      duration: duration * 1000, // Duración de la animación en milisegundos
      easing: "linear", // Función de interpolación
      callback: () => {
        // Función que se ejecuta al finalizar la animación
        // Incrementar el índice de la parada actual y reiniciar el tiempo de espera
        currentStop++;
        currentDelay = 0;

        // Si el bus ha llegado a la última parada, reiniciar la ruta
        if (currentStop >= busStops.length) {
          currentStop = 0;
        }

        // Esperar 10 segundos antes de pasar a la siguiente parada
        setTimeout(() => {
          moveMarker(currentStop, (currentStop + 1) % busStops.length);
        }, 10000);
      },
    })
    .addTo(map);
}

// Iniciar la simulación de movimiento del marcador
moveMarker(currentStop, (currentStop + 1) % busStops.length);s