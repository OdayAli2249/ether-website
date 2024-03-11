import { UseQueryOptions, useQuery } from 'react-query';
import { queryClient } from '../helpers/queryClient';
import { web3Client } from '../helpers/web3Client';
import { getLastBlockNumberErrorMessage } from '../helpers/constants';

const LastBlockNumberKey = 'last-block-number-get';

export function useGetLastBlockNumberQuery(options?: UseQueryOptions<string>) {
    const key = [LastBlockNumberKey];
    return useQuery<string, any>(
        key,
        async () => {
            try {
                const result = await web3Client.eth.getBlockNumber();
                return result.toString();
            } catch (error) {
                // error may happen if api key is fake or not correct
                throw new Error(getLastBlockNumberErrorMessage);
            }
        }, options)
}

export function invalidateLastBlockNumberQuery() {
    queryClient.invalidateQueries({ queryKey: [LastBlockNumberKey], refetchActive: true });
}