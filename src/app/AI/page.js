"use client";

import { Flex, Heading, Text, Button, Box, Image, Progress } from '@chakra-ui/react';
import React, { useState } from 'react';

// Predefined array of options (only Bitcoin and Ethereum)
const topCryptos = ['Bitcoin', 'Ethereum'];

const sentimentColor = (sentiment) => {
  if (sentiment >= 70) return 'green.500';  // Positive sentiment
  if (sentiment <= 30) return 'red.500';    // Negative sentiment
  return 'yellow.500';                      // Neutral sentiment
};

const Page = () => {
  const [sentimentData, setSentimentData] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState('');

  const handleSelectCrypto = (crypto) => {
    setSelectedCrypto(crypto);
    handleSendData(crypto);
  };

  const handleSendData = async (crypto) => {
    if (!crypto) return;

    try {
      const res = await fetch("/api/sentiment", {
        method: "POST",
        body: JSON.stringify({ userInput: crypto }), // Sending selected crypto
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const json = await res.json();
      setSentimentData(json);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <Flex justify="center" align="flex-start" minHeight="100%" width="80%" pt="20px" flexDirection="column" gap={4}>
      <Heading>AI Sentiment Analysis</Heading>
      <Flex gap={4}>
        {topCryptos.map((crypto, index) => (
          <Button
            key={index}
            onClick={() => handleSelectCrypto(crypto)}
            colorScheme="teal"
          >
            {crypto}
          </Button>
        ))}
      </Flex>
      {sentimentData && (
        <Flex flexDirection="column" gap={4} mt={4}>
          <Box p={4} bg={"#1E1E22"} borderRadius="md"  color="white">
            <Text fontSize="lg" fontWeight="bold">Overall Sentiment:</Text>
            <Text fontSize="xl">{(sentimentData.averageSentiment * 100).toFixed(0)}%</Text>
            <Progress
              value={sentimentData.averageSentiment * 100}
              size="md"
              colorScheme={sentimentData.averageSentiment > 0.5 ? 'green' : 'red'}
              mt={2}
            />
          </Box>
          {sentimentData.news && sentimentData.news.length > 0 && (
            <Flex flexWrap="wrap" gap={4}>
              {sentimentData.news.map((article, index) => (
                <Box width="30%" height="30%" key={index} p={4} borderRadius="md" border="1px solid #ddd">
                  {article.image !== 'No image available' && (
                    <Image src={article.image} alt={article.title} boxSize="100%" objectFit="cover" borderRadius="md" mb={2} />
                  )}
                  <Text fontSize="lg" fontWeight="bold">
                    <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
                  </Text>
                </Box>
              ))}
            </Flex>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default Page;
