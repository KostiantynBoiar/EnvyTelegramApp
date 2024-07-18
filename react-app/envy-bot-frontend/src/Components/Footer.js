import home from "../assets/home.png"
import listCheck from "../assets/list-check.png"
import user from "../assets/user.png"
import ReactDOM from "react-dom/client";
import { Outlet, Link } from "react-router-dom";

function Footer() {
    
    return(
        <div className="footer">
            <div className="footer-img">
                <Link to="/"><img src={home}/></Link>
            </div>
            <div className="footer-img">
                <Link to="tasks"> <img src={listCheck}/></Link>
            </div>
            <div className="footer-img">
            <Link to="referals">
                <img src={user}/>
            </Link>
            </div>
        
        </div>
        
    );
}
  
  export default Footer;
  