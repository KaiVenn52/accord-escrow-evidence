# Accord — Escrow Evidence Desk

## One-line description

A CRE workflow that reconciles software-delivery evidence with escrow state and produces a reproducible, human-reviewed release recommendation.

## Problem and solution

Legal and finance teams often review different versions of the same milestone: an emailed artifact, a contractual commitment, a client's acceptance and a changing escrow state. A valid document hash alone cannot establish entitlement to payment.

Accord checks exact delivery bytes against the agreed commitment, reads the escrow's acceptance/dispute state and applies explicit challenge-period rules. Any discrepancy yields HOLD with reasons. Passing evidence yields REVIEW_READY with HUMAN_REQUIRED. The receipt binds the complete terms, observations, source level, policy version and evaluation time so another reviewer can reproduce the result.

## Chainlink CRE integration

An official CRE SDK workflow orchestrates an external delivery HTTP API and an EVM escrow read. Exact-text consensus protects document consistency; a finalized header pins the contract read to one block. Acceptance comes from the payer-controlled contract rather than the delivery API. CRE returns a review receipt and has no write or payment capability.

## Current demonstration scope

Responsive English operations desk with six synthetic scenarios and offline replay of actual execution evidence, shared deterministic policy, Solidity demonstration escrow and private EVM lifecycle checks. On October 24 MYT, official CRE CLI v1.38.0 successfully ran the real WASM workflow for matching delivery (REVIEW_READY) and altered delivery (HOLD), both exit 0. Receipt fingerprints were independently reproduced from the exact recorded chain blocks and API content. These runs used a private EVM and controlled local HTTP providers. Imported JSON is unsigned and historical; the raw CLI logs provide the execution record. No public deployment, registered entry or accepted submission is claimed.

## Final fields to fill after user review

Public repository URL, hosted demo URL if requested by the form, actual demo video URL, team identity, approved license, and successful CRE CLI evidence or deployed workflow reference. Confirm AI/existing-code policy and payout terms before submission.
