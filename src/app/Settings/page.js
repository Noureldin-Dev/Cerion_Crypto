"use client";

import { Box, Button, Divider, Flex, Heading, Input, Select, Text, Textarea, Toast, useColorMode, useToast, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { disconnect } from "../WalletSlice";
import { useSelector } from "react-redux";
import ConnectWallet from "../ConnectWallet";

const SettingsPage = () => {
  const [bugDescription, setBugDescription] = useState("");
  const { colorMode, toggleColorMode } = useColorMode()
  const bg = useColorModeValue('#EAEAEC', '#1D1D21')
  const color = useColorModeValue('black', 'white')
  const inputBg = useColorModeValue('white', '#2E2E32')
  const [feedback, setFeedback] = useState("");
  const [currency, setCurrency] = useState("USD");
  const toast = useToast();
  const wallet = useSelector((state) => state.wallet);
  const dispatch = useDispatch()

  async function disconnectWallet() {
    window.ethereum.on("disconnect", () => {});

    dispatch(disconnect())
    console.log("logged out");
    toast({
      title: "Wallet disconnected",
      description: `Your wallet is now disconnected.`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position:"bottom-right"
    });
  }

  const handleSubmitFeedback = () => {
    // Add logic to submit feedback
    toast({
      title: "Feedback submitted.",
      description: "Thank you for your feedback.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setFeedback("");
  };

  const handleLogout = () => {
    // Add logic to log out the user
    console.log("User logged out.");
  };

  return (    
    <Flex direction="column" padding={8} maxW="600px" margin="auto" bgColor={bg} color={color} borderRadius="lg" boxShadow="2xl" >
      <Heading mb={6}>Settings</Heading>

      <Divider my={6} borderColor="gray.600" />

      <Box mb={6}>
        <Heading size="md" mb={4}>Submit Feedback</Heading>
        <Textarea
          placeholder="Share your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          mb={4}
          bgColor={inputBg}
          border="none"
          _focus={{ outline: "none", borderColor: "blue.500" }}
        />
        <Button colorScheme="green" onClick={handleSubmitFeedback}>Submit Feedback</Button>
      </Box>

      <Divider my={6} borderColor="gray.600" />

      <Box mb={6}>
        <Heading size="md" mb={4}>Currency Converter</Heading>
        <Select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          mb={4}
          bgColor={inputBg}
          border="none"
          _focus={{ outline: "none", borderColor: "blue.500" }}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="ETH">ETH</option>
        </Select>
        <Text>Your selected currency: {currency}</Text>
      </Box>

      <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>

      <Divider my={6} borderColor="gray.600" />

      {
        wallet.value == null ?
        <ConnectWallet /> :
        <Flex flexDir="column" gap={3}>
          <Text>Connected wallet: {wallet.value}</Text>
          <Button onClick={disconnectWallet} variant="outline" color={color} _hover={{bg: useColorModeValue('#C8C8C8', '#2D2D32')}} >Disconnect Wallet</Button>
        </Flex>
      }
    </Flex>
  );
};

export default SettingsPage;
