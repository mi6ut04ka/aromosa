'use client'
import { apiRequest } from "@/app/lib/api";
import useDebounce from "@/app/lib/hooks/useDebounce";
import { useEffect, useState } from "react"
import Spinner from "./Spinner";
import Link from "next/link";

export default function Search({toggleSeach}) {

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        apiRequest(`/products/search/${searchTerm}`).then(results => {
          setIsSearching(false);
          setResults(results);
        });
      } else {
        setResults([]);
      }
    },
    [debouncedSearchTerm]
  );

    
    return(
      <div className=' bg-white h-full absolute lg:w-3/5 z-50 w-full -translate-x-1/2 left-1/2'>
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex items-center justify-between gap-3">
          <svg width="20" height="20" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                  className='cursor-pointer lg:hidden'
                  onClick={toggleSeach}>
            <path d="M7.24081 15L1.38449 9.45191C0.551809 8.66305 0.551809 7.33695 1.38449 6.5481L7.24081 1" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            onChange={(e)=> {setSearchTerm(e.currentTarget.value.toLocaleLowerCase()); setResults([]);}}
            placeholder="Поиск"
            autoFocus
            className="w-full border rounded-full py-2 px-4 text-lg focus:ring-1 ring-gray-600 focus:outline-none"
          />
        </div>
        <div className=" bg-white w-full absolute bottom-0 translate-y-full">
        {isSearching && <Spinner/>}
          {
            results.map(item=> 
              <Link key={item.id} href={`/products/${item.id}`}
              onClick={toggleSeach}>
                <div className="cursor-pointer flex justify-between p-3 hover:font-bold">
                  <div className="w-60 sm:w-full">{item.name}</div>
                  <div>{item.price} руб.</div>
                </div>
              </Link>
            )
          }
        </div>
        
    </div>
    )
    
};

