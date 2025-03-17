"use client";

import { useState } from "react";

interface InputProps {
  onCityChange: (city: string) => void;
}

export default function Input({ onCityChange }: InputProps) {
  const [city, setCity] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    onCityChange(e.target.value); // Send data to parent
  };

  return (
    <input
      type="text"
      value={city}
      onChange={handleChange}
      placeholder="Enter city name..."
      className="border p-2 rounded-md w-64"
    />
  );
}