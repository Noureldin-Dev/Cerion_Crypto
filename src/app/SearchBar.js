"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Button, Flex, Input, useColorModeValue, Box, IconButton } from '@chakra-ui/react'
import { isAddress } from 'ethers'
import { useRouter } from 'next/navigation'
import { FaSearch } from 'react-icons/fa'

function SearchBar() {
  const [SearchAddress, setSearchAddress] = useState("")
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [AddressValid, setAddressValid] = useState(null)
  const bg = useColorModeValue('#F5F5F7', '#16161A')
  const color = useColorModeValue('black', 'white')
  const inputBg = useColorModeValue('white', '#2E2E32')
  const inputColor = useColorModeValue('black', 'white')
  const popoverBg = useColorModeValue('white', '#2E2E32')
  const popoverColor = useColorModeValue('black', 'white')
  const inputRef = useRef(null)
  const popoverRef = useRef(null)

  const Router = useRouter()
  const checkAddress = (event) => {
    const value = event.target.value
    setSearchAddress(value)
    setAddressValid(value === "" ? null : isAddress(value))
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!popoverRef.current?.contains(event.target) && !inputRef.current?.contains(event.target)) {
        setIsPopoverOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = () => {
    if (AddressValid) {
      Router.push("/" + SearchAddress)
    }
  }

  return (
    <Box width="100%" background={bg} position="sticky" top="0" zIndex="1000" py={2}>
      <Flex maxWidth="container.xl" mx="auto" alignItems="center">
        <Input
          ref={inputRef}
          value={SearchAddress}
          onFocus={() => setIsPopoverOpen(true)}
          onChange={checkAddress}
          placeholder="Search for an Ethereum address"
          bg={inputBg}
          color={inputColor}
          borderColor={useColorModeValue('gray.300', 'gray.600')}
          _hover={{ borderColor: useColorModeValue('gray.400', 'gray.500') }}
          _focus={{ borderColor: 'blue.500', boxShadow: 'outline' }}
          size="md"
          borderRadius="full"
          mr={2}
        />
        <IconButton
          icon={<FaSearch />}
          onClick={handleSearch}
          isDisabled={!AddressValid}
          colorScheme="blue"
          borderRadius="full"
          aria-label="Search"
        />
        {isPopoverOpen && (
          <Box
            ref={popoverRef}
            position="absolute"
            top="100%"
            left="0"
            right="0"
            bg={popoverBg}
            boxShadow="md"
            zIndex={1000}
            p={2}
            borderRadius="md"
            color={popoverColor}
            mt={1}
          >
            {AddressValid ? 
              <Button 
                onClick={handleSearch}
                colorScheme="blue"
                width="100%"
                size="sm"
                borderRadius="full"
              >
                Search: {SearchAddress}
              </Button>
              :
              <Box color={useColorModeValue('gray.600', 'gray.400')} fontSize="sm">No valid address found</Box>
            }
          </Box>
        )}
      </Flex>
    </Box>
  )
}

export default SearchBar
