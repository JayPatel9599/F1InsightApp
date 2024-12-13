import axios from 'axios';

export const fetchSessions = async () => {
  try {
    const response = await axios.get('https://api.openf1.org/v1/sessions?year=2024');
    return response.data;
  } catch (error) {
    console.error('Error fetching sessions:', error.message);
    throw error;
  }
};

export const fetchDrivers = async () => {
  try {
    const response = await axios.get('https://api.openf1.org/v1/drivers?session_key=latest');
    return response.data;
  } catch (error) {
    console.error('Error fetching drivers:', error.message);
    throw error;
  }
};


export const fetchSessionDetails = async (session_key) => {
  try {
    const response = await axios.get(`${BASE_URL}meetings?session_key=${session_key}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching session details:', error.message);
    throw error;
  }
};

export const fetchRaceResults = async (session_key) => {
  try {
    const response = await axios.get(`https://api.openf1.org/v1/position?session_key=${session_key}&position<=3`);
    if (response.data && response.data.length > 0) {
      // duplicate entries based on driver_number
      const uniqueResults = [];
      const driverNumbers = new Set();
      for (const result of response.data) {
        if (!driverNumbers.has(result.driver_number)) {
          driverNumbers.add(result.driver_number);
          uniqueResults.push(result);
        }
        if (uniqueResults.length === 3) break; // Stop after 3 unique results
      }
      return uniqueResults;
    }
    return [];
  } catch (error) {
    console.error('Error fetching race results:', error.message);
    return [];
  }
};

export const fetchWeather = async (session_key) => {
  try {
    const response = await axios.get(`https://api.openf1.org/v1/weather?session_key=${session_key}`);
    if (response.data && response.data.length > 0) {
      const latestWeather = response.data[0]; // Assuming the latest is the first item in the array
      return latestWeather;
    }
    return null;
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    return null;
  }
};

export const fetchRaceControl = async (session_key) => {
  try {
    const response = await axios.get(
      `https://api.openf1.org/v1/race_control?session_key=${session_key}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching race control:', error.message);
    return [];
  }
};

export const fetchDriverPitDetails = async (driver_number) => {
  try {
    const response = await axios.get(`https://api.openf1.org/v1/pit?session_key=latest&driver_number=${driver_number}`);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching pit details:', error.message);
    return [];
  }
};

export const fetchMeetingDetails = async (meeting_key) => {
  try {
    const response = await axios.get(`https://api.openf1.org/v1/meetings?meeting_key=${meeting_key}`);
    return response.data[0] || null;
  } catch (error) {
    console.error('Error fetching meeting details:', error.message);
    return null;
  }
};

export const fetchDriverStints = async (driver_number) => {
  try {
    const response = await axios.get(`https://api.openf1.org/v1/stints?driver_number=${driver_number}&session_key=latest`);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching driver stints:', error.message);
    return [];
  }
};
