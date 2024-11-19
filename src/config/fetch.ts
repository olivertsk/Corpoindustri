const apiUrl = process.env.NEXT_PUBLIC_API_URL;
console.log('apiUrl :>> ', apiUrl);

const comprobeToken = () => {
  const token = localStorage.getItem('token');
  return token ? `Bearer ${token}` : '';
};

export const makeFetch = (url: string) => {
  return fetch(`${apiUrl}${url}`, {
    headers: {
      Authorization: comprobeToken(),
    },
  });
};

export const makePost = async (url: string, body: unknown) => {
  try {
    const response = await fetch(`${apiUrl}${url}`, {
      method: 'POST',
      headers: {
        Authorization: comprobeToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const uploadFileRequest = async (url: string, body: unknown) => {
  try {
    const response = await fetch(`${apiUrl}${url}`, {
      method: 'POST',
      headers: {
        Authorization: comprobeToken(),
      },
      body: body as BodyInit,
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};
