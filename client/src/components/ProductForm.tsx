import { useState, type FormEvent } from "react";
import { useCreateProduct, useUpdateProduct } from "../api/products";
import type { Product, ProductDto } from "../types/Product";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
import type { ErrorResponse } from "../types/ErrorResponse";

interface ProductFormProps {
  isEditing: boolean;
  product?: Product;
  onClose: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  isEditing,
  product,
  onClose,
}) => {
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  const initialData: ProductDto = isEditing
    ? {
        article: product!.article,
        name: product!.name,
        price: product!.price.toString(),
        quantity: product!.quantity.toString(),
      }
    : {
        article: "",
        name: "",
        price: "",
        quantity: "",
      };

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<{ [key: string]: string }>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateMutation.mutateAsync({
          id: product!.id,
          product: formData,
        });
        onClose();
      } else {
        await createMutation.mutateAsync(formData);
        onClose();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { response } = error as AxiosError;

        if (response && response.data) {
          const errorResponse = response.data as ErrorResponse;

          if (errorResponse.errors) {
            setErrors(errorResponse.errors);
          } else {
            toast.error("Произошла ошибка при сохранении");
          }
        }
      } else {
        toast.error("Произошла ошибка при сохранении");
      }
    }
  };

  const isPending = isEditing
    ? updateMutation.isPending
    : createMutation.isPending;

  return (
    <div className="fixed inset-0 bg-gray-900/[.8] z-50">
      <div className="bg-white dark:bg-slate-900 rounded-md shadow-md mx-auto mt-16 w-96 sm:w-112 md:w-128 p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">
            {isEditing ? "Редактировать продукт" : "Создать продукт"}
          </h3>
          <button
            className="text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-800 dark:text-white">
              Название
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            {errors?.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-800 dark:text-white">
              Артикул
            </label>
            <input
              type="text"
              name="article"
              value={formData.article}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            {errors?.article && (
              <p className="text-red-500 text-xs mt-1">{errors.article}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-800 dark:text-white">
              Цена
            </label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            {errors?.price && (
              <p className="text-red-500 text-xs mt-1">{errors.price}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-800 dark:text-white">
              Количество
            </label>
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            {errors?.quantity && (
              <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className={`bg-cyan-600 text-white px-4 py-2 rounded-md 
${isPending ? "opacity-50 cursor-wait" : "hover:bg-cyan-700"}`}
            >
              {isPending ? "Сохранение..." : "Сохранить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
