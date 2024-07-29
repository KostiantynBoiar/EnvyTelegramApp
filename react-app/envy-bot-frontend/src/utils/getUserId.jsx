import { useEffect, useState } from 'react';

const getUserId = async (username) => {
  try {
    const response = await fetch(`https://envytelegramapp.onrender.com/api/v1/users/name/${username}`, {
      method: "GET"
    });
    const data = await response.json();
    return data; 
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getUserId;
