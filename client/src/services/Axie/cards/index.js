import store from 'store';

import { createRequest } from 'services/http';
import { setCardsData } from 'duck/cards';

const CDN_CARDS = 'https://storage.googleapis.com/axie-cdn/game/cards';
const CDN_CARDS_DATA = `${CDN_CARDS}/card-abilities.json`;

export const getCardSrc = key => `${CDN_CARDS}/base/${key}.png`;

export const getPartCardData = (partName) => {
  const { cards } = store.getState();

  return cards[partName];
}

export const requestCardsData = async () => {
  const { data } = await createRequest('get', CDN_CARDS_DATA)

  const parsedData = {};

  Object.entries(data).forEach((entry) => {
    parsedData[entry[1].partName] = {
      ...entry[1],
      abilityKey: entry[0],
      src: getCardSrc(entry[0]),
    }
  });

  console.log(parsedData);

  store.dispatch(setCardsData(parsedData));
};
