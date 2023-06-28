let useAPI = true; // Default value

// Function to fetch data from the API
export async function fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  
  // Function to retrieve data based on the route
  export async function getUserData(id, route) {
    let data;

    const url = `http://localhost:3000`;

    switch (route) {
      case '/user/:id':
        if (useAPI) {
          data = await fetchData(`${url}/user/${id}`);
        } else {
          data = require('./assets/data/database_mock.json').USER_MAIN_DATA.find(
            (user) => user.id === Number(id)
          );
        }
        break;
      case '/user/:id/activity':
        if (useAPI) {
          data = await fetchData(`${url}/user/${id}/activity`);
        } else {
          data = require('./assets/data/database_mock.json').USER_ACTIVITY.find(
            (user) => user.userId === Number(id)
          );
        }
        break;
      case '/user/:id/average-sessions':
        if (useAPI) {
          data = await fetchData(`${url}/user/${id}/average-sessions`);
        } else {
          data = require('./assets/data/database_mock.json').USER_AVERAGE_SESSIONS.find(
            (user) => user.userId === Number(id)
          );
        }
        break;
      case '/user/:id/performance':
        if (useAPI) {
          data = await fetchData(`${url}/user/${id}/performance`);
        } else {
          data = require('./assets/data/database_mock.json').USER_PERFORMANCE.find(
            (user) => user.userId === Number(id)
          );
        }
        break;
      default:
        console.error('Invalid route:', route);
        throw new Error('Invalid route');
    }
  
    console.log(data); // Log the retrieved data
  
    return data;
  }  