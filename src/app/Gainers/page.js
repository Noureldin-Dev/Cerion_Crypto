"use client"

import { Flex, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer, TableCaption, Box, Container, VStack, HStack, Icon, Stat, StatNumber, StatArrow, useColorModeValue, Skeleton, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaChartLine } from 'react-icons/fa'

function getTopGainers(coins) {
  try {
    console.log(coins)
    const positiveGainers = coins.filter(coin => parseFloat(coin.price_24h_percent_change) >= 0);
    const sortedGainers = positiveGainers.sort((a, b) => {
      return parseFloat(b.price_24h_percent_change) - parseFloat(a.price_24h_percent_change);
    });
    return sortedGainers;
  }
  catch {
    return []
  }
}

const Page = () => {
  const [sortedTokens, setSortedTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const bg = useColorModeValue('#F5F5F7', '#16161A')
  const color = useColorModeValue('#333333', '#E0E0E0')

  const cardBg = useColorModeValue('white', '#1D1D21')

  useEffect(() => {
    async function GetPrices() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/MarketData", {
          method: "POST",
          body: JSON.stringify({ CoinsNeeded: "tokens" }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        let allCoins = await res.json();
        allCoins = allCoins.FetchedData
        console.log(allCoins)
        const sortedGainers = getTopGainers(allCoins);
        setSortedTokens(sortedGainers);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    GetPrices();
  }, []);

  return (
    <Container maxW="container.xl" py={10} bg={bg} minH="100vh">
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={2} color={color}>Top Gainers 📈</Heading>
          <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')}>Discover the best performing cryptocurrencies in the last 24 hours</Text>
        </Box>

        {isLoading ? (
          <VStack spacing={4}>
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} height="60px" width="100%" />
            ))}
          </VStack>
        ) : sortedTokens.length > 0 ? (
          <Box borderRadius="lg" boxShadow="xl"  overflowX="auto" bg={cardBg}>
            <TableContainer>
              <Table variant="simple">
                <TableCaption placement="top" fontWeight="bold" fontSize="lg">Top Gainers in the Last 24 Hours</TableCaption>
                <Thead>
                  <Tr>
                    <Th color={color}>Token</Th>
                    <Th color={color} isNumeric>Price (USD)</Th>
                    <Th color={color} isNumeric>24h % Change</Th>
                    <Th color={color} isNumeric display={["none", "none", "table-cell"]}>Market Cap (USD)</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {sortedTokens.map((token) => (
                    <Tr key={token.contract_address}>
                      <Td>
                        <HStack>
                          <Image
                            src={token.token_logo || 'https://via.placeholder.com/30'}
                            alt={`${token.token_symbol} logo`}
                            boxSize="30px"
                            objectFit="cover"
                            borderRadius="full"
                            fallbackSrc="https://via.placeholder.com/30"
                          />
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="bold" color={color}>{token.token_symbol}</Text>
                            <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>{token.token_name}</Text>
                          </VStack>
                        </HStack>
                      </Td>
                      <Td isNumeric>
                        <Stat>
                          <StatNumber fontSize={["sm", "md"]} color={color}>${parseFloat(token.price_usd).toFixed(4)}</StatNumber>
                        </Stat>
                      </Td>
                      <Td isNumeric>
                        <Stat>
                          <StatNumber color="green.500" fontSize={["sm", "md"]}>
                            <StatArrow type="increase" />
                            {parseFloat(token.price_24h_percent_change).toFixed(2)}%
                          </StatNumber>
                        </Stat>
                      </Td>
                      <Td isNumeric display={["none", "none", "table-cell"]}>
                        <Stat>
                          <StatNumber fontSize={["sm", "md"]} color={color}>${(parseFloat(token.market_cap_usd) / 1e6).toFixed(2)}M</StatNumber>
                        </Stat>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Box textAlign="center" p={8} bg={cardBg} borderRadius="lg" boxShadow="xl">
            <Text fontSize="xl" color={color}>No top gainers to display at the moment. Check back later!</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
}

export default Page;
