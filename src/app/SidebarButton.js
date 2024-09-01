import { Badge, Button, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

import React from 'react'


function SidebarButton({Title, Icon, Destination= Title}) {
    const router = useRouter()


  return (
    <Button onClick={() => router.push(Destination)} backgroundColor="#1D1D21" _hover={{bg:"#2D2D32"}}  textColor="#CECFD1" padding={6} justifyContent={["center", "center", "flex-start"]} minW="100%">
    <Flex flexDir={["column","column","row"]} justifyContent={"center"} alignItems="center" padding={1} gap={3}>
    {Icon}
      <Text display={["none","none", "unset"]} className="text-sm font-medium text-gray-900">{Title}</Text>
      {Destination =="AI"?   <Badge colorScheme='purple'>New</Badge> : <></>}
      </Flex>
      </Button>
  )
}

export default SidebarButton