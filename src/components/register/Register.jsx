import React, { useState, useEffect } from 'react'
import './register.css'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { LiaAddressBook } from "react-icons/lia";
import { GoPersonFill } from "react-icons/go";
import { TbNumber18Small } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3'
import Cont from '../../assets/Election.json'

function Register() {
  const[vid, setVid] = useState("")
  const[ano, setAno] = useState("")
  const[pass, setPass] = useState("")
  const[cpass, setCpass] = useState("")
  const[name, setName] = useState("")
  const[age, setAge] = useState("")
  const [togglePass, setTogglePass] = useState(true)
  const [togglecPass, setTogglecPass] = useState(true)
  const navigate = useNavigate();
  // const [web3, setweb3] = useState();
  const [contrr, setcontrr] = useState('')
  const [acc, setacc] = useState('')

  const connectWallet = async ()=>{
    if(window.ethereum){
      await window.ethereum.request({method:"eth_requestAccounts"})
      const web3 = new Web3(window.ethereum);
      // setweb3(web3);
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
    if(pass  !== cpass) {alert('Passwords doesn\'t match'); return}
    if(pass.length < 8) {alert('Password must be atleast 8 characters'); return}
    if(age < 18) {alert('You\'re not eligible to vote'); return}
    if(ano.length !== 12) {alert('Invalid Aadhar number'); return}
    if(vid.length !== 10) {alert('Invalid Voter id'); return}

    try {
      await contrr.methods.addVoter(name, age, vid, ano, pass).send({from: acc})
    } catch (error) {
      console.log(error)
      alert('Unable to add a new Voter')
    }
    navigate('/login')
  }

  return (
    <div className='register'>
      <form onSubmit={handleSubmit}>
        <center>
        <div>
            <div>
                <label htmlFor="name"><GoPersonFill /></label>
                <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} required placeholder='Name' id="name" />
            </div>
            <div>
                <label htmlFor="age"><TbNumber18Small /></label>
                <input type="number" id="age" value={age} required  onChange={(e)=>setAge(e.target.value)} placeholder='Age'/>
            </div>
            <div>
                <label htmlFor="pass">{togglePass ? <IoMdEyeOff onClick={() => {setTogglePass(false)}}/> : <IoMdEye onClick={() => {setTogglePass(true)}}/>}</label>
                <input type={togglePass ? 'password' : 'text'} value={pass} onChange={(e) => {setPass(e.target.value)}} placeholder='Password' required id='pass'/>
            </div>
        </div>
        <div>            
            <div>   
                <label htmlFor="ano"><LiaAddressBook /></label>
                <input type="text" value={ano} onChange={(e) => {setAno(e.target.value)}} placeholder='Aadhar number' required id='ano' pattern='\d{12}'/>
            </div>
            <div>   
                <label htmlFor="vid"><LiaAddressBook /></label>
                <input type="text" value={vid} onChange={(e) => {setVid(e.target.value)}} placeholder='Voter ID' required id='vid'/>
            </div>
            <div>
                <label htmlFor="cpass">{togglecPass ? <IoMdEyeOff onClick={() => {setTogglecPass(false)}}/> : <IoMdEye onClick={() => {setTogglecPass(true)}}/>}</label>
                <input type={togglecPass ? 'password' : 'text'} value={cpass} onChange={(e) => {setCpass(e.target.value)}} placeholder='Confirm password' required id='cpass'/>
            </div>
        </div>
        </center>
        <center><button>Submit</button></center>
      </form>
    </div>
  )
}

export default Register
