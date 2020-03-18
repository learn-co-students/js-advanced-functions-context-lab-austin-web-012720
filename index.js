/* Your Code Here */

let createEmployeeRecord = function(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  };
};

let createEmployeeRecords = function(array) {
  let employeeArray = [];

  array.forEach(element => {
    employeeArray.push(createEmployeeRecord(element));
  });

  return employeeArray;
};

let createTimeInEvent = function(dateStamp) {
  let [date, hour] = dateStamp.split(' ');

  this.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour, 10),
    date
  });

  return this;
};

let createTimeOutEvent = function(dateStamp) {
  let [date, hour] = dateStamp.split(' ');

  this.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(hour, 10),
    date
  });

  return this;
};

let hoursWorkedOnDate = function(soughtDate) {
  let inEvent = this.timeInEvents.find(e => e.date === soughtDate);
  let outEvent = this.timeOutEvents.find(e => e.date === soughtDate);

  return (outEvent.hour - inEvent.hour) / 100;
};

let wagesEarnedOnDate = function(date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
};

let findEmployeeByFirstName = function(array, firstName) {
  return array.find(function(employee) {
    return employee.firstName === firstName;
  });
};

let calculatePayroll = function(employeeArray) {
  return employeeArray.reduce(function(acum, employee) {
    return acum + allWagesFor.call(employee);
  }, 0);
};

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function() {
  let eligibleDates = this.timeInEvents.map(function(e) {
    return e.date;
  });

  let payable = eligibleDates.reduce(
    function(memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};
