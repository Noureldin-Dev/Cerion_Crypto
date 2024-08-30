import { Box, Flex, Table, TableCaption, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect } from 'react'

const CoinsList = ({Coins}) => {

  return (
    <Flex flexDir="column">
      {Coins.map(coin=>
<Flex gap={3} padding={3} bg="orange">
<Text>{coin.Coin}</Text>
<Text>{coin.Balance}</Text>
<Text>{coin.Symbol}</Text>
<TableContainer>
  <Table variant='simple'>
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>inches</Td>
        <Td>millimetres (mm)</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td>feet</Td>
        <Td>centimetres (cm)</Td>
        <Td isNumeric>30.48</Td>
      </Tr>
      <Tr>
        <Td>yards</Td>
        <Td>metres (m)</Td>
        <Td isNumeric>0.91444</Td>
      </Tr>
    </Tbody>
    <Tfoot>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer>

</Flex>


      )}

    </Flex>
  )
}

export default CoinsList