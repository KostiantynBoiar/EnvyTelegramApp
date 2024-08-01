const getUserId = async (username) => {
  try {
    const response = await fetch(`https://envytelegramapp.onrender.com/api/v1/users/name/${username}`, {
      method: "GET"
    });
    const data = await response.json();
    if (typeof data === 'number') {
      return data; // Ensure the response is an integer
    }
    throw new Error("Invalid user ID format");
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getUserId;
