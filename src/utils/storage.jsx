// Key used to store data in browser localStorage
// Keeping it in a constant avoids repeating the string everywhere
const KEY = 'travelProTrips';

// Function to GET trips from localStorage
export const getTrips = () => {
  try {
    // localStorage stores data as string, we retrieve it using the key
    const data = localStorage.getItem('travelProTrips');

    // If data exists, convert string back to JavaScript object using JSON.parse
    // If not, return empty array (so app doesn't crash)
    return data ? JSON.parse(data) : [];

  } catch {
    // If parsing fails (corrupt data, etc.), return empty array safely
    return [];
  }
};

// Function to SAVE trips to localStorage
export const saveTrips = (trips) =>

  // localStorage only stores strings, convert object to string using JSON.stringify
  localStorage.setItem(KEY, JSON.stringify(trips));