import './App.css';
import {useState, useEffect} from "react"
import Main from './Components/Main';


function App() {

  const tele = window.Telegram.WebApp;
  
  useEffect(() => {
    tele.ready();
  })

  return (
    <Main></Main>
  );
}

export default App;
