import React, { useState, useEffect } from 'react'
import { FaMapLocationDot } from "react-icons/fa6"
import { GiQueenCrown } from "react-icons/gi"
import { FaCalendarAlt } from "react-icons/fa"
import { GoPersonFill } from "react-icons/go"
import { GiGriffinSymbol } from "react-icons/gi"
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import './candidate.css'
import Web3 from 'web3'
import Cont from '../../assets/Election.json'
import { useNavigate } from 'react-router-dom'


function Candidate() {

  const[location, setLocation] = useState('');
  const[position, setPosition] = useState('');
  const[date, setDate] = useState('');
  const[partyName, setPartyName] = useState('');
  const[symbol, setSymbol] = useState('');
  const[name, setName] = useState('');
  const [web3, setweb3] = useState();
  const [contrr, setcontrr] = useState('')
  const [acc, setacc] = useState('')
  const navigate = useNavigate()

  const connectWallet = async ()=>{
    if(window.ethereum){
      await window.ethereum.request({method:"eth_requestAccounts"})
      const web3 = new Web3(window.ethereum);
      setweb3(web3);
      const acc = await web3.eth.getAccounts();
      setacc(acc[0])
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
    await contrr.methods.addParty(name, symbol, partyName, location, position).send({from: acc})
    navigate('/home')
  }

  return (
    <div className='candidate'>
      <form onSubmit={handleSubmit}>
      <center>
        <div>
            <div>
                <label htmlFor="location"><FaMapLocationDot /></label>
                <input type="text" value={location} onChange={(e) => {setLocation(e.target.value)}} required placeholder='State/Union territory' id="location" />
            </div>
            <div>
                <label htmlFor="position"><GiQueenCrown /></label>
                <input type="text" id="position" value={position} required  onChange={(e)=>setPosition(e.target.value)} placeholder='Position'/>
            </div>
            <div>
                <label htmlFor="date"><FaCalendarAlt /></label>
                <input type={'date'} value={date} onChange={(e) => {setDate(e.target.value)}} placeholder='Date' required id='date'/>
            </div>
        </div>
        <div>            
            <div>   
                <label htmlFor="name"><GoPersonFill /></label>
                <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} placeholder='Candidate Name' required id='name'/>
            </div>
            <div>   
                <label htmlFor="symbol"><GiGriffinSymbol /></label>
                <input type="text" value={symbol} onChange={(e) => {setSymbol(e.target.value)}} placeholder='Symbol' required id='symbol'/>
            </div>
            <div>
                <label htmlFor="partyName"><MdOutlineDriveFileRenameOutline /></label>
                <input type={'text'} value={partyName} onChange={(e) => {setPartyName(e.target.value)}} placeholder='Party Name' required id='partyName'/>
            </div>
        </div>
        </center>
        <center><button>Submit</button></center>
      </form>
    </div>
  )
}

export default Candidate
