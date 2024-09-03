
'use server'

import fetch from 'node-fetch';

export default async function RetrieveBalance(address) {
  console.log("retrieving balance for", address);
  
  const baseURL = 'https://eth-mainnet.g.alchemy.com/v2/' + process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

  const options = {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify({
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_getTokenBalances",
      params: [address],
    }),
  };

  try {
    const response = await fetchWithRetry(baseURL, options);
    const result = await response.json();
    
    const nonZeroBalances = result.result.tokenBalances.filter(token => token.tokenBalance !== "0");
    const limitedBalances = nonZeroBalances.slice(0, 25);

    const CoinsArray = await Promise.all(limitedBalances.map(async (token) => {
      const metadata = await fetchTokenMetadata(baseURL, token.contractAddress);
      const balance = parseInt(token.tokenBalance, 16) / Math.pow(10, metadata.result.decimals);

      return {
        Coin: metadata.result.name,
        Balance: balance.toFixed(2),
        Symbol: metadata.result.symbol,
        Contract: {"tokenAddress": token.contractAddress}
      };
    }));

    return CoinsArray;
  } catch (error) {
    console.error('Error fetching balance:', error);
    // throw error;
  }
}

async function fetchWithRetry(url, options, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.status !== 429) {
        return response;
      }
      console.log(`Rate limited. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    } catch (error) {
      if (i === maxRetries - 1) throw error;
    }
  }
  throw new Error('Max retries reached');
}

async function fetchTokenMetadata(baseURL, contractAddress) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_getTokenMetadata",
      params: [contractAddress],
    }),
  };

  const response = await fetchWithRetry(baseURL, options);
  return response.json();
}
