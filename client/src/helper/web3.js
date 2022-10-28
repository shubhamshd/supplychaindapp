import Web3 from 'web3';

const getWeb3 = async() => {
    if(window.ethereum){
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('MetaMask detected!');
            return new Web3(window.ethereum);
        } catch (e) {
            console.log('Error connecting to provider')
        }
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