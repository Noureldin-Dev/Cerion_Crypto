"use client";

import { Flex, Heading, Text, Button, Input } from '@chakra-ui/react';
import React, { useState } from 'react';

const Page = () => {
  const [sentimentData, setSentimentData] = useState(null);
  const [inputData, setInputData] = useState('2');

  const handleSendData = async () => {
    try {
      const res = await fetch("/api/sentiment", {
        method: "POST",
        body: inputData,
        headers: {
          "Content-Type": "text/plain",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const json = await res.json();
      setSentimentData(JSON.stringify(json));
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <Flex justify="center" align="flex-start" minHeight="100%" width="80%" pt="20px" flexDirection="column" gap={4}>
      <Heading>AI Sentiment Analysis</Heading>
      <Input
        placeholder="Enter data to send"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      <Button onClick={handleSendData}>Send Data</Button>
      {sentimentData && <Text>Received Data: {sentimentData}</Text>}
    </Flex>
  );
};

export default Page;
