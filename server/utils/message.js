var moment = require('moment');

var generateMessage = (from, text) => {
  return {
      from,
      text,
      createdAt: new moment().valueOf()
  }
};

var generateLocationMessage = (from, lat, ln) => {
    return {
        from,
        url:`https://www.google.com/maps?q=${lat},${ln}`,
        createdAt: new moment().valueOf()
    };
};
module.exports ={generateMessage, generateLocationMessage};