import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.map(article => (
            <div key={article.id} className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <Link to={`/article/${article.id}`} className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50">
                <div className="px-4 py-5 sm:p-6">
                  {article.image_url && <img src={article.image_url} alt={article.title} className="mb-4 w-full h-48 object-cover" />}
                  <h3 className="text-lg font-medium text-gray-900">{article.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{article.body}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
