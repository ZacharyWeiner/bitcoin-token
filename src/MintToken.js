import React, { useState } from 'react'
import Utils from './utils'

function MintToken({ computer }) {
  const [supply, setSupply] = useState(0)
  const [name, setName] = useState('')
  const [isVisible, setVisible] = useState(false)

  const mintToken = async (e) => {
    try {
      e.preventDefault()
      const publicKey = computer.db.wallet.getPublicKey().toString()
      const TokenSc= await Utils.importFromPublic('/token-sc.js')
      const token = await computer.new(TokenSc, [publicKey, supply, name])
      alert(`Minted ${supply} tokens.`)
      console.log(`Minted ${supply} tokens ${token._id}`)
    } catch (err) {
      if(err.message.startsWith('Insufficient balance in address'))
        alert('You have to fund your wallet https://faucet.bitcoincloud.net/')
    }

  }
  return <>
    <button onClick={() => setVisible(true)}>Mint Token</button>
    {
      isVisible && <div id="myModal" class="modal">
        <div class="modal-content">
          <span class="close" onClick={() => setVisible(false)}>&times;</span>
          <h1>Mint</h1>
          <form onSubmit={mintToken}>
            Token Supply<br />
            <input type="number" value={supply} onChange={(e) => setSupply(e.target.value)} /><br />
            Token Name<br />
            <input type="string" value={name} onChange={(e) => setName(e.target.value)} /><br />
            <button type="submit">Mint Token</button>
          </form>
        </div>
      </div>
    }
  </>
}

export default MintToken
