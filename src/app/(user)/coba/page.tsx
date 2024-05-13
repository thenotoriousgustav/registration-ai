"use client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");

  // Fungsi untuk menambahkan data ke localStorage
  const handleAddLocalStorage = () => {
    localStorage.setItem("name", "Budi");
    setName("Budi");
  };

  // Fungsi untuk menghapus data dari localStorage
  const handleDeleteLocalStorage = () => {
    localStorage.removeItem("name");
    setName("");
  };

  // Fungsi untuk mengambil data dari localStorage
  const handleGetLocalStorage = () => {
    const storedName = localStorage.getItem("ok");
    if (storedName) {
      setName(storedName);
    } else {
      setName("Data tidak ditemukan");
    }
  };

  return (
    <div>
      <h1>Data di localStorage: {name}</h1>
      <button onClick={handleAddLocalStorage}>Tambah Data (Budi)</button>
      <button onClick={handleGetLocalStorage}>Ambil Data</button>
      <button onClick={handleDeleteLocalStorage}>Hapus Data</button>
    </div>
  );
}
