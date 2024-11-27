'use client'
import axios from 'axios';
import { useEffect, useState } from 'react'

function useCategory() {
    const [ categories, setCategories ] = useState({});
    const fetchCategory = async () => {
        try {
            const response = await axios.get('/api/admin/category');
            setCategories(response?.data?.data);
        } catch (error) {
            console.log('error', error);
        }
    }
    useEffect(() => {
        fetchCategory();
    },[])
    return {'category':categories};
}

export default useCategory