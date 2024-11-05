// src/Components/BlogList.js

import React, { useContext, useState, useEffect, memo } from 'react';
import { BlogContext } from '../context/BlogContext';
import { Link } from 'react-router-dom';
import { FaRobot, FaSearch, FaTags, FaArrowUp, FaListAlt, FaChevronRight } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import InfiniteScroll from 'react-infinite-scroll-component';
import DOMPurify from 'dompurify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const placeholderSvg = `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
        <rect width="400" height="300" fill="#f3f4f6"/>
        <text x="200" y="150" font-family="Arial" font-size="20" fill="#9ca3af" text-anchor="middle" dy=".3em">
            Image not available
        </text>
    </svg>
`)}`;

const BlogList = () => {
    const { blogs, loading, fetchBlogs } = useContext(BlogContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showTopBtn, setShowTopBtn] = useState(false);
    const [displayedBlogs, setDisplayedBlogs] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const blogsPerLoad = 6;

    useEffect(() => {
        fetchBlogs();

        const handleScroll = () => {
            setShowTopBtn(window.pageYOffset > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const uniqueCategories = [...new Set(blogs.map(blog => blog.category))];
        setCategories(uniqueCategories);
    }, [blogs]);

    useEffect(() => {
        let tempBlogs = blogs;

        if (searchTerm) {
            tempBlogs = tempBlogs.filter(blog =>
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                blog.content.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory) {
            tempBlogs = tempBlogs.filter(blog => blog.category === selectedCategory);
        }

        setFilteredBlogs(tempBlogs);
        setDisplayedBlogs(tempBlogs.slice(0, blogsPerLoad));
        setHasMore(tempBlogs.length > blogsPerLoad);
    }, [blogs, searchTerm, selectedCategory]);

    const fetchMoreBlogs = () => {
        if (displayedBlogs.length >= filteredBlogs.length) {
            setHasMore(false);
            return;
        }

        setTimeout(() => {
            setDisplayedBlogs(filteredBlogs.slice(0, displayedBlogs.length + blogsPerLoad));
            setHasMore(displayedBlogs.length + blogsPerLoad < filteredBlogs.length);
        }, 500);
    };

    const handleTagClick = (tag) => {
        setSearchTerm(tag);
        setSelectedCategory('');
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const BlogCard = memo(({ blog }) => (
        <article className="group flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="md:w-1/3 relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Link to={`/blogs/${blog._id}`} className="block w-full h-full">
                    {blog.image && blog.image.url ? (
                        <img
                            src={blog.image.url}
                            alt={blog.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = placeholderSvg;
                            }}
                            loading="lazy"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <FaRobot className="text-gray-500" size={40} />
                        </div>
                    )}
                </Link>
            </div>

            <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                    <Link to={`/blogs/${blog._id}`} className="block text-primaryBlue2 transition-colors duration-300">
                        <h2 className="text-lg md:text-xl font-bold mb-3 text-gray-800">{blog.title}</h2>
                    </Link>
                    <p className="text-gray-600 line-clamp-3 mb-4">
                        {DOMPurify.sanitize(blog.content).replace(/<[^>]+>/g, '').substring(0, 150)}...
                    </p>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex flex-wrap gap-2">
                        {blog.tags.slice(0, 2).map((tag, index) => (
                            <button
                                key={index}
                                onClick={() => handleTagClick(tag)}
                                className="bg-blue-50 text-primaryBlue2 text-sm px-3 py-1 rounded-full hover:bg-primaryBlue2 hover:text-white transition-all duration-300"
                                aria-label={`Filter by tag ${tag}`}
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>
                    <Link
                        to={`/blogs/${blog._id}`}
                        className="inline-flex items-center text-primaryBlue2 font-medium transition-colors duration-300"
                    >
                        Read More
                        <FaChevronRight className="ml-1" />
                    </Link>
                </div>
            </div>
        </article>
    ));

    const LoadingSkeleton = memo(() => (
        <div className="bg-white rounded-xl p-4">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                    <Skeleton height={200} className="rounded-lg" />
                </div>
                <div className="md:w-2/3 space-y-4">
                    <Skeleton height={24} width="80%" />
                    <Skeleton count={3} />
                    <Skeleton height={20} width="40%" />
                </div>
            </div>
        </div>
    ));

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12 max-w-7xl animate-fadeIn">
                {/* Header Section */}
                <header className="text-center mb-16">
                    <FaRobot className="mx-auto text-primaryBlue2 mb-6" size={64} />
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                        AI Agents Insights
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Dive deep into the world of AI agents. Explore the latest trends, 
                        technologies, and innovations shaping the future of artificial intelligence.
                    </p>
                </header>

                {/* Search Bar */}
                <div className="relative max-w-2xl mx-auto mb-12">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-primaryBlue2 focus:ring-2 focus:ring-primaryBlue2 focus:ring-opacity-20 transition-all duration-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-label="Search Blogs"
                    />
                </div>

                {/* Main Content Grid */}
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <aside className="lg:w-1/4">
                        <div className="sticky top-8 space-y-8">
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center">
                                    <MdCategory className="mr-2 text-primaryBlue2" /> Categories
                                </h2>
                                <div className="space-y-3">
                                    <button
                                        onClick={() => setSelectedCategory('')}
                                        className={`w-full flex items-center p-2 rounded-lg transition-all duration-300 ${
                                            selectedCategory === '' 
                                                ? 'bg-primaryBlue2 text-white font-semibold shadow-md' 
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                        aria-label="All Categories"
                                    >
                                        <FaListAlt className="mr-2" /> All Categories
                                    </button>
                                    {categories.map((category, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`w-full flex items-center p-2 rounded-lg transition-all duration-300 ${
                                                selectedCategory === category 
                                                    ? 'bg-primaryBlue2 text-white font-semibold shadow-md' 
                                                    : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                            aria-label={`Filter by category ${category}`}
                                        >
                                            <FaListAlt className="mr-2" /> {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* About Us Card */}
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-xl font-bold mb-4 text-gray-900">About Us</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Welcome to AI Agents Insights, your go-to source for the latest 
                                    news and articles on artificial intelligence. We bring you in-depth 
                                    analyses, expert opinions, and cutting-edge research to keep you 
                                    informed about the ever-evolving world of AI.
                                </p>
                            </div>
                        </div>
                    </aside>

                    {/* Blog List */}
                    <main className="lg:w-3/4">
                        {loading ? (
                            <div className="space-y-6">
                                {[...Array(3)].map((_, index) => (
                                    <LoadingSkeleton key={index} />
                                ))}
                            </div>
                        ) : filteredBlogs.length === 0 ? (
                            <p className="text-center text-gray-600">No blogs found.</p>
                        ) : (
                            <InfiniteScroll
                                dataLength={displayedBlogs.length}
                                next={fetchMoreBlogs}
                                hasMore={hasMore}
                                loader={
                                    <div className="text-center py-4">
                                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primaryBlue2 border-r-transparent"></div>
                                    </div>
                                }
                                endMessage={
                                    <p className="text-center text-gray-500 py-4">
                                        You've reached the end!
                                    </p>
                                }
                            >
                                <div className="space-y-6">
                                    {displayedBlogs.map(blog => (
                                        <BlogCard key={blog._id} blog={blog} />
                                    ))}
                                </div>
                            </InfiniteScroll>
                        )}
                    </main>
                </div>
            </div>

            {/* Back to Top Button */}
            {showTopBtn && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-primaryBlue2 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center"
                    aria-label="Back to Top"
                >
                    <FaArrowUp />
                </button>
            )}
        </div>
    );
}
export default BlogList;
