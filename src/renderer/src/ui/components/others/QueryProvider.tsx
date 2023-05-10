import { AuthError, clearUserSession } from "@renderer/utils";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FC, PropsWithChildren } from "react";

const STALE_TIME_MINUTES = 5;
const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME_MINUTES * 60 * 1000,
      onError: (error: unknown) => {
        if (error instanceof AuthError) {
          clearUserSession();
          queryClient.invalidateQueries();
        }
      },
    },
    mutations: {
      onError: (error: unknown) => {
        if (error instanceof AuthError) {
          clearUserSession();
          queryClient.invalidateQueries();
        }
      },
    },
  },
});

export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
