const { validateArray } = require('./utils/validation');
const { countBatteriesByHealth } = require('./services/battery.service');

function processBatteries(presentCapacities) {
  validateArray(presentCapacities);
  return countBatteriesByHealth(presentCapacities);
}

module.exports = {
  processBatteries
};