import React, { createContext, useContext, useMemo } from 'react';
import type { HomeRepository } from '../domain/home/types';

const Ctx = createContext<HomeRepository | undefined>(undefined);

export function useHomeRepository(): HomeRepository {
  const value = useContext(Ctx);
  if (!value) throw new Error('useHomeRepository must be used within HomeRepositoryProvider');
  return value;
}

export function HomeRepositoryProvider({
  repo,
  children,
}: {
  repo: HomeRepository;
  children: React.ReactNode;
}) {
  const value = useMemo(() => repo, [repo]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
