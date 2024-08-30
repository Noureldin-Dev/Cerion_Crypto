"use client"

import { Button, Flex, Heading, Text, Box, Spacer, useDisclosure } from '@chakra-ui/react'
import { GrHome, GrOverview } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa6";
import { FiSend, FiSettings } from "react-icons/fi";
import React, { useEffect, useState, useRef } from 'react'
import SidebarButton from './SidebarButton';
import Image from 'next/image';
import pfp from "../../public/pfp.png"

import { disconnect } from './WalletSlice';
import { useSelector, useDispatch } from 'react-redux'
import ConnectWallet from './ConnectWallet';


function shortenAddress(address) {


  const start = address.slice(0, 6);  // First 6 characters (0x + 4 more)
  const end = address.slice(-4);      // Last 4 characters

  return `${start}...${end}`;

}


const SideBar = () => {
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
 const account =  useSelector((state) => state.wallet.value)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch()

  const popupRef = useRef(null);



  async function disconnectWallet() {
    window.ethereum.on("disconnect", () => {});

    dispatch(disconnect())
    console.log("logged out");
    onClose()
  }

  useEffect(() => {
    if (window.ethereum) {
      setIsWalletInstalled(true);
    }

    // Handle clicks outside of the popup to close it
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Flex width={"13vw"} height="100vh" padding={2} position="sticky" flexDir="column" gap={9} bgColor="#1D1D21" color="#1D1D21" textColor="white">

        <Flex marginTop={10} flexDir="column" gap={7}>
        {account != null ? 
         <Button

         height={20}
         borderRadius={7}
         backgroundColor="#1D1D21"
         _hover={{ bg: "#2D2D32" }}
         textColor="#CECFD1"
         padding={5}
         onClick={onOpen}
       >
         <Flex gap={2}>
           <Image width={40} height={40} src={pfp} />
           <Flex alignItems="flex-start" flexDir="column" gap={2}>
             <Text size="sm">{account == null? "":shortenAddress(account)}</Text>
             <Text size="sm">$2</Text>
           </Flex>
         </Flex>
       </Button>
          :
            <Flex flexDir="column" gap={2} justifyContent="center" alignItems="center">
              <Heading size="md">Welcome to Cerion</Heading>
              <Text>Your crypto wallet <br /> for everything on chain</Text>
              <ConnectWallet/>
            </Flex>
          }
          <SidebarButton Title={"Overview"} Icon={<GrHome />} />
          <SidebarButton Title={"Explore"} Icon={<GrOverview />} />
          <SidebarButton Title={"Favourites"} Icon={<FaRegHeart />} />
          <SidebarButton Title={"Send"} Icon={<FiSend />} />
          <SidebarButton Title={"Settings"} Icon={<FiSettings />} />
        </Flex>
      </Flex>

      {isOpen && (
        <Box
          ref={popupRef}
          position="absolute"
          top={20} // adjust based on your layout
          left={5} // adjust based on your layout
          backgroundColor="#16161A"
          color="white"
          padding={4}
          borderRadius="8px"
          boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)"
          zIndex="1000"
        >
          <Text>{ account == null? <></>:()=>shortenAddress(account)}</Text>
          <Text>$7.03 • MetaMask</Text>
          <Flex flexDir="column">
          <Button variant="link" textColor="white">Connect another wallet</Button>
          <Button onClick={disconnectWallet} variant="link" textColor="white">Disconnect Wallet</Button>
          </Flex>
        </Box>
      )}
    </>
  );
}

export default SideBar;
