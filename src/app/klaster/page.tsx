
"use client"

import { ConnectButton, useAccount, useWallets } from '@particle-network/connectkit'
import React, {useState, useEffect} from 'react'
import {initKlaster, Address, klasterNodeHost, rawTx, loadBicoV2Account, singleTxm,singleTx, buildMultichainReadonlyClient, MultichainTokenMapping, MultichainClient, buildTokenMapping, deployment, encodeBridgingOps, buildItx, } from "klaster-sdk"
import { arbitrum, base, optimism, polygon, scroll, baseSepolia } from "viem/chains";
import { encodeFunctionData, erc20Abi, formatEther, formatUnits, parseEther, parseUnits } from 'viem';
import { acrossBridgePlugin } from '@/lib/cross-bridge-plugin';
import { liFiBrigePlugin } from '@/lib/lFi-bridge.plugin';
import { acrossBridgePlugin2 } from '@/lib/cross-bridge-plugin-2';
export default function page() {
    const [klasterInstance, setklasterInstance] = useState(null)
    const [primaryWallet] = useWallets();
    const {address, chain}  = useAccount()

    const [klaster, setKlaster] = useState(null);

    const walletClient = primaryWallet?.getWalletClient();

    console.log("the wallet client", walletClient)

    useEffect(() => {
      const initializeKlaster = async () => {
        try {
  
          const klasterInstance = await initKlaster({
            accountInitData: loadBicoV2Account({
              owner: address,
            }),
            nodeUrl: klasterNodeHost.default,
          });
      console.log("klaster instance address", klasterInstance.account.uniqueAddresses)
          setKlaster(klasterInstance);
        } catch (error) {
          console.error("Error initializing Klaster:", error);
        }
      };
  
      initializeKlaster();
    }, [address]);


    // This is a hacky way of doing this, just to get you quickly started
// with the tutorial. Please don't initialize the client like this in
// production projects.
const mcClient = buildMultichainReadonlyClient(
  [optimism, base, polygon, arbitrum, scroll, baseSepolia].map((x) => {
    return {
      chainId: x.id,
      rpcUrl: x.rpcUrls.default.http[0],
    };
  })
);


// A lambda which intersects the chains available in the
// token mapping with the ones available in the multichain client.
// In general, you should not be using this in a production project.
// Instead, you should create your own tokenmappings by the method shown
// above.
const intersectTokenAndClients = (
  token: MultichainTokenMapping,
  mcClient: MultichainClient
) => {
  return token.filter((deployment) =>
    mcClient.chainsRpcInfo
      .map((info) => info.chainId)
      .includes(deployment.chainId)
  );
};
 
// Build a token mapping by calling the buildTokenMapping function and passing instances of
// deployment object into the array. These represent the chainId → address mappings.
const mcUSDC = buildTokenMapping([
  deployment(optimism.id, "0x0b2c639c533813f4aa9d7837caf62653d097ff85"),
  deployment(base.id, "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"),
  deployment(polygon.id, "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359"),
  deployment(arbitrum.id, "0xaf88d065e77c8cC2239327C5EDb3A432268e5831"),
  deployment(baseSepolia.id, "0x036CbD53842c5426634e7929541eC2318f3dCF7e")
])
// Store the intersection of the Klaster provided token and the chains your project is using.
const mUSDC = intersectTokenAndClients(mcUSDC, mcClient);



useEffect(() => {
  const getBalance = async ()  =>  {
    const uBalance = await mcClient.getUnifiedErc20Balance({
      tokenMapping: mUSDC,
      account: klaster.account,
    });

     const readableBalnce = formatUnits(uBalance.balance, 6)
     console.log("balances",  readableBalnce)

     console.log("full balances",  uBalance)
    return uBalance
  }
  getBalance()
}, [klaster])

    console.log("klaster", klaster?.account)


      const mainTransfer =  async ()  =>  {
        console.log("you hitted me")
      const bridgingOps =  await encodeBridgingOps({
        tokenMapping : mcUSDC,
        account : klaster?.account,
        amount : parseUnits("1", 6),
        destinationChainId : baseSepolia.id,
        bridgePlugin :    (data)  => acrossBridgePlugin2(data),
        client : mcClient
      })

       console.log("bridge information", bridgingOps)

      const opUSDC = mcUSDC.find(token =>  token.chainId === baseSepolia.id)
   
       const sendUsdc  =  rawTx({
         to: opUSDC?.address,
         gasLimit: BigInt(120000),
         data : encodeFunctionData({
          abi : erc20Abi,
          functionName : "transfer",
           args : [
            address,
            bridgingOps.totalReceivedOnDestination
 ]
         })
       }) 
     


    const  itx =   buildItx({
      steps : bridgingOps.steps.concat([
        singleTx(baseSepolia.id, sendUsdc),
      ]),
      feeTx : klaster?.encodePaymentFee(baseSepolia.id, "USDC")
    })

    const quote =   await  klaster.getQuote(itx)
     console.log("the quote of token", quote)

     // Sign a message
const  signed = await walletClient?.signMessage({
  message : {
    raw : quote.itxHash
  },
  account : address
})
  

const result = await klaster?.execute(quote, signed)

 console.log("signed message", signed)

 console.log("excuted results", result)
  }
  return (
    <div>
   <h1>klster test</h1>
   <p>nothing</p>
   <p>ADDRESS : {address}</p>
   <p>KLASTER ACC : </p>
   <ConnectButton   />

   <button onClick={() => mainTransfer()}>get quote</button>
    </div>
  )
}

  
