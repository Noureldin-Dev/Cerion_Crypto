import { Button, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { disconnect, setWallet } from './WalletSlice'
import Metamask from "../../public/metamask.svg"

export default function ConnectWallet (){

    const [Account, setAccount] = useState(null)
    const wallet = useSelector((state) => state.wallet)
    const dispatch = useDispatch()

  async function connectWallet() {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts) => {
        setAccount(accounts[0]);
        dispatch(setWallet(accounts[0]))
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  }

  return (
<>

{
    wallet.value == null?
    <>
<Button onClick={connectWallet}>
  <Flex>
    <Image width={10} height={10} src={Metamask}/>
    <Text>Connect with Metamask</Text>
  </Flex>
</Button>
<span>{JSON.stringify(wallet)}</span>
</>

:
<></>
}
</>
  )
}