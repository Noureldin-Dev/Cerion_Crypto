import Moralis from 'moralis';


export default async function GetMarketTokens (){
    try {
      try{

        await Moralis.start({ apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY });
    }
    catch{
    
    }
      
        const response = await Moralis.EvmApi.marketData.getTopERC20TokensByMarketCap({});
      
        // console.log(response.raw);
        return (response.raw)
      } catch (e) {
        console.error(e);
      }
      
}