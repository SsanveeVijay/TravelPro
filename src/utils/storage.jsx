const KEY = 'travelProTrips';

export const getTrips = () => {
  try {
    const data = localStorage.getItem('travelProTrips');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveTrips = (trips) =>
  localStorage.setItem(KEY, JSON.stringify(trips));