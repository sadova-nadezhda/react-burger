export const fetchIngredientsData = async () => {
  const url = 'https://norma.nomoreparties.space/api/ingredients';
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
};
