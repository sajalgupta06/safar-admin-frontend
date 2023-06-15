import moment from "moment";
import _ from "lodash";

export const getData = ()=>{
      
  function getRandomTimestamp(start, end) {
    return Math.floor(Math.random() * (end - start) + start);
  }

  function generateDataForMonth(year, month) {
    const data = [];

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month +1, 0);

    const numDays = endDate.getDate() - startDate.getDate() ;

    for (let day = 1; day <= numDays; day++) {
      const randomDay = new Date(year, month, day);

      for (let i = 0; i < 3; i++) {
        const randomTimestamp = getRandomTimestamp(
          randomDay.setHours(0, 0, 0, 0),
          randomDay.setHours(23, 59, 59, 999)
        );

        data.push({
          value: i + Math.random(),
          timestamp: randomTimestamp,
        });
      }
    }

    return data;
  }

  const year = 2023;
  const month = 5; // 0 for January, 1 for February, and so on

  const generatedData = generateDataForMonth(year, month);

  let groupedResults = _.groupBy(generatedData, (result) =>
    moment(result["timestamp"]).startOf("day").format("DD MMM YYYY")
  );

  return groupedResults
}

export const getPassengers = ()=>{
    return [
        {
            "name": "John Smith",
            "mobileNumber": 9876543210,
            "age": 30,
            "gender": "Male",
            "aadharNumber": 111100001111,
            "email": "john.smith@example.com"
        },
        {
            "name": "Emily Johnson",
            "mobileNumber": 8765432109,
            "age": 25,
            "gender": "Female",
            "aadharNumber": 222200002222,
            "email": "emily.johnson@example.com"
        },
        {
            "name": "David Brown",
            "mobileNumber": 7654321098,
            "age": 40,
            "gender": "Male",
            "aadharNumber": 333300003333,
            "email": "david.brown@example.com"
        },
        {
            "name": "Sophia Davis",
            "mobileNumber": 6543210987,
            "age": 28,
            "gender": "Female",
            "aadharNumber": 444400004444,
            "email": "sophia.davis@example.com"
        },
        {
            "name": "Michael Wilson",
            "mobileNumber": 5432109876,
            "age": 35,
            "gender": "Male",
            "aadharNumber": 555500005555,
            "email": "michael.wilson@example.com"
        }
    ]
}