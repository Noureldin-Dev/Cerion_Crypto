import { Badge, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

import React from 'react'


function SidebarButton({Title, Icon, Destination= Title}) {
    const router = useRouter()
    const buttonBg = useColorModeValue('#EBEBED', '#1D1D21')
    const buttonHoverBg = useColorModeValue('#C8C8C8', '#2D2D32')
    const buttonColor = useColorModeValue('#222222', '#E0E0E0')

  return (
    <Button 
      onClick={() => router.push(Destination)} 
      backgroundColor={buttonBg} 
      _hover={{bg: buttonHoverBg}}  
      textColor={buttonColor} 
      padding={6} 
      justifyContent={["center", "center", "flex-start"]} 
      minW="100%"
    >
      <Flex flexDir={["column","column","row"]} justifyContent={"center"} alignItems="center" padding={1} gap={3}>
        {Icon}
        <Text display={["none","none", "unset"]} className="text-sm font-medium">{Title}</Text>
        {Destination =="AI" ? <Badge colorScheme='purple'>New</Badge> : <></>}
      </Flex>
    </Button>
  )
}

export default SidebarButton