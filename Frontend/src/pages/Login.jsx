import axios from 'axios';
import React,{useContext, useState} from 'react'
import {Link, Navigate} from 'react-router-dom';
import { server,Context } from '../main';
import { toast } from 'react-hot-toast';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated,setIsAuthenticated,setUser,loading, setLoading}=useContext(Context);
  const submitHandler = async(e)=>{
    setLoading(true);
    e.preventDefault();
    try{
    const {data}= await axios.post(`${server}/user/login`,{
      email,password
    },{
      headers:{
        "Content-Type":"application/json",
      },
      withCredentials:true,
    })
    setIsAuthenticated(true);
    console.log(data);
    setUser(data);
    toast.success(data.message);
    setLoading(false);
  }catch{
    setIsAuthenticated(false);
    toast.error(error.response.data.message);
      setLoading(false);
  }
  }
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button disabled={loading} type="submit">
            Login
          </button>
          <h4>Or</h4>
          <Link to="/register">Sign Up</Link>
        </form>
      </section>
      {
        isAuthenticated===true?(<Navigate to="/" />):(<Navigate to="/login"/>)
      }
    </div>
  )
}

export default Login;