import contracts from 'shared/contracts';
import store from 'store';

import { setContract } from 'duck/contracts';
import { initContract as initWeb3Contract, fromWei } from 'services/Web3Service';

export const initContract = async () => {
  const WETH = await initWeb3Contract(
    contracts.WETH.abi,
    contracts.WETH.address,
  );

  store.dispatch(setContract({ WETH }));
  return WETH;
};

export const balanceOf = async (account) => {
  let { WETH } = store.getState().contracts;

  if (!WETH) {
    WETH = await initContract();
  }

  const balanceOf = await WETH.methods
    .balanceOf(account)
    .call();

  return fromWei(balanceOf);
};
