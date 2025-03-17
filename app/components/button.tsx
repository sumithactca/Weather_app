"use client";

interface ButtonProps {
  onClick: () => void;
}

export default function Button({ onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600"
    >
      Submit
    </button>
  );
}