"use client"

import { Flex, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const Background = ({children}) => {
  const bg = useColorModeValue('#F5F5F7', '#16161A')
  const color = useColorModeValue('black', 'white')
  return (
    <Flex bg={bg} gap={2} justifyContent="flex-start" height="100vh">
{children}
</Flex>
  )
}

export default Background