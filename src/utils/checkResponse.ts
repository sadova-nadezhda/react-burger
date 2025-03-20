export function checkResponse<T>(res: Response): Promise<T> {
  return res.ok ? res.json() : Promise.reject('Ошибка при обработке запроса');
}