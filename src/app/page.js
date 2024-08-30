"use client"

import { AbsoluteCenter, Box, Button, Center, Divider, Flex, Heading, Input, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import CoinsList from "./CoinsList"
import crypto_address_validator from "cryptocurrency-address-validator";
import Metamask from "../../public/metamask.svg"
import { useEffect, useState } from "react";
import RetrieveBalance from "./RetrieveBalance";
import { isAddress } from "ethers";
import SearchBar from "./SearchBar";
import ConnectWallet from "./ConnectWallet"
import { useSelector, useDispatch } from 'react-redux'
import WalletOverview from "./walletoverview"


export default function Home() {
	const [Coins, setCoins] = useState(null)
  const account =  useSelector((state) => state.wallet.value)


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


 useEffect(   ()=>{
	console.log("hello")
	RetrieveBalance({address :"0xce9740C57118dC4D28a7c0863A8CC3AD0b8Fd8F5" }).then((r)=>{
		setCoins(r)
	})
	
  },[])


  return (
<>
{account == null?

<AbsoluteCenter>
<Flex gap={16} padding={10} position="relative" >
	<Flex height={200} flexDir="column">
    {

    }
<Heading size="lg">Connect to Cerion</Heading>

<ConnectWallet/>

</Flex>

<Divider color="black"  orientation="vertical" />
<AbsoluteCenter>
	OR
</AbsoluteCenter>


<Flex gap={3} flexDir="column">
  <Heading size="xs">Track any wallet</Heading>
  <SearchBar/>
  
    </Flex>
  
  {/* <p>
	{JSON.stringify(Coins)}
  </p>

{Coins == null?
<p>nothing to show</p>:

<CoinsList Coins={Coins}/>

} */}


</Flex></AbsoluteCenter>:
<>
<WalletOverview address={account}/>
</>
}

</>

  );
}
