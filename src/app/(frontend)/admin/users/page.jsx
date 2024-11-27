'use client'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import axios from 'axios';
import Link from 'next/link';

  
function page() {
    const [userList, setUserList] = useState([]);
    const [filterInput, setFilterInput ] = useState('');

    const fetchUsers = async() => {
        const url = `/api/admin/users?name=${filterInput != '' && filterInput != undefined ? filterInput : ''}`;
        const response = await axios.get(url);
        setUserList(response.data.data)
    };

    const HanldefetchUsers = async(e) => {
        e.preventDefault();
        fetchUsers();
    }

    useEffect(() => {
        fetchUsers()
    },[])



    return (
        <div className=''>
            <div>
                <div className='flex'>
                    <form className="flex items-center max-w-sm mx-auto" onSubmit={HanldefetchUsers}>   
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                                </svg>
                            </div>
                            <input type="text" onChange={(e) => {
                                setFilterInput(e.target.value)
                            }} id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required />
                        </div>
                        <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </form>
                    <Link className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" href="/admin/users/add">Add User</Link>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Sr No.</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        userList.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{user?.firstName }  {user?.lastName}</TableCell>
                                <TableCell>{user?.email}</TableCell>
                                <TableCell >{user?.role}</TableCell>
                                <TableCell >
                                    <Link href={'/admin/users/'+user._id}> Edit</Link>
                                    {/* <Link href={'/admin/users/'+user._id}> Delete</Link> */}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                  
                </TableBody>
            </Table>

        </div>
  )
}

export default page