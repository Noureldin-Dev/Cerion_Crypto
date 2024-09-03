"use client";

import { Flex, Heading, Text, Button, Box, Image, Progress, Img, Link, useColorModeValue, Spinner } from '@chakra-ui/react';
import React, { useState } from 'react';

// Predefined array of options (only Bitcoin and Ethereum)
const topCryptos = ['Bitcoin', 'Ethereum', 'Polygon', 'Chainlink', "Uniswap"];

const sentimentColor = (sentiment) => {
  if (sentiment >= 70) return 'green.500';  // Positive sentiment
  if (sentiment <= 30) return 'red.500';    // Negative sentiment
  return 'yellow.500';                      // Neutral sentiment
};

const Page = () => {
  const [sentimentData, setSentimentData] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const bg = useColorModeValue('#F5F5F7', '#16161A')
  const color = useColorModeValue('#333333', '#E0E0E0')
  const cardBg = useColorModeValue('#FFFFFF', '#1E1E22')
  
  const handleSelectCrypto = (crypto) => {
    setSelectedCrypto(crypto);
    setSentimentData(null);
  };

  const handleAnalyze = async () => {
    if (!selectedCrypto) return;

    setIsAnalyzing(true);
    setSentimentData(null);

    try {
      setAnalysisStep('Fetching articles...');
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate fetching delay

      setAnalysisStep('Analyzing articles...');
      const res = await fetch("/api/sentiment", {
        method: "POST",
        body: JSON.stringify({ userInput: selectedCrypto }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate analysis delay

      const json = await res.json();
      setSentimentData(json);
    } catch (error) {
      console.error('Error analyzing data:', error);
      setAnalysisStep('Error occurred during analysis.');
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep('');
    }
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
      <Heading as="h1" size="xl" mb={4}>AI Sentiment Analysis</Heading>
      <Box p={6} bg={cardBg} borderRadius="lg" boxShadow="md" color={color}>
        <Heading size="md" mb={4}>How AI Sentiment Analysis Works</Heading>
        <Text fontSize="md" mb={4} lineHeight="tall">
          AI sentiment analysis uses machine learning models to determine the emotional tone of text. The model processes the text and assigns a sentiment score based on the words and phrases it contains.
        </Text>
        <Text fontSize="md" mb={4} lineHeight="tall" display={["none","none","none","block"]}>
          In this analysis, we calculate the average sentiment score by analyzing the titles of news articles related to the selected cryptocurrency. A higher average score indicates a generally positive sentiment, while a lower score suggests a negative sentiment.
        </Text>
        <Text fontSize="md" lineHeight="tall" display={["none","none","none","block"]}>
          The sentiment score is represented on a scale from 0 to 10, where 0 indicates the most negative sentiment and 10 indicates the most positive sentiment.
        </Text>
      </Box>
      <Text fontSize="lg" fontWeight="medium" mt={4}>Select a cryptocurrency to analyze:</Text>
      <Flex flexWrap="wrap" gap={4}>
        {topCryptos.map((crypto, index) => (
          <Button
            variant={selectedCrypto === crypto ? "solid" : "outline"}
            key={index}
            onClick={() => handleSelectCrypto(crypto)}
            colorScheme="teal"
            size="lg"
          >
            {crypto}
          </Button>
        ))}
      </Flex>

      {selectedCrypto && (
        <Button
          onClick={handleAnalyze}
          colorScheme="blue"
          size="lg"
          mt={4}
          isLoading={isAnalyzing}
          loadingText="Analyzing..."
        >
          Analyze {selectedCrypto}
        </Button>
      )}

      {isAnalyzing && (
        <Flex alignItems="center" mt={4}>
          <Spinner size="md" mr={4} />
          <Text fontSize="lg">{analysisStep}</Text>
        </Flex>
      )}

      {sentimentData && (
        <>
          <Box width="100%" mt={6}>
            <Box p={6} bg={cardBg} borderRadius="lg" boxShadow="md" color={color}>
              <Text fontSize="lg" fontWeight="bold" mb={2}>Overall Sentiment:</Text>
              <Text fontSize="2xl" fontWeight="bold" mb={4}>{(sentimentData.averageSentiment).toFixed(1)}/10</Text>
              <Progress
                value={sentimentData.averageSentiment === 0 ? 1 : (sentimentData.averageSentiment) / 10 * 100}
                size="lg"
                colorScheme={sentimentData.averageSentiment > 5 ? 'green' : 'red'}
                borderRadius="full"
              />
            </Box>
          </Box>

          <Heading size="sm" mt={6} mb={3}>Articles used in analysis</Heading>
          <Flex flexDirection="column" gap={4}>
            {sentimentData.articles.map(article =>
              <Box key={article.url} p={3} bg={cardBg} borderRadius="lg" boxShadow="md">
                <Flex flexDir={["column", "column", "row"]} gap={4} alignItems="center">
                  <Img borderRadius="lg" src={article.image} objectFit="cover" maxH="120px" maxW="120px" flexShrink={0}/>
                  <Flex flexDirection="column" justifyContent="space-between" gap={2} flex={1}>
                    <Heading size="xs">{article.title}</Heading>
                    <Button 
                      onClick={() => window.open(article.url, '_blank').focus()} 
                      variant="link" 
                      color={color}
                      fontWeight="medium"
                      fontSize="md"
                      alignSelf="flex-start"
                    >
                      Read full article {">"}
                    </Button>
                  </Flex>
                </Flex>
              </Box>
            )}
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default Page;
