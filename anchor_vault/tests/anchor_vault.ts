import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorVault } from "../target/types/anchor_vault";

describe("anchor_vault", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.AnchorVault as Program<AnchorVault>;

  it("Is initialized!", async () => {
    // Init test
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
  it("deposit", async () => {
    const tx = await program.methods.deposit(new anchor.BN(0.2)).rpc();
    console.log("Your transaction signature", tx);
  });
  it("withdraw", async () => {
    const tx = await program.methods.withdraw(new anchor.BN(0.1)).rpc();
    console.log("Your transaction signature", tx);
  });
});

// anchor_vault
// Your transaction signature 5Y2GmesQpHDNJ4st8Zh6MawaAQRsimKAzt7at3niPFagMM7zMuFdbgRzyzUbrHAZRSBmj4ugFvcun4g12KwuNDmJ
//     ✔ Is initialized! (337ms)
// Your transaction signature n5jJrVDNQnCuxjeFY9v7YR6juULfdaU6XjRDaHSLMjDciuRnMNhcg2pcPRHivAXeyfBeug65MLwKg5fbcRpsgcW
//     ✔ deposit (418ms)
// Your transaction signature 4cEw36vvHCzX7WtRrVhwzNAb4NR7zTiNQWCHsWtkHSqxgWjZX8tCGQzntzQ1kdpmvrFo8BKUSHHAQeYcDgX6Mjmq
//     ✔ withdraw (400ms)

//   3 passing (1s)

// Done in 3.71s.
