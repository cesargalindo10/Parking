const APIURL= import.meta.env.VITE_REACT_APP_API_URL;
//const APIURL= 'http://localhost:8080/';
let token = '';
function getToken ( ) {
  const tokenLocal = JSON.parse(localStorage.getItem('user'));
  token = tokenLocal ? `Bearer ${tokenLocal.accessToken}`: ''
}
getToken();


export const APISERVICE = {
  get: async (url, params = "") => {
    try {
      const response = await fetch(`${APIURL+url+params}`, {
        headers:{
          Authorization:token,
        },
      });
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
          Authorization:token
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
  postWithImage: async (body, url, params = "") => {
    try {
      const response = await fetch(`${APIURL}${url}${params}`, {
        method: "POST",
        /* headers: {
          Authorization: token,
        }, */
        body: body,
      });
      const data = await response.json();
      data.status = response.status;
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
