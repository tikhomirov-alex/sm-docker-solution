import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface ProductItemProps {
  id: number;
  article: string;
  name: string;
  price: number;
  quantity: number;
  isOdd: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export const ProductItem: React.FC<ProductItemProps> = ({
  id,
  article,
  name,
  price,
  quantity,
  isOdd,
  onEdit,
  onDelete,
}) => {
  const bgColor = isOdd ? "bg-cyan-600" : "bg-cyan-700";

  return (
    <div
      className={`flex items-center py-4 border-b border-gray-200 dark:border-gray-700 ${bgColor}`}
    >
      <div className={`w-1/12 px-4 text-sm font-medium text-white`}>{id}</div>
      <div className={`w-1/3 px-4 text-sm text-white`}>{name}</div>
      <div className={`w-1/4 px-4 text-sm text-white`}>{article}</div>
      <div className={`w-1/6 px-4 text-sm text-white`}>{price} ₽</div>
      <div className={`w-1/6 px-4 text-sm text-white`}>{quantity}</div>
      <div className="w-1/6 flex items-center justify-center space-x-2">
        <button
          className="px-2 py-1 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 
          dark:bg-gray-700 dark:text-white dark:hover:bg-green-500"
          onClick={onEdit}
        >
          <PencilIcon className="h-4 w-4 cursor-pointer" />
        </button>
        <button
          className="px-2 py-1 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 
          dark:bg-gray-700 dark:text-white dark:hover:bg-red-500"
          onClick={onDelete}
        >
          <TrashIcon className="h-4 w-4 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};
