export const addPassengerDetailsValidator = (props)=>{


if(!props?.name)
{
    return {
        validate: false,
        field:"name",
        message: "Please Enter Name",
      };
}
if(props?.name.length<3 ||props?.name.length> 20  )
{
    return {
        validate: false,
        field:"name",
        message: "Provide a valid Name",
      };
}
if(!props?.age)
{
    return {
        validate: false,
        field:"age",
        message: "Please Enter Age",
      };
}

if(!props?.gender)
{
    return {
        validate: false,
        field:"gender",
        message: "Please Select Gender",
      };
}


return {
    validate: true, 
}


}

export const createBookingValidator = (props)=>{


    if(!props?.tripDetails?.name)
    {
        return {
            validate: false,
            field:"tripName",
            message: "Please Select Trip",
          };
    }

    if(!props?.tripDetails?.priceSlot)
    {
        return {
            validate: false,
            field:"priceSlot",
            message: "Please Select a   PriceSlot",
          };
    }



    if(!props?.passengers || props?.passengers?.length<1)
    {
        return {
            validate: false,
            field:"passengers",
            message: "Please Add Passengers",
          };
    }

    if(!props?.payment)
    {
        return {
            validate: false,
            field:"paymentMode",
            message: "Please Select Payment Mode",
          };
    }
   
    return {
        validate: true, 
    }
}