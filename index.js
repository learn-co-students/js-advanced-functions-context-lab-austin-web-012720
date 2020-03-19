/* Your Code Here */
function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(data){
    return data.map(detail => {
       return createEmployeeRecord(detail)
    })
}
 function createTimeInEvent(dateStamp) {
     let [date, time] = dateStamp.split(' ')
    
     this.timeInEvents.push({
         type: "TimeIn",
         hour: parseInt(time, 10),
         date
     })
     return this
 }

 function createTimeOutEvent(datestamp) {
     let [date,time] = datestamp.split(' ')

     this.timeOutEvents.push({
         type: "TimeOut",
         hour: parseInt(time,10),
         date
     })
     return this
 }

 function hoursWorkedOnDate(date){
     let inTime = this.timeInEvents.find(event => {
         return event.date === date
     })
     let outTime = this.timeOutEvents.find(event => {
         return event.date === date
     })
     return (outTime.hour - inTime.hour) / 100
 }

 function wagesEarnedOnDate(date) {
     let wage = hoursWorkedOnDate.call(this, date) * this.payPerHour
     return parseFloat(wage.toString())
 }

 function findEmployeeByFirstName(srcArray, firstName) {
     return srcArray.find(rec => {
         return rec.firstName === firstName
     })
 }

 function calculatePayroll(arrayOfEmployeeRecords) {
     return arrayOfEmployeeRecords.reduce((memo, rec) =>{
         return memo + allWagesFor.call(rec)
     }, 0)
 }


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