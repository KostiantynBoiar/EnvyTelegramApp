import React from "react";
import "../App.css"
import axios from 'axios';



function Main() {
    const sendMessage = async (message) => {
        const response = await axios.post('localhost:8000/webhook', { text: message });
        return response.data;
    };
    return(
        <div class = "container">
            <h1> Hello!</h1>
        </div>
    );
}

export default Main;