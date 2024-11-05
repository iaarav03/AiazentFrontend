// src/context/BlogContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from '../config/axios';
import { toast } from 'react-toastify';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('/blogs');
            setBlogs(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            toast.error('Failed to fetch blogs.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <BlogContext.Provider value={{ blogs, loading, fetchBlogs }}>
            {children}
        </BlogContext.Provider>
    );
};
