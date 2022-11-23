import axiosInstance from "../axios";

const API_URL = "http://127.0.0.1:8000/inputs/";

export const ListEntradas = async () => {
  const response = await axiosInstance.get(`${API_URL}`);
  if (response.status === 200) {
    return await response.data;
  }
};


export const getEntrada = async (EntradaID) => {
  const response = await axiosInstance.get(`${API_URL}${EntradaID}`);
  if (response.status === 200) {
    return await response.data;
  }
};

export const getEntradaDT = async (EntradaID) => {
  const response = await axiosInstance.get(API_URL + "retrieve/" + EntradaID);
  if (response.status === 200) {
    return response.data;
  }
};

export const RegisterEntrada = async (newEntrada) => {
  const response = await axiosInstance.post(API_URL, newEntrada);
  if (response.status === 200) {
    return await response.data;
  }
};

export const UpdateEntrada = async (EntradaID, updateEntrada) => {
  const response = await axiosInstance.put(
    API_URL + EntradaID + "/",
    updateEntrada
  );
  if (response.status === 200) {
    return await response.data;
  }
};

export const DeleteEntrada = async (EntradaID) => {
  return await axiosInstance.delete(`${API_URL}${EntradaID}`);

};