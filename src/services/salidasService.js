import axiosInstance from "../axios";

const API_URL = "http://127.0.0.1:8000/outputs/";

export const ListSalidas = async () => {
  const response = await axiosInstance.get(`${API_URL}`);
  if (response.status === 200) {
    return await response.data;
  }
};


export const getSalida = async (SalidaID) => {
  const response = await axiosInstance.get(`${API_URL}${SalidaID}`);
  if (response.status === 200) {
    return await response.data;
  }
};

export const getSalidaDT = async (SalidaID) => {
  const response = await axiosInstance.get(API_URL + "retrieve/" + SalidaID);
  if (response.status === 200) {
    return response.data;
  }
};

export const RegisterSalida = async (newSalida) => {
  const response = await axiosInstance.post(API_URL, newSalida);
  if (response.status === 200) {
    return await response.data;
  }
};

export const UpdateSalida = async (SalidaID, updateSalida) => {
  const response = await axiosInstance.put(
    API_URL + SalidaID + "/",
    updateSalida
  );
  if (response.status === 200) {
    return await response.data;
  }
};

export const DeleteSalida = async (SalidaID) => {
  return await axiosInstance.delete(`${API_URL}${SalidaID}`);

};