// app/layout.tsx
import { Divider, Flex } from '@chakra-ui/react'
import { Providers } from './provider'
import SideBar from './SideBar'
import SearchBar from './SearchBar' // Import your SearchBar component


export default function RootLayout({
  children,
}) {
  return (
    <html lang='en'>
      <body style={{ overflow: 'hidden', background:"#16161A", color:"white" }}>
        <Providers>
          <Flex gap={2} justifyContent="flex-start" height="100vh">
            <Flex flexShrink={0}>
              <SideBar />
            </Flex>
            <Flex position="relative" flexDirection="column" flex="1" overflowY="auto">
              <Flex  padding={5} width="100%">
              <SearchBar />
              
              </Flex>
              <Flex bgColor="#16161A" padding={18}>
                {children}
              </Flex>
            </Flex>
          </Flex>
        </Providers>
      </body>
    </html>
  )
}
