"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { isAddress } from "ethers";
import WalletOverview from "../WalletOverview";
import { Flex, Spinner, Text } from "@chakra-ui/react";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const [isValidAddress, setIsValidAddress] = useState(null);

  useEffect(() => {
    const address = pathname.substring(1);

    if (isAddress(address)) {
      setIsValidAddress(true);
    } else {
      setIsValidAddress(false);
      router.replace("/");
    }
  }, [pathname, router]);

  return (
    <Flex
      justify="center"
      align="flex-start"
      minHeight="100%"
      width="100%"
      pt="20px"
    >
      {isValidAddress === null ? (
        <Spinner size="xl" color="white" />
      ) : isValidAddress ? (
        <WalletOverview address={pathname.substring(1)} />
      ) : (
        <Text color="red.500">Invalid Address</Text>
      )}
    </Flex>
  );
}
