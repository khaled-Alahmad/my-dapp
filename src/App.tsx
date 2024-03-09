import React, { useState } from 'react';
import Web3 from 'web3';
import styles from './App.module.css';

const web3 = new Web3('https://mainnet.infura.io/v3/aa6ef8e480f3417e8d157bf4667f4019');

const USDTContractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
const USDTAbi = [{ "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }];

const App = () => {
  const [address, setAddress] = useState('');
  const [lastBlockNumber, setLastBlockNumber] = useState<number | null>(null);
  const [usdtBalance, setUsdtBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getLastBlockNumber = async () => {
    try {
      const blockNumber = await web3.eth.getBlockNumber();
      setLastBlockNumber(Number(blockNumber));
    } catch (error: any) {
      setError(error.message);
    }
  };


  const getUSDTBalance = async () => {
    try {
      const contract = new web3.eth.Contract(USDTAbi, USDTContractAddress);
      const balance: string = await contract.methods.balanceOf(address).call();
      setUsdtBalance(web3.utils.fromWei(balance, 'ether'));
    } catch (error: any) {
      setError(error.message);
    }
  };



  return (
    <div className={styles.app}>
      <div className={styles.card}>
        <h1>Ethereum Mainnet Explorer</h1>
        <div className={styles.flexContainer}>
          <button onClick={getLastBlockNumber} className={styles.button}>Get Last Block Number</button>
          {lastBlockNumber !== null && <p>Last Block Number: {lastBlockNumber}</p>}
        </div>
        <div className={styles.flexContainer}>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Ethereum Address" className={styles.input} />
          <button onClick={getUSDTBalance} className={styles.button}>Get USDT Balance</button>
        </div>
        {usdtBalance !== null && <p>USDT Balance: {usdtBalance}</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </div>
    </div>
  );
};

export default App;
