'use client';
import { useState, useEffect } from 'react';

export default function Filters({ filtersConfig, onFilterChange, fetchAvailableOptions }) {
  const [filters, setFilters] = useState({});
  const [availableOptions, setAvailableOptions] = useState({});

  useEffect(() => {
    setAvailableOptions(fetchAvailableOptions)
  }, [fetchAvailableOptions]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
    }));
  };

  const handleApplyFilters = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  return (
    <div className='font-montserrat'>
      <h2 className="text-xl font-bold mb-4">Фильтры</h2>
      {filtersConfig.map((filter) => {
        const { name, label, type } = filter;
        const options = availableOptions[name] || [];

        if (type === 'text' || type === 'number') {
          return (
            <div className="mb-4" key={name}>
              <label className="block font-semibold">{label}:</label>
              <input
                type={type}
                name={name}
                value={filters[name] || ''}
                onChange={handleInputChange}
                className="border rounded w-full p-2"
              />
            </div>
          );
        }

        if (type === 'select') {
          return (
            <div className="mb-4" key={name}>
              <label className="block font-semibold">{label}:</label>
              <select
                name={name}
                value={filters[name] || ''}
                onChange={handleInputChange}
                className="border rounded w-full p-2"
              >
                <option value="">Все</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        if (type === 'checkbox') {
          return (
            <div className="mb-4" key={name}>
              <label>
                <input
                  type="checkbox"
                  name={name}
                  checked={!!filters[name]}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                {label}
              </label>
            </div>
          );
        }

        return null;
      })}
      <button
        type="button"
        onClick={handleApplyFilters}
        className="border-gray-600 border text-gray-600 px-4 py-2 rounded"
      >
        Применить
      </button>
    </div>
  );
}
