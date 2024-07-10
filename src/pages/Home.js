import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/articles');
      setTimeout(() => {
          setArticles(response.data);
          setLoading(false);
        }, 500);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.map(article => (
            <div key={article.id} className="bg-white overflow-hidden shadow-sm sm:rounded-lg hover:bg-gray-50">
              <Link to={`/article/${article.id}`} className="block focus:outline-none focus:bg-gray-50">
                <div className="px-4 py-5 sm:p-6">
                  {article.image_url && <img src={article.image_url} alt={article.title} className="mb-4 w-full h-48 object-cover" />}
                  <h3 className="text-lg font-medium text-gray-900 text-center">{article.title}</h3>
                  <div className="mt-2 text-sm text-gray-500 text-justify line-clamp-2" dangerouslySetInnerHTML={{ __html: article.body }} />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;