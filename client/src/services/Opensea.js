import store from 'store';

import { EGGS_WALLET, AXIE_TOKEN_ADDRESS } from 'shared/constants';

export const buyOrder = (order) => {
  const { user, opensea } = store.getState();

  opensea.fulfillOrder({
    order,
    accountAddress: user.address,
    referrerAddress: EGGS_WALLET,
  });
};

export const createBundleSellOrder = (bundle) => {
  const { user, opensea } = store.getState();
  const { Name, Description, Price, assets } = bundle;

  opensea.createBundleSellOrder({
    assets: assets.map(id => ({
      tokenId: id,
      tokenAddress: AXIE_TOKEN_ADDRESS,
    })),
    bundleName: Name,
    bundleDescription: Description,
    startAmount: Price,
    accountAddress: user.address,
    referrerAddress: EGGS_WALLET,
  });
};
