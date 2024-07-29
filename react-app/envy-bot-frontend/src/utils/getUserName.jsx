let tg = window.Telegram.WebApp;

function getUserName(){
    return tg.initDataUnsafe.user.username;
}

