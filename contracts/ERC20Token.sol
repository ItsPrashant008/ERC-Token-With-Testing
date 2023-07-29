// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20 {
    address public owner;
    constructor() ERC20("Token Name", "Token Symbol") {
        owner = msg.sender;
        _mint(msg.sender, 1000 * 10**18);
    }

    modifier onlyOwner(){
        require(owner == msg.sender,"Only Owner can do this action!");
        _;
    }

    function mint(address to, uint amount) public {
        _mint(to, amount * 10**18);
    }

     function transferOwnership(address newOwner) public  onlyOwner {
        owner = newOwner;
    }

    
}