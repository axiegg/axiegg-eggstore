import { createRequest } from 'services/http';
import { decodeGenes, getPurenessQuality } from 'services/Axie';

export const getAxiePNG = id => (
  `https://storage.googleapis.com/assets.axieinfinity.com/axies/${id}/axie/axie-full-transparent.png`
);

export const getSingleAxie = async (id) => {
  const { data: axieData } = await createRequest('get', `https://axieinfinity.com/api/v2/axies/${id}`);
  const decodedParts = decodeGenes(axieData.genes);
  const purenessQuality = getPurenessQuality(decodedParts, axieData.class);

  return {
    ...axieData,
    customData: {
      decodedParts,
      purenessQuality,
    },
  }
};
