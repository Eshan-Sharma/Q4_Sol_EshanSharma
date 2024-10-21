import wallet from "../wba-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { readFile } from "fs/promises";
import fs from "fs";

// Create a devnet connection
const umi = createUmi("https://api.devnet.solana.com");

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
  try {
    //1. Load image
    //2. Convert image to generic file.
    //3. Upload image
    const image = fs.readFileSync(__dirname + "/generug.png");
    const genericImg = createGenericFile(image, "generug.png");
    const [myUri] = await umi.uploader.upload([genericImg]);
    console.log("Your image URI: ", myUri);
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();
//Your image URI:  https://arweave.net/8NNHgubWArwBQNvovj3tPG5r1QTRZJ6WAoWW2LVJHYSN
//Update the url
//https://devnet.irys.xyz/8NNHgubWArwBQNvovj3tPG5r1QTRZJ6WAoWW2LVJHYSN
