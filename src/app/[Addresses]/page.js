"use client"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from 'next/navigation'
import { isAddress } from "ethers"




export default function Page({ params }) {
  const router = useRouter()
  const pathname = usePathname()
  const [IsValidAddress, setIsValidAddress] = useState(null)

useEffect(()=>{
if (isAddress(pathname.substring(1))){
  setIsValidAddress(true)

}
else{
  setIsValidAddress(false)
  router.replace("/")
}
}
,[])

    return <>

hello
{}
    My Post: {params.slug}
    
    
    
    </>
  }