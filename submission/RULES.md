# Official rules audit — refreshed 2026-10-28 (Asia/Kuala_Lumpur)

Oct 28 refresh: the current official bounty still lists two $1,000 winners and requires CRE orchestration, a blockchain plus an external source, and successful CLI simulation or live deployment. The event detail continues to say prize amounts are discretionary. The public event poster says youth-focused events are included, without defining a universal age limit. Public Build 50435 is now created after explicit Build terms confirmation; the event submission agreement remains unchecked. These facts supersede earlier no-terms/no-form observations below. No eligibility or winner designation is inferred from creation.

## Sources

- [DoraHacks overview](https://dorahacks.io/hackathon/legal-hack-2026)
- [DoraHacks detail](https://dorahacks.io/hackathon/legal-hack-2026/detail)
- [Chainlink bounty 1362](https://dorahacks.io/hackathon/bounty/1362)
- [BLI organizer](https://bli.tools/hackathon/)
- [Official Windows CLI installation](https://docs.chain.link/cre/getting-started/cli-installation/windows)
- [Official CRE TypeScript setup](https://docs.chain.link/cre/getting-started/part-1-project-setup-ts)

DoraHacks returned HTTP 405 through the web reader; the agent-reach Jina Reader route successfully retrieved official page contents. Captures live under `evidence/official-*.md`. A retrieved page is not registration evidence.

## Confirmed statements

| Question | Official observation | Consequence |
|---|---|---|
| Remote participation | Overview labels the event `Virtual` | Fits the remote-only requirement at event level |
| Subject | Legal, Finance, Compliance, AI, RWA, RegTech tags; BLI describes Legal and RegTech | Delivery escrow evidence is a LegalTech operations use case |
| Timeline | Oct 21 overview explicitly labels event timeline `(UTC)`, with submission start 2026/05/15 12:01 and deadline 2026/11/01 01:01 | Deadline is Nov 1, 2026 01:01 UTC = Nov 1, 2026 09:01 MYT |
| Internal deadline | Project planning decision | Have review package ready by 2026-10-31 MYT, preferably earlier |
| Judging | BLI page says Nov 5–Dec 5, awards Dec 12, 2026 | Schedule, not an eligibility guarantee |
| Total pool | Overview displays 20,000 USD; detail describes over 10,000 USD value including bounties, support and promotion | Do not call the aggregate guaranteed cash |
| Changes | Detail says prizes are discretionary and may change or be withdrawn | Eligibility and payment must be rechecked before final entry |
| CRE bounty | Two winners, $1,000 each, aggregate 2,000 USD VALUE | Payout currency/token, tax/KYC and transfer method are unconfirmed |
| Required implementation | CRE as orchestration, at least one blockchain and external API/system/data/LLM/agent | This project connects escrow state and delivery API through official SDK |
| Required proof | Successful simulation via CRE CLI or live deployment on CRE network | Unit tests, local EVM results or merely compiling source cannot satisfy this gate |

## Not established in the public text retrieved

Country/age restrictions, team-size limits, registration cutoff separate from submission cutoff, required final video length, license requirements, mandatory live attendance, AI-generated code policy, pre-existing-code policy and a strict development window were not specified in the retrieved official detail/bounty text. Do not infer that silence grants unrestricted eligibility. The May 15 date is a submission opening, not confirmed permission to build before that date.

The Oct 18 retrieval did not include a timezone label. The fresh Oct 21 capture `evidence/official-overview-20261021.md` supplies the explicit UTC label and supersedes that uncertainty. Bounty wording was also fetched again in `evidence/official-bounty-20261021.md`.

On Oct 24 the overview and bounty were fetched again into `evidence/official-overview-20261024.md` and `official-bounty-20261024.md`. The event still says Virtual; the timeline remains UTC with deadline Nov 1 01:01; the bounty still requires at least one blockchain plus an external system and a successful CLI simulation or CRE deployment. Two successful local CLI simulations now exist in the project. The public text does not explicitly require a public testnet, but no organizer approval of this private-chain demonstration is implied.

No organizer message was sent and no legal terms were accepted. Before registration/submission, review the actual form and complete terms with the user and resolve any material ambiguity. Keep the project provenance and first-build date transparent.
