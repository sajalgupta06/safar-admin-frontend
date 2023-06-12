
const { URL } = require("../config");


let header;

const postApi = async (path,data,isAuthenticated)=>{

  const token = localStorage.getItem('a_token')

  if(isAuthenticated)
  {
    header = {
      "Content-Type":"application/json",
      "x-api-key":"$2b$10$J/ty1/.nmtL7TCbJ3m5D2.2bc0EYmSswd2NlkSe4R5bZ94pOwMNq2",
      "Authorization":`Bearer ${token}`
    }
  }
  else{
    header = {
      "Content-Type":"application/json",
      "x-api-key":"$2b$10$J/ty1/.nmtL7TCbJ3m5D2.2bc0EYmSswd2NlkSe4R5bZ94pOwMNq2",
    }
  }

  return await fetch(`${URL}${path}`, {
    method: "post",
    headers: header,
    body: JSON.stringify(data),
  })  .then((data) => data.json())
  .then((data) => {
    return data;
  });
}



const getApi = async (path,isAuthenticated)=>{
  const token = localStorage.getItem('a_token')

  if(isAuthenticated)
  {
    header = {
      "Content-Type":"application/json",
      "x-api-key":"$2b$10$J/ty1/.nmtL7TCbJ3m5D2.2bc0EYmSswd2NlkSe4R5bZ94pOwMNq2",
      "Authorization":`Bearer ${token}`
    }
  }
  else{
    header = {
      "Content-Type":"application/json",
      "x-api-key":"$2b$10$J/ty1/.nmtL7TCbJ3m5D2.2bc0EYmSswd2NlkSe4R5bZ94pOwMNq2",
    }
  }
  return await fetch(`${URL}${path}`, {
    method: "get",
    headers: header,
  }).then((data) => data.json())
  .then((data) => {
    return data;
  });
}



export const logOut = ()=>{

  localStorage.removeItem("user");
  localStorage.removeItem("a_token");

  
}





export const createTripGeneral =  async (data) => {
  console.log(data)
  return await postApi('/workingTrip',data,true)

};

export const updateWorkingTrip =  async (data) => {
console.log(data)
  return await postApi('/workingTrip',data,true)

};

export const fetchWorkingTrip = async() => {
 
  return await getApi('/workingTrip',true)

};

export const createTripUpdateWorkingTrip =  async (data) => {
  
  return await postApi('/workingTrip',data,true)

};


export const createTripUpdateWorkingTripPricingPlan = async (data) => {
 

  return await postApi('/workingTrip',data,true)

  
};

export const updateWorkingTripItinerary = async (data) => {


  return await postApi('/workingTrip',data,true)

};


export const updateWorkingTripAddInfo = async (data) => {
 
  return await postApi('/workingTrip',data,true)

};


export const createTripGetDays = async (id) => {


  return await getApi(`/trip?tripId=${id}`,true)



};

export const fetchCollection = async() => {

  return await getApi('/collections',true)

};




export const workingTripGetProgress = async() => {


  return await getApi('/feWTProg',true)


};

export const getDashTrips = async ()=>{
  


      return await getApi('/trips?published=true',true)

}

