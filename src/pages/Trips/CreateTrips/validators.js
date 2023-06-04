
export const view1Validator = (props) => {


  if (!props.name) {
    return {
      validate: false,
      field:"name",
      message: "Provide a valid name",
    };
  } else if (props.name.length < 3 || props.name.length > 20)
    return {
      validate: false,
      field:"name",
      message: "Name length must lie between 3 to 20 characters",
    };

  if (!props.type) {
    return {
      validate: false,
      field:"type",
      message: "Provide a Valid Type",
    };
  }

  if (!props.ageLimit) {
    return {
        validate: false,
        field:"ageLimit",
        message: "Provide a Valid Age",
      };
  }
 


  if (!props.lastDate) {
    return {
        validate: false,
        field:"lastDate",

        message: "Provide a Valid Last Date",
      };
  }

  if (!props.region) {
    return {
        validate: false,
        field:"region",

        message: "Provide a Valid Region",
      };
  }

  if (!props.days && props.days!=0 ) {
    return {
        validate: false,
        field:"days",

        message: "Provide  Valid Days",
      };
  }

  if (!props.nights && props.nights!=0) {
    return {
        validate: false,   
        field:"nights",
 
        message: "Provide  Valid  Nights",
      };
  }
  if(Math.abs(props.days - props.nights)>1){
    return {
        validate: false,

        message: "Provide  Valid  Values of Days and Night",
      };
  }

  if(!props?.locations?.length>0 ) {
    return {
        validate: false,
        field:"locations",

        message: "Provide  atleast one Location"
      };
  }
  if(!props.dates) {
    return {
        validate: false,
        field:"dates",

        message: "Provide  atleast one Date"
      };
  }
  else{
    return{
        validate:true
    }
  }
};



export const view2Validator = (props) => {


  if (!props?.about) {
    return {
      validate: false,
      field:"about",
      message: "Fill the About Field",
    };
  } else if (props?.about?.length < 50 || props?.about?.length > 200)
    return {
      validate: false,
      field:"about",
      message: "Name length must lie between 50 to 200 characters",
    };

  if(!props?.highlights?.length>0 ) {
    return {
        validate: false,
        field:"highlights",

        message: "Provide  atleast one highlights"
      };
  }

  if(!props?.inclusions?.length>0 ) {
    return {
        validate: false,
        field:"inclusions",

        message: "Provide  atleast one inclusions"
      };
  }




  if(!props?.exclusions?.length>0 ) {
    return {
        validate: false,
        field:"exclusions",

        message: "Provide  atleast one exclusions"
      };
  }

  if(!props?.recommendations?.length>0 ) {
    return {
        validate: false,
        field:"recommendations",

        message: "Provide  atleast one recommendations"
      };
  }


  if(!props?.terms?.length>0 ) {
    return {
        validate: false,
        field:"terms",

        message: "Provide  atleast one terms"
      };
  }

  else{
    return{
        validate:true
    }
  }
};


export const view3Validator = (props) => {



  if (!props?.title) {
    return {
      validate: false,
      field:"title",
      message: "Provide a Valid Title",
    };
  } else if (props?.title?.length < 5 || props?.title?.length > 30)
    return {
      validate: false,
      field:"title",
      message: "Title  length must lie between 5 to 30 characters",
    };

  if(!props?.time ) {
    return {
        validate: false,
        field:"time",

        message: "Provide  time",
      };
  }


  if (!props?.description) {
    return {
      validate: false,
      field:"description",
      message: "Provide a Valid description",
    };
  } else if (props?.description?.length < 20 || props?.description?.length > 200)
    return {
      validate: false,
      field:"description",
      message: "Description  length must lie between 5 to 30 characters",
    };

 

  else{
    return{
        validate:true
    }
  }
};


export const view4Validator = (props) => {


if(props?.validationType==="ADD_PLAN")
{

 
    
    if (!props?.date) {
      return {
        validate: false,
        field:"date",
        message: "Choose a Valid Date",
      };
    }

    if (!props?.pickupPoint || props?.pickupPoint.length<2) {
      return {
        validate: false,
        field:"pickupPoint",
        message: "Provide a Valid Pickup Point",
      };
    }

    if (!props?.pickupMode) {
      return {
        validate: false,
        field:"pickupMode",
        message: "Choose a Valid Pickup mode",
      };
    }


    if (!props?.dropPoint || props?.dropPoint.length<2) {
      return {
        validate: false,
        field:"pickupPoint",
        message: "Provide a Valid Drop Point",
      };
    }
    

    if (!props?.dropMode) {
      return {
        validate: false,
        field:"dropMode",
        message: "Choose a Valid Drop mode",
      };
    }

    if (!props?.amount ) {
      return {
        validate: false,
        field:"amount",
        message: "Provide a Valid Amount",
      };
    }

}

else {

if(!props || props?.length<1)
{
  return {
    validate: false,
    message: "Provide Atleast One Pricing Plan",
  };
}



}

    return{
        validate:true
    }
  

}