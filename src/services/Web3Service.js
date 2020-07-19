import Web3 from 'web3';
import { OpenSeaPort, Network } from 'opensea-js';
import BigNumber from 'bignumber.js';
import store from 'store';

import { setUserData } from 'duck/user';
import { setWeb3 } from 'duck/web3';
import { setOpensea } from 'duck/opensea';
import { balanceOf } from 'services/WETHService';

export const parseWeiToFixed = (string, decimals) => {
  let numberString = string;
  numberString = +parseFloat(string).toFixed(decimals);

  return numberString;
};

export const fromWei = (amount) => {
  const { web3 } = store.getState();

  return web3.utils.fromWei(amount.toString(), 'ether');
};

export const BNToNumber = bigNumber => (
  BigNumber(bigNumber).toString()
);

export const BNToETH = bigNumber => (
  parseWeiToFixed(fromWei(BNToNumber(bigNumber)), 2)
);

export const toWei = (amount) => {
  const { web3 } = store.getState();

  return web3.utils.toWei(amount.toString(), 'ether');
};

const initAccountAddres = (web3) => {
  const { address } = store.getState().user;

  web3.eth.getAccounts().then(async (accounts) => {
    if (accounts[0] !== address) {
      const balanceWETH = parseWeiToFixed(await balanceOf(accounts[0]), 3);
      const balanceETH = parseWeiToFixed(fromWei(await web3.eth.getBalance(accounts[0])), 3);

      store.dispatch(setUserData({
        address: accounts[0],
        balanceWETH,
        balanceETH,
      }));
    }
    return null;
  });

  // checking if user switched accounts in interval
  setTimeout(() => {
    initAccountAddres(web3);
  }, 2000);
};

export const initWeb3 = async () => {
  let { web3 } = window;

  // new privacy mode -> request account access if needed
  if (window.ethereum) {
    console.log("CONNECT: WINDOW.ETHEREUM");
    // eslint-disable-next-line
    web3 = new Web3(window.ethereum);
    try {
      // eslint-disable-next-line
      await window.ethereum.enable();
    } catch (error) {
      // if user denies access
      console.error(error);
    }
  } else if (web3) {
    console.log("CONNECT: OLD WAY");
    // old way of asking for web3
    web3 = new Web3(web3.currentProvider);
  } else {
    console.log("CONNECT: INFURA");
    // connect to custom provider, like Infura if there is no wallet detected
    web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/Fi6gFcfwLWXX6YUOnke8'));
  }

  const opensea = new OpenSeaPort(web3._provider, {
    networkName: Network.Main,
  });

  store.dispatch(setWeb3(web3));
  store.dispatch(setOpensea(opensea));
  initAccountAddres(web3);
};

export const initContract = (abi, address) => {
  const { web3 } = store.getState();

  if (!web3) {
    return new Promise(resolve => setTimeout(() => {
      resolve(initContract(abi, address));
    }, 1000));
  }

  return new web3.eth.Contract(abi, address);
};
