import React, { useEffect, useRef, useState } from "react";
import getWeb3 from '../helper/web3.js';
import '../styles/App.css';
import contractJson from '../helper/contractAbi.json'
import GetParticipant from "./GetParticipant"
import AddParticipant from "./AddParticipant"
import Products from "./Products.js";
import ChangeProductOwnership from "./ChangeProductOwnership";
import AddProduct from "./AddProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyNavbar from "./Navbar.js";
import Home from "../pages/Home.js";
import About from "../pages/About"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



function App() {
  const [rowsData, setRowsData] = useState([]);
  const [product, setProduct] = useState({});
  const [participant, setParticipant] = useState({});
  const [account, setAccount] = useState('');
  const [owner, setOwner] = useState(false);
  const [supplyChain, setSupplychain] = useState();
  const [provenance, setProvenance] = useState([]);
  const isConnected = useRef(false);
  const [showPopUp, setShowPopUp] = useState(false)

  useEffect(() => {
    const initWeb3 = async() => {
      let web3;
      await getWeb3().then((result) => {
        web3 = result;
      }); 
      try{
        const networkId = await web3.eth.net.getId();
        const networkData = contractJson.networks[networkId];
        let supplyChainInstance = new web3.eth.Contract(contractJson.abi, networkData.address);
        setSupplychain(supplyChainInstance);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      }
      catch(e){
        console.log(e, 'Error in instantiating Contract Instance/getting account')
      }
    }
    if(isConnected.current){
      initWeb3(); 
    }
  }, []);

  //triggered when user changes current account in the wallet
  if(window.ethereum){
    window.ethereum.on('accountsChanged', function (accounts) {
      console.log('accountsChanged', accounts);
      const initAccount = async() => {
        let web3;
        await getWeb3().then((result) => {
          web3 = result;
        }); 
        try{
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);
        }
        catch(e){
          console.log(e, 'exception in getting account')
        }
      }
      initAccount();
    })
  }

  //called when connect button is clicked
  const connectWallet = async(event) => {
    event.preventDefault();
    console.log('inside connect function')
    let web3;
    await getWeb3().then((result) => {
      web3 = result;
    }); 

    try{
      const networkId = await web3.eth.net.getId();
      const networkData = contractJson.networks[networkId];
      let supplyChainInstance = new web3.eth.Contract(contractJson.abi, networkData.address);
      setSupplychain(supplyChainInstance);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      isConnected.current = true;
    }
    catch(e){
      console.log(e,'Error in instantiating Contract Instance/getting account')
    }
  }
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setProduct(values => ({...values, [name]: value}))
  }

  const addProduct = async(event) => {
    event.preventDefault();

    try{
      await supplyChain.methods.addProduct(product._ownerId, product._modelNumber, product._partNumber, product._serialNumber, product._productCost)
      .send({ from : account }, (err, transactionHash) => {
        console.log(err, transactionHash);
      });
      setShowPopUp(true);
    }
    catch(e){
      console.log(e, 'add product exception')
    }
    getProduct();
    console.log('calling getProduct from addProduct');
  }

  const getProduct = async() => {
    var productCount;

    try{
      await supplyChain.methods.product_id()
      .call(function(err, res){
        productCount = res;
      }); 
    }
    catch(e){
      console.log(e, 'get product count exception')
    }

    setRowsData([]);

    for (var i = 0; i < productCount; i++) {
      let product_id = i;
      try{
        await supplyChain.methods.products(i)
        .call(function(err, product){
          const newRow = {
            product_id: product_id,
            modelNumber: product[0],
            partNumber: product[1],
            serialNumber: product[2],
            productOwner: product[3],
            cost: product[4],
            mfgTimeStamp: product[5],
          };
          // console.log(newRow);
          setRowsData(oldData => [...oldData, newRow]);
        });
      }
      catch(e){
        console.log(e, 'set product array exception')
      }
    }
  }

  const handleParticipantChange = (event) => {
    const {name, value} = event.target;
    setParticipant(values => ({...values, [name]: value}))
  }

  const addParticipant = async(event) => {
    event.preventDefault();
    try{
      await supplyChain.methods.addParticipant(participant._name, participant._pass, participant._pAdd, participant._pType)
      .send({ from : account }, (err, transactionHash) => {
        console.log(err, transactionHash);
      });
      setShowPopUp(true);
    }
    catch(e){
      console.log(e, 'add participant exception')
    }
    
  }

  const getParticipant = async (event) => {
    event.preventDefault();
    try{
      await supplyChain.methods.getParticipant(participant._userId)
      .call({ from : account }, (err, transactionHash) => {
        setParticipant(values => ({...values, _name: transactionHash[0], _pAdd: transactionHash[1], _pType: transactionHash[2]}))
      })
    }
    catch(e){
      console.log(e, 'get participant exception')
    }
    
  }

  const handleOwnerChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setOwner(values => ({...values, [name]: value}))
}
  const changeOwnership = async (event) => {
      event.preventDefault();
      console.log(account);
      try{
        await supplyChain.methods.newOwner(owner._user1Id, owner._user2Id, owner._prodId)
        .send({ from : account }, (err, transactionHash) => {
            console.log(err, transactionHash);
        });
        setShowPopUp(true);
      }
      catch(e){
        console.log(e, 'change ownership exception')
      }
      
  }

  const getOwnerships = async(ownership_Id) => {
    try{
      await supplyChain.methods.getOwnership(ownership_Id)
      .call({ from : account }, (err, res) => {
        console.log(err, res);
        setProvenance(oldData => [...oldData, res]);
      })
    }
    catch(e){
      console.log(e, 'get ownership exception')
    }
    
  }

  const getProvenance = async(e) => {
    e.preventDefault();
    setProvenance([]);
    try{
      await supplyChain.methods.getProvenance(e.target.value)
      .call((err, result) => {
        console.log(err, result);
        let upperLimit = result.length
        for(var i=0; i<upperLimit; i++){
          let ownership_Id = parseInt(result[i]);
          getOwnerships(ownership_Id);
        }
      });
    }
    catch(e){
      console.log(e, 'get provenance exception')
    }
    
  }
  const setPopupVisibility = () => {
    setShowPopUp(!showPopUp);
  }

  return (
    <div className="App">

      <Popup
        open={showPopUp} 
        timeout={100}
        position="right center"
        closeOnDocumentClick
      >
        <span className="close" onClick={setPopupVisibility}>&times;</span>
        <span> Wow!!!
          <br></br>
          Transaction successful on the Polygon Network.
        </span>
      </Popup>
      <Router basename="/">
        <MyNavbar 
          isConnected={isConnected}
          connectWallet={connectWallet}
        />
        <hr />
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/getParticipant'  element={
            <GetParticipant  
              participant={participant}
              handleParticipantChange={handleParticipantChange}
              getParticipant={getParticipant}
            />
          }></Route>
          <Route path='/addParticipant'  element={
            <AddParticipant  
              participant={participant}
              handleParticipantChange={handleParticipantChange}
              addParticipant={addParticipant}
            />
          }></Route>
          <Route path='/products' element={
            <Products
              rowsData={rowsData} 
              getProduct={getProduct}
              provenance={provenance}
              getProvenance={getProvenance}
            />
          }></Route>
          <Route path='/changeProductOwnership' element={
            <ChangeProductOwnership
              owner={owner}
              handleOwnerChange={handleOwnerChange}
              changeOwnership={changeOwnership}
            />
          }></Route>
          <Route path='/addProduct' element={
            <AddProduct
              product={product}
              handleChange={handleChange} 
              addProduct={addProduct}
            />
          }></Route>
          <Route path='/about'  element={<About />}></Route>
          {/* <Route path='/popup'  element={<PopUp />}></Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
