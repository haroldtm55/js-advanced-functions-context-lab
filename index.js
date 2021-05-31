/* Your Code Here */
const createEmployeeRecord = function(array) {
  const keys = ['firstName','familyName', 'title', 'payPerHour']
  const employeeData = {}
  for (let i = 0; i <= array.length -1; i++) {
    employeeData[keys[i]] = array[i]
  }
  employeeData['timeInEvents'] = []
  employeeData['timeOutEvents'] = []
  return employeeData
}
function createEmployeeRecords(arrays) {
    let arrayOfArrays = []
    for (let i = 0; i<=arrays.length -1; i++) {
      arrayOfArrays = [...arrayOfArrays,createEmployeeRecord(arrays[i])]
    }
    return arrayOfArrays
}
const createTimeInEvent = function(timeIn) {
  const timeInObj = {}
  timeInObj['type'] = 'TimeIn'
  let date = ''
  let hour = ''
  for (let i = 0; i<=timeIn.length-1; i++) {
    if (i<=9) {
      date = date + timeIn.charAt(i)
    }
    else if (i>=11) {
      hour = hour + timeIn.charAt(i)
    }
  }
  timeInObj['date'] = date
  timeInObj['hour'] = parseInt(hour)
  let employeeRecordCopy = this
  this.timeInEvents.push(timeInObj)
  return employeeRecordCopy
}
const createTimeOutEvent = function(timeOut) {
  const timeOutObj = {}
  timeOutObj['type'] = 'TimeOut'
  let date = ''
  let hour = ''
  for (let i = 0; i<=timeOut.length-1; i++) {
    if (i<=9) {
      date = date + timeOut.charAt(i)
    }
    else if (i>=11) {
      hour = hour + timeOut.charAt(i)
    }
  }
  timeOutObj['date'] = date
  timeOutObj['hour'] = parseInt(hour)
  let employeeRecordCopy = this
  this.timeOutEvents.push(timeOutObj)
  return employeeRecordCopy
}
const hoursWorkedOnDate = function(date) {
  for (let i = 0; i < this.timeInEvents.length; i++) {
    if (this.timeInEvents[i].date === date) {
      return (this.timeOutEvents[i].hour - this.timeInEvents[i].hour) / 100
    }
  }
}
const wagesEarnedOnDate = function(date) {
  return hoursWorkedOnDate.call(this,date) * this.payPerHour
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


let findEmployeeByFirstName = function(employees,nameToLookUp) {
  return employees.find(employee=> employee.firstName === nameToLookUp)
}

let calculatePayroll = function(arrayOfemployeeRecords) {
  let grandTotalOwed = arrayOfemployeeRecords.reduce((acc,curr)=>acc+allWagesFor.call(curr),0)
  return grandTotalOwed
}