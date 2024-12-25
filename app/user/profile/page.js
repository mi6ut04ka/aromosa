'use client';

import { useState, useEffect } from "react";
import { apiRequest } from "@/app/lib/api";
import Spinner from "@/app/components/ui/Spinner";
import { useUser } from "@/app/components/UserContext";

export default function ProfilePage() {
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        password: '',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiRequest('/user/update', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      alert("Данные успешно обновлены!");
    } catch (err) {
      setError("Ошибка при обновлении данных.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Редактировать профиль</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block">Имя</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block">Телефон</label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block">Пароль (оставьте пустым, если не меняете)</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 bg-gray-600 text-white rounded-md ${loading ? 'opacity-50' : 'hover:bg-gray-700'}`}
        >
          {loading ? 'Сохранение...' : 'Сохранить изменения'}
        </button>
      </form>
    </div>
  );
}
