// app/layout.tsx
import { Divider, Flex } from '@chakra-ui/react'
import { Providers } from './provider'
import SideBar from './SideBar'
import SearchBar from './SearchBar' // Import your SearchBar component
import { ChakraProvider } from "@chakra-ui/react";


export default function RootLayout({
  children,
}) {
  return (
    <html lang='en'>
      <body style={{ overflow: 'hidden', background:"#16161A", color:"white" }}>
        <Providers>
        <ChakraProvider>

          <Flex gap={2} justifyContent="flex-start" height="100vh">
            <Flex flexShrink={0}>
              <SideBar />
            </Flex>
            <Flex position="relative" flexDirection="column" flex="1" overflowY="auto">
              <Flex  padding={5} width="100%">
              <SearchBar />
              
              </Flex>
              <Flex bgColor="#16161A" padding={18}>
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
          </Flex>
          </ChakraProvider></Providers>
      </body>
    </html>
  )
}
