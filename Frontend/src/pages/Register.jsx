import React,{useState,useContext} from 'react'
import {Link, Navigate} from 'react-router-dom';
import Axios from 'axios';
import {Context,server} from '../main';
import toast from 'react-hot-toast';
const Register = () => {
const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [navigate, setNavigate] = useState(false);
  const {loading, setLoading } = useContext(Context);
    const submitHandler = async(e)=>{
        setLoading(true);
        e.preventDefault(); // prevent default refresh of page
        // console.log(name,email,password);
        try{
    const {data} = await Axios.post(`${server}/user/register`,{
      name, email, password
    },{
      headers:{
        "Content-Type":"application/json"
      }, 
      withCredentials:true,
    })
    setNavigate(true);
    toast.success("Register successfully, Now login");
    setLoading(false);
    } catch(error){
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }
  return (
   <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            required
          />
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
          <button disabled={loading} type="submit">Sign Up</button>
          <h4>Or</h4>
          <Link to="/login">Log In</Link>
        </form>
      </section>
       { navigate===true?(<Navigate to={"/login"}/>):(<Navigate to={"/register"}/>)
       }
    </div>
  )
}

export default Register