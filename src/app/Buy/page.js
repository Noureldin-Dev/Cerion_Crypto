"use client"

import { Flex, Box, Text, Button, Select, Input, InputGroup, InputLeftElement, Heading, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';

const BuyCryptoPage = () => {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('EUR');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const bg = useColorModeValue('#F5F5F7', '#16161A')
  const color = useColorModeValue('#333333', '#E0E0E0')
  const cardBg = useColorModeValue('#FFFFFF', '#1E1E22')
  const inputBg = useColorModeValue('#FFFFFF', '#2E2E32')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const providers = [
    { name: 'mercuryo', amount: (amount-(amount/100 * 6.1)).toFixed(2), price: '€88.07 EUR' , link: "https://exchange.mercuryo.io/"},
    { name: 'BANXA', amount: (amount-(amount/100 * 7.2)).toFixed(2), price: '€88.05 EUR', link: "https://openocean.banxa.com/" },
  ];

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value ? parseInt(value) : '');
  };

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
  };

  return (
    <Flex 
      justify="center" 
      align="flex-start" 
      minHeight="100%" 
      width="100%" 
      pt="40px" 
      pb="40px"
      px={["20px", "40px", "60px", "80px"]}
      flexDirection="column" 
      gap={6} 
      bg={bg} 
      color={color}
    >
      <Heading as="h1" size="xl" mb={4}>Buy Crypto with Cash</Heading>
      <Box  width="100%" p={6} bg={cardBg} borderRadius="lg" boxShadow="md" color={color}>
        <Heading size="md" mb={4}>How to Buy Crypto</Heading>
        <Text fontSize="md" mb={4} lineHeight="tall">
          Select your preferred currency, enter the amount you want to spend, and choose a provider to complete your purchase.
        </Text>
      </Box>
      <Flex flexDirection={["column", "column", "row"]} gap={6} width="100%">
        <Box flex={1}>
          <Text fontSize="lg" fontWeight="medium" mb={4}>Enter amount to buy:</Text>
          <Flex alignItems="center" mb={4}>
            <Select value={currency} onChange={(e) => setCurrency(e.target.value)} width="100px" mr={4} bg={inputBg} color={color}>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </Select>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color={color}
                fontSize="1.2em"
              >
                {currency === "EUR" ? "€" : "$"}
              </InputLeftElement>
              <Input
                placeholder="0"
                value={amount}
                onChange={handleAmountChange}
                bg={inputBg}
                color={color}
              />
            </InputGroup>
          </Flex>
        </Box>
        <Box flex={1}>
          <Text fontSize="lg" fontWeight="medium" mb={4}>Select a provider:</Text>
          <Flex flexDirection="column" gap={4}>
            {providers.map((provider) => (
              <Box
                key={provider.name}
                p={4}
                bg={cardBg}
                borderRadius="lg"
                boxShadow="md"
                cursor="pointer"
                onClick={() => handleProviderSelect(provider.name)}
                borderWidth={selectedProvider === provider.name ? 2 : 1}
                borderColor={selectedProvider === provider.name ? "blue.500" : borderColor}
              >
                <Text fontSize="lg" fontWeight="bold">{provider.name}</Text>
                <Text>You get: {currency === "EUR" ? "€" : "$"} {provider.amount}</Text>
                {selectedProvider === provider.name && (
                  <Button
                    mt={4}
                    colorScheme="blue"
                    onClick={() => window.open(provider.link, '_blank').focus()}
                  >
                    Buy with {provider.name}
                  </Button>
                )}
              </Box>
            ))}
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default BuyCryptoPage;
