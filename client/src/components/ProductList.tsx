import type { Product } from "../types/Product";
import { ProductItem } from "./ProductItem";

interface ProductsListProps {
  products: Product[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const ProductsList: React.FC<ProductsListProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="w-full">
      <div className="bg-white dark:bg-gray-800 rounded-md shadow-md">
        <div className="p-4">
          <div className="flex items-center border-b border-gray-200 dark:border-gray-700 pb-4">
            <div className="w-1/12 px-4 text-sm font-bold text-gray-800 dark:text-white">
              ID
            </div>
            <div className="w-1/3 px-4 text-sm font-bold text-gray-800 dark:text-white">
              Название
            </div>
            <div className="w-1/4 px-4 text-sm font-bold text-gray-800 dark:text-white">
              Артикул
            </div>
            <div className="w-1/6 px-4 text-sm font-bold text-gray-800 dark:text-white">
              Цена
            </div>
            <div className="w-1/6 px-4 text-sm font-bold text-gray-800 dark:text-white">
              Количество
            </div>
            <div className="w-1/6 px-4"></div>
          </div>

          {products.map((product, index) => (
            <ProductItem
              key={product.id}
              isOdd={index % 2 === 0}
              {...product}
              onEdit={() => onEdit(product.id)}
              onDelete={() => onDelete(product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
