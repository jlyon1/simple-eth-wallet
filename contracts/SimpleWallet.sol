pragma solidity ^0.4.4;

//This project was supposed to be a simple wallet, but is more like a bank.

contract SimpleWallet {
	mapping (address => uint256) public balanceOf;
	address owner = 0;

	function () payable{
		if(msg.value < 5000){revert();} // If the user sends less than .5 eth reject the value

		balanceOf[msg.sender] = balanceOf[msg.sender] + msg.value;
	}
	//Let the person pull out all of their eth
	function refund() returns (uint){
		if(balanceOf[msg.sender] > 0){
			msg.sender.transfer(balanceOf[msg.sender]);
			balanceOf[msg.sender] = 0;
		}else{
			revert();
			return 0;
		}
	}
	function withdrawl(uint256 value) returns (uint){
		if(balanceOf[msg.sender] >= value){
			msg.sender.transfer(balanceOf[msg.sender]);
			balanceOf[msg.sender] -= value;
		}else{
			revert();
		}
	}
	function setOwner() returns (uint){
		return 0;
	}

	function getBalance() returns (uint){
		return balanceOf[msg.sender];
	}

	function coolShit() returns (uint){
		return this.balance;
	}

	function getSenders() returns (uint){

	}
}
