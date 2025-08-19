import { PlusIcon } from "@heroicons/react/24/outline";

interface AddProductButtonProps {
  onOpenForm: () => void;
}

export const AddProductButton: React.FC<AddProductButtonProps> = ({
  onOpenForm,
}) => {
  return (
    <button
      className="w-full py-3 px-6 rounded-lg bg-cyan-800 text-white font-medium flex items-center justify-center
      transition duration-300 ease-in-out hover:bg-cyan-900 focus:outline-none cursor-pointer"
      type="button"
      onClick={onOpenForm}
    >
      <PlusIcon className="h-6 w-6 mr-2" />
      Добавить продукт
    </button>
  );
};
