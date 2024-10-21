import wallet from "../wba-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

// Create a devnet connection
const umi = createUmi("https://api.devnet.solana.com");

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
  try {
    // Follow this JSON structure
    // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure
    const image =
      "https://devnet.irys.xyz/8NNHgubWArwBQNvovj3tPG5r1QTRZJ6WAoWW2LVJHYSN";
    const metadata = {
      name: "Very Rare, Rarest of the Rare Rug",
      symbol: "RUG",
      description: "You won't believe we have this rug until you have it.",
      image: image,
      attributes: [
        { trait_type: "wool", value: "rare" },
        { trait_type: "color", value: "mythical" },
      ],
      properties: {
        files: [
          {
            type: "image/png",
            uri: image,
          },
        ],
      },
      creators: [],
    };

    const myUri = await umi.uploader.uploadJson(metadata);
    console.log("Your metadata URI: ", myUri);
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();
//Update package json - @metaplex-foundation/umi-uploader-irys": "^0.10.0-beta.0"
//Your metadata URI:  https://arweave.net/2jbB23ZzYv5ufBry3hqe8NZ5ZeY2zm18mftkvgsmjXYs
//Update the http header
//https://devnet.irys.xyz/2jbB23ZzYv5ufBry3hqe8NZ5ZeY2zm18mftkvgsmjXYs
