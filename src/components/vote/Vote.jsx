import React, { useEffect, useState } from 'react'
import './vote.css'
import { useLocation, useNavigate } from 'react-router-dom'
import Web3 from 'web3'
import Cont from '../../assets/Election.json'

function Vote() {

  const location = useLocation()
  const navigate = useNavigate()
  const pos = location.state
  const [voted, setVoted] = useState(false)
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

  async function handleVote(par){
    if(pos === 'mla'){
      if(window.confirm('Are you sure you want to vote for '+par)){
        await contrr.methods.mlaVote(par).send({from : acc})
        alert('Successfully voted for '+par)
        navigate('/end')
        setVoted(true)
      }else{
        setVoted(false)
        return
      }
    }else if(pos == 'mp'){
      if(window.confirm('Are you sure you want to vote for '+par)){
        await contrr.methods.mpVote(par).send({from : acc})
        alert('Successfully voted for '+par)
        navigate('/end')
        setVoted(true)
      }else{
        setVoted(false)
        return
      }
    }else{
      alert('Unotherized gateway: Permission denied')
      navigate('/home')
    }
  }

  return (
    <div className='vote'>
      <center><h1>Candidates list</h1></center>
      <div className="ballet">
        <div className='holder'>
            <p>1</p>
            <p>Jena Sena Party</p>
            <p>Konidhala Pavan Kalyan</p>
            <p>Glass</p>
            <button onClick={() => {handleVote('jsp')}} disabled={voted}>VOTE</button>
        </div>
        <div className='holder'>
            <p>2</p>
            <p>Telugu Desam Party</p>
            <p>Nara Chandrababu Naidu</p>
            <p>Cycle</p>
            <button onClick={() => {handleVote('tdp')}} disabled={voted}>VOTE</button>
        </div>
        <div className='holder'>
            <p>3</p>
            <p>Yuvajana Shramika<br />Raitu Congress Party</p>
            <p>Y.S Jagan Moham Reddy</p>
            <p>Fan</p>
            <button onClick={() => {handleVote('ycp')}} disabled={voted}>VOTE</button>
        </div>
        <div className='holder'>
            <p>4</p>
            <p>Bharathiya Janatha<br />Party</p>
            <p>Daggupati Purandheswari</p>
            <p>Lotus</p>
            <button onClick={() => {handleVote('bjp')}} disabled={voted}>VOTE</button>
        </div>
        <div className='holder'>
            <p>5</p>
            <p>Indian Nathional Congress</p>
            <p>Y.S Sharmila Reddy</p>
            <p>Hand</p>
            <button onClick={() => {handleVote('cng')}} disabled={voted}>VOTE</button>
        </div>
        <div className='holder'>
            <p>6</p>
            <p>None of the above</p>
            <p>------</p>
            <p>NOTA</p>
            <button onClick={() => {handleVote('nota')}} disabled={voted}>VOTE</button>
        </div>
      </div>
    </div>
  )
}

export default Vote
