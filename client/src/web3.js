import Web3 from 'web3';

const getWeb3 = async() => {
    if(window.ethereum){
        console.log('MetaMask detected!');
        return new Web3(window.ethereum);
    }
    else if (window.web3) {
        console.log('inside window.web3')
        return new Web3(window.web3.currentProvider);
        // Acccounts always exposed
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
}

export default getWeb3;