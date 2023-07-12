import axios, { AxiosResponse } from 'axios';
import { APIResponse } from '../../types/index';

export class Request {
  private baseURL = 'https://api.are.na/v2/';
  private accessToken: string | undefined;

  constructor(accessToken?: string) {
    this.accessToken = accessToken;
  }

  protected async GET_REQUEST<T>(endpoint: string, options?: Record<string, unknown>): Promise<T> {
    const config = {
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      ...options,
    };

    const response: AxiosResponse<APIResponse<T>> = await axios.get<APIResponse<T>>(endpoint, config);
    const result: APIResponse<T> = response.data;
    return result as T;
  }

  protected async POST_REQUEST<T>(endpoint: string, data: unknown): Promise<T> {
    const config = {
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
    };

    const response: AxiosResponse<APIResponse<T>> = await axios.post<APIResponse<T>>(endpoint, data, config);
    const result: APIResponse<T> = response.data;
    return result as T;
  }

  protected async PUT_REQUEST<T>(endpoint: string, data?: unknown): Promise<T> {
    const config = {
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
    };

    const response: AxiosResponse<APIResponse<T>> = await axios.put<APIResponse<T>>(endpoint, data, config);
    const result: APIResponse<T> = response.data;
    return result as T;
  }

  protected async DELETE_REQUEST<T>(endpoint: string, data?: unknown): Promise<T> {
    const config = {
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      data: data,
    };

    const response: AxiosResponse<APIResponse<T>> = await axios.delete<APIResponse<T>>(endpoint, config);
    const result: APIResponse<T> = response.data;
    return result as T;
  }
}
