import axiosInstance from "../axios";

const API_URL = "http://127.0.0.1:8000/productos/";

export const ListProductos = async () => {
  const response = await axiosInstance.get(`${API_URL}`);
  if (response.status === 200) {
    return await response.data;
  }
};


export const getProducto = async (ProductoID) => {
  const response = await axiosInstance.get(`${API_URL}${ProductoID}`);
  if (response.status === 200) {
    return await response.data;
  }
};

export const getProductoDT = async (ProductoID) => {
  const response = await axiosInstance.get(API_URL + "retrieve/" + ProductoID);
  if (response.status === 200) {
    return response.data;
  }
};

export const RegisterProducto = async (newProducto) => {
  const response = await axiosInstance.post(API_URL, newProducto);
  if (response.status === 200) {
    return await response.data;
  }
};

export const UpdateProducto = async (ProductoID, updateProducto) => {
  const response = await axiosInstance.put(
    API_URL + ProductoID + "/",
    updateProducto
  );
  if (response.status === 200) {
    return await response.data;
  }
};

export const DeleteProducto = async (ProductoID) => {
  return await axiosInstance.delete(`${API_URL}${ProductoID}`);

};

export const ListSubCategorias = async () => {
  const response = await axiosInstance.get("http://127.0.0.1:8000/subCategorias/");
  if (response.status === 200) {
    return await response.data;
  }
};