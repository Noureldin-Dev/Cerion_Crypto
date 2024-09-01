"use client";

import { Flex, Heading, Text, Button, Box, Image, Progress, Img, Link } from '@chakra-ui/react';
import React, { useState } from 'react';

// Predefined array of options (only Bitcoin and Ethereum)
const topCryptos = ['Bitcoin', 'Ethereum', 'Cardano', 'Polygon', 'Chainlink'];

const sentimentColor = (sentiment) => {
  if (sentiment >= 70) return 'green.500';  // Positive sentiment
  if (sentiment <= 30) return 'red.500';    // Negative sentiment
  return 'yellow.500';                      // Neutral sentiment
};

const Page = () => {
  const [showExplanation, setShowExplanation] = useState(false);
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
      <Text></Text>
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
        <>
          <Flex flexDirection="column" width="100%" gap={4} mt={4}>
            <Box p={4} bg={"#1E1E22"} borderRadius="md" color="white">
              <Text fontSize="lg" fontWeight="bold">Overall Sentiment:</Text>
              <Text fontSize="xl">{(sentimentData.averageSentiment).toFixed(0)}/10</Text>
              <Progress
                value={(sentimentData.averageSentiment) / 10 * 100}
                size="md"
                colorScheme={sentimentData.averageSentiment > 5 ? 'green' : 'red'}
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

          <Button onClick={() => setShowExplanation(!showExplanation)} mt={4}>
            {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
          </Button>

          {showExplanation && (
            <>
            <Box p={4} mt={4} bg={"#1E1E22"} borderRadius="md" color="white">
              <Heading size="md" mb={2}>How AI Sentiment Analysis Works</Heading>
              <Text mb={2}>
                AI sentiment analysis involves using machine learning models to determine the emotional tone of a given text. The model processes the text and assigns a sentiment score based on the words and phrases it contains. 
              </Text>

              <Text mb={2}>
                In this analysis, the average sentiment score is calculated by analyzing the titles of news articles related to the selected cryptocurrency. A higher average score indicates a generally positive sentiment, while a lower score suggests a negative sentiment.
              </Text>
              <Text>
                The sentiment score is then represented on a scale from 0 to 10, where 0 indicates the most negative sentiment and 10 indicates the most positive sentiment.
              </Text>
              <Text>
                Below are the articles used to determine the sentiment.
              </Text>
            </Box>

            {sentimentData.articles.map(article=>
              <Flex gap={3} >
                <Img borderRadius="10px" src={article.image} maxH="150px" maxW="150px"/>
                <Flex alignItems="flex-start" justifyContent="center" flexDir="column">
                <Heading size="md">{article.title}</Heading>
                <Button variant="link">See article</Button>
                </Flex>
              </Flex>
              
              )}
              </>
          )}
        </>
      )}
    </Flex>
  );
};

export default Page;
