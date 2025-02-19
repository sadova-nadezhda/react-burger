export async function checkResponse<T>(res: Response): Promise<T> {
  if (res.ok) {
    try {
      return await res.json() as T;
    } catch {
      return Promise.reject(new Error('Ошибка парсинга JSON'));
    }
  }
  const errorMessage = `Ошибка ${res.status}: ${res.statusText}`;
  return Promise.reject(new Error(errorMessage));
}