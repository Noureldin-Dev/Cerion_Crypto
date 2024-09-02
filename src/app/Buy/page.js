"use client"
import { Flex, Box, Text, Button, Select, Input, Divider, InputGroup, InputLeftElement, Heading, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';

const BuyCryptoPage = () => {
  const [amount, setAmount] = useState(0); // Default amount
  const [currency, setCurrency] = useState('EUR');
  const [crypto, setCrypto] = useState('Matic');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const bg = useColorModeValue('#EAEAEC', '#1D1D21')
  const color = useColorModeValue('black', 'white')
  const cardBg = useColorModeValue('#FFFFFF', '#1E1E22')
  const inputBg = useColorModeValue('#FFFFFF', '#2E2E32')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const providers = [
    { name: 'mercuryo', amount: (amount-(amount/100 * 6.1)).toFixed(2), price: '€88.07 EUR' , link: "https://exchange.mercuryo.io/"},
    { name: 'BANXA', amount: (amount-(amount/100 * 7.2)).toFixed(2), price: '€88.05 EUR', link: "https://openocean.banxa.com/" },
  ];

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Only accept numbers
    setAmount(value ? parseInt(value) : '');
  };

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
  };

  return (
    <Flex direction="column" p={4}  color={color} minH="90%"  pb={20}>
      <Flex flexDir="column" bg={bg} borderRadius="lg" boxShadow="2xl"  p={8} gap={1}>
        <Flex justify="space-between" justifyContent={["center","center","center","flex-start"]} align="center" mb={4}>
          <Heading style={{fontSize:"1.5em"}} fontSize="2xl">Buy Crypto with Cash</Heading>
        </Flex>
        <Flex alignItems="center" justifyContent="center" maxW="950px" flexWrap="wrap" gap={10} >
          <Flex maxWidth={["90%", "90%", "90%","90%", "50%"]} flexDir='column' gap={10} alignItems="center" >
            <Select alignSelf={["center","center","center","flex-end"]} value={currency} onChange={(e) => setCurrency(e.target.value)} width="100px" bg={inputBg} color={color}>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </Select>

            <InputGroup alignSelf="center" textAlign="center" width="45%" variant="unstyled" mb={4}>
              <InputLeftElement
                pointerEvents="none"
                fontSize="6xl"
                color={color}
              >
                {amount>0? currency === "EUR" ? "€" : "$":""}
              </InputLeftElement>
              <Input
                _selected={{borderRadius:0}}
                placeholder={currency === "EUR" ? "€0" : "$0"}
                value={amount}
                onChange={handleAmountChange}
                fontWeight="600"
                fontSize="6xl"
                border="none"
                p={0}
                pl="3rem" // Adjust to make room for currency symbol
                bg="transparent"
                type="text"
                maxLength="6"
                color={color}
              />
            </InputGroup>
            <Text fontSize="lg" mb={4}>Buy USDT using Debit or Credit</Text>
          </Flex>

          <Flex justifySelf="flex-start" gap={6} textAlign="center" maxWidth={["90%", "90%", "90%","90%", "45%"]} flexDir="column">
            <Box>
              <Heading fontSize="xl" mb={2}>How do you want to buy your crypto?</Heading>
              <Text>Compare rates from these providers. Quotes are sorted by overall price.</Text>
            </Box>
            <Flex gap={3} flexDir="column">
              {providers.map((provider, index) => (
                <Flex
                  key={provider.name}
                  cursor="pointer"
                  onClick={() => handleProviderSelect(provider.name)}
                  alignItems="flex-start"
                  justifyContent="center"
                  padding={3}
                  gap={3}
                  flexDir="column"
                  _hover={{bg:"transparent",borderColor:color}}
                  borderWidth={selectedProvider === provider.name ? 2 : 1}
                  borderColor={selectedProvider === provider.name ? "#3182ce" : borderColor}
                  borderRadius="md"
                >
                  <Text fontSize="lg" fontWeight="700">{provider.name}</Text>
                  <Text>{currency === "EUR" ? "€" : "$"} {amount} ≈ {currency === "EUR" ? "€" : "$"} {provider.amount}</Text>

                  {selectedProvider === provider.name ?
                    <Button
                      alignSelf="center"
                      minWidth="fit-content"
                      width="40%"
                      onClick={()=> window.open(provider.link, '_blank').focus()}
                    >Buy with {provider.name}</Button> : <></>
                  }
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BuyCryptoPage;
