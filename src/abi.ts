import { parseAbi } from 'viem';
export const escrowAbi = parseAbi(['function evidence() view returns (bytes32 id, bytes32 artifactHash, address payee, uint256 amountWei, uint256 deadline, uint256 challengeSeconds, uint256 acceptedAt, bool disputed, bool released)']);
