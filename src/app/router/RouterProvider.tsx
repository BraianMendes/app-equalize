import React, { createContext, useContext, useMemo, useState } from 'react';
import type { Navigate, RouteName, Router } from './types';

type RouterContextValue = Router;

const RouterContext = createContext<RouterContextValue | undefined>(undefined);

export function useRouter(): RouterContextValue {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within <RouterProvider>');
  return ctx;
}

export function RouterProvider({
  initialRoute = 'Login',
  children,
}: {
  initialRoute?: RouteName;
  children: React.ReactNode;
}) {
  const [stack, setStack] = useState<RouteName[]>([initialRoute]);
  const current = stack[stack.length - 1];
  const navigate: Navigate = (to) => setStack((s) => [...s, to]);
  const goBack = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  const canGoBack = stack.length > 1;

  const value = useMemo<RouterContextValue>(
    () => ({ current, navigate, goBack, canGoBack }),
    [current, canGoBack],
  );
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}
