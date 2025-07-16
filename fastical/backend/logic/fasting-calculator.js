/**
 * Calculates the fast duration in hours based on the calories eaten and the user's TDEE.
 *
 * @param {number} caloriesEaten The number of calories consumed in the meal.
 * @param {number} tdee The user's Total Daily Energy Expenditure.
 * @returns {number} The calculated fast duration in hours.
 */
function calculateFastHours(caloriesEaten, tdee) {
  if (tdee <= 0) {
    throw new Error('TDEE must be a positive number.');
  }
  return 24 * (caloriesEaten / tdee);
}

module.exports = {
  calculateFastHours,
};
