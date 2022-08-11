const SupplyChain = artifacts.require('supplyChain')

module.exports = function(deployer){
    deployer.deploy(SupplyChain);
}