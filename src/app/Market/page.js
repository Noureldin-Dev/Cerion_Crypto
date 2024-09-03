"use client"

import { Flex, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer, TableCaption, Box, Container, VStack, HStack, Icon, Stat, StatNumber, StatArrow, Skeleton, Image, Input, InputGroup, InputLeftElement, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaChartLine, FaSearch, FaSort } from 'react-icons/fa'

const Page = () => {
  const [tokens, setTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  const lightBg = '#F5F5F7'
  const darkBg = '#16161A'
  const lightColor = '#333333'
  const darkColor = '#E0E0E0'
  const lightCardBg = 'white'
  const darkCardBg = '#1D1D21'
  const lightSubtextColor = 'gray.600'
  const darkSubtextColor = 'gray.400'

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
        allCoins = allCoins.FetchedData;
        // Remove duplicates based on contract_address
        const uniqueCoins = allCoins.filter((coin, index, self) =>
          index === self.findIndex((t) => t.contract_address === coin.contract_address)
        );
        setTokens(uniqueCoins);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    GetPrices();
  }, []);

  const filteredTokens = tokens.filter(token =>
    token.token_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.token_symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTokens = [...filteredTokens].sort((a, b) => {
    const marketCapA = parseFloat(a.market_cap_usd);
    const marketCapB = parseFloat(b.market_cap_usd);
    if (sortOrder === 'asc') {
      return marketCapA - marketCapB;
    } else {
      return marketCapB - marketCapA;
    }
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <Container maxW="container.xl" py={10} bg={lightBg} _dark={{bg: darkBg}} minH="100vh">
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={2} color={lightColor} _dark={{color: darkColor}}>Crypto Market Overview 📊</Heading>
          <Text fontSize="xl" color={lightSubtextColor} _dark={{color: darkSubtextColor}}>Explore the latest cryptocurrency market data</Text>
        </Box>

        <Flex justifyContent="space-between" alignItems="center">
          <InputGroup maxW="70%">
            <InputLeftElement pointerEvents="none">
              <FaSearch color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search tokens"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bg={lightCardBg}
              _dark={{bg: darkCardBg, color: darkColor}}
              color={lightColor}
            />
          </InputGroup>

          <Menu>
            <MenuButton as={Button} rightIcon={<FaSort />} bg={lightCardBg} _dark={{bg: darkCardBg, color: darkColor}} color={lightColor}>
              Sort by Market Cap
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setSortOrder('desc')}>Highest to Lowest</MenuItem>
              <MenuItem onClick={() => setSortOrder('asc')}>Lowest to Highest</MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        {isLoading ? (
          <VStack spacing={4}>
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} height="60px" width="100%" />
            ))}
          </VStack>
        ) : sortedTokens.length > 0 ? (
          <Box borderRadius="lg" boxShadow="xl" overflowX="auto" bg={lightCardBg} _dark={{bg: darkCardBg}}>
            <TableContainer>
              <Table variant="simple">
                <TableCaption placement="top" fontWeight="bold" fontSize="lg">Cryptocurrency Market Data</TableCaption>
                <Thead>
                  <Tr>
                    <Th color={lightColor} _dark={{color: darkColor}}>Token</Th>
                    <Th color={lightColor} _dark={{color: darkColor}} isNumeric>Price (USD)</Th>
                    <Th color={lightColor} _dark={{color: darkColor}} isNumeric>24h % Change</Th>
                    <Th color={lightColor} _dark={{color: darkColor}} isNumeric display={["none", "none", "table-cell"]}>Market Cap (USD)</Th>
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
                            <Text fontWeight="bold" color={lightColor} _dark={{color: darkColor}}>{token.token_symbol}</Text>
                            <Text fontSize="sm" color={lightSubtextColor} _dark={{color: darkSubtextColor}}>{token.token_name}</Text>
                          </VStack>
                        </HStack>
                      </Td>
                      <Td isNumeric>
                        <Stat>
                          <StatNumber fontSize={["sm", "md"]} color={lightColor} _dark={{color: darkColor}}>${parseFloat(token.price_usd).toFixed(4)}</StatNumber>
                        </Stat>
                      </Td>
                      <Td isNumeric>
                        <Stat>
                          <StatNumber color={parseFloat(token.price_24h_percent_change) >= 0 ? "green.500" : "red.500"} fontSize={["sm", "md"]}>
                            <StatArrow type={parseFloat(token.price_24h_percent_change) >= 0 ? "increase" : "decrease"} />
                            {Math.abs(parseFloat(token.price_24h_percent_change)).toFixed(2)}%
                          </StatNumber>
                        </Stat>
                      </Td>
                      <Td isNumeric display={["none", "none", "table-cell"]}>
                        <Stat>
                          <StatNumber fontSize={["sm", "md"]} color={lightColor} _dark={{color: darkColor}}>${(parseFloat(token.market_cap_usd) / 1e6).toFixed(2)}M</StatNumber>
                        </Stat>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Box textAlign="center" p={8} bg={lightCardBg} _dark={{bg: darkCardBg}} borderRadius="lg" boxShadow="xl">
            <Text fontSize="xl" color={lightColor} _dark={{color: darkColor}}>No tokens found matching your search. Try a different term.</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
}

export default Page;
