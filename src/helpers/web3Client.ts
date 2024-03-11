import Web3 from "web3";

const apiKey = '094e2c2334b04832ad7471e581298f61';
const url = 'https://mainnet.infura.io/v3';

const provider = `${url}/${apiKey}`;
const web3Provider = new Web3.providers.HttpProvider(provider);
export const web3Client = new Web3(web3Provider);