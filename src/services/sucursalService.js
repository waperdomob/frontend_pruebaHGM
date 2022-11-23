import axiosInstance from "../axios";

const API_URL = "http://127.0.0.1:8000/sucursales/";

export const ListSucursales = async () => {
  const response = await axiosInstance.get(`${API_URL}`);
  if (response.status === 200) {
    console.log(response.data);
    return await response.data;
  }
};
