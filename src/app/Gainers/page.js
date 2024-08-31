"use client"

import { Flex, Heading, Text, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer, TableCaption } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import GetMarketTokens from '../GetMarketTokens'

function getTopGainers(coins) {
  const positiveGainers = coins.filter(coin => parseFloat(coin.price_24h_percent_change) >= 0);
  const sortedGainers = positiveGainers.sort((a, b) => {
      return parseFloat(b.price_24h_percent_change) - parseFloat(a.price_24h_percent_change);
  });
  return sortedGainers;
}

const Page = () => {
  const [sortedTokens, setSortedTokens] = useState([]);

  async function getTokens() {
    const res = await GetMarketTokens();
    if (res) {
      const sortedGainers = getTopGainers(res);
      setSortedTokens(sortedGainers);
    }
  }

  useEffect(() => {
    getTokens();
  }, []);

  return (
    <Flex
      justify="center"
      align="flex-start"
      minHeight="100%"
      width="80%"
      pt="20px"
      bg="#16161A"
    >
      <Flex flexDirection='column' minW="80%" flexDir="column" gap={4} suppressHydrationWarning>
        <Heading color="white">Top Gainers 📈</Heading>
        <Text color="gray.300">The top gainers based on 24-hour percentage change</Text>

        {sortedTokens.length > 0 ? (
          <TableContainer
      overflow="hidden"
      >
            <Table  colorScheme='teal'>
              <TableCaption color="white">Top Gainers in the Last 24 Hours</TableCaption>
              <Thead>
                <Tr>
                  <Th display={["none","none", "none","table-cell"]} color="white">Token Name</Th>
                  <Th color="white">Symbol</Th>
                  <Th display={["none","none","none", "none","table-cell"]} isNumeric color="white">Price (USD)</Th>
                  <Th isNumeric color="white">24h % Change</Th>
                  <Th display={["none","none","none","none","table-cell"]} isNumeric color="white">Market Cap (USD)</Th>
                </Tr>
              </Thead>
              <Tbody>
                {sortedTokens.map((token) => (
                  <Tr key={token.contract_address}>
                    <Td display={["none","none", "none","table-cell"]} color="gray.300">{token.token_name}</Td>
                    <Td color="gray.300">{token.token_symbol}</Td>
                    <Td display={["none","none","none", "none","table-cell"]} isNumeric color="gray.300">{parseFloat(token.price_usd).toFixed(4)}</Td>
                    <Td isNumeric color={parseFloat(token.price_24h_percent_change) >= 0 ? 'green.300' : 'red.300'}>
                      {parseFloat(token.price_24h_percent_change).toFixed(2)}%
                    </Td>
                    <Td display={["none","none","none","none","table-cell"]} isNumeric color="gray.300">{(parseFloat(token.market_cap_usd) / 1e6).toFixed(2)} M</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th color="white">Token Name</Th>
                  <Th color="white">Symbol</Th>
                  <Th isNumeric color="white">Price (USD)</Th>
                  <Th isNumeric color="white">24h % Change</Th>
                  <Th isNumeric color="white">Market Cap (USD)</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        ) : (
          <Text color="gray.300">No top gainers to display</Text>
        )}
      </Flex>
    </Flex>
  );
}

export default Page;
