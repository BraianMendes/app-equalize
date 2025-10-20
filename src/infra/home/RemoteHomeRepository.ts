import type { HomeData, HomeRepository } from '../../domain/home/types';
import type { ApiHomeResponse } from './adapters/apiToDomain';
import { adaptApiToDomain } from './adapters/apiToDomain';

export class RemoteHomeRepository implements HomeRepository {
  constructor(private readonly baseUrl: string) {}
  async getHomeData(): Promise<HomeData> {
    const res = await fetch(`${this.baseUrl}/home`);
    if (!res.ok) throw new Error(`Home API error: ${res.status}`);
    const json = (await res.json()) as ApiHomeResponse;
    return adaptApiToDomain(json);
  }
}
