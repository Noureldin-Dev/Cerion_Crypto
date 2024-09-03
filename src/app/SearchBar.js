"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Button, Flex, Input, Box, IconButton } from '@chakra-ui/react'
import { isAddress } from 'ethers'
import { useRouter } from 'next/navigation'
import { FaSearch } from 'react-icons/fa'

function SearchBar() {
  const [SearchAddress, setSearchAddress] = useState("")
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [AddressValid, setAddressValid] = useState(null)
  const inputRef = useRef(null)
  const popoverRef = useRef(null)

  const lightBg = '#F5F5F7'
  const darkBg = '#16161A'
  const lightColor = '#333333'
  const darkColor = '#E0E0E0'
  const lightCardBg = 'white'
  const darkCardBg = '#1D1D21'
  const lightSubtextColor = 'gray.600'
  const darkSubtextColor = 'gray.400'

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
    <Box width="100%" background={lightBg} _dark={{bg: darkBg}} position="sticky" top="0" zIndex="1000" py={2}>
      <Flex maxWidth="container.xl" mx="auto" alignItems="center">
        <Input
          ref={inputRef}
          value={SearchAddress}
          onFocus={() => setIsPopoverOpen(true)}
          onChange={checkAddress}
          placeholder="Search for an Ethereum address"
          bg={lightCardBg}
          color={lightColor}
          borderColor="gray.300"
          _hover={{ borderColor: 'gray.400' }}
          _focus={{ borderColor: 'blue.500', boxShadow: 'outline' }}
          _dark={{
            bg: darkCardBg,
            color: darkColor,
            borderColor: 'gray.600',
            _hover: { borderColor: 'gray.500' }
          }}
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
            bg={lightCardBg}
            boxShadow="md"
            zIndex={1000}
            p={2}
            borderRadius="md"
            color={lightColor}
            mt={1}
            _dark={{
              bg: darkCardBg,
              color: darkColor
            }}
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
              <Box color={lightSubtextColor} _dark={{color: darkSubtextColor}} fontSize="sm">No valid address found</Box>
            }
          </Box>
        )}
      </Flex>
    </Box>
  )
}

export default SearchBar
