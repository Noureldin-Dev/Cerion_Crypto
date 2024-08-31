export default function shortenAddress(address) {


    const start = address.slice(0, 6);  // First 6 characters (0x + 4 more)
    const end = address.slice(-4);      // Last 4 characters
  
    return `${start}...${end}`;
  
  }