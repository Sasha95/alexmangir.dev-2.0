export type IHttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface IResponse<R> {
  result: R | null;
  status: number;
  error: Error | null;
  message: string | null;
  ok: boolean;
}

export const baseFetch = async <P, R>(
  url: string,
  params: P,
  method: IHttpMethods = 'GET',
  token: string,
  headers: { [key: string]: string } = {}
): Promise<IResponse<R>> => {
  try {
    const bodyObj = method !== 'GET' ? { body: JSON.stringify(params) } : {};
    const headerToken = token && { Authorization: token };
    const res = await fetch(`${url}`, {
      method,
      ...bodyObj,
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
        ...headerToken,
        ...headers
      }
    });

    if (res.status === 401) {
      return {
        error: null,
        message: res.statusText,
        result: null,
        status: 401,
        ok: res.ok
      };
    }
    return {
      error: null,
      status: res.status,
      message: res.statusText,
      result: await res.json(),
      ok: res.ok
    };
  } catch (error) {
    return {
      message: error.message,
      result: null,
      status: 401,
      error: error as Error,
      ok: false
    };
  }
};
