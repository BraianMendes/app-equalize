import type { HomeData, HomeRepository } from '../../domain/home/types';
import type { BackoffStrategy } from './backoff/BackoffStrategy';

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export class RetryRepositoryDecorator implements HomeRepository {
  constructor(
    private readonly inner: HomeRepository,
    private readonly maxRetries: number = 3,
    private readonly backoff: BackoffStrategy,
  ) {}

  async getHomeData(): Promise<HomeData> {
    let attempt = 0;
    let lastError: unknown;
    while (attempt <= this.maxRetries) {
      try {
        return await this.inner.getHomeData();
      } catch (e) {
        lastError = e;
        if (attempt === this.maxRetries) break;
        const delay = this.backoff.nextDelayMs(attempt);
        await sleep(delay);
        attempt++;
      }
    }
    throw lastError instanceof Error ? lastError : new Error(String(lastError));
  }
}
