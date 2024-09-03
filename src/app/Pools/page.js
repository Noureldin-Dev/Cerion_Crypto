"use client"

import { Flex, Heading, Text, Box, Container, VStack, Image, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { LuConstruction } from "react-icons/lu";

const Page = () => {
  const lightBg = '#F5F5F7'
  const darkBg = '#16161A'
  const lightColor = '#333333'
  const darkColor = '#E0E0E0'
  const lightCardBg = 'white'
  const darkCardBg = '#1D1D21'
  const lightSubtextColor = 'gray.600'
  const darkSubtextColor = 'gray.400'

  return (
    <Container maxW="container.xl"  bg={lightBg} _dark={{bg: darkBg}} minH="100%">
      <VStack spacing={[6, 8]} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size={["xl", "2xl"]} mb={2} color={lightColor} _dark={{color: darkColor}}>Crypto Liquidity Pools 💧</Heading>
          <Text fontSize={["lg", "xl"]} color={lightSubtextColor} _dark={{color: darkSubtextColor}}>Explore and manage your liquidity positions</Text>
        </Box>

        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          borderRadius="lg" 
          boxShadow="xl" 
          p={[6, 8]} 
          bg={lightCardBg}
          _dark={{bg: darkCardBg}}
          textAlign="center"
        >

            {/* for dark mode, should be white and no comment on possitoon */}
          <Box position="absolute" left="-9999px" visibility="hidden" _dark={{position: "static", left: "auto", visibility: "visible", mb: 4}} >
            <LuConstruction  size={60} color="white"/>
          </Box>
          {/* for light mode should be black and disappare in dark mode */}
          <Box mb={4} _dark={{position: "absolute", left: "-9999px", visibility: "hidden"}}>
            <LuConstruction size={60} color="black"/>
          </Box>

          <Heading as="h2" size={["lg", "xl"]} mb={4} color={lightColor} _dark={{color: darkColor}}>
            Coming Soon!
          </Heading>
          <Text fontSize={["md", "lg"]} color={lightSubtextColor} _dark={{color: darkSubtextColor}}>
            We&apos;re working hard to bring you the best liquidity pool management experience. 
            Stay tuned for updates!
          </Text>
        </Flex>

        <Flex alignItems="center" flexWrap="wrap" justifyContent={["center", "center", "space-between"]} gap={10} columns={[1, 2, 3]} spacing={6}>
          {['Pool Creation', 'Yield Farming', 'Analytics'].map((feature) => (
            <Box 
              flexBasis="30%"
              minW="300px"
              key={feature} 
              p={6} 
              bg={lightCardBg}
              _dark={{bg: darkCardBg}}
              borderRadius="lg" 
              boxShadow="md"
              textAlign="center"
            >
              <Heading as="h3" size={["md", "lg"]} mb={2} color={lightColor} _dark={{color: darkColor}}>
                {feature}
              </Heading>
              <Text fontSize={["sm", "md"]} color={lightSubtextColor} _dark={{color: darkSubtextColor}}>
                Advanced {feature.toLowerCase()} features coming soon.
              </Text>
            </Box>
          ))}
        </Flex>
      </VStack>
    </Container>
  );
}

export default Page;
