import './App.css';
import {useState, useEffect} from "react"
import MainPage from './Pages/MainPage';


function App() {

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
            // Alternatively to what can be set with react-telegram-web-app, you can directly set the following properties:
      try {
        window.Telegram.WebApp.requestWriteAccess()
      } catch (e) {
        console.log(e)
      }
      window.Telegram.WebApp.expand()
      console.log('expand')

    }
  }, [])

  return (
    <MainPage></MainPage>
  );
}

export default App;
