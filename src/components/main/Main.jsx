import React, { useEffect, useState } from 'react'
import './main.css'
import { useNavigate } from 'react-router-dom'
import Web3 from 'web3'
import Cont from '../../assets/Election.json'

function Main() {

  const navigate = useNavigate();
  const [web3, setweb3] = useState();
  const [contrr, setcontrr] = useState('')
  const [acc, setacc] = useState('')

  const connectWallet = async ()=>{
    if(window.ethereum){
      await window.ethereum.request({method:"eth_requestAccounts"})
      const web3 = new Web3(window.ethereum);
      setweb3(web3);
      const acc = await web3.eth.getAccounts();
      setacc(acc[0])
      const contract = new web3.eth.Contract(Cont.abi,'0xd8b24dcb832363A75fb53126884d15ab560EBDB6');
      console.log(contract)
      setcontrr(contract)
    }else{
      alert('metamask not detected please install')
    }
  }
  
  useEffect(()=>{
  connectWallet()
  },[]);

  return (
    <div className='main'>
      <div className="navbar">
        <ul>
          <li><a href="/vote">Vote</a></li>
          <li><a href="">Results</a></li>
          <li><a href="/candidate">Candidate</a></li>
          <li><a href="">Profile</a></li>
        </ul>
      </div>
      <div className="container">
        <h1>&nbsp;&nbsp;Member of Legeslative Assembly</h1>
        <div className="holder">
          <h3>Andhra Pradesh</h3>
          <p>General Elections</p>
          <p>13-06-2024 </p>
          <p>5:00AM to 8:00PM</p>
          <center onClick={() => {navigate('/vote')}}><button>Vote now</button></center>
        </div>
        <center><hr /></center>
      </div>
    </div>
  )
}

export default Main
