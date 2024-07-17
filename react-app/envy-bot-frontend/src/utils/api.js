// src/api.js
import axios from 'axios';

const API_URL = 'localhost:8000'; // Replace with your actual backend URL

export const sendMessage = async (message) => {
    try {
        const response = await axios.post(`${API_URL}/webhook`, { text: message });
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};
