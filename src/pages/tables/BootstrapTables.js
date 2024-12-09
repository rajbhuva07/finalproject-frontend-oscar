
import React, { useEffect, useState } from "react";

export default () => {
  const [cartItems, setCartItems] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
      const fetchCartItems = async () => {
          try {
              const token = localStorage.getItem('token');
              const response = await fetch(`http://localhost:8000/buyproduct/datashow`, {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              });

              if (response.ok) {
                  const data = await response.json();
                  setCartItems(data.product);
                  // Check if user is admin
                  const isAdmin = data.product.length > 0 && data.product[0].user.role === 'admin';
                  // Set username based on role
                  setUsername(isAdmin ? 'Admin' : data.product.length > 0 ? data.product[0].user : '');
              } else {
                  throw new Error('Failed to fetch cart items');
              }
          } catch (error) {
              console.error(error);
          }
      };

      fetchCartItems();
  }, []);

  return <>
 
 <div style={styles.container}>
            <h1 style={styles.heading}>Cart</h1>
            <ul style={styles.list}>
                {cartItems.map((item, index) => (
                  <li key={index} style={styles.item}>
                      {<p style={styles.username}>User: {item.user}</p>}
                        <p style={styles.product}>Product: {item.product}</p>
                    </li>
                ))}
            </ul>
        </div>
  </>
};

const styles = {
  container: {
      margin: '20px',
  },
  heading: {
      fontSize: '24px',
      color: '#333',
      marginBottom: '20px',
  },
  username: {
      fontSize: '18px',
      color: '#333',
  },
  list: {
      listStyle: 'none',
      padding: 0,
  },
  item: {
      backgroundColor: '#f8f8f8',
      border: '1px solid #ddd',
      borderRadius: '5px',
      padding: '15px',
      marginBottom: '10px',
  },
  product: {
      fontSize: '16px',
      color: '#666',
  },
};
