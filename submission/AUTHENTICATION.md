# CRE authentication handoff

The original CLI authorization wait expired. A fresh flow on 2026-10-24 MYT received the browser callback and returned `Login completed successfully!`, exit 0. The subsequent official CLI simulations passed. The user completed browser identity verification; no password, verification code, session token or API key was copied into project deliverables.

If the authorization page requires account creation, new legal acceptance, organization enrollment or a paid plan, the user must handle or explicitly approve that step. No such action has been completed by this project.

The authorization URL is session-specific and expires; it is deliberately not saved here. If expired, run `./scripts/cre.ps1 login` again. The official CLI manages login credentials; the wrapper does not read or export them and restores the process PATH after invocation.

After login, keep `npm run seed:cre` running in another terminal and use:

```powershell
./scripts/verify-and-simulate.ps1
```

The helper checks authentication without logging account details, verifies the loopback-only target and private chain ID, checks the delivery endpoint, and passes the already compiled WASM to the official CLI with transaction broadcasting disabled. It records the real CLI output and exit code. It does not create an account, deploy a workflow, publish a repository or submit an entry. Exit zero alone should not replace checking the actual workflow result.

The private chain uses test accounts and virtual funds. Two successful local CLI simulations are recorded in the evidence directory. They are separate from a public-provider integration and a live DON deployment. On a different machine or after session expiry, use the official login flow again; do not share credential files.
