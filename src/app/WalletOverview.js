import React, { useEffect, useState } from 'react';
import RetrieveBalance from './RetrieveBalance';

const WalletOverview = ({ address }) => {
  const [balances, setBalances] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const result = await RetrieveBalance(address).then((e)=>{

            setBalances(e);
        });
      } catch (error) {
        console.error('Error fetching balances:', error);
        setError('Failed to fetch balances');
      }
    };

    if (address) {
      fetchBalances();
    }
  }, [address]);

  return (
    <div>
      <div>Address: {address}</div>
      {error && <div>Error: {error}</div>}
      <div>
        {balances.length > 0 ? (
          balances.map((coin, index) => (
            <div key={index}>
              <p>{coin.Coin} ({coin.Symbol}): {coin.Balance}</p>
            </div>
          ))
        ) : (
          <p>No balances found.</p>
        )}
      </div>
    </div>
  );
};

export default WalletOverview;
