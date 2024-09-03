"use client"

import { IoWaterOutline } from "react-icons/io5";
import { Box, Flex, Heading, Image, Skeleton, Text, useColorModeValue, Container, SimpleGrid, VStack, HStack, Icon, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Fetchcryptoprices from "../FetchCryptoPrices";
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";
import { FaChartSimple } from 'react-icons/fa6';
import { useRouter } from "next/navigation";
import next from "next";

function SkeletonCard(){
  const skeletonBg = useColorModeValue('gray.100', 'gray.700');
  return(
    <Skeleton borderRadius="xl" startColor={skeletonBg} endColor={useColorModeValue('gray.300', 'gray.600')}>
      <Box
        borderRadius='xl'
        padding={6}
        width="100%"
        boxShadow="xl"
        height="180px"
      />
    </Skeleton>
  )
}

function Page() {
  const [blueChips, setBlueChips] = useState(null);
  const [cryptoIndexes, setCryptoIndexes] = useState(null);
  const [stablecoins, setStablecoins] = useState(null);
  const bg = useColorModeValue('#F5F5F7', '#16161A')
  const color = useColorModeValue('#333333', '#E0E0E0')
  const cardBg = useColorModeValue('#FFFFFF', '#1E1E22')
  const cardBoxShadow = useColorModeValue('0 4px 6px rgba(0, 0, 0, 0.1)', '0 4px 6px rgba(255, 255, 255, 0.1)')
  const buttonColors = {
    gainers: useColorModeValue('#5A9F63', '#6ABF76'),
    losers: useColorModeValue('#A44D5D', '#C25A6D'),
    market: useColorModeValue('#429296', '#4FAFB4'),
    pools: useColorModeValue('#B3872C', '#D6A033'),
  }
  const router = useRouter()

  // Coin addresses categorized by type
  const blueChipAddresses = [
    "0x85f17cf997934a597031b2e18a9ab6ebd4b9f6a4", // avax
    "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984", // Uniswap (UNI)
    "0x514910771af9ca656af840dff83e8264ecf986ca", // Chainlink (LINK)
  ];

  const cryptoIndexAddresses = [
    "0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b", // Index 1
    "0x72e364f2abdc788b7e918bc238b21f109cd634d7", // Index 2
    "0x341c05c0e9b33c0e38d64de76516b2ce970bb3be", // Index 3
  ];

  const stablecoinAddresses = [
    "0xdac17f958d2ee523a2206206994597c13d831ec7", // Tether USD (USDT)
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "0x6c3ea9036406852006290770bedfcaba0e23a0e8"
  ];

  useEffect(() => {
    async function GetPrices() {
      const res = await fetch("/api/coinsdata", {
        next: {
          revalidate:3600
        },
        method: "POST",
        body: JSON.stringify({ CoinsNeeded: [
             ...blueChipAddresses.map(addr => ({ tokenAddress: addr })),
             ...cryptoIndexAddresses.map(addr => ({ tokenAddress: addr })),
             ...stablecoinAddresses.map(addr => ({ tokenAddress: addr })),
           ] }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      let allCoins = await res.json();
      allCoins = allCoins.FetchedData
      setBlueChips(allCoins.filter(coin => blueChipAddresses.includes(coin.tokenAddress)));
      setCryptoIndexes(allCoins.filter(coin => cryptoIndexAddresses.includes(coin.tokenAddress)));
      setStablecoins(allCoins.filter(coin => stablecoinAddresses.includes(coin.tokenAddress)));
    }

    GetPrices();
  }, []);

  return (
    <Container maxW="container.xl" py={10} bg={bg} color={color}>
      <VStack spacing={10} align="stretch">
        <Heading size="xl" mb={6}>Explore Crypto</Heading>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          <Box
            onClick={() => router.push("/Gainers")}
            as="button"
            borderRadius="xl"
            bg={buttonColors.gainers}
            color="white"
            p={6}
            height="80px"
            _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
            transition="all 0.2s"
          >
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">Top Gainers</Text>
              <Icon as={BsGraphUpArrow} boxSize={6} />
            </HStack>
          </Box>

          <Box
            as="button"
            borderRadius="xl"
            bg={buttonColors.losers}
            color="white"
            p={6}
            height="80px"
            _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
            transition="all 0.2s"
            onClick={() => router.push("/Losers")}
          >
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">Top Losers</Text>
              <Icon as={BsGraphDownArrow} boxSize={6} />
            </HStack>
          </Box>

          <Box
            as="button"
            borderRadius="xl"
            bg={buttonColors.market}
            color="white"
            p={6}
            height="80px"
            _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
            transition="all 0.2s"
            onClick={() => router.push("/Market")}
          >
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">Market</Text>
              <Icon as={FaChartSimple} boxSize={6} />
            </HStack>
          </Box>

          <Box
            as="button"
            borderRadius="xl"
            bg={buttonColors.pools}
            color="white"
            p={6}
            height="80px"
            _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
            transition="all 0.2s"
            onClick={() => router.push("/Pools")}
          >
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">Pools</Text>
              <Icon as={IoWaterOutline} boxSize={6} />
            </HStack>
          </Box>
        </SimpleGrid>

        <VStack align="stretch" spacing={8}>
          <Box>
            <Heading size="lg" mb={2}>DeFi Blue Chips</Heading>
            <Text color="gray.400">Top DeFi tokens by Market Cap</Text>
          </Box>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
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
                  borderRadius='xl'
                  background={cardBg}
                  p={6}
                  boxShadow={cardBoxShadow}
                  _hover={{ transform: 'translateY(-4px)', boxShadow: 'xl' }}
                  transition="all 0.3s"
                  position="relative"
                >
                  <HStack justify="space-between" mb={4}>
                    <HStack>
                      <Image alt="coin's logo" src={coin.tokenLogo} borderRadius='full' boxSize='50px' />
                      <VStack align="start" spacing={0}>
                        <Heading size="md">{coin.tokenName}</Heading>
                        <Text fontSize="sm" color="gray.400">{coin.tokenSymbol}</Text>
                      </VStack>
                    </HStack>
                    {/* <Text fontSize="sm" color="blue.400" fontWeight="bold">Blue Chip</Text> */}
                  </HStack>

                  <VStack align="start" spacing={1}>
                    <Text fontSize="sm" color="gray.400">Price</Text>
                    <Text fontSize="2xl" fontWeight="bold">${parseFloat(coin.usdPriceFormatted).toFixed(2)}</Text>
                    <Text fontSize="md" color={coin["24hrPercentChange"] > 0 ? "green.400" : "red.400"} fontWeight="bold">
                      {parseFloat(coin["24hrPercentChange"]).toFixed(2)}% {coin["24hrPercentChange"] > 0 ? '▲' : '▼'}
                    </Text>
                  </VStack>
                  <Button
                    position="absolute"
                    bottom="4"
                    right="4"
                    size="sm"
                    colorScheme="blue"
                  >
                    Trade Now
                  </Button>
                </Box>
              ))
            )}
          </SimpleGrid>
        </VStack>

        <VStack align="stretch" spacing={8}>
          <Box>
            <Heading size="lg" mb={2}>Crypto Indexes</Heading>
            <Text color="gray.400">Top Crypto Indexes</Text>
          </Box>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
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
                  borderRadius='xl'
                  background={cardBg}
                  p={6}
                  boxShadow={cardBoxShadow}
                  _hover={{ transform: 'translateY(-4px)', boxShadow: 'xl' }}
                  transition="all 0.3s"
                  position="relative"
                >
                  <HStack justify="space-between" mb={4}>
                    <HStack>
                      <Image alt="coin's logo" src={coin.tokenLogo} borderRadius='full' boxSize='50px' />
                      <VStack align="start" spacing={0}>
                        <Heading size="md">{coin.tokenName}</Heading>
                        <Text fontSize="sm" color="gray.400">{coin.tokenSymbol}</Text>
                      </VStack>
                    </HStack>
                    {/* <Text fontSize="sm" color="purple.400" fontWeight="bold">Index</Text> */}
                  </HStack>

                  <VStack align="start" spacing={1}>
                    <Text fontSize="sm" color="gray.400">Price</Text>
                    <Text fontSize="2xl" fontWeight="bold">${parseFloat(coin.usdPriceFormatted).toFixed(2)}</Text>
                    <Text fontSize="md" color={coin["24hrPercentChange"] > 0 ? "green.400" : "red.400"} fontWeight="bold">
                      {parseFloat(coin["24hrPercentChange"]).toFixed(2)}% {coin["24hrPercentChange"] > 0 ? '▲' : '▼'}
                    </Text>
                  </VStack>
                  <Button
                    position="absolute"
                    bottom="4"
                    right="4"
                    size="sm"
                    colorScheme="blue"
                  >
                    Trade Now
                  </Button>
                </Box>
              ))
            )}
          </SimpleGrid>
        </VStack>

        <VStack align="stretch" spacing={8}>
          <Box>
            <Heading size="lg" mb={2}>Stablecoins</Heading>
            <Text color="gray.400">Top Stablecoins</Text>
          </Box>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
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
                  borderRadius='xl'
                  background={cardBg}
                  p={6}
                  boxShadow={cardBoxShadow}
                  _hover={{ transform: 'translateY(-4px)', boxShadow: 'xl' }}
                  transition="all 0.3s"
                  position="relative"
                >
                  <HStack justify="space-between" mb={4}>
                    <HStack>
                      <Image alt="coin's logo" src={coin.tokenLogo} borderRadius='full' boxSize='50px' />
                      <VStack align="start" spacing={0}>
                        <Heading size="md">{coin.tokenName}</Heading>
                        <Text fontSize="sm" color="gray.400">{coin.tokenSymbol}</Text>
                      </VStack>
                    </HStack>
                    {/* <Text fontSize="sm" color="teal.400" fontWeight="bold">Stablecoin</Text> */}
                  </HStack>

                  <VStack align="start" spacing={1}>
                    <Text fontSize="sm" color="gray.400">Price</Text>
                    <Text fontSize="2xl" fontWeight="bold">${parseFloat(coin.usdPriceFormatted).toFixed(2)}</Text>
                    <Text fontSize="md" color={coin["24hrPercentChange"] > 0 ? "green.400" : "red.400"} fontWeight="bold">
                      {parseFloat(coin["24hrPercentChange"]).toFixed(2)}% {coin["24hrPercentChange"] > 0 ? '▲' : '▼'}
                    </Text>
                  </VStack>
                  <Button
                    position="absolute"
                    bottom="4"
                    right="4"
                    size="sm"
                    colorScheme="blue"
                  >
                    Buy Now
                  </Button>
                </Box>
              ))
            )}
          </SimpleGrid>
        </VStack>
      </VStack>
    </Container>
  );
}

export default Page;
