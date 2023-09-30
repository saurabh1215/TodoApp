import React, { useContext } from 'react'
import {Link} from 'react-router-dom';
import { server,Context } from '../main';
import {toast} from 'react-hot-toast';
import axios from 'axios';

const Header = () => {
  const {isAuthenticated,setIsAuthenticated,setUser,loading, setLoading} = useContext(Context);
  const logoutHandler = async(e)=>{
    try{
    await axios.get(`${server}/user/logout`,{
      withCredentials:true,
    });
    toast.success("logout successfully");
    setIsAuthenticated(false);
    setUser({});
    setLoading(false);
  }catch(error){
    toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
  }
}
  return (
    <nav className="header">
      <div>
        <h2>Todo App.</h2>
      </div>
      <article> 
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {
          isAuthenticated===true?(<button onClick={logoutHandler} disabled={loading} className='btn'>Logout</button>):(
          <Link to={"/login"}>Login</Link>)
        } 
      </article>
    </nav>
  )
}

export default Header