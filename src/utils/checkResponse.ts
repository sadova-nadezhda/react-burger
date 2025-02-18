export function checkResponse<T>(res: Response): Promise<T> {
  return res.ok ? res.json() as Promise<T> : Promise.reject(new Error('Ошибка при обработке запроса'));
}