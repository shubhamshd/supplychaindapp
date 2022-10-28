import React from 'react';

const About = () =>{
  const mystyle = {
    width: "40%",
    margin: "auto"
  };
  return (
    <div>
      <br></br>
      <h2>About the Dapp</h2>
      <div>
        <br></br>
        <h5 style={mystyle}>Blockchain based dapp to track the provenance of the Product and help in reducing the counterfeiting with the help of ERC20 Token Standards.</h5> 
        {/* <div class="table-responsive col-md-6"> */}
          {/* <Table striped hover borderless responsive size="sm" variant="dark"> */}
          <br></br>
          <table style={mystyle} className="table table-striped">
            <thead>
              <tr>
                <th>Features</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tracking the history of the Product</td>
              </tr>
              <tr>
                <td>Only authorized participants allowed to update the product details while in transit</td>
              </tr>
              <tr>
                <td>Ability to get the latest status at any point of the product lifecycle</td>
              </tr>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        {/* </div> */}
        {/* <div class="table-responsive col-md-6"> */}
          {/* <Table striped hover borderless responsive size="sm" variant="dark"> */}
          <br></br>
          <table style={mystyle} className="table table-striped">
            <thead>
              <tr>
                <th>Tech Stack</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Backend : Solidity</td>
              </tr>
              <tr>
                <td>Frontend : ReactJs/CSS</td>
              </tr>
              <tr>
                <td>Blockchain Network : Polygon</td>
              </tr>
              <tr>
                <td>Tools : Truffle/Metamask</td>
              </tr>
            </tbody>
          </table>
        {/* </div> */}
      </div>
    </div>
  );
}
export default About;
