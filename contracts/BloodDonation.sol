pragma solidity ^0.5.0;

contract BloodDonation {
    uint public BloodCount=0;

    struct Donation{
        uint id;
        string quantity;
        string person;
        string bloodType;
        string dateTime;
    }

    constructor() public {


    }

    mapping(uint => Donation) public donations;

    function createDonation(string memory _quantity,string memory _person,string memory _bloodType,string memory _dateTime) public {
        BloodCount ++;
        donations[BloodCount] = Donation(BloodCount, _quantity, _person,_bloodType,_dateTime);
    }


}
