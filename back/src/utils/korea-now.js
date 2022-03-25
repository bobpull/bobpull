module.exports = () => {
  let moment = require('moment');
  require('moment-timezone');
  moment.tz.setDefault("Asia/Seoul");
  
  return moment().format('YYYY-MM-DD');
}