import ETHIcon from 'assets/images/icons/eth_small.png';
import SAIIcon from 'assets/images/icons/sai_small.png';
import SLPIcon from 'assets/images/icons/slp_small.png';

export const AXIE_TOKEN_ADDRESS = '0xf5b0a3efb8e8e4c201e2a935f110eaaf3ffecb8d';
export const EGGS_WALLET = '0x0ed70f92b87ceced51a9e472fcd8d93a54a11835';

export const AXIE_TOKEN_ADDRESSES = [
  AXIE_TOKEN_ADDRESS, 
  '0x81Dde1BE69F32e25A3727351A4D12569310a2fE7',
  '0x8EaDBb0209ca4D1c299Dc403dEAE40421e2e075B',
  '0xcB5c0D33d92E4910daA24825dB8AF9b64E17C33C'
]

export const ERC20Mappings = {
  '0x37236cd05b34cc79d3715af2383e96dd7443dcf1': {
    name: 'SLP',
    icon: SLPIcon,
    convertOnly: true,
  },
  '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359': {
    name: 'SAI',
    icon: SAIIcon,
  },
  '': {
    name: 'ETH',
    icon: ETHIcon,
  },
  '0x0000000000000000000000000000000000000000': {
    name: 'ETH',
    icon: ETHIcon,
  },
};
