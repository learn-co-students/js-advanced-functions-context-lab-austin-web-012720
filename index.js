/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */



const createEmployeeRecord = (array) => {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
};

const createEmployeeRecords = (arrays) => {
    let new_array = [];
    arrays.forEach(array => new_array.push(createEmployeeRecord(array)));
    return new_array;
};

const createTimeInEvent = function(date) {
    let array = date.split(' ');
    let object = {
        type: "TimeIn",
        hour: parseInt(array[1], 10),
        date: array[0]
    }

    this.timeInEvents.push(object);
    return this;
};

const createTimeOutEvent = function(date) {
    let array = date.split(' ');
    let object = {
        type: "TimeOut",
        hour: parseInt(array[1], 10),
        date: array[0]
    }

    this.timeOutEvents.push(object);
    return this;
};

const hoursWorkedOnDate = function(date) {
    let workDay = this.timeInEvents.find(day => day.date === date);
    let timeIn = workDay.hour;

    workDay = this.timeOutEvents.find(day => day.date === date);
    let timeOut = workDay.hour;

    let hours = parseInt(timeOut, 10) - parseInt(timeIn, 10);
    return hours / 100;
};

const wagesEarnedOnDate = function(date) {
    let hours = hoursWorkedOnDate.call(this, date);
    return hours * this.payPerHour;
};

// let allWagesFor = function () {
//     let eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     let payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }

const allWagesFor = function() {
    let allDates = this.timeInEvents.map(day => day.date);

    let payable = allDates.reduce(function(memo, date) { 
        return memo + wagesEarnedOnDate.call(this, date)
    }.bind(this), 0);
    return payable;
};

const findEmployeeByFirstName = function(records, firstName) {
    let employee = records.find(record => record.firstName === firstName);
    return employee;
};

const calculatePayroll = function(records) {
    return records.reduce(function(memo, record) {
        return memo + allWagesFor(record);
    }, 0);
}









