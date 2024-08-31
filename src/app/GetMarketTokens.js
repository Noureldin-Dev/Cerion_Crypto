import Moralis from 'moralis';


export default async function GetMarketTokens (){
    try {
        await Moralis.start({
          apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjMyNGM2NDU2LTg2YjEtNDRkNS1iNGEzLTlkM2M2YTFhYjViMSIsIm9yZ0lkIjoiNDA2NDk1IiwidXNlcklkIjoiNDE3Njk4IiwidHlwZUlkIjoiNDM4ZTYwMzYtMzFjMi00ZTEyLThjNTMtZjVjYjg0ZjVkMmM0IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MjUwMzkzMjcsImV4cCI6NDg4MDc5OTMyN30.1lM9Av2DQtjrAm24VfeyaQS0PB676CS645zD03dxxaU"
        });
      
        const response = await Moralis.EvmApi.marketData.getTopERC20TokensByMarketCap({});
      
        // console.log(response.raw);
        return (response.raw)
      } catch (e) {
        console.error(e);
      }
      
}