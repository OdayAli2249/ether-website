import { UseQueryOptions, useQuery } from 'react-query';
import { queryClient } from '../helpers/queryClient';
import { web3Client } from '../helpers/web3Client';
import { getBalanceErrorMessage } from '../helpers/constants';

const BalanceKey = 'balance-get';

export function useGetBalanceQuery(address: string, options?: UseQueryOptions<string>) {
    const key = [BalanceKey];
    return useQuery<string, any>(
        key,
        async () => {
            try {
                var result: string | bigint = await web3Client.eth.getBalance(address);
                return result.toString();
            } catch (error) {
                // error may happen if api key / address is fake or not correct
                throw new Error(getBalanceErrorMessage);
            }
        }, options)
}

export function invalidateBalanceQuery() {
    queryClient.invalidateQueries({ queryKey: [BalanceKey], refetchActive: true });
}