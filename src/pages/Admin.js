import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editingArticle, setEditingArticle] = useState(null);
  const navigate = useNavigate();

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

  const handleAddArticle = async (e) => {
    e.preventDefault();
    try {
      if (editingArticle) {
        const response = await axios.put(`http://localhost:5000/articles/${editingArticle.id}`, { title, body, image_url: imageUrl });
        console.log('Edit response:', response.data);
        setEditingArticle(null);
      } else {
        const response = await axios.post('http://localhost:5000/articles', { title, body, image_url: imageUrl });
        console.log('Add response:', response.data);
      }
      setTitle('');
      setBody('');
      setImageUrl('');
      fetchArticles();
    } catch (error) {
      console.error('Error in handleAddArticle:', error);
    }
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setTitle(article.title);
    setBody(article.body);
    setImageUrl(article.image_url);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/articles/${id}`);
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6 flex justify-between items-center">
            <h2 className="text-2xl font-extrabold text-gray-900">Admin Dashboard</h2>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
          <div className="mt-6 px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleAddArticle}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input 
                  type="text" 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                />
              </div>
              <div className="mb-4">
                <label htmlFor="body" className="block text-sm font-medium text-gray-700">Body</label>
                <textarea 
                  id="body" 
                  rows="3" 
                  value={body} 
                  onChange={(e) => setBody(e.target.value)} 
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
                <input 
                  type="text" 
                  id="imageUrl" 
                  value={imageUrl} 
                  onChange={(e) => setImageUrl(e.target.value)} 
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                />
              </div>
              <div>
                <button 
                  type="submit" 
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {editingArticle ? 'Update Article' : 'Add Article'}
                </button>
              </div>
            </form>
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Articles</h3>
              <ul>
                {articles.map(article => (
                  <li key={article.id} className="mb-4">
                    {article.image_url && <img src={article.image_url} alt={article.title} className="mb-2 w-full h-48 object-cover" />}
                    <h4 className="text-xl font-semibold">{article.title}</h4>
                    <p className="text-gray-700">{article.body}</p>
                    <button onClick={() => handleEdit(article)} className="mr-2 text-blue-500 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(article.id)} className="text-red-500 hover:underline">Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
