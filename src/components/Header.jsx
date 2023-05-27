import React from "react";
import "./Header.css";
import profile from "../images/profile.png"

const Header = () => {

  return (
    <div className="header">
        <div className="logo">
            USER-<span>API</span>
        </div>
        <div className="signin">
              <div className="card-bottom-1 card-header">
              <img src={profile} className="card-profile" alt="profile1" />
              <p>Sourabh Haldar</p>
             </div> 
        </div>
    </div>
  )
}

export default Header