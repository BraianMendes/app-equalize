import type { HomeData, HomeRepository } from '../../domain/home/types';

export class TimeoutRepositoryDecorator implements HomeRepository {
  constructor(
    private readonly inner: HomeRepository,
    private readonly timeoutMs: number,
  ) {}

  async getHomeData(): Promise<HomeData> {
    return new Promise<HomeData>((resolve, reject) => {
      const id = setTimeout(() => reject(new Error(`Timeout after ${this.timeoutMs}ms`)), this.timeoutMs);
      this.inner
        .getHomeData()
        .then((res) => {
          clearTimeout(id);
          resolve(res);
        })
        .catch((err) => {
          clearTimeout(id);
          reject(err);
        });
    });
  }
}
