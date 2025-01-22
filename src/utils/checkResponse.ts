export function checkResponse(res) {
  if (!res.ok) {
    return Promise.reject('Ошибка при обработке запроса');
  }
  return res.json();
}