import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FC, PropsWithChildren, useRef } from "react";

const STALE_TIME_MINUTES = 5;
const queryClient = new QueryClient({
  queryCache: new QueryCache(),
});

const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const isSecondRender = useRef(false);

  if (!isSecondRender.current) {
    queryClient.setDefaultOptions({
      queries: {
        onError: (error: unknown) => {
          console.warn(error);
          queryClient.clear();
        },
        staleTime: STALE_TIME_MINUTES * 60 * 1000,
      },
    });
    isSecondRender.current = true;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default QueryProvider;
