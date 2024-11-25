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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const all = async (url: string, parameters?: Record<string, any>, auth: boolean = false) => {
  try {
    const queryString = parameters ? '?' + new URLSearchParams(parameters).toString() : '';
  
    const headers: { 'Content-Type': string, 'Authorization'?: string } = {
      'Content-Type': 'application/json',
    }
    if (auth) {
      headers['Authorization'] = comprobeToken()
    }
    const response = await fetch(`${apiUrl}${url}${queryString}`, {
      method: 'GET',
      headers: headers,
    });
    console.log('response.ok :>> ', response.ok);
    if (response.ok) {
      const respJSON = await response.json();
      console.log('json :>> ', respJSON);
      return respJSON.data;
    } 
    return [];
  } catch (error) {
    throw error;
  }
};

export const show = async (url: string, id: string, auth: boolean) => {
  console.log('auth :>> ', auth);
  try {
    const response = await fetch(`${apiUrl}${url}/${id}`, {
      method: 'GET',
      headers: {
        Authorization: comprobeToken(),
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchSvg = async (iconUrl: string, fillColor: string, width: string, height: string) => {
  try {
    const response = await fetch(`${apiUrl}/file/${iconUrl}`);
    let svgText: string = await response.text();
    
    // Crear un elemento DOM para manipular el SVG
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
    const svgElement = svgDoc.querySelector('svg');

    if (svgElement) {
      svgElement.setAttribute('fill', fillColor);
      svgElement.setAttribute('width', width);
      svgElement.setAttribute('height', height);
      svgText = new XMLSerializer().serializeToString(svgElement);
    }

    console.log('svgText :>> ', svgText);
    return svgText;
  } catch (error) {
    console.error('Error fetching SVG:', error);
  }
};

