import { CircuitOpenError } from './errors';
import type { HomeData, HomeRepository } from '../../domain/home/types';

// State pattern for Circuit Breaker
interface BreakerState {
  canPassThrough(ctx: CircuitBreakerRepositoryDecorator): boolean;
  onSuccess(ctx: CircuitBreakerRepositoryDecorator): void;
  onFailure(ctx: CircuitBreakerRepositoryDecorator): void;
  name: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
}

class ClosedState implements BreakerState {
  name: 'CLOSED' = 'CLOSED';
  canPassThrough(): boolean {
    return true;
  }
  onSuccess(ctx: CircuitBreakerRepositoryDecorator) {
    ctx.failureCount = 0;
  }
  onFailure(ctx: CircuitBreakerRepositoryDecorator) {
    ctx.failureCount += 1;
    if (ctx.failureCount >= ctx.failureThreshold) {
      ctx.transitionTo(new OpenState());
      ctx.nextTry = Date.now() + ctx.cooldownMs;
    }
  }
}

class OpenState implements BreakerState {
  name: 'OPEN' = 'OPEN';
  canPassThrough(ctx: CircuitBreakerRepositoryDecorator): boolean {
    const now = Date.now();
    if (now >= ctx.nextTry) {
      ctx.transitionTo(new HalfOpenState());
      return true; // allow one trial
    }
    return false;
  }
  onSuccess(_ctx: CircuitBreakerRepositoryDecorator) {}
  onFailure(_ctx: CircuitBreakerRepositoryDecorator) {}
}

class HalfOpenState implements BreakerState {
  name: 'HALF_OPEN' = 'HALF_OPEN';
  canPassThrough(): boolean {
    return true; // single trial is allowed; enforcement via transition logic
  }
  onSuccess(ctx: CircuitBreakerRepositoryDecorator) {
    ctx.failureCount = 0;
    ctx.transitionTo(new ClosedState());
  }
  onFailure(ctx: CircuitBreakerRepositoryDecorator) {
    ctx.transitionTo(new OpenState());
    ctx.nextTry = Date.now() + ctx.cooldownMs;
  }
}

export class CircuitBreakerRepositoryDecorator implements HomeRepository {
  state: BreakerState = new ClosedState();
  failureCount = 0;
  nextTry = 0;

  constructor(
    public readonly inner: HomeRepository,
    public readonly failureThreshold: number = 3,
    public readonly cooldownMs: number = 3000,
  ) {}

  transitionTo(next: BreakerState) {
    this.state = next;
  }

  async getHomeData(): Promise<HomeData> {
    if (!this.state.canPassThrough(this)) {
      throw new CircuitOpenError();
    }
    try {
      const res = await this.inner.getHomeData();
      this.state.onSuccess(this);
      return res;
    } catch (e) {
      this.state.onFailure(this);
      throw e;
    }
  }
}
