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
