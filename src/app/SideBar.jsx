"use client"
import { HiPlus } from "react-icons/hi";
import { Button, Flex, Heading, Text, Box, Spacer, useDisclosure, useToast, useColorModeValue } from '@chakra-ui/react'
import { GrHome, GrOverview } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa6";
import { FiSend, FiSettings } from "react-icons/fi";
import React, { useEffect, useState, useRef } from 'react'
import SidebarButton from './SidebarButton';
import Image from 'next/image';
import pfp from "../../public/pfp.png"
import { LuBrain } from "react-icons/lu";


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
  const bg = useColorModeValue('#EBEBED', '#1D1D21')
  const color = useColorModeValue('black', 'white')
  const buttonBg = useColorModeValue('#EBEBED', '#1D1D21')
  const buttonHoverBg = useColorModeValue('#C8C8C8', '#2D2D32')
  const buttonColor = useColorModeValue('#222222', '#E0E0E0')

  const toast = useToast()
  const popupRef = useRef(null);

  async function disconnectWallet() {
    window.ethereum.on("disconnect", () => {});

    dispatch(disconnect())
    console.log("logged out");
    toast({
      title: "Wallet disconnected",
      description: `Your wallet is now disconnected.`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position:"bottom-right"
    });
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
      <Flex w={[90, 90, 300]} height="100vh" padding={2} position="sticky" flexDir="column" gap={9} bgColor={bg} color={color} textColor={color}>

        <Flex  bgColor={bg} color={color} textColor={color} marginTop={10} flexDir="column" gap={7}>
        {account != null ? 
         <Button
         height={20}
         borderRadius={7}
         bg={buttonBg}
         _hover={{ bg: buttonHoverBg }}
         color={buttonColor}
         padding={5}
         onClick={isOpen? onClose: onOpen}
         transition="all 0.2s"
         boxShadow="md"
       >
         <Flex  align="center" justify="center">
           <Image width={40} height={40} src={pfp} alt="Profile Picture" />
           <Flex display={["none", "none", "flex"]} flexDirection="column" alignItems="flex-start" ml={3}>
             <Text fontWeight="bold">{account ? shortenAddress(account) : ""}</Text>
             <Text fontSize="sm" opacity={0.8}>Eth Address</Text>
           </Flex>
         </Flex>
       </Button>
          :
            <Flex  flexDir="column" gap={[8,8,3]} justifyContent="center" alignItems="center">
              <Heading display={["none", "none","unset"]} size="md">Welcome to Cerion</Heading>
              <Heading display={["unset", "unset", "none"]} size="xs">Cerion</Heading>
              <Text display={["none","none" ,"unset"]} textAlign="center">Your crypto wallet <br /> for everything on chain</Text>
              <ConnectWallet isSideBar/>
            </Flex>
          }
          <SidebarButton Title={"Explore"} Icon={<GrOverview />} />
          <SidebarButton Destination="AI" Title={"AI Market Analysis"} Icon={<LuBrain />} />
          

          {account != null? 
<>
          <SidebarButton Title={"My Wallet"} Icon={<GrHome />} />
          {/* <SidebarButton Title={"Send"} Icon={<FiSend />} /> */}
          </>
          :<></>
          }
          <SidebarButton Title={"Buy Crypto"} Destination="Buy" Icon={<HiPlus />} />
          <SidebarButton Title={"Settings"} Icon={<FiSettings />} />
          </Flex>
      </Flex>

      {isOpen && (
        <Flex
        bgColor={bg} color={color} textColor={color}
        flexDirection="column"
        gap={4}
          ref={popupRef}
          position="absolute"
          top="120px" // adjust based on your layout
          left={20} // adjust based on your layout
          // backgroundColor="#16161A"
          // color="white"
          padding={4}
          borderRadius="8px"
          boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)"
          zIndex="1000"
          height="max-content"
          width="max-content"
        >
          <Text>{ shortenAddress(account)}</Text>
          <Text>Eth Address • MetaMask</Text>
          <Flex flexDir="column">
          {/* <Button variant="link" textColor="white">Connect another wallet</Button> */}
          <Button
       
colorScheme="red"

          onClick={disconnectWallet} variant="outline"  >Disconnect Wallet</Button>
          </Flex>
        </Flex>
      )}
    </>
  );
}

export default SideBar;
