import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 0,
			staleTime: 2 * (60 * 1000), // 2 mins
			cacheTime: 10 * (60 * 1000), // 10 mins
			onError: (error: any) => {},
		},
	},
});
