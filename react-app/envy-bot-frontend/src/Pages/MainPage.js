import EnvyCoin from "../Components/EnvyCoin";
import Footer from "../Components/Footer"
import Score from "../Components/Score";
import Button from "../Components/Button";

function MainPage() {

  return(
    <div className="background-canvas">
      <div className='canvas'>
          <EnvyCoin/>
          <Score userScore={500}></Score>
          <Button buttonText={"Claim all!"}></Button>
          <Footer></Footer>
      </div>
    </div>
  );
}

export default MainPage;
