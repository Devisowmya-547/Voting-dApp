import React from 'react'
import './home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className='home'>
      <center>
        <h1>Secure Vote</h1>
        <p> Your gate way to Secure and Transparent voting</p>
        <button onClick={() => {navigate('/login')}}>Cast the Vote</button>
      </center>
    </div>
  )
}

export default Home
