import EnvyCoin from "../Components/EnvyCoin";
import Footer from "../Components/Footer"
import Score from "../Components/Score";

function MainPage() {

  return(
    <div className='canvas'>
        <EnvyCoin/>
        <Score userScore={500}></Score>
        <Footer></Footer>
    </div>
  );
}

export default MainPage;
