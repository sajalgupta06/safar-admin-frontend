let APP_ENV = "dev"
let URL;

if(APP_ENV==="production"){
    URL=" https://ec2-3-110-189-160.ap-south-1.compute.amazonaws.com:5000/api/v1/admin"
}
else {
    URL = 'http://localhost:8080/api/v1/admin'
}
const firebaseConfig = {
    apiKey: "AIzaSyCTPp9vMOKKzo2_5y3bBq1g_PPQBPrJiXM",
    authDomain: "safar-5e525.firebaseapp.com",
    projectId: "safar-5e525",
    storageBucket: "safar-5e525.appspot.com",
    messagingSenderId: "40081719240",
    appId: "1:40081719240:web:28317634f27d4683664afd",
    measurementId: "G-M6X6ZB2ZGV"
  };

const declarations = {

    routes:{
        ACTIVE_TRIPS:"active_trips",
        ALL_TRIPS:"all_trips",
        CREATE_TRIPS:"create_trips",
        ACTIVE_BOOKINGS:"active_bookings",
        ALL_BOOKINGS:"all_bookings",
        ADD_BOOKINGS:"add_bookings",
        PAYMENTS:"payments",
        EMAIL:"email",
        ANALYTICS:"analytics",
        PRICING:"pricing",
        SETTINGS:"settings"
    }


}

module.exports={
    APP_NAME:"Safar",
    URL,
    firebaseConfig,
    declarations
}

// export NODE_OPTIONS=--openssl-legacy-provider
