import React from 'react';
import image from '../images/home-page.jpeg';
const Home = () =>{
  return (
    <div>
      <h3>Welcome to Supply Chain Management System</h3>
      <div>
        <img src={image}/>
      </div>
    </div>
  );
}
export default Home;
