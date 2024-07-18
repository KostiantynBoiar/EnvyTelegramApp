import EnvySnakeImage from "../assets/EnvySnake.png"

function Score({userScore}) {
    
    return(
        <div className="snake">
            <h1>{userScore}</h1>
            <div className="snake-img"><img src={EnvySnakeImage}/></div>
        </div>
    );
}
  
  export default Score;