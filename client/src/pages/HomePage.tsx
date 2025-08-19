import { AddProductButton } from "../components/AddProductButton";
import { Pagination } from "../components/Pagination";
import { ProductForm } from "../components/ProductForm";
import { useState } from "react";
import { ProductsList } from "../components/ProductList";
import type { Product } from "../types/Product";
import { useDeleteProduct, useGetProducts } from "../api/products";

export const HomePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { data, isLoading, isError, isSuccess } = useGetProducts(
    currentPage,
    limit
  );
  const deleteMutation = useDeleteProduct();

  const totalPages = isSuccess ? Math.ceil(data?.total / limit) : 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenForm = (product?: Product) => {
    setShowForm(true);
    setEditingProduct(product!);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: number) => {
    deleteMutation.mutateAsync(id);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  return (
    <div className="py-10 w-6xl mx-auto z-0">
      <p className="text-2xl text-center font-medium text-gray-800 dark:text-white mb-5">
        Продукты:
      </p>
      <AddProductButton onOpenForm={() => handleOpenForm()} />

      <div className="flex items-center justify-end space-x-2 mt-6">
        <p className="text-sm font-medium text-gray-800 dark:text-white">
          Количество элементов на странице:
        </p>
        {[5, 10, 20, 50].map((option) => (
          <button
            key={option}
            className={`px-3 py-1 rounded-md 
              ${
                limit === option
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              }
              hover:bg-cyan-500 dark:hover:bg-cyan-500`}
            onClick={() => handleLimitChange(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center text-white">Загрузка продуктов...</div>
      ) : isError ? (
        <div className="text-center text-red-500">
          Произошла ошибка при загрузке продуктов
        </div>
      ) : data?.data.length === 0 ? (
        <div className="text-center text-white">Здесь пока пусто...</div>
      ) : (
        <ProductsList
          products={data?.data || []}
          onEdit={(id) => handleOpenForm(data!.data.find((p) => p.id === id)!)}
          onDelete={handleDeleteProduct}
        />
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {showForm && (
        <ProductForm
          isEditing={!!editingProduct}
          product={editingProduct!}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
