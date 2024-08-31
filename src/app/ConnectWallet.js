import { Button, Flex, Text, useToast } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWallet } from './WalletSlice'; // Adjust the path accordingly
import Metamask from "../../public/metamask.svg";

export default function ConnectWallet({isSideBar = false}) {
  const [Account, setAccount] = useState(null);
  const wallet = useSelector((state) => state.wallet);
  const dispatch = useDispatch();
  const toast = useToast();

  async function connectWallet() {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts) => {
        setAccount(accounts[0]);
        dispatch(setWallet(accounts[0]));
        toast({
          title: "Wallet Connected",
          description: `Your wallet (${accounts[0]}) is now connected.`,
          status: "success",
          duration: 3000,
          isClosable: true,
      position:"bottom-right"

        });
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  }



  return (
    <>
      {
        wallet.value == null ?
          <>
            <Button size="sm" onClick={connectWallet}>
              <Flex align="center">
                <Image width={20} height={20} src={Metamask} alt="Metamask Icon"/>
                {isSideBar?
                <Text display={["none","none", "unset"]} ml={2}>Connect with Metamask</Text>:
                
                <Text ml={2}>Connect with Metamask</Text>
              }
              </Flex>
            </Button>
          </>
          :
          <></>
      }
    </>
  )
}
