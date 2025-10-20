export interface BackoffStrategy {
  nextDelayMs(attempt: number): number;
}

export class ExponentialBackoff implements BackoffStrategy {
  constructor(
    private readonly baseDelayMs: number = 200,
    private readonly factor: number = 2,
  ) {}
  nextDelayMs(attempt: number): number {
    return this.baseDelayMs * Math.pow(this.factor, Math.max(0, attempt));
  }
}

export class FixedBackoff implements BackoffStrategy {
  constructor(private readonly delayMs: number) {}
  nextDelayMs(): number {
    return this.delayMs;
  }
}
