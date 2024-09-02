'use server'

import Moralis from 'moralis';


export default async function GetPrices (Contracts){

console.log("Contracts")
console.log(Contracts)

let SkimmedContracts = Contracts[0,24]
    

        
    // import Moralis from 'moralis';

try{

    await Moralis.start({ apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY });
}
catch{

}
     const response = await Moralis.EvmApi.token.getMultipleTokenPrices({
        "chain": "0x1",
        "include": "percent_change"
      },{
        "tokens": Contracts
      });
      console.log(response.raw)
      return(response.raw);
    

}
