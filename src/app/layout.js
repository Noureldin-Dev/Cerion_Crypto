// app/layout.tsx
import { ColorModeScript, Divider, Flex } from '@chakra-ui/react'
import { Providers } from './provider'
import SideBar from './SideBar'
import SearchBar from './SearchBar' // Import your SearchBar component
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme.js"
import Background from './Background';
// const bg = useColorModeValue('#F5F5F7', '#1D1D21')
// const color = useColorModeValue('black', 'white')

export default function RootLayout({
  children,
}) 
{
  return (
    <html lang='en'>
      <body  style={{ overflow: 'hidden', color:"white"}}>
        <Providers>
        <ChakraProvider  >
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />


          <Background>
            <Flex flexShrink={0}>
              <SideBar />
            </Flex>
            <Flex position="relative" flexDirection="column" flex="1" overflowY="auto">
              <Flex  padding={5} width="100%">
              <SearchBar />
              
              </Flex>
              <Flex  padding={1}>
              <Flex
              // background="teal"
      justify="center" // Center horizontally
      align="flex-start" // Align to the top
      minHeight="100%" // Ensure the container takes at least the full viewport height
      width="100%" // Full viewport width
      pt="20px" // Optional: add some padding to the top
      // backgroundColor="whitesmoke" // Optional: add background color
      overflow="hidden"
    >
                {children}

                </Flex>
              </Flex>
            </Flex>
            </Background>
          </ChakraProvider></Providers>
      </body>
    </html>
  )
}
