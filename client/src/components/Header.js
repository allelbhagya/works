import { useEffect,useContext } from "react";
import {Link} from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header(){
    const {setUserInfo, userInfo} = useContext(UserContext);
    useEffect(()=>{
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response =>{
            response.json().then(userInfo=>{
                setUserInfo(userInfo);
            })
        })
    },[])

    function logout(){
        fetch("http://localhost:4000/logout", {
            credentials:'include',
            method: 'POST',
        })
        setUserInfo(null);
    }
    const username = userInfo?.username;

    return (
        <header>
          <Link to="/" className="logo">cobble logs</Link>
          <nav>
            {username && (
              <>
              <h2>Hi! {username}</h2>
                <Link to="/analysis" className="nav-button">Analysis</Link>
                <Link to="/create" className="nav-button">Create new log</Link>
                <Link onClick={logout} className="nav-button">Logout</Link>
              </>
            )}
            {!username && (
              <>
                <Link to="/analysis" className="nav-button">Analysis</Link>
                <Link to="/login" className="nav-button">Login</Link>
                <Link to="/register" className="nav-button">Register</Link>
              </>
            )}
          </nav>
        </header>
      );
}