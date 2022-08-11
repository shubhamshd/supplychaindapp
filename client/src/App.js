import React, { useEffect, useRef, useState } from "react";
import getWeb3 from './web3.js';
import './App.css';import './App.css';
import contractJson from './contractAbi.json'
import Participant from "./Participant.js";
import Product from "./Product.js";

function App() {
  const [rowsData, setRowsData] = useState([]);
  const [product, setProduct] = useState({});
  const [participant, setParticipant] = useState({});
  const [account, setAccount] = useState('');
  const [web3, setWeb3] = useState();
  const [supplyChain, setSupplychain] = useState();
  const firstMount = useRef(true);

  useEffect(() => {
    const initWeb3 = async() => {
      await getWeb3().then((result) => {
        let web3Instance = result;
        setWeb3(web3Instance);
        firstMount.current = false;
      }); 
    }
    initWeb3();
  }, []);

  useEffect(() => {
    if(!firstMount.current){
      const initContract = async() => {
        const networkId = await web3.eth.net.getId();
        const networkData = contractJson.networks[networkId];
        let supplyChainInstance = new web3.eth.Contract(contractJson.abi, networkData.address);
        setSupplychain(supplyChainInstance);
      }
      initContract();
    }
  }, [web3]);

  useEffect(() => {
    if(!firstMount.current){
      const initAccount = async() => {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      }
      initAccount();
    }
  }, [supplyChain]);

  useEffect(() => {
    if(!firstMount.current){
      getProduct();
      console.log('calling getProduct');
    }
  }, [account]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setProduct(values => ({...values, [name]: value}))
  }

  const addProduct = async(event) => {
    event.preventDefault();

    await supplyChain.methods.addProduct(product._ownerId, product._modelNumber, product._partNumber, product._serialNumber, product._productCost)
    .send({ from : account }, (err, transactionHash) => {
      console.log(err, transactionHash);
    });
    getProduct();
    console.log('calling getProduct from addProduct');
  }

  const getProduct = async() => {
    var productCount;

    await supplyChain.methods.product_id()
    .call(function(err, res){
      productCount = res;
    }); 

    setRowsData([]);
    console.log(rowsData);  

    for (var i = 0; i < productCount; i++) {
      let product_id = i;
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
        console.log(newRow);
        setRowsData(oldData => [...oldData, newRow]);
      });
    }
  }

  const handleParticipantChange = (event) => {
    const {name, value} = event.target;
    setParticipant(values => ({...values, [name]: value}))
  }

  const addParticipant = async(event) => {
    event.preventDefault();

    supplyChain.methods.addParticipant(participant._name, participant._pass, participant._pAdd, participant._pType)
    .send({ from : account }, (err, transactionHash) => {
      console.log(err, transactionHash);
    });
  }

  const getParticipant = async (event) => {
    event.preventDefault();

    supplyChain.methods.getParticipant(participant._userId)
    .call({ from : account }, (err, transactionHash) => {
      setParticipant(values => ({...values, _name: transactionHash[0], _pAdd: transactionHash[1], _pType: transactionHash[2]}))
    })
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <h1> Welcome to Supply Chain DApp </h1>
      </header> */}
      <Participant
        participant={participant}
        handleParticipantChange={handleParticipantChange}
        getParticipant={getParticipant}
        addParticipant={addParticipant}
      />
      <hr/>
      <Product
        product={product}
        rowsData={rowsData} 
        handleChange={handleChange} 
        addProduct={addProduct}
      />
    </div>
  );
}

export default App;
