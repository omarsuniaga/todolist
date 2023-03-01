// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getDatabase,
  ref,
  child,
  push,
  update,
  set,
  get,
  onValue,
  onDisconnect,
  serverTimestamp,
} from "firebase/database";

import { getFirestore } from "firebase/firestore";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDF6xF2CqeQTmH7LN2qs65TWt4WQBmzqYc",
  authDomain: "poolserviceteam-34c3a.firebaseapp.com",
  databaseURL: "https://poolserviceteam-34c3a-default-rtdb.firebaseio.com",
  projectId: "poolserviceteam-34c3a",
  storageBucket: "poolserviceteam-34c3a.appspot.com",
  messagingSenderId: "1469401057",
  appId: "1:1469401057:web:9e8fb698db9b8212a1b4a0",
  measurementId: "G-B1JDPLKTKQ",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const dbRef = ref(getDatabase());

export const Iniciar_Automaticamente = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(true);
        //go to home
        // console.log(user.uid);

        // Since I can connect from multiple devices or browser tabs, we store each connection instance separately
        // any time that connectionsRef's value is null (i.e. has no children) I am offline
        const connectedRef = ref(db, ".info/connected");
        const myConnectionsRef = ref(db, `users/${user.uid}/connections`);

        // stores the timestamp of my last disconnect (the last time I was seen online)
        const lastOnlineRef = ref(db, `users/${user.uid}/connections`);

        onValue(connectedRef, (snap) => {
          if (snap.val() === true) {
            // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
            const con = push(myConnectionsRef);

            // When I disconnect, remove this device
            onDisconnect(con).remove();

            // Add this device to my connections list
            // this value could contain info about the device or a timestamp too
            set(con, true);

            // When I disconnect, update the last time I was seen online
            onDisconnect(lastOnlineRef).set(serverTimestamp());
          }
        });
      } else {
        resolve(false);
      }
    });
  });
};

//Obtener la data de la tabla Tecnico
export const getTask = async () => {
  const snapshot = await get(child(ref(db), "Tecnico"));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return [];
  }
};

//obtenerContador
export const contador = async () => {
  let res = await getTask();
  return res.length;
};

//Agregar
export const AddTask = async (task) => {
  set(ref(db, "Tecnico/" + task.id), task);
};

//Actualizar
export const UpdateTask = (task) => {
  const updates = {};
  updates["/Tecnico/" + task.id] = task;
  return update(ref(db), updates);
};

// Eliminar
export const DeleteTask = (task) => {
  task;
  const updates = {};
  updates["/Tecnico/" + task.id] = task;
  return update(ref(db), updates);
};

// const ObtenerUnaKey = push(child(ref(db), "Tecnico")).key;
export const CerrarSesion = async () => {
  await signOut(auth);
};
// registar las coordenadas del bus
export const AddBus = async (coor) => {
  set(ref(db, "Bus/" + coor.id), coor);
};

AddBus({
  id: 1,
  coor: {
    salida: {
      lat: 18.683231,
      lng: -68.451809,
    },
    llegada: {
      lat: 18.687200051247483,
      lng: -68.44505160419916,
    },
    actual: {
      lat: 18.683231,
      lng: -68.451809,
    },
  },
});

// Obtener las coordenadas del bus
export const getBus = async () => {
  const snapshot = await get(child(ref(db), "Bus"));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return [];
  }
};

// actualizar las coordenadas del bus
export const UpdateBus = (coor) => {
  // console.log("Update", coor);
  // const updates = {};
  // updates["/Bus/" + coor.id] = coor;
  // return update(ref(db), updates);
};

//getRutas
export const getRutas = async () => {
  const snapshot = await get(child(ref(db), "Rutas"));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return [];
  }
};

export const getPiscinas = async () => {
  const snapshot = await get(child(ref(db), "Piscinas"));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return [];
  }
};
