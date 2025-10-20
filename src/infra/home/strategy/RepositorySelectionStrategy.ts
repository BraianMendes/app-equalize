import type { HomeRepository } from '../../../domain/home/types';

export interface RepositorySelectionStrategy {
  pick(primary: HomeRepository, fallback: HomeRepository, reason?: unknown): HomeRepository;
}

export class CircuitOpenPreferMockStrategy implements RepositorySelectionStrategy {
  private isCircuitOpenError(reason: unknown): reason is { name: 'CircuitOpenError' } {
    if (!reason || typeof reason !== 'object' || !('name' in reason)) return false;
    const name = (reason as { name?: unknown }).name;
    return typeof name === 'string' && name === 'CircuitOpenError';
  }
  pick(primary: HomeRepository, fallback: HomeRepository, reason?: unknown): HomeRepository {
    // If there's a known circuit open signal, prefer fallback
    if (this.isCircuitOpenError(reason)) {
      return fallback;
    }
    return primary;
  }
}
