var moment = require('moment');

var date = moment();

date.add(101, 'years').subtract(0, 'months');
console.log(date.format('MMM Do YYYY'));

var createdAt = 1234;
var date2 = moment(createdAt);

var timeStamp = moment().valueOf();

console.log(date2.format('h:mm a'));