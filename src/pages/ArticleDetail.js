import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/articles/${id}`);
        // Simulate loading state with a delay
        setTimeout(() => {
          setArticle(response.data);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching article:', error);
        setLoading(false);
      }
    };

    fetchArticle(); // Call fetchArticle directly within useEffect

  }, [id]); // Include 'id' in the dependency array to re-fetch article when 'id' changes

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!article) {
    return <div className="min-h-screen bg-gray-100 text-center pt-10">Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header/>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {article.image_url && <img src={article.image_url} alt={article.title} className="mb-4 w-full h-48 object-cover" />}
            <h2 className="text-2xl font-extrabold text-gray-900">{article.title}</h2>
            <p className="mt-2 text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: article.body }} />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ArticleDetail;
