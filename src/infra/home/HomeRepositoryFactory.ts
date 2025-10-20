import type { HomeRepository } from '../../domain/home/types';
import { MockHomeRepository } from './MockHomeRepository';
import { RemoteHomeRepository } from './RemoteHomeRepository';
import { FailoverCompositeRepository } from './FailoverCompositeRepository';
import { CircuitOpenPreferMockStrategy } from './strategy/RepositorySelectionStrategy';
import type { AppConfig, RepoKind } from '../../app/config';
import { ResiliencePipelineBuilder } from '../resilience/ResiliencePipelineBuilder';
import { ExponentialBackoff } from '../resilience/backoff/BackoffStrategy';

export type HomeRepoKind = RepoKind;

export class HomeRepositoryFactory {
  static create(kind: HomeRepoKind, baseUrl: string): HomeRepository {
    if (kind === 'mock') return new MockHomeRepository();
    const remote = new RemoteHomeRepository(baseUrl);
    return composeResilient(remote);
  }
}

// Separate composition for SRP and reuse/testing
export function composeResilient(primary: HomeRepository): HomeRepository {
  const pipeline = new ResiliencePipelineBuilder()
    .timeout(4000)
    .retry(3, new ExponentialBackoff(300, 2))
    .circuitBreaker(3, 3000);
  const withBreaker = pipeline.build(primary);
  const mock = new MockHomeRepository();
  const strategy = new CircuitOpenPreferMockStrategy();
  return new FailoverCompositeRepository(withBreaker, mock, strategy);
}

// Build from app config to enforce DIP at the composition root
export function buildHomeRepositoryFromConfig(cfg: AppConfig): HomeRepository {
  return HomeRepositoryFactory.create(cfg.repoKind, cfg.apiBaseUrl);
}
