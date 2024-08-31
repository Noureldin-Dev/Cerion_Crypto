"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Button, Flex, Input } from '@chakra-ui/react'
import { isAddress } from 'ethers'
import { useRouter } from 'next/navigation'

function SearchBar() {
  const [SearchAddress, setSearchAddress] = useState("")
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [AddressValid, setAddressValid] = useState(null)
  const inputRef = useRef(null)
  const popoverRef = useRef(null)


  const Router = useRouter()
  const checkAddress = (event) => {
    if (isAddress(event.target.value)) {
      // Additional logic if the address is valid
setAddressValid(true)
    }else if (SearchAddress == ""){
      setAddressValid(null)
    }
    else{
      setAddressValid(false)

    }
    setSearchAddress(event.target.value)

  }

  // Handle outside clicks
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsPopoverOpen(false);
      }
    }

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Flex width="100%" background="#1D1D21" color="white" position="sticky" top="0" zIndex="1000">
      <Input
        ref={inputRef}
        value={SearchAddress}
        onFocus={() => setIsPopoverOpen(true)}
        onChange={checkAddress}
        placeholder="Search for an Ethereum address"
      />
      {isPopoverOpen && (
        <div
          ref={popoverRef}
          style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            backgroundColor: 'white',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            padding: '10px',
            borderRadius: '4px',
            background:"#2E2E32", color:"white" 
          }}
        >
          <div style={{ marginBottom: '10px', background:"#2E2E32", color:"white" }}>Search for address</div>
          {AddressValid? 
          <Button onClick={()=>Router.push("/"+SearchAddress)} colorScheme="blue">
            {SearchAddress}

          </Button>
          :
         
          <p>No address found</p>
        }
          
        </div>
      )}
    </Flex>
  )
}

export default SearchBar
