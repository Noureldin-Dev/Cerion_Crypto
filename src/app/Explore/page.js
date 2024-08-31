"use client"

import { IoWaterOutline } from "react-icons/io5";
import { Box, Flex, Heading, Image , Skeleton, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Fetchcryptoprices from "../FetchCryptoPrices";
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";
import { FaChartSimple } from 'react-icons/fa6';
import { useRouter } from "next/navigation";



function SkeletonCard(){
  return(
    <Skeleton borderRadius="10px">
    <Box
    // key={coin.tokenAddress}
                    borderRadius='lg'
    background="#1D1D21"
    padding={4}
    width={{ base: "100%", sm: "290px" }}
    boxShadow="lg"
    color="white"
    height="166px"
  >
   
  </Box>
  </Skeleton>
  )
}

function Page() {
  const [blueChips, setBlueChips] = useState(null);
  const [cryptoIndexes, setCryptoIndexes] = useState(null);
  const [stablecoins, setStablecoins] = useState(null);
const router = useRouter()
  // Coin addresses categorized by type
  const blueChipAddresses = [
    "0x8eb8a3b98659cce290402893d0123abb75e3ab28", // Tether USD (USDT)
    "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984", // Uniswap (UNI)
    "0x514910771af9ca656af840dff83e8264ecf986ca", // Chainlink (LINK)
  ];

  const cryptoIndexAddresses = [
    "0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b", // Index 1
    "0x72e364f2abdc788b7e918bc238b21f109cd634d7", // Index 2
    "0x341c05c0e9b33c0e38d64de76516b2ce970bb3be", // Index 3
  ];

  const stablecoinAddresses = [
    // Add stablecoin addresses here
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "0xdac17f958d2ee523a2206206994597c13d831ec7", // Tether USD (USDT)

  ];

  useEffect(() => {
    async function GetPrices() {
      const allCoins = await Fetchcryptoprices([
        ...blueChipAddresses.map(addr => ({ tokenAddress: addr })),
        ...cryptoIndexAddresses.map(addr => ({ tokenAddress: addr })),
        ...stablecoinAddresses.map(addr => ({ tokenAddress: addr })),
      ]);

      // Separate coins by category
      setBlueChips(allCoins.filter(coin => blueChipAddresses.includes(coin.tokenAddress)));
      setCryptoIndexes(allCoins.filter(coin => cryptoIndexAddresses.includes(coin.tokenAddress)));
      setStablecoins(allCoins.filter(coin => stablecoinAddresses.includes(coin.tokenAddress)));
    }

    GetPrices();
  } );

  return (
    <Flex
      justify="center"
      align="flex-start"
      minHeight="100%"
      width="80%"
      pt="20px"
    >
      <Flex minW="80%" flexDir="column" gap={4} suppressHydrationWarning>
        {/* Explore Section */}
        <Heading mb={4}>Explore</Heading>
        <Flex flexWrap="wrap" justifyContent="space-between" gap={4} mb={6}>
          <Box
          onClick={()=> router.push("/Gainers")}
            as="button"
            borderRadius="md"
            bg="#8ACF93"
            color="white"
            px={4}
            py={2}
            width={{ base: "100%", sm: "290px" }}
            height="60px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding={5}
            gap={2}
          >
            <Text>Top Gainers</Text>
            <BsGraphUpArrow size={30} />
          </Box>

          <Box
            as="button"
            borderRadius="md"
            bg="#D46D7D"
            color="white"
            px={4}
            py={2}
            width={{ base: "100%", sm: "290px" }}
            height="60px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding={5}
            gap={2}
          onClick={()=> router.push("/Losers")}
            
          >
            <Text>Top Losers</Text>
            <BsGraphDownArrow size={30} />
          </Box>

          <Box
            as="button"
            borderRadius="md"
            bg="#62C0C6"
            color="white"
            px={4}
            py={2}
            width={{ base: "100%", sm: "290px" }}
            height="60px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding={5}
            gap={2}
          >
            <Text>Market</Text>
            <FaChartSimple size={30} />
          </Box>

          <Box
            as="button"
            borderRadius="md"
            bg="#E3A75C"
            color="white"
            px={4}
            py={2}
            width={{ base: "100%", sm: "290px" }}
            height="60px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding={5}
            gap={2}
          >
            <Text>Pools</Text>
            <IoWaterOutline size={30} />
          </Box>
        </Flex>

        {/* DeFi Blue Chips Section */}
        <Flex flexDir="column" gap={1}>
          <Heading size="md">DeFi Blue Chips</Heading>
          <Text color="gray" size="sm">Top DeFi tokens by Market Cap</Text>
        </Flex>
        <Flex
          flexWrap="wrap"
          justifyContent="flex-start"
          gap={4}
          direction={{ base: "column", md: "row" }}
        >
          {blueChips == null ? (
            <>
          <SkeletonCard/>
          <SkeletonCard/>
          <SkeletonCard/>
          </>
        ) : (
            blueChips.map(coin => (
              <Box
                key={coin.tokenAddress}
                borderRadius='lg'
                background="#1D1D21"
                padding={4}
                width={{ base: "100%", sm: "290px" }}
                 boxShadow="lg"
                color="white"
                height="166px"
              >
                <Flex alignItems="center" justifyContent="space-between">
                  <Flex alignItems="center" gap={3}>
                    <Image alt="coin's logo" src={coin.tokenLogo} borderRadius='full' boxSize='40px' />
                    <Heading size="sm">{coin.tokenName}</Heading>
                  </Flex>
                  <Text fontSize="xs" color="blue.400">🔵</Text>
                </Flex>

                <Box mt={4}>
                  <Text fontSize="sm" color="gray.400">Price</Text>
                  <Text fontSize="2xl" fontWeight="bold">${parseFloat(coin.usdPriceFormatted).toFixed(2)}</Text>
                  <Text fontSize="sm" color={coin["24hrPercentChange"] > 0 ? "green.400" : "red.400"}>
                    {parseFloat(coin["24hrPercentChange"]).toFixed(2)}% {coin["24hrPercentChange"] > 0 ? '▲' : '▼'}
                  </Text>
                </Box>
              </Box>
            ))
          )}
        </Flex>

        {/* Crypto Indexes Section */}
        <Flex flexDir="column" gap={1} mt={10}>
          <Heading size="md">Crypto Indexes</Heading>
          <Text color="gray" size="sm">Top Crypto Indexes</Text>
        </Flex>
        <Flex
          flexWrap="wrap"
          justifyContent="flex-start"
          gap={4}
          direction={{ base: "column", md: "row" }}
        >
          {cryptoIndexes == null ? (
         <>
         <SkeletonCard/>
         <SkeletonCard/>
         <SkeletonCard/>
         </>
          ) : (
            cryptoIndexes.map(coin => (
              <Box
                key={coin.tokenAddress}
                                borderRadius='lg'
                background="#1D1D21"
                padding={4}
                width={{ base: "100%", sm: "290px" }}
                 boxShadow="lg"
                color="white"
                height="166px"
              >
                <Flex alignItems="center" justifyContent="space-between">
                  <Flex alignItems="center" gap={3}>
                    <Image alt="coin's logo" src={coin.tokenLogo} borderRadius='full' boxSize='40px' />
                    <Heading size="sm">{coin.tokenName}</Heading>
                  </Flex>
                  <Text fontSize="xs" color="blue.400">🔵</Text>
                </Flex>

                <Box mt={4}>
                  <Text fontSize="sm" color="gray.400">Price</Text>
                  <Text fontSize="2xl" fontWeight="bold">${parseFloat(coin.usdPriceFormatted).toFixed(2)}</Text>
                  <Text fontSize="sm" color={coin["24hrPercentChange"] > 0 ? "green.400" : "red.400"}>
                    {parseFloat(coin["24hrPercentChange"]).toFixed(2)}% {coin["24hrPercentChange"] > 0 ? '▲' : '▼'}
                  </Text>
                </Box>
              </Box>
            ))
          )}
        </Flex>

        {/* Stablecoins Section */}
        <Flex flexDir="column" gap={1} mt={10}>
          <Heading size="md">Stablecoins</Heading>
          <Text color="gray" size="sm">Top Stablecoins</Text>
        </Flex>
        <Flex
          flexWrap="wrap"
          justifyContent="flex-start"
          gap={4}
          direction={{ base: "column", md: "row" }}
        >
          {stablecoins == null ? (
         <>
         <SkeletonCard/>
         <SkeletonCard/>
         <SkeletonCard/>
         </>
          ) : (
            stablecoins.map(coin => (
              <Box
                key={coin.tokenAddress}
                                borderRadius='lg'
                background="#1D1D21"
                padding={4}
                width={{ base: "100%", sm: "290px" }}
                 boxShadow="lg"
                color="white"
                height="166px"

              >
                <Flex alignItems="center" justifyContent="space-between">
                  <Flex alignItems="center" gap={3}>
                    <Image alt="coin's logo" src={coin.tokenLogo} borderRadius='full' boxSize='40px' />
                    <Heading size="sm">{coin.tokenName}</Heading>
                  </Flex>
                  <Text fontSize="xs" color="blue.400">🔵</Text>
                </Flex>

                <Box mt={4}>
                  <Text fontSize="sm" color="gray.400">Price</Text>
                  <Text fontSize="2xl" fontWeight="bold">${parseFloat(coin.usdPriceFormatted).toFixed(2)}</Text>
                  <Text fontSize="sm" color={coin["24hrPercentChange"] > 0 ? "green.400" : "red.400"}>
                    {parseFloat(coin["24hrPercentChange"]).toFixed(2)}% {coin["24hrPercentChange"] > 0 ? '▲' : '▼'}
                  </Text>
                </Box>
              </Box>
            ))
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Page;
