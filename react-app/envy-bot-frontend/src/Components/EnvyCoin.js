import EnvyCoinImage from "../assets/EnvyCoin.png"

function EnvyCoin() {
    
    return(
        <div className="coin">
            <h1>ENVY</h1>
            <div className="coin-img"><img src={EnvyCoinImage}/></div>
        </div>
    );
}
  
  export default EnvyCoin;