export const getAllAdminTrips = async (page,limit) => {
  

    return await getApi(`/trips?page=${page}&limit=${limit}`,true)

  };

  export const getAllBookingTrips = async (page=0,limit=0) => {

    return await getApi(`/trips?page=${page}&limit=${limit}&publish=true&completed=false`,true)
  };



  export const getImages = async (data) => {

    return await postApi('/fetchImages',data,true)

  };


  export const updatePersonalInfo = async(data) => {

    return await postApi('/admin',data,true)

  };


  export const fetchPersonalInfo= async() => {

    
    return await getApi('/admin',true)

  };
  
  
  
  export const acceptPendingTicket= async(ticketId) => {

   
    return await getApi(`/acceptTicket/${ticketId}`,true)

  };


  export const checkPasswordEmail= async (email,password) => {

  
    return await postApi('/checkPassword',{email,password},true)

  };


  export const emailOtp= async(email) => {
 


    return await postApi('/emailOtp',email,true)

  };
  

  export const verifyEmailOtp= async (otp,token) => {
    
    return await postApi('/verifyEmailOtp',{otp,token},true)

  };

  export const phoneOtp= async(phone) => {
    
    return await postApi('/otp',phone,true)

  };


  export const verifyPhoneOtp= async (otp,token) => {

    return await postApi('/verifyOtp',{otp,token},true)

  };


  export const checkPasswordPhone= async(phone,password) => {

   
    return await postApi('/checkPassword',{phone,password},true)


  };




  export const changeDashEmail= async(email) => {

  return await postApi('/changeDashUserEmail',email,true)



  };


  export const changeDashPhone= async(phone) => {


    return await postApi('/changeDashUserphone',phone,true)

  };



  export const uploadDashUserLogo= async(data) => {

    const formData = new FormData()
    formData.append('logo',data)
   
    return await postApi('/uploadDashUserLogo',formData,true)

  };

  export const uploadDashUserPhoto= async (data) => {
    
    
    const formData = new FormData()
   
    for (let i = 0 ; i < data.length ; i++) {

      formData.append("photo", data[i]);

  }

  return await postApi('/uploadDashUserPhoto',formData,true)

     
  };



  export const fetchDashUserPhoto= async() => {
       
    return await getApi('/dashUserPhoto',true)

    
  };




  export const fetchCompanyInfo= async() => {

   
    return await getApi('/',true)

  };
  

 
  export const uploadWorkingTripPhotos= async (data) => {


    const formData = new FormData()

    for (let i = 0 ; i < data.length ; i++) {

      formData.append("photo", data[i]);

  }

  return await postApi('/tPhotos',formData,true)

     
  };

  

  export const  uploadActivityPhotos= async(data) => {

    const formData = new FormData()

    for (let i = 0 ; i < data.length ; i++) {

      formData.append("photo", data[i]);
  }

  return await postApi('/WTImg',formData,true)
    
  };


  export const createTrip= async(data) => {

    return await postApi('/trip',data,true)

  };




  export const deleteTrip= async(data) => {


    return await postApi('/deleteTrips',data,true)


  };



  export const publishTrip= async(data) => {

    return await postApi('/publishTrips',data,true)

  };

  export const getSingleTrip = async(id) => {

    return await getApi(`/trip?id=${id}`,true)

  };

  export const getSingleTripBySlug = async(slug) => {

    return await getApi(`/trip/${slug}`,true)

  };



  export const updateTrip= async(data,id) => {

    return await postApi(`/updateTrip?id=${id}`,data,true)

  };

 
  export const editTripUploadPhotos= async(data) => {
    const formData = new FormData()
    for (let i = 0 ; i < data.length ; i++) {

      formData.append("photo", data[i]);
  }
  return await postApi('tPhotos',formData,true)

     
  };


  
  export const getTripTicket = async(id) => {
    

    return await postApi(`/tripTicket`,{tripId:id},true)

   
  };


  export const deleteTickets = async (tripId,ticketIds, numberOfPas) => {


    return await postApi('/deleteTickets',{tripId,ticketIds, numberOfPas},true)


  };


  export const createManualTicket =async (data) => {


    return await postApi('/bookTicket',data,true)


  };


  export const getTripNames = async() => {


    return await getApi(`/tripNames?publish=true&completed=false`,true)

  };


  export const getReviews = async(id) => {

    return await getApi(`/fb?id=${id}`,true)

  };


  export const sendEmail = async (data) => {


    return await postApi('/email',data,true)


  };


  export const fetchSignedUrl = async(data) => {

    return await postApi('/upload',data,true)


 
  };



  export const uploadPhoto = async(url,data) => {
    const token = localStorage.getItem('token')


    // return await postApi('/upload',data,true)


    const result = fetch(`${url}`, {
      method: "put",
      headers: {
        "Content-Type": `${data.type}`,
      },     
      body:data
    })
      .then((data) => {
        return data;
      });
    return result;
  };



  export const updateUserPricingPlan = async(data) => {

    const token = localStorage.getItem('token')

    return await postApi('/upPp',data,true)

    

  };

  export const fetchCompanyNLP= async() => {

    return await getApi('/companyNLP',true)  
  };


  export const fetchTripPricePlans= async(data) => {

    return await getApi(`/tripPricePlans?id=${data}`,true)

  };



// Bookings 

export const fetchRecentTickets= async() => {

  return await getApi(`/recentTickets`,true)

};


export const fetchAllBookingsTrips= async() => {

  return await getApi(`/allBookingsTrips`,true)

};



// Trip



export const fetchActiveTripsNameSlugDatesPriceSlots= async() => {

  return await getApi('/activeTrips',true)

};

export const fetchActiveTripsBookingDetails= async() => {

  return await getApi('/activeTripsBookingDetails',true)

};




// Admin

export const verifyAccessToken= async() => {

  return await getApi('/',true)

};

export const adminlogin =  async (data) => {
 
  return await postApi('/login',data,false)
 
};