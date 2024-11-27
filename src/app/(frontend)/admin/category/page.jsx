'use client'
import TableComponent from '@/components/admin/TableComponent';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function Page() {
  const [category, setCategory] = useState([]);

  const fetchCategory = async () =>{
    try {
      const response = await axios.get('/api/admin/category');
      setCategory(response?.data?.data);
    } catch (error) {
      console.log('error', error);
    }
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  const headers = ['Sr No.', 'Name', 'Action'];

  const bodyData = category.map((category, index) => [
    index+1,
    category.name,
    <div key={index}>
      <Link href={`/admin/category/${category?._id}`} className="text-blue-500 hover:text-blue-700"> Edit</Link>
    </div>
  ]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <form className="flex items-center w-full max-w-md space-x-2">
          <label htmlFor="simple-search" className="sr-only">Search</label>
          <div className="relative w-full">
            <input
              type="text"
              id="simple-search"
              placeholder="Search by name..."
              className="w-full py-2 px-4 pl-10 text-sm bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-800"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 19l-4-4M19 10a7 7 0 1 1-14 0A7 7 0 0 1 19 10z" />
              </svg>
            </div>
          </div>
          <button type="submit" className="p-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700">
            <span className="sr-only">Search</span>
          </button>
        </form>

        <Link
          href="/admin/category/add"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add Category
        </Link>
      </div>
      <div>
        <TableComponent headers={headers} bodyData={bodyData} />
      </div>

      
    </div>
  );
}

export default Page;