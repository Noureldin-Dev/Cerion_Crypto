"use client";

import React, { useEffect, useState } from 'react';
import RetrieveBalance from './RetrieveBalance';
import Image from 'next/image';
import pfp from "../../public/pfp.png";
import { Flex, Heading, Text, Box, Divider, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import shortenAddress from './ShortenAddress';
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';
import fetchCryptoPrices from './FetchCryptoPrices';

const WalletOverview = ({ address }) => {
  const [balances, setBalances] = useState([]);
  const [error, setError] = useState(null);
  const [walletValue, setWalletValue] = useState(null);
  const [percentageChange, setPercentageChange] = useState(null);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        // Get wallet's balances
        const result = await RetrieveBalance(address).then(async (Balances) => {
          // Extract symbols needed to find price for
          const contractsNeeded = Balances.map(token => token.Contract);

          const cryptoPrices = await fetchCryptoPrices(contractsNeeded).then((prices) => {
            let totalWalletValue = 0;
            let totalChange = 0;
            Balances.forEach(token => {
              const priceInfo = prices.find(price => price.tokenSymbol === token.Symbol);
              if (priceInfo) {
                // Ensure the price is a number before calling .toFixed()
                const price = parseFloat(priceInfo.usdPriceFormatted);
                token.Price = price.toFixed(2);
                token.Value = (price * parseFloat(token.Balance)).toFixed(2);
                totalWalletValue += parseFloat(token.Value);
                totalChange += (priceInfo["24hrPercentChange"] || 0) * parseFloat(token.Balance) / 100;
              }
            });
            setWalletValue(totalWalletValue.toFixed(2));
            setPercentageChange(totalChange.toFixed(2));
            setBalances(Balances);
          });
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
    <Flex minW="80%" flexDir="column" gap={5} p={5} bg="#1D1D21" padding={30} borderRadius="md" boxShadow="md">
      {walletValue == null ? (
                <>

                <Flex gap={5} align="center">

                  <SkeletonCircle size='20' />


                  <Flex gap={1} flexDir="column" align="flex-start">
                    
                  <Skeleton><Heading size="md" color="white">{shortenAddress(address)}</Heading></Skeleton>
                    <Skeleton><Heading size="xl" color="white">${walletValue}</Heading></Skeleton>
                    {percentageChange !== null && (
                     <Skeleton > <Text color="gray.400" fontSize="sm">24h Change: {percentageChange}%</Text></Skeleton>
                    )}
                    
                  </Flex>
                </Flex>
                <Divider borderColor="gray.600" />
                <Flex flexDir="column" gap={3}>
                  <Skeleton width="max-content">
                  <Heading width="max-content"  size="lg" color="white">Wallet Overview</Heading>
                  </Skeleton>
                  <Skeleton>
                  <TableContainer>
                    <Table variant='simple' color="white">
                      <TableCaption color="gray.400">All figures rounded to 2 decimal places</TableCaption>
                      <Thead>
                        <Tr>
                          <Th color="gray.400">Asset</Th>
                          <Th display={["none","none","none","table-cell"]} color="gray.400">Price</Th>
                          <Th display={["none","none","table-cell","table-cell"]} isNumeric color="gray.400">Balance</Th>
                          <Th isNumeric color="gray.400">Value</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {balances.length > 0 ? (
                          balances.map((coin, index) => (
                            <Tr key={index}>
                              <Td>{coin.Coin}</Td>
                              <Td display={["none","none","none","table-cell"]}>${parseFloat(coin.Price).toFixed(2)}</Td>
                              <Td display={["none","none","table-cell","table-cell"]} isNumeric>{parseFloat(coin.Balance).toFixed(2)}</Td>
                              <Td isNumeric>${parseFloat(coin.Value).toFixed(2)}</Td>
                            </Tr>
                          ))
                        ) : (
                          <Tr>
                            <Td colSpan={4} textAlign="center">No balances found.</Td>
                          </Tr>
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>
                  </Skeleton>
                </Flex>
              </>

      ) : (
        <>
          <Flex gap={5} align="center">
            <Box borderRadius="full" overflow="hidden" w="100px" h="100px">
              <Image src={pfp} alt="Profile Picture" height={100} width={100} />
            </Box>
            <Flex flexDir="column" align="flex-start">
              <Heading size="md" color="white">{shortenAddress(address)}</Heading>
              <Heading size="xl" color="white">${walletValue}</Heading>
              {percentageChange !== null && (
                <Text color="gray.400" fontSize="sm">24h Change: {percentageChange}%</Text>
              )}
            </Flex>
          </Flex>
          <Divider borderColor="gray.600" />
          <Flex flexDir="column" gap={3}>
            <Heading size="lg" color="white">Wallet Overview</Heading>
            <TableContainer>
              <Table variant='simple' color="white">
                <TableCaption color="gray.400">All figures rounded to 2 decimal places</TableCaption>
                <Thead>
                  <Tr>
                    <Th color="gray.400">Asset</Th>
                    <Th display={["none","none","none","table-cell"]} color="gray.400">Price</Th>
                    <Th display={["none","none","table-cell","table-cell"]} isNumeric color="gray.400">Balance</Th>
                    <Th isNumeric color="gray.400">Value</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {balances.length > 0 ? (
                    balances.map((coin, index) => (
                      <Tr key={index}>
                        <Td>{coin.Coin}</Td>
                        <Td display={["none","none","none","table-cell"]}>${parseFloat(coin.Price).toFixed(2)}</Td>
                        <Td display={["none","none","table-cell","table-cell"]} isNumeric>{parseFloat(coin.Balance).toFixed(2)}</Td>
                        <Td isNumeric>${parseFloat(coin.Value).toFixed(2)}</Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={4} textAlign="center">No balances found.</Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default WalletOverview;
