"use client";

import { Box, Button, Divider, Flex, Heading, Input, Select, Text, Textarea, useColorMode, useToast, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disconnect } from "../WalletSlice";
import ConnectWallet from "../ConnectWallet";

const SettingsPage = () => {
  const [feedback, setFeedback] = useState("");
  const [currency, setCurrency] = useState("USD");
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const wallet = useSelector((state) => state.wallet);
  const dispatch = useDispatch();

  const bg = useColorModeValue('#F5F5F7', '#16161A');
  const color = useColorModeValue('#333333', '#E0E0E0');
  const cardBg = useColorModeValue('#FFFFFF', '#1E1E22');
  const inputBg = useColorModeValue('#FFFFFF', '#2E2E32');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  async function disconnectWallet() {
    window.ethereum.on("disconnect", () => {});
    dispatch(disconnect());
    console.log("logged out");
    toast({
      title: "Wallet disconnected",
      description: `Your wallet is now disconnected.`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom-right"
    });
  }

  const handleSubmitFeedback = () => {
    toast({
      title: "Feedback submitted.",
      description: "Thank you for your feedback.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setFeedback("");
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
      <Heading as="h1" size="xl" mb={4}>Settings</Heading>
      
      <Box width="100%" p={6} bg={cardBg} borderRadius="lg" boxShadow="md" color={color}>
        <Heading size="md" mb={4}>Submit Feedback</Heading>
        <Text fontSize="md" mb={4} lineHeight="tall">
          We value your opinion. Please share your thoughts or report any issues you've encountered.
        </Text>
        <Textarea
          placeholder="Share your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          mb={4}
          bg={inputBg}
          color={color}
          border="1px solid"
          borderColor={borderColor}
          _focus={{ borderColor: "blue.500" }}
        />
        <Button colorScheme="blue" onClick={handleSubmitFeedback}>Submit Feedback</Button>
      </Box>

      <Flex flexDirection={["column", "column", "row"]} gap={6} width="100%">
        <Box flex={1}>
          <Text fontSize="lg" fontWeight="medium" mb={4}>Currency Preference:</Text>
          <Select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            bg={inputBg}
            color={color}
            border="1px solid"
            borderColor={borderColor}
            _focus={{ borderColor: "blue.500" }}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="ETH">ETH</option>
          </Select>
        </Box>
        <Box flex={1}>
          <Text fontSize="lg" fontWeight="medium" mb={4}>Theme Preference:</Text>
          <Button onClick={toggleColorMode} width="100%" bg={cardBg} color={color} border="1px solid" borderColor={borderColor}>
            Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </Box>
      </Flex>

      <Box width="100%" p={6} bg={cardBg} borderRadius="lg" boxShadow="md" color={color}>
        <Heading size="md" mb={4}>Wallet Connection</Heading>
        {wallet.value == null ? (
          <ConnectWallet />
        ) : (
          <Flex flexDir="column" gap={3}>
            <Text>Connected wallet: {wallet.value}</Text>
            <Button colorScheme='red' onClick={disconnectWallet} variant="outline">Disconnect Wallet</Button>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default SettingsPage;
