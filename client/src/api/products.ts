import { useQuery, useMutation } from "@tanstack/react-query";
import axios, { AxiosError, type AxiosResponse } from "axios";
import type { Product, ProductsResponse, ProductDto } from "../types/Product";
import { queryClient } from "./queryClient";
import toast from "react-hot-toast";
import type { ErrorResponse } from "../types/ErrorResponse";

const API_URL = "/products";

export const useGetProducts = (page: number, limit: number) => {
  return useQuery<
    ProductsResponse,
    AxiosError<ErrorResponse>,
    { data: Product[]; total: number }
  >({
    queryKey: ["products", page, limit],
    queryFn: async () => {
      const { data } = await axios.get(API_URL, {
        params: {
          page,
          limit,
        },
      });
      return data;
    },
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });
};

export const useCreateProduct = () => {
  return useMutation<Product, AxiosError<ErrorResponse>, ProductDto>({
    mutationKey: ["createProduct"],
    mutationFn: async (product: ProductDto): Promise<Product> => {
      const response: AxiosResponse<Product> = await axios.post(
        `${API_URL}`,
        product
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Продукт успешно создан");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError,
  });
};

export const useUpdateProduct = () => {
  return useMutation<
    Product,
    AxiosError<ErrorResponse>,
    { id: number; product: ProductDto }
  >({
    mutationKey: ["updateProduct"],
    mutationFn: async ({ id, product }): Promise<Product> => {
      console.log(id, product);
      const response: AxiosResponse<Product> = await axios.put(
        `${API_URL}/${id}`,
        product
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Продукт успешно обновлен");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError,
  });
};

export const useDeleteProduct = () => {
  return useMutation<number, AxiosError<ErrorResponse>, number>({
    mutationKey: ["deleteProduct"],
    mutationFn: async (id: number) => {
      try {
        await axios.delete(`${API_URL}/${id}`);
        return id;
      } catch (error) {
        throw new Error(`Ошибка при удалении продукта: ${error}`);
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: (_deletedId) => {
      toast.success("Продукт успешно удален");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError,
  });
};

const onError = (error: AxiosError<ErrorResponse>) => {
  let toastMessage = "Неизвестная ошибка";
  if (error.response?.data) {
    const res = error.response.data;
    toastMessage = `[${res.statusCode}] ${res.message}`;
  }
  toast.error(toastMessage);
  console.error(`Ошибка: ${error}`);
};
