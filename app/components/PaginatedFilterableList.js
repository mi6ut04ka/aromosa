'use client';
import { useState, useEffect } from "react";
import Pagination from "@/app/components/ui/Pagination";
import Filters from "@/app/components/ui/Filters";

export default function PaginatedFilterableList({
  title,
  fetchItems,
  fetchFilters,
  filtersConfig,
  renderItem,
  renderSkeleton,
  noItemsMessage = "Нет данных.",
  itemsPerPage = 6,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [availableOptions, setAvailableOptions] = useState({});
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const loadItems = async () => {
    setLoading(true);
    try {
      const data = await fetchItems(currentPage, filters);
      setItems(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadFilters = async () => {
    try {
      const data = await fetchFilters();
      setAvailableOptions(data);
    } catch (error) {
      console.error("Ошибка при загрузке фильтров:", error);
    }
  };

  useEffect(() => {
    loadFilters();
  }, []);

  useEffect(() => {
    loadItems();
  }, [currentPage, filters, sortOrder]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
    setCurrentPage(1);
  };

  const toggleFiltersVisibility = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  const handleSortChange = () => {
    setSortOrder(prevSortOrder => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  const sortedItems = items.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price; 
    } else {
      return b.price - a.price;
    }
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <button
        className="lg:hidden bg-gray-600 text-white p-2 rounded-md mb-4 font-montserrat"
        onClick={toggleFiltersVisibility}
      >
        {isFiltersVisible ? 'Скрыть фильтры' : 'Показать фильтры'}
      </button>

      <aside
        className={`w-full lg:w-1/4 p-4 rounded-lg shadow  transition-transform duration-300 ease-in-out ${isFiltersVisible ? 'block' : 'hidden lg:block'}`}
      >
        <Filters
          onFilterChange={handleFilterChange}
          filtersConfig={filtersConfig}
          fetchAvailableOptions={() => availableOptions}
        />
      </aside>

      <div className="w-full lg:w-3/4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{title}</h1>
          <button
            onClick={handleSortChange}
            className=" text-gray-600"
          >
            {sortOrder === "asc" ? "Сортировать по цене (↑)" : "Сортировать по цене (↓)"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: itemsPerPage }).map((_, index) => renderSkeleton(index))
            : sortedItems.length > 0
            ? sortedItems.map(renderItem)
            : <p className="col-span-full text-center text-gray-500">{noItemsMessage}</p>}
        </div>

        {!loading && sortedItems.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
