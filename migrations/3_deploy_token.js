const token = artifacts.require('ERC20Token')

module.exports = function(deployer){
    deployer.deploy(token, 1000, "SAuthToken", 8, "SAT");
}