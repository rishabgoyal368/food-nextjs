import React from 'react'
import { Users } from 'lucide-react';
import { DollarSign } from 'lucide-react';


function Dashboard() {
  return (
    <div className='flex gap-4'>
      <div className='flex'>
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex"><Users /> Total Orders: +100</h5>
        </a>
      </div>
      <div className=''>
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex"><DollarSign />Total Users: +100</h5>
        </a>
      </div>
      <div className=''>
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Orders: +100</h5>
        </a>
      </div>
      
    </div>
  )
}

export default Dashboard