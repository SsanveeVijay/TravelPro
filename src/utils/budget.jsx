// Function to calculate budget details for a trip
// This is a pure function → it does not modify input, only returns calculated values
export const calculateBudget = (trip) => {

  // Calculate total spent by summing all itinerary item costs
  // reduce() is used to accumulate values
  const totalSpent =
    trip.itinerary?.reduce(
      (sum, item) => sum + (parseFloat(item.cost) || 0), // convert cost to number
      0
    ) || 0;

  // Convert trip budget to number (in case it's stored as string)
  const budget = parseFloat(trip.budget) || 0;

  // Remaining money
  const remaining = budget - totalSpent;

  // Percentage of budget used
  // Math.min ensures it never exceeds 100%
  const percentage = budget
    ? Math.min((totalSpent / budget) * 100, 100)
    : 0;

  // Returning all calculated values as an object
  return { totalSpent, remaining, percentage };
};