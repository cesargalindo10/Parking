const APIURL = 'http://localhost:8080/';

export const APISERVICE = {
  get: async (url, params = "") => {
    try {
      const response = await fetch(`${APIURL}${url}${params}`);
      const data = await response.json();
      data.status = response.status;
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  post: async (body, url, params = "") => {
    try {
      const response = await fetch(`${APIURL + url + params}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      data.status = response.status;
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (url, params) => {
    try {
      const response = await fetch(`${APIURL+url+params}`, {
        method: "DELETE",
      });
      const data = await response.json();
      data.status = response.status;
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};