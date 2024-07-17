import './results.css'
import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import Cont from '../../assets/Election.json'

function Results() {

  const [mla, setMla] = useState({jsp: '', tdp: '', ycp: '', bjp: '', cng: '', nota: ''});
  const [mp, setMp] = useState({jsp: '', tdp: '', ycp: '', bjp: '', cng: '', nota: ''});
  const [contrr, setcontrr] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(Cont.abi, process.env.REACT_APP_CONT_ADD);
      setcontrr(contract);
    } else {
      alert('Metamask not detected, please install');
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  const getDetails = async () => {
    if (contrr) {
      const mlaResults = await contrr.methods.getMla().call();
      setMla({
        jsp: Number(mlaResults.jsp),
        tdp: Number(mlaResults.tdp),
        ycp: Number(mlaResults.ycp),
        bjp: Number(mlaResults.bjp),
        cng: Number(mlaResults.cng),
        nota: Number(mlaResults.nota)
      });
      const mpResults = await contrr.methods.getMp().call();
      setMp({
        jsp: Number(mpResults.jsp),
        tdp: Number(mpResults.tdp),
        ycp: Number(mpResults.ycp),
        bjp: Number(mpResults.bjp),
        cng: Number(mpResults.cng),
        nota: Number(mpResults.nota)
      });
    }
  };

  useEffect(() => {
    if (contrr) {
      getDetails();
    }
  },[contrr]);

  return (
    <div className='results'>
      <div>
       <center>
       <h1>MLA Results</h1>
        <p>JSP: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mla.jsp}</p>
        <p>TDP: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mla.tdp}</p>
        <p>YCP: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mla.ycp}</p>
        <p>BJP: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mla.bjp}</p>
        <p>CNG: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mla.cng}</p>
        <p>NOTA: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mla.nota}</p>
       </center>
      </div>
      <div>
        <center>
        <h1>MP Results</h1>
        <p>JSP: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mp.jsp}</p>
        <p>TDP: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mp.tdp}</p>
        <p>YCP: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mp.ycp}</p>
        <p>BJP: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mp.bjp}</p>
        <p>CNG: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mp.cng}</p>
        <p>NOTA: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mp.nota}</p>
        </center>
      </div>      
    </div>
  )
}

export default Results;
