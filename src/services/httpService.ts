import apiClient from './apiClient';

interface Entity {
  id: number;
}

// ! T is generic type
class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    const controller = new AbortController();

    const req = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });

    return { req, cancel: () => controller.abort() };
  }

  delete(id: number) {
    return apiClient.delete(this.endpoint + '/' + id);
  }

  create<T>(entity: T) {
    return apiClient.post(this.endpoint, entity);
  }

  // *< T extends Entity > means T should have id
  update<T extends Entity>(entity: T) {
    return apiClient.patch(this.endpoint + '/' + entity.id, entity);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
