import React from 'react';
import {Web3Context} from 'web3-hooks'
import {useContext, useState} from 'react'
import {ethers} from "ethers"

import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Grid,
  theme,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,  
} from '@chakra-ui/react';

import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
  const [web3state, login] = useContext(Web3Context)
  const [ethBalance, setEthBalance] = useState(0)
  const [address, setAddress] = useState('0x0')
  const [eth2send, setEth2send] = useState(0)

  const donationRecipient = '0x36003f6f1374Cd42cB4a910CCE0B9B4216d79fE0';
      
        const handleClickGetBalance = async () => {
          try {
          const balance = await web3state.provider.getBalance(address)
          setEthBalance(ethers.utils.formatEther(balance))
          console.log(balance)
          } catch (e) {
            console.log(e)
          }
        }
      
        const handleClickSend = async () => {
          const weiAmount = ethers.utils.parseEther(eth2send)
          try {
            const tx = await web3state.signer.sendTransaction({
              to: address,
              value: weiAmount,
            })
            await tx.wait()
            console.log('TX MINED')
          } catch (e) {
            console.log(e)
          }
        }
      
        const handleClickDonate = async () => {
          const weiAmount = ethers.utils.parseEther(eth2send)
          try {
            const tx = await web3state.signer.sendTransaction({
              to: donationRecipient,
              value: weiAmount,
            })
            await tx.wait()
            console.log('TX MINED')
          } catch (e) {
            console.log(e)
          }
        }

  return (
    <ChakraProvider theme={theme}>
      
      <Box textAlign="center" fontSize="xl">

        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="center" />

          <Text color='#90CDF4'>Metamask installed: {web3state.isMetaMask ? 'yes' : 'no'}</Text>
          <Text color='#90CDF4'>Web3: {web3state.isWeb3 ? 'injected' : 'no-injected'}</Text>
          {!web3state.isLogged && (
            <>
            <Button colorScheme="blue" onClick={login}>login</Button>
            </>
          )}
          <Text color='#90CDF4'>Network id: {web3state.chainId}</Text>
          <Text color='#90CDF4'>Network name: {web3state.networkName}</Text>
          <Text color='#90CDF4'>account: {web3state.account}</Text>
          <Text color='#90CDF4'>Balance: {web3state.balance}</Text>

          <FormControl id="balanceOf">
            <FormLabel color='#E6FFFA' htmlFor="balanceOf">Balance Of :</FormLabel>
              <Input color='#90CDF4' id="balanceOf" 
              type="text" 
              value={address}
              placeholder={"ethereum address"}
              onChange={(event) => setAddress(event.target.value)}/>
            <FormHelperText>Get balance of any ethereum address</FormHelperText>
             <Button onClick={handleClickGetBalance} colorScheme="blue">Get Balance</Button>
             <Text color='#90CDF4'>balance of : {address} : {ethBalance} ETH</Text>
          </FormControl>

          <FormControl id="sendEth">
            <FormLabel color='#E6FFFA' htmlFor="sendEth">Send Eth to :</FormLabel>
              <Input color='#90CDF4' id="sendEth" 
              type="text" 
              value={eth2send}
              placeholder={"eth amount"}
              onChange={(event) => setEth2send(event.target.value)}/>
            <FormHelperText>Send Eth to a given address</FormHelperText>
             <Button onClick={handleClickSend} colorScheme="blue">Send Eth</Button>
             <Text color='#90CDF4'>sending to : {address}, {eth2send} ETH</Text>
          </FormControl>
          <VStack spacing={8}>

          <FormControl id="donateEth">
            <FormLabel color='#E6FFFA' htmlFor="donateEth">Donate to Bob :</FormLabel>
              <Input color='#90CDF4' id="donateEth" 
              type="text" 
              value={eth2send}
              placeholder={"eth amount"}
              onChange={(event) => setEth2send(event.target.value)}/>
            <FormHelperText>Donate some money to bob</FormHelperText>
             <Button onClick={handleClickDonate} 
             colorScheme="blue">Donate</Button>
             <Text color='#90CDF4'>sending to : {donationRecipient} value: {eth2send} ETH</Text>
          </FormControl>
          
          
          
            <Text>
              Contact :
            </Text>
            <Link
              color="teal.500"
              href="https://github.com/LeKarimDerradji"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </VStack>
        </Grid>
      </Box>
     
    </ChakraProvider>
  );
}

export default App;
