import React from 'react'
import './main.css'
import { useNavigate } from 'react-router-dom'

function Main() {

  const navigate = useNavigate();

  return (
    <div className='main'>
      <div className="navbar">
        <ul>
          <li><a href="/vote">Vote</a></li>
          <li><a href="/home">Results</a></li>
          <li><a href="/candidate">Candidate</a></li>
          <li><a href="/home">Profile</a></li>
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
