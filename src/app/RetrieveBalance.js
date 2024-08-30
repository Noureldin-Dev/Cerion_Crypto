import axios from 'axios';

export default async function RetrieveBalance(address) {
  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error('Invalid Ethereum address');
  }

  const baseURL = 'https://eth-mainnet.g.alchemy.com/v2/' + process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

  const data = JSON.stringify({
    jsonrpc: "2.0",
    method: "alchemy_getTokenBalances",
    params: [address],
    id: 42,
  });

  const config = {
    method: "post",
    url: baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios(config);
    const balances = response.data.result.tokenBalances.filter(token => token.tokenBalance !== "0");

    const CoinsArray = await Promise.all(balances.map(async (token) => {
      const metadataOptions = {
        method: "POST",
        url: baseURL,
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        data: {
          id: 1,
          jsonrpc: "2.0",
          method: "alchemy_getTokenMetadata",
          params: [token.contractAddress],
        },
      };

      const metadata = await axios.request(metadataOptions);
      let balance = token.tokenBalance / Math.pow(10, metadata.data.result.decimals);
      balance = balance.toFixed(2);

      return {
        Coin: metadata.data.result.name,
        Balance: balance,
        Symbol: metadata.data.result.symbol,
      };
    }));

    return CoinsArray;
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error;
  }
}
