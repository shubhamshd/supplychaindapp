import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
const Navtest = ({connectWallet}) =>{
  return (
    <div>
        <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/about">About</Link>
        </li>
        <li>
            <Link to="/products">Products</Link>
        </li>
        <li>
            <Link to="/getParticipant">Get Participant</Link>
        </li>
        </ul>
        <Button className="pull-right" onClick={event => connectWallet(event)}>Connect Wallet??</Button>
    </div>
  );
}
export default Navtest;
