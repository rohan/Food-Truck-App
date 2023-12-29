import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyD8kn3UiYH-oR1jUOkEJ2T93KG0OMgHcFQ",
    authDomain: "project-food-truck.firebaseapp.com",
    databaseURL: "https://project-food-truck-default-rtdb.firebaseio.com",
    projectId: "project-food-truck",
    storageBucket: "project-food-truck.appspot.com",
    messagingSenderId: "268319326604",
    appId: "1:268319326604:web:2b166f1229c288c311d6a9",
    measurementId: "G-T08L0Y72BL"
  };

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);