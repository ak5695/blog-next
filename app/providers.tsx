"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, ReactNode } from "react";

// 优化的 QueryClient 配置 - 减少不必要的重新请求
const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // 5 分钟内不重新请求
        staleTime: 1000 * 60 * 5,
        // 缓存 30 分钟
        gcTime: 1000 * 60 * 30,
        // 失败后不自动重试（博客内容不需要）
        retry: false,
        // 窗口聚焦时不重新请求
        refetchOnWindowFocus: false,
        // 重新连接时不重新请求
        refetchOnReconnect: false,
      },
    },
  });

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

