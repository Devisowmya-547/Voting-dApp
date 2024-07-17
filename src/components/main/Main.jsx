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
          <li><a href="/results">Results</a></li>
          <li><a href="/candidate">Candidate</a></li>
          <li><a href="/profile">Profile</a></li>
        </ul>
      </div>
      <center><h1>&nbsp;&nbsp;Andhra Pradesh</h1></center>
      <div className="container">
        <div className="holder">
          <table>
            <tr>
              <td>Position:</td>
              <td>MLA</td>
            </tr>
            <tr>
              <td>Election type:&nbsp;&nbsp;&nbsp;&nbsp;</td>
              <td>General elections</td>
            </tr>
            <tr>
              <td>Date:</td>
              <td>13-06-2024</td>
            </tr>
            <tr>
              <td>Time:</td>
              <td>5:00AM to 8:00PM</td>
            </tr>
          </table>
          <center onClick={() => {navigate('/vote', {state: 'mla'})}}><button>Vote now</button></center>
        </div>
        <div className="holder">
          <table>
            <tr>
              <td>Position:</td>
              <td>MP</td>
            </tr>
            <tr>
              <td>Election type:&nbsp;&nbsp;&nbsp;&nbsp;</td>
              <td>General elections</td>
            </tr>
            <tr>
              <td>Date:</td>
              <td>13-06-2024</td>
            </tr>
            <tr>
              <td>Time:</td>
              <td>5:00AM to 8:00PM</td>
            </tr>
          </table>
          <center onClick={() => {navigate('/vote', {state: 'mp'})}}><button>Vote now</button></center>
        </div>
      </div>
      <center><hr /></center>
    </div>
  )
}

export default Main
