import React from 'react';
import { db } from './Config';
import { ref, onValue, get, child } from 'firebase/database';

function fetchTrucks() {

    const dbRef = ref(db);
    get(child(dbRef, `users/82LyYqZ73TZ2XUZizHj9piktknm1/data`)).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const trucks = Object.keys(data).map(key => ({
                ...data[key]
            }))
            console.log(trucks);
            return trucks;
        } else {
            console.log("No data available");
            return null;
        }
    }).catch((error) => {
        console.error(error);
    });
}

export default fetchTrucks;