import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { QueryClientProvider, QueryClient } from 'react-query';
import { useGetBalanceQuery } from './useGetBalanceQuery';
import { web3Client } from '../helpers/web3Client';

jest.mock('../helpers/web3Client', () => ({
    web3Client: {
        eth: {
            getBalance: jest.fn(),
        },
    },
}));

jest.mock('web3', () => {
    return jest.fn().mockImplementation(() => {
        return {
            eth: {
                getBalance: jest.fn(),
            },
        };
    });
});

describe('useGetBalanceQuery', () => {
    let queryClient: QueryClient;

    beforeAll(() => {
        queryClient = new QueryClient();
    });

    afterEach(() => {
        queryClient.clear();
    });

    it('should fetch balance successfully', async () => {
        const address = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
        const balance = '1';
        (web3Client.eth.getBalance as jest.Mock).mockResolvedValueOnce(balance);

        const wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) =>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
        const { result, waitForNextUpdate } = renderHook(() => useGetBalanceQuery(address), {
            wrapper: wrapper,
        });

        expect(result.current.isLoading).toBe(true);
        await waitForNextUpdate();
        expect(result.current.data).toEqual(balance);
        expect(result.current.isLoading).toBe(false);
    });

    it('should handle error gracefully', async () => {
        const address = 'invalid_address';
        const errorMessage = 'Error message';
        (web3Client.eth.getBalance as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

        const wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) =>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
        const { result, waitForNextUpdate } = renderHook(() => useGetBalanceQuery(address), {
            wrapper: wrapper,
        });

        expect(result.current.isLoading).toBe(true);
        await waitForNextUpdate();
        expect(result.current.error).toEqual(new Error(errorMessage));
        expect(result.current.isLoading).toBe(false);
    });
});
