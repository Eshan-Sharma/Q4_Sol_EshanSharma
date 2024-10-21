import wallet from "./wba-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createMetadataAccountV3,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  DataV2Args,
  fetchMetadataFromSeeds,
  updateV1,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createSignerFromKeypair,
  signerIdentity,
  publicKey,
} from "@metaplex-foundation/umi";
import { sign } from "crypto";
import bs58 from "bs58";
// Define our Mint address
const mint = publicKey("9kMTR31G8eJvn4NSEPqqoR4r1h3PfkHuozMjehWNQiQJ");

// Create a UMI connection
const umi = createUmi("https://api.devnet.solana.com");
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
  try {
    // Start here
    let accounts: CreateMetadataAccountV3InstructionAccounts = {
      mint,
      mintAuthority: signer,
      payer: signer,
      updateAuthority: keypair.publicKey,
    };
    let data: DataV2Args = {
      name: "Drive",
      symbol: "DRV",
      uri: "https://ipfs.io/ipfs/QmRToXme31hhPvRFeGUF1Y2MAtghNkaXHKEPMWMsaxA2QP?filename=drive.json",
      sellerFeeBasisPoints: 10,
      creators: null,
      collection: null,
      uses: null,
    };
    let args: CreateMetadataAccountV3InstructionArgs = {
      data,
      isMutable: true,
      collectionDetails: null,
    };
    let tx = createMetadataAccountV3(umi, {
      ...accounts,
      ...args,
    });
    //Update uri
    // const initialMetadata = await fetchMetadataFromSeeds(umi, { mint });
    // const tx = await updateV1(umi, {
    //   mint,
    //   data: {
    //     ...initialMetadata,
    //     uri: "https://bafybeic744clpldbwz7wmiie233az4acep6mge3634xyjq6sdthx7an2ku.ipfs.w3s.link/drive.json",
    //   },
    // });
    let result = await tx.sendAndConfirm(umi);
    console.log(` Transaction successful: ${bs58.encode(result.signature)}`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
// Transaction successful: 5CCz6zvJ8A9TFAo6w242WRfQdgn8ruDnYdJTdmZLzzbgufvQXd6sU3PvXVDCDadi8RmgoqdUe3221Uiomn9ouV9E

//Updating uri - ipfs
// Transaction successful: 2cHuLRuPfuCYXeCimW7jnX9VmpGNpD3vMoKLxQvYR9nEgNbfyLYzrGtDWW7qcdwgFMM1aAx4EpzVaXJXLsx7Ajgc

//Updating uri - web3 storage
//Transaction successful: 4PJC6kTWAdwSQBQdCrzxG4KASfr722eRzWvPNQ322gQtJWZKTG3xWq3pvS3rGCaWiuQPVkKiqxgamhXWkWKLJU79

//Debug image
// Transaction successful: 4PfW3FP6kCGeMLtRzrc1Tzre5RWF7M4HQpdduePTpyahC9Tj3odzGZGjHJAbkVmsfXLfXxFkypCFQeycaRJid8pN
