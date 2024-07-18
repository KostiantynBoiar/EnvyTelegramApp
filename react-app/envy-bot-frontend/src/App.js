import './App.css';
import {useState, useEffect} from "react"
import MainPage from './Pages/MainPage';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FriendsPage from './Pages/FriendsPage';
import TasksPage from './Pages/TasksPage';

function App() {

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
            // Alternatively to what can be set with react-telegram-web-app, you can directly set the following properties:
      window.Telegram.WebApp.expand()
      console.log('expand')
      console.log(window.Telegram.WebApp.viewportHeight)

    }
  }, [])

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="referals" element={<FriendsPage />} />
        <Route path="tasks" element={<TasksPage />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
