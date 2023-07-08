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


    const xaxis = Object.keys(pastWeekData).map((days) => {
      const day = moment(days, "DD MMM YYYY").format("ddd");

      if (moment().format("ddd") === day) return "Today";
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

    const xaxis = Object.keys(pastWeekData).map((days) => {
      const day = moment(days, "DD MMM YYYY").format("DD MMM ");

      if (moment().format("DD MMM ") === day) return "Today";
      return day;
    });


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


    const xaxis = Object.keys(pastWeekData).map((days) => {
      const day = moment(days, "DD MMM YYYY").format("ddd");

      if (moment().format("ddd") === day) return "Today";
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