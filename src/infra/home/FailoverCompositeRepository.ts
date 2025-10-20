import type { HomeData, HomeRepository } from '../../domain/home/types';
import { CircuitOpenError } from '../resilience/errors';
import type { RepositorySelectionStrategy } from './strategy/RepositorySelectionStrategy';

export class FailoverCompositeRepository implements HomeRepository {
  constructor(
    private readonly primary: HomeRepository,
    private readonly fallback: HomeRepository,
    private readonly strategy: RepositorySelectionStrategy,
  ) {}

  async getHomeData(): Promise<HomeData> {
    try {
      // try primary first
      return await this.primary.getHomeData();
    } catch (e) {
      const chosen = this.strategy.pick(this.primary, this.fallback, e);
      if (chosen === this.fallback || e instanceof CircuitOpenError) {
        // log: falling back to mock
        return await this.fallback.getHomeData();
      }
      throw e;
    }
  }
}
