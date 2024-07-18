import home from "../assets/home.png"
import listCheck from "../assets/list-check.png"
import user from "../assets/user.png"

function Footer() {
    
    return(
        <div className="footer">
            <div className="footer-img"><img src={home}/></div>
            <div className="footer-img"><img src={listCheck}/></div>
            <div className="footer-img"><img src={user}/></div>
        </div>
    );
}
  
  export default Footer;
  