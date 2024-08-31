"use client"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from 'next/navigation'
import { isAddress } from "ethers"
import WalletOverview from "../WalletOverview"
import { Flex } from "@chakra-ui/react"

export default function Page({ params }) {
  const router = useRouter();
  const pathname = usePathname();
  const [IsValidAddress, setIsValidAddress] = useState(null);

  useEffect(() => {
    if (isAddress(pathname.substring(1))) {
      setIsValidAddress(true);
    } else {
      setIsValidAddress(false);
      router.replace("/");
    }
  }, [pathname, router]);

  return (
    <Flex
      justify="center" // Center horizontally
      align="flex-start" // Align to the top
      minHeight="100%" // Ensure the container takes at least the full viewport height
      width="100vw" // Full viewport width
      pt="20px" // Optional: add some padding to the top
      // backgroundColor="whitesmoke" // Optional: add background color
    >
      {IsValidAddress && <WalletOverview address={params.Addresses} />}
    </Flex>
  );
}
