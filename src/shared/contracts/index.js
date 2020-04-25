import WETH_ABI from './WETH.json';

export const WETH_TOKEN = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';

const contracts = {
  WETH: {
    abi: WETH_ABI,
    address: WETH_TOKEN,
  },
};

export default contracts;
