import axios from 'axios';

export const HTTP = axios.create({
  // baseURL: `http://localhost:3000/`
  baseURL: `http://192.168.1.51:3000/`
});

export const getPrints = () => {
  return HTTP.get('/print').then(res => res.data).catch(e => e);
}

export const getDocObjUrl = (printId: number) => {
  return HTTP.get(`print/${printId}/document`, {
    responseType: 'blob'
  }).then(res => {
    return URL.createObjectURL(res.data as Blob)})
  .catch(e => {
    throw e;
  });
}

export const getDocBase64 = (printId: number): Promise<string> => {
  return HTTP.get(`print/${printId}/document`, {
    responseType: 'blob'
  })
  .then(res => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(res.data);
      reader.onload = () => {
        const base64 = reader.result as string;
        resolve(base64.split(',')[1]);
      };
      reader.onerror = error => reject(error);
    });
  })
  .catch(e => {
    throw e;
  });
}