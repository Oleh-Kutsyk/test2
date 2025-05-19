import React from 'react';

interface TodoItem {
  title: string;
}

export const TodoItem: React.FC<TodoItem> = ({ title }) => {
  return (
    <li className="flex justify-between items-center w-full p-2 border-b border-gray-200">
      <span className="max-w-1/2">{title}</span>
      <div>
        <button className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-9000 hover:bg-gray-800 hover:text-white">
          Edit
        </button>
        <button className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-300 hover:text-white">
          Delete
        </button>
      </div>
    </li>
  );
};
