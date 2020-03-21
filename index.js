let createEmployeeRecord = array => {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
};

let createEmployeeRecords = employeesArrayOfArrays => {
   //takes in an array of arrays; each inner array is an array with an employees data;
   //we map over each array and pass it to the createEmployeeRecord function to create that employee object    
   return employeesArrayOfArrays.map(employeeData => createEmployeeRecord(employeeData));    
};

let createTimeInEvent = function(dateStamp) {
  //this is a destructured way of writing date an hour rather than setting 
  //date to dateStamp.split(' ')[0], etc.  
  let [date, hour] = dateStamp.split(' ');
  //this refers to the employee object that the createTimeInEvent method will be called on
  this.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour), 
    date    
  })
  return this;
};


let createTimeOutEvent = function(dateStamp) {
  let [date, hour] = dateStamp.split(' ');
  
  this.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(hour),
    date    
  });
  return this;
};

let hoursWorkedOnDate = function(dateToSearch) {
  let timeEventIn = this.timeInEvents.find(function(array) {
    return array.date ===  dateToSearch;  
  });
  let timeEventOut = this.timeOutEvents.find(function(array) {
      return array.date === dateToSearch
  });
  return (timeEventOut.hour - timeEventIn.hour) / 100;   
};


let wagesEarnedOnDate = function(dateToSearch) {
  let wages = hoursWorkedOnDate.call(this, dateToSearch) 
    * this.payPerHour;
  return parseFloat(wages.toString());
};



/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = (arrayOfEmployeeObjects, nameToFind) => {
   return arrayOfEmployeeObjects.find(employeeObject => employeeObject.firstName === nameToFind);  
};

let calculatePayroll = arrayOfEmployeeObjects => {
    return arrayOfEmployeeObjects.reduce((accumulator, employeeObject) => {
        return accumulator + allWagesFor.call(employeeObject);
    }, 0);
};
