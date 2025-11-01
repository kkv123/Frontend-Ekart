import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import './Dashboard.css';

type Product = {
  product_id: number;
  product_name: string;
  product_description: string;
  product_price: number;
  product_stock: number;
  product_author: string;
  product_category: string;
  created_at?: string;
  updated_at?: string;
};

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="dashboard">Loading products...</div>;
  if (error) return <div className="dashboard error">{error}</div>;

  return (
    <div className="dashboard">
      <h2>Products</h2>
      <div className="products-grid">
        {products.map((p) => (
          <div className="product-card" key={p.product_id}>
            <h3>{p.product_name}</h3>
            <p className="desc">{p.product_description}</p>
            <div className="meta">
              <span className="price">₹{p.product_price}</span>
              <span className="stock">Stock: {p.product_stock}</span>
            </div>
            <div className="footer">
              <small>{p.product_author} • {p.product_category}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;