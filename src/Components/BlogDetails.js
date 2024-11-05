// src/Components/BlogDetails.js

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../config/axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { toast } from 'react-toastify';
import { FaTags, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import DOMPurify from 'dompurify'; // To sanitize HTML content
import Slider from 'react-slick'; // Import Slick Slider
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchBlog = async () => {
        try {
            const response = await axios.get(`/blogs/${id}`);
            console.log('Fetched Blog:', response.data); // Debugging
            setBlog(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching blog:', error);
            toast.error('Failed to fetch blog.');
            setLoading(false);
        }
    };

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
        fetchBlog();
    }, [id]);

    if (loading) return <p className="text-center text-primaryBlue2">Loading...</p>;
    if (!blog) return <p className="text-center text-red-500">Blog not found</p>;

    // Slick Slider settings
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
    };

    return (
        <>
            <Helmet>
                <title>{blog.title} | AI Agents Insights</title>
                <meta name="description" content={DOMPurify.sanitize(blog.content).replace(/<[^>]+>/g, '').substring(0, 160)} />
                <meta property="og:title" content={blog.title} />
                <meta property="og:description" content={DOMPurify.sanitize(blog.content).replace(/<[^>]+>/g, '').substring(0, 160)} />
                {blog.image && blog.image.url && <meta property="og:image" content={blog.image.url} />}
                <meta property="og:url" content={window.location.href} />
                {/* Add more meta tags as needed */}
            </Helmet>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto" data-aos="fade-up">
                    {/* Blog Title */}
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primaryBlue2 text-center">
                        {blog.title}
                    </h1>

                    {/* Publication Date */}
                    <p className="text-gray-500 mb-6 text-center">
                        Published on {new Date(blog.createdAt).toLocaleDateString()}
                    </p>

                    {/* Main Blog Image */}
                    {blog.image && blog.image.url && (
                        <div className="mb-6">
                            <img
                                src={blog.image.url}
                                alt={blog.title}
                                className="w-full h-64 md:h-96 object-contain rounded-lg shadow-lg"
                                onError={(e) => { e.target.onerror = null; e.target.src = '/fallback-image.jpg'; }} // Replace with actual fallback image path
                            />
                        </div>
                    )}
                    
                    {/* Main Blog Content */}
                    <div
                        className="prose lg:prose-xl mx-auto text-gray-800 mb-6"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
                    ></div>

                    {/* Blog Sections */}
                    {blog.sections && blog.sections.length > 0 && blog.sections.map((section, index) => (
                        <div key={index} className="mb-8">
                            {/* Section Title */}
                            <h2 className="text-2xl font-semibold mb-2 text-primaryBlue2">
                                {section.title}
                            </h2>

                            {/* Section Content */}
                            <div
                                className="prose lg:prose-xl mx-auto text-gray-800 mb-4"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(section.content) }}
                            ></div>

                            {/* Section Images */}
                            {section.images && section.images.length > 0 && (
                                <div className="mb-4">
                                    <Slider {...sliderSettings}>
                                        {section.images.map((image, imgIdx) => (
                                            <div key={imgIdx} className="flex justify-center">
                                                {image.url ? (
                                                    <img
                                                        src={image.url}
                                                        alt={`Section ${index + 1} Image ${imgIdx + 1}`}
                                                        className="w-full h-64 md:h-96 object-contain rounded-lg shadow-md"
                                                        onError={(e) => { e.target.onerror = null; e.target.src = '/fallback-image.jpg'; }} // Replace with actual fallback image path
                                                    />
                                                ) : (
                                                    <p className="text-red-500">Image URL missing</p>
                                                )}
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap mt-6 justify-center">
                            {blog.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="flex items-center bg-primaryBlue2 text-white text-sm px-3 py-1 mr-2 mb-2 rounded-full hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
                                    role="button"
                                    aria-label={`Tag ${tag}`}
                                    onClick={() => {/* Implement tag click functionality if needed */}}
                                >
                                    <FaTags className="mr-1" /> #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Social Sharing Buttons */}
                    <div className="flex justify-center mt-6 space-x-4">
                        <a
                            href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                            aria-label="Share on Facebook"
                        >
                            <FaFacebookF size={24} />
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-600"
                            aria-label="Share on Twitter"
                        >
                            <FaTwitter size={24} />
                        </a>
                        <a
                            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(blog.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:text-blue-900"
                            aria-label="Share on LinkedIn"
                        >
                            <FaLinkedinIn size={24} />
                        </a>
                    </div>

                    {/* Back to Blogs Link */}
                    <Link to="/blogs" className="inline-block mt-8 text-primaryBlue2 hover:underline">
                        &larr; Back to Blogs
                    </Link>
                </div>
            </div>
        </>
    )
};

export default BlogDetails;
