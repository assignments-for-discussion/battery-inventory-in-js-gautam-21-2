const { RATED_CAPACITY, HEALTH_STATUS } = require('../constants/battery.constants');
const { isValidNumber } = require('../utils/validation');

function calculateSoH(presentCapacity) {
  if (presentCapacity < 0) return null;

  const soh = (presentCapacity / RATED_CAPACITY) * 100;
  return Math.min(Math.max(soh, 0), 100);
}

function classifyBattery(soh) {
  if (soh === null) return null;

  if (soh > 83 && soh <= 100) return HEALTH_STATUS.HEALTHY;
  if (soh >= 63 && soh <= 83) return HEALTH_STATUS.EXCHANGE;
  return HEALTH_STATUS.FAILED;
}

function countBatteriesByHealth(presentCapacities) {
  const counts = {
    healthy: 0,
    exchange: 0,
    failed: 0
  };

  for (const capacity of presentCapacities) {
    if (!isValidNumber(capacity)) continue;

    const soh = calculateSoH(capacity);
    const category = classifyBattery(soh);

    if (category) counts[category]++;
  }

  return counts;
}

module.exports = {
  countBatteriesByHealth
};