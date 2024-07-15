import React from 'react'
import './vote.css'
import { useNavigate } from 'react-router-dom'

function Vote() {

  const navigate = useNavigate();

  return (
    <div className='vote'>
      <button onClick={() => {navigate(-1)}} id='bckbtn'>BACK</button>
      <center><h1>Candidates list</h1></center>
      <div className="ballet">
        <div className='holder'>
            <p>num</p>
            <p>Party name</p>
            <p>Candidate name</p>
            <p>sybmol</p>
            <button>VOTE</button>
        </div>
        <div className='holder'>
            <p>num</p>
            <p>Party name</p>
            <p>Candidate name</p>
            <p>sybmol</p>
            <button>VOTE</button>
        </div>
        <div className='holder'>
            <p>num</p>
            <p>Party name</p>
            <p>Candidate name</p>
            <p>sybmol</p>
            <button>VOTE</button>
        </div>
      </div>
    </div>
  )
}

export default Vote
