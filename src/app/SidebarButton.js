import { Button, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

import React from 'react'


function SidebarButton({Title, Icon}) {
    const router = useRouter()


  return (
    <Button onClick={() => Title == "Overview" ? router.replace("/") :router.push(Title)} backgroundColor="#1D1D21" _hover={{bg:"#2D2D32"}}  textColor="#CECFD1" padding={6} justifyContent="flex-start" minW="100%">
    <Flex justifyContent="flex-start" alignItems="center" padding={1} gap={3}>
    {Icon}
      <p className="text-sm font-medium text-gray-900">{Title}</p>
      </Flex>
      </Button>
  )
}

export default SidebarButton