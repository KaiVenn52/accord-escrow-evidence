// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
/// @notice Demonstration ETH escrow. CRE only reads; the payer explicitly executes release.
contract EvidenceEscrow {
    address public immutable payer;
    address payable public immutable payee;
    bytes32 public immutable milestoneId;
    bytes32 public immutable artifactHash;
    uint256 public immutable amountWei;
    uint256 public immutable deadline;
    uint256 public immutable challengeSeconds;
    uint256 public acceptedAt;
    bool public disputed;
    bool public released;
    event Accepted(uint256 at);
    event DisputeOpened();
    event Released(address indexed beneficiary, uint256 amount);
    constructor(address payable recipient, bytes32 id, bytes32 commitment, uint256 due, uint256 challenge) payable {
        require(recipient != address(0) && msg.value > 0 && due > block.timestamp, 'Invalid terms');
        payer=msg.sender; payee=recipient; milestoneId=id; artifactHash=commitment; amountWei=msg.value;
        deadline=due; challengeSeconds=challenge;
    }
    modifier onlyPayer() { require(msg.sender == payer, 'Payer only'); _; }
    function accept() external onlyPayer { require(!released && !disputed && acceptedAt == 0 && block.timestamp <= deadline, 'Cannot accept'); acceptedAt=block.timestamp; emit Accepted(acceptedAt); }
    function openDispute() external onlyPayer { require(!released, 'Already released'); disputed=true; emit DisputeOpened(); }
    function release() external onlyPayer {
        require(!released && !disputed && acceptedAt > 0 && block.timestamp >= acceptedAt + challengeSeconds, 'Release blocked');
        released=true;
        (bool ok,) = payee.call{value:amountWei}(''); require(ok, 'Transfer failed');
        emit Released(payee,amountWei);
    }
    function evidence() external view returns(bytes32,bytes32,address,uint256,uint256,uint256,uint256,bool,bool) {
        return(milestoneId,artifactHash,payee,amountWei,deadline,challengeSeconds,acceptedAt,disputed,released);
    }
}
