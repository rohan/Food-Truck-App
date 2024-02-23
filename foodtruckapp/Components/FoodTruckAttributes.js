const foodTruckAttributeMap = () => {
    return new Map([
        ["JGrill", 
        {
            image: require("../assets/JG.png"),
            cuisineType: "Burgers & Fries",
            description: "Welcome to Jurassic Grill Champaign, your ultimate destination for burger bliss in the heart of the city! Step into a world where flavor reigns supreme and every bite is a journey through time. Whether you're dining with friends, family, or embarking on a solo burger quest, Jurassic Grill Champaign promises an unforgettable experience that's as big on flavor as it is on fun. So come hungry and get ready to taste the past in every bite!",
            websiteURL: "https://jurassicgrillchampaign.com/",
        }
        ],
        ["TBell", 
        {
            image: require("../assets/Food_trucks_Pitt_09.jpg"),
            cuisineType: "Mexican Fast Food",
            description: "Taco Bell Food Truck Description",
            websiteURL: "https://www.tacobell.com/",
        }
        ],
        ["Dons", 
        {
            image: require("../assets/Food_trucks_Pitt_09.jpg"),
            cuisineType: "American Fast Food",
            description: "McDonald's Food Truck Description",
            websiteURL: "https://www.mcdonalds.com/us/en-us.html",
        }
        ],
    ])
}

export default foodTruckAttributeMap;