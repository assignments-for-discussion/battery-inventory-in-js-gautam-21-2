function validateArray(input) {
  if (!Array.isArray(input)) {
    throw new Error('Input must be an array');
  }
}

function isValidNumber(value) {
  return typeof value === 'number' && !Number.isNaN(value);
}

module.exports = {
  validateArray,
  isValidNumber
};