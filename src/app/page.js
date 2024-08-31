"use client"

import { AbsoluteCenter, Box, Button, Center, Divider, Flex, Heading, Input, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import CoinsList from "./CoinsList";
import crypto_address_validator from "cryptocurrency-address-validator";
import Metamask from "../../public/metamask.svg";
import { useEffect, useState } from "react";
import RetrieveBalance from "./RetrieveBalance";
import { isAddress } from "ethers";
import SearchBar from "./SearchBar";
import ConnectWallet from "./ConnectWallet";
import { useSelector, useDispatch } from 'react-redux';
import WalletOverview from "./WalletOverview";

export default function Home() {
  const [Coins, setCoins] = useState(null);
  const account = useSelector((state) => state.wallet.value);

  async function connectWallet() {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts) => {
        setAccount(accounts[0]);
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  }

  useEffect(() => {
    console.log("hello");
    RetrieveBalance({ address: "0xce9740C57118dC4D28a7c0863A8CC3AD0b8Fd8F5" }).then((r) => {
      setCoins(r);
    });
  }, []);

  return (
    <>
      {account == null ?
        <AbsoluteCenter>
          <Flex height="70vh" alignItems="center" justifyContent="center" flexWrap="wrap" gap={16} padding={10} position="relative">
            <Flex width="80%" minWidth="300px" alignItems="center" justifyContent="center" gap={3} height={200} flexDir="column">
              <Heading size={["md", "md", "lg"]}>Connect to Cerion</Heading>
              <Text fontSize="lg" color="gray.500" mb={4}>Join our platform to explore and manage your cryptocurrency assets seamlessly. Connect your wallet to get started!</Text>
              <ConnectWallet />
            </Flex>

            <Divider color="white" orientation="horizontal" />

            <Flex width="80%" minWidth="300px" height={200} alignItems="center" justifyContent="center" gap={3} flexDir="column">
              <Heading size={["md", "md", "lg"]}>Track a Wallet</Heading>
              <Text fontSize="lg" color="gray.500" mb={4}>Enter a wallet address to view its transaction history and balance. Stay informed about your assets.</Text>
              <SearchBar />
            </Flex>
          </Flex>
        </AbsoluteCenter> :
        <>
          <WalletOverview address={account} />
        </>
      }
    </>
  );
}
