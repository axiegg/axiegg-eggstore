import { createRequest } from 'services/http';

export const getAxiePNG = id => (
  `https://storage.googleapis.com/assets.axieinfinity.com/axies/${id}/axie/axie-full-transparent.png`
);

export const getSingleAxie = id => createRequest('get', `https://axieinfinity.com/api/v2/axies/${id}`);
