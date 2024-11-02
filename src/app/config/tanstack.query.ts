import { QueryCache, QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1분
      gcTime: 1000 * 60 * 5, // 5분
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },

  queryCache: new QueryCache({
    onError: (error, query) => {
      switch (query.queryKey[0]) {
        case "tags":
          console.error("태그 가져오기 오류:", error)
          break

        default:
          console.error(`[Query ${query.queryKey.join("/")}] 오류:`, error)
      }
    },
  }),
})
