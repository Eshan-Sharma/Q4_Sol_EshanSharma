import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import wallet from "../wba-wallet.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("9kMTR31G8eJvn4NSEPqqoR4r1h3PfkHuozMjehWNQiQJ");

(async () => {
  try {
    // Create an ATA
    const ata = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey
    );
    console.log(`Your ata is: ${ata.address.toBase58()}`);

    // Mint to ATA
    const mintTx = await mintTo(
      connection,
      keypair,
      mint,
      ata.address,
      keypair,
      token_decimals * BigInt(10000)
    );
    console.log(`Your mint txid: ${mintTx}`);
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
  }
})();
//10000 token
//Your ata is: FytZ9EqWwEuHj23y3jDA7p9z8k5DL5feEYrHsMhvn86A
// Your mint txid: MKk5Zzw7MKx9iDHWR8uY1QRVRKvrLNUcsebzRyZXebYpzVoJPwsvdarudG2uaMii3iSaM9wszLMn311r93EKNb5
