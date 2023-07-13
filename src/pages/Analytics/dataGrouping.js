import moment from "moment";

export const getWeeks = (data) => {

    const today = moment();
    const startDate = today.clone().subtract(7, "day");
    const endDate = today;

 
    const pastWeekData = Object.keys(data).reduce((result, key) => {
      const date = moment(key, "DD MMM YYYY");
      if (date.isBetween(startDate, endDate, undefined, "[]")) {
        result[key] = data[key];
      }
      return result;
    }, {});



    let xaxis = [];

    xaxis.push("Today");
    for (var i = 1; i < 7; i++){

       let day = moment().subtract(i,'d');

       xaxis.push(day.format('ddd'));
    }
    xaxis.reverse()


    const yData = [];
    Object.values(pastWeekData).map((arr) => {
      let sum = 0;
      arr.map((obj) => {
        sum += obj.amount;
      });
      yData.push(sum);
    });

    return{
        xaxis:xaxis,
        yaxis:yData
    }

  };

 export const get15Days = (data) => {
    const today = moment();
    const startDate = today.clone().subtract(15, "day");
    const endDate = today;

    const pastWeekData = Object.keys(data).reduce((result, key) => {
      const date = moment(key, "DD MMM YYYY");
      if (date.isBetween(startDate, endDate, undefined, "[]")) {
        result[key] = data[key];
      }
      return result;
    }, {});

    // const xaxis = Object.keys(pastWeekData).map((days) => {
    //   const day = moment(days, "DD MMM YYYY").format("DD MMM ");

    //   if (moment().format("DD MMM ") === day) return "Today";
    //   return day;
    // });  

    let xaxis = [];

    xaxis.push("Today");
    for (var i = 1; i < 15; i++){

       let day = moment().subtract(i,'d');

       xaxis.push(day.format("DD MMM "));
    }
    xaxis.reverse()

    console.log(xaxis)
    const yData = [];
    Object.values(pastWeekData)?.map((arr) => {
      let sum = 0;
      arr?.map((obj) => {
        sum += obj.amount;
      });
      yData.push(sum);
    });

   
    return{
        xaxis:xaxis,
        yaxis:yData
    }

  };

 export const getMonth = (data) => {
    const today = moment();
    const startDate = today.clone().subtract(1, "month");
    const endDate = today;

    const pastWeekData = Object.keys(data).reduce((result, key) => {
      const date = moment(key, "DD MMM YYYY");
      if (date.isBetween(startDate, endDate, undefined, "[]")) {
        result[key] = data[key];
      }
      return result;
    }, {});

    const xaxis = Object.keys(pastWeekData).map((days) => {
      const day = moment(days, "DD MMM YYYY").format("DD MMM ");

      if (moment().format("DD MMM ") === day) return "Today";
      return day;
    });

    const yData = [];
    Object.values(pastWeekData).map((arr) => {
      let sum = 0;
      arr.map((obj) => {
        sum += obj.amount;
      });
      yData.push(sum);
    });


    return{
        xaxis:xaxis,
        yaxis:yData
    }
  };


  export const getWeeksBooking = (data) => {

    const today = moment();
    const startDate = today.clone().subtract(7, "day");
    const endDate = today;

 
    const pastWeekData = Object.keys(data).reduce((result, key) => {
      const date = moment(key, "DD MMM YYYY");
      if (date.isBetween(startDate, endDate, undefined, "[]")) {
        result[key] = data[key];
      }
      return result;
    }, {});


    let xaxis = [];

    let currentDay = moment();
    for (var i = 0; i < 6; i++){
       let day = currentDay.subtract(i, 'days');
       xaxis.push(day.format('dddd'));
    }


    const yData = [];
    Object.values(pastWeekData).map((arr) => {
      let sum = 0;
      arr.map((obj) => {
        sum += obj.count;
      });
      yData.push(sum);
    });

    return{
        xaxis:xaxis,
        yaxis:yData
    }

  };


  export const get15DaysBookings = (data) => {
    const today = moment();
    const startDate = today.clone().subtract(15, "day");
    const endDate = today;

    const pastWeekData = Object.keys(data).reduce((result, key) => {
      const date = moment(key, "DD MMM YYYY");
      if (date.isBetween(startDate, endDate, undefined, "[]")) {
        result[key] = data[key];
      }
      return result;
    }, {});

    const xaxis = Object.keys(pastWeekData).map((days) => {
      const day = moment(days, "DD MMM YYYY").format("DD MMM ");

      if (moment().format("DD MMM ") === day) return "Today";
      return day;
    });


    const yData = [];
    Object.values(pastWeekData)?.map((arr) => {
      let sum = 0;
      arr?.map((obj) => {
        sum += obj.count;
      });
      yData.push(sum);
    });

   
    return{
        xaxis:xaxis,
        yaxis:yData
    }

  };

 export const getMonthBookings = (data) => {
    const today = moment();
    const startDate = today.clone().subtract(1, "month");
    const endDate = today;

    const pastWeekData = Object.keys(data).reduce((result, key) => {
      const date = moment(key, "DD MMM YYYY");
      if (date.isBetween(startDate, endDate, undefined, "[]")) {
        result[key] = data[key];
      }
      return result;
    }, {});

    const xaxis = Object.keys(pastWeekData).map((days) => {
      const day = moment(days, "DD MMM YYYY").format("DD MMM ");

      if (moment().format("DD MMM ") === day) return "Today";
      return day;
    });

    const yData = [];
    Object.values(pastWeekData).map((arr) => {
      let sum = 0;
      arr.map((obj) => {
        sum += obj.count;
      });
      yData.push(sum);
    });


    return{
        xaxis:xaxis,
        yaxis:yData
    }
  };