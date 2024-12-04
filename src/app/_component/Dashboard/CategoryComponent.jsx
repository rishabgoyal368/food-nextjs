'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function CategoryComponent() {
    const [category, setCategory] = useState({});
    const fetchCategory = async () => {
        try {
            const response = await axios.get('/api/admin/category');
            setCategory(response?.data?.data)
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fetchCategory();
    }, [])
    return (
        <>
        <h3 className='font-bold text-2xl'>Order our best food options</h3>
        <div className='flex gap-4 '>
            {
                category.length > 0 && category.map((value, index) => (
                    <div className='text-center cursor-pointer'>
                        <Link href={`user/collection?id=${value._id}`}>
                            <img src={'/uploads/category/' +value.image} alt="" className='w-[120px]' />
                            <p>{value?.name}</p>
                        </Link>
                    </div>
                ))
            }
        </div>
        </>
    )
}

export default CategoryComponent