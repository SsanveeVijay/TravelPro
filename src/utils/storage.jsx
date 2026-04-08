const KEY = 'travelProTrips';

export const getTrips = () =>
  JSON.parse(localStorage.getItem(KEY) || '[]');

export const saveTrips = (trips) =>
  localStorage.setItem(KEY, JSON.stringify(trips));