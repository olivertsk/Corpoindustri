'use server';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { cookies } from 'next/headers';

const comprobeToken = async () => {
  const token = (await cookies()).get('token')?.value || '';
  if (token) {
    return `Bearer ${token}`;
  }
  return '';
};

export const makeGet = async (url: string, parameters?: unknown) => {
  const token = await comprobeToken();
  try {
    const queryString = parameters
      ? '?' +
        new URLSearchParams(parameters as Record<string, string>).toString()
      : '';

    const headers: { 'Content-Type': string; Authorization?: string } = {
      'Content-Type': 'application/json',
    };
    headers['Authorization'] = token;

    const path = `${apiUrl}${url}${queryString}`;
    console.log(path);
    const response = await fetch(`${path}`, {
      method: 'GET',
      headers: headers,
    });
    if (response.ok) {
      const respJSON = await response.json();
      return respJSON.data;
    } else {
      console.log(response);
      throw new Error('Error fetching data');
    }
  } catch (error) {
    throw error;
  }
};

export const makePost = async (
  url: string,
  body: unknown,
  method: 'POST' | 'DELETE' | 'PUT' = 'POST'
) => {
  const token = await comprobeToken();
  try {
    const response = await fetch(`${apiUrl}${url}`, {
      method,
      headers: {
        Authorization: token,
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
  const token = await comprobeToken();
  try {
    const response = await fetch(`${apiUrl}${url}`, {
      method: 'POST',
      headers: {
        Authorization: token,
      },
      body: body as BodyInit,
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchSvg = async (
  iconUrl: string,
  fillColor: string,
  width: string,
  height: string
) => {
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

    return svgText;
  } catch (error) {
    console.error('Error fetching SVG:', error);
  }
};
