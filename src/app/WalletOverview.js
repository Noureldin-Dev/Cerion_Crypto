"use client";

import React, { useEffect, useState } from 'react';
import RetrieveBalance from './RetrieveBalance';
import Image from 'next/image';
import pfp from "../../public/pfp.png";
import { Flex, Heading, Text, Box, Divider, Skeleton, SkeletonCircle, SkeletonText, useColorModeValue, Container, VStack, HStack, Icon, Stat, StatNumber, StatArrow, TableContainer, Table, Thead, Tbody, Tr, Th, Td, TableCaption } from '@chakra-ui/react';
import shortenAddress from './ShortenAddress';
import fetchCryptoPrices from './FetchCryptoPrices';
import { FaWallet, FaChartLine } from 'react-icons/fa';

const WalletOverview = ({ address }) => {
  const [balances, setBalances] = useState([]);
  const [error, setError] = useState(null);
  const [walletValue, setWalletValue] = useState(null);
  const [percentageChange, setPercentageChange] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const bg = useColorModeValue('#F5F5F7', '#16161A');
  const color = useColorModeValue('#333333', '#E0E0E0');
  const cardBg = useColorModeValue('white', '#1D1D21');
  const subtextColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const formatNumber = (num) => {
    return parseFloat(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        setIsLoading(true);
        const result = await RetrieveBalance(address);
        const contractsNeeded = result.map(token => token.Contract);

        const cryptoPrices = await fetchCryptoPrices(contractsNeeded);
        let totalWalletValue = 0;
        let totalChange = 0;
        const validBalances = result.filter(token => {
          const priceInfo = cryptoPrices.find(price => price.tokenSymbol === token.Symbol);
          if (priceInfo) {
            const price = parseFloat(priceInfo.usdPriceFormatted);
            if (!isNaN(price)) {
              token.Price = formatNumber(price);
              token.Value = formatNumber(price * parseFloat(token.Balance));
              totalWalletValue += price * parseFloat(token.Balance);
              totalChange += (priceInfo["24hrPercentChange"] || 0) * parseFloat(token.Balance) / 100;
              return true;
            }
          }
          return false;
        });
        setWalletValue(formatNumber(totalWalletValue));
        setPercentageChange(totalChange.toFixed(2));
        setBalances(validBalances);
      } catch (error) {
        console.error('Error fetching balances:', error);
        setError('Failed to fetch balances');
      } finally {
        setIsLoading(false);
      }
    };

    if (address) {
      fetchBalances();
    }
  }, [address]);

  return (
    <Container maxW="container.xl"  bg={bg} minH="100%">
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={2} color={color}>Wallet Overview</Heading>
          <Text fontSize="xl" color={subtextColor}>Your crypto portfolio at a glance</Text>
        </Box>

        <Box borderRadius="lg" boxShadow="xl" bg={cardBg} p={6}>
          <VStack spacing={6} align="stretch">
            <HStack  spacing={10} alignContent="center" alignItems="center" align="center">
              <SkeletonCircle isLoaded={!isLoading} size='20'>
                <Box mt={-2.5}   borderRadius="full" overflow="hidden" w="100px" h="100px">
                  <Image src={pfp} alt="Profile Picture" height={100} width={100} />
                </Box>
              </SkeletonCircle>
              <VStack align="flex-start" spacing={2}>
                <Skeleton isLoaded={!isLoading}>
                  <Heading size="md" color={color}>{shortenAddress(address)}</Heading>
                </Skeleton>
                <Skeleton isLoaded={!isLoading}>
                  <Stat>
                    <StatNumber fontSize="3xl" color={color}>
                      ${walletValue}
                      {/* {percentageChange !== null && (
                        <StatArrow type={parseFloat(percentageChange) >= 0 ? "increase" : "decrease"} />
                      )} */}
                    </StatNumber>
                  </Stat>
                </Skeleton>
                <Skeleton isLoaded={!isLoading}>
                  <Text color={subtextColor} fontSize="sm">
                    24h Change: {percentageChange}%
                  </Text>
                </Skeleton>
              </VStack>
            </HStack>

            <Divider borderColor={borderColor} />

            <TableContainer>
              <Table variant='simple'>
                <TableCaption placement="top" fontWeight="bold" fontSize="lg" color={color}>Asset Breakdown</TableCaption>
                <Thead>
                  <Tr>
                    <Th color={subtextColor}>Asset</Th>
                    <Th color={subtextColor} display={["none","none","none","table-cell"]}>Price</Th>
                    <Th color={subtextColor} display={["none","none","table-cell","table-cell"]} isNumeric>Balance</Th>
                    <Th color={subtextColor} isNumeric>Value</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {isLoading ? (
                    [...Array(4)].map((_, index) => (
                      <Tr key={index}>
                        <Td><Skeleton height="20px" /></Td>
                        <Td display={["none","none","none","table-cell"]}><Skeleton height="20px" /></Td>
                        <Td display={["none","none","table-cell","table-cell"]}><Skeleton height="20px" /></Td>
                        <Td><Skeleton height="20px" /></Td>
                      </Tr>
                    ))
                  ) : balances.length > 0 ? (
                    balances.map((coin, index) => (
                      <Tr key={index}>
                        <Td>
                          <HStack>
                            <Icon as={FaWallet} color={color} />
                            <Text color={color}>{coin.Coin}</Text>
                          </HStack>
                        </Td>
                        <Td display={["none","none","none","table-cell"]} color={color}>${coin.Price}</Td>
                        <Td display={["none","none","table-cell","table-cell"]} isNumeric color={color}>{formatNumber(coin.Balance)}</Td>
                        <Td isNumeric color={color}>${coin.Value}</Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={4} textAlign="center" color={color}>No balances found.</Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default WalletOverview;
