import store from 'store';

import { EGGS_WALLET } from 'shared/constants';

export const buyOrder = (order) => {
  const { user, opensea } = store.getState();

  opensea.fulfillOrder({
    order,
    accountAddress: user.address,
    referrerAddress: EGGS_WALLET,
  });
};
