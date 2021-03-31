import { API } from "./Backend";

export const getAmazon = (product) => {
  return fetch(`${API}amazon/${product}`, { method: "GET"})
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getFlipkart = (product) => {
    return fetch(`${API}flipkart/${product}`, { method: "GET"})
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  export const getMyntra = (product) => {
    return fetch(`${API}myntra/${product}`, { method: "GET"})
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  export const getBewakoof = (product) => {
    return fetch(`${API}bewakoof/${product}`, { method: "GET"})
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };
