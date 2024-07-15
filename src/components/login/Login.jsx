import React, { useState, useEffect } from 'react'
import './login.css'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { GoPersonFill } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3'
import Cont from '../../assets/Election.json'

function Login() {
  const[vid, setVid] = useState("")
  const[pass, setPass] = useState("")
  const [togglePass, setTogglePass] = useState(true)
  const navigate = useNavigate();
  // const [web3, setweb3] = useState();
  const [contrr, setcontrr] = useState('')
  // const [acc, setacc] = useState('')

  const connectWallet = async ()=>{
    if(window.ethereum){
      await window.ethereum.request({method:"eth_requestAccounts"})
      const web3 = new Web3(window.ethereum);
      // setweb3(web3);
      const acc = await web3.eth.getAccounts();
      // setacc(acc[0])
      const contract = new web3.eth.Contract(Cont.abi, process.env.REACT_APP_CONT_ADD);
      setcontrr(contract)
    }else{
      alert('metamask not detected please install')
    }
  }
  
  useEffect(()=>{
  connectWallet()
  },[]);

  async function handleSubmit(e){
    e.preventDefault();
    if(vid.length !== 10) {alert('Invalid Voter id'); return}
    if(pass.length < 8) {alert('Password must be atleast 8 characters'); return}
    const details = await contrr.methods.getVoterDetails(vid).call()
    if(details.password === "" ) {alert('No voter found'); return}
    if(details.password !== pass) {alert('Incorrect Password'); return}
    navigate('/home');
  }

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <center>
        <div>
            <label htmlFor="vid"><GoPersonFill /></label>
            <input type="text" value={vid} onChange={(e) => {setVid(e.target.value)}} placeholder='Voter ID' required id='vid'/>
        </div>
        <div>
            <label htmlFor="pass">{togglePass ? <IoMdEyeOff onClick={() => {setTogglePass(false)}}/> : <IoMdEye onClick={() => {setTogglePass(true)}}/>}</label>
            <input type={togglePass ? 'password' : 'text'} value={pass} onChange={(e) => {setPass(e.target.value)}} placeholder='Password' required id='pass'/>
        </div>
        <button>Submit</button>
        <p>Didn't regestered yet <a href="/register">Regester</a></p>
        </center>
      </form>
    </div>
  )
}

export default Login
