export const calculateBudget = (trip) => {
  const totalSpent =
    trip.itinerary?.reduce((sum, item) => sum + (parseFloat(item.cost) || 0), 0) || 0;

  const budget = parseFloat(trip.budget) || 0;

  const remaining = budget - totalSpent;

  const percentage = budget
    ? Math.min((totalSpent / budget) * 100, 100)
    : 0;

  return { totalSpent, remaining, percentage };
};