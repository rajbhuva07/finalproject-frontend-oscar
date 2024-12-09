import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faPhone } from '@fortawesome/free-solid-svg-icons';
import './userStyle.css'; // Import custom CSS file for styling
import { useHistory } from 'react-router-dom';
export default () => {
    const [products, setProducts] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const history = useHistory(); // Initialize useHistory hook

    useEffect(() => {
        // Fetch products
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:8000/product`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.product);
                } else {
                    throw new Error('Failed to fetch products');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchProduct();
    }, []);

    const [user, setUser] = useState([]);
    useEffect(() => {
        // Fetch students
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/student`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                } else {
                    throw new Error('Failed to fetch students');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, []);

    const addToCart = async (productId, price) => {

        try {
            const token = localStorage.getItem('token');
            console.log("user.email========", user.email);
            const response = await fetch(`http://localhost:8000/buyproduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ productId, price })
            });

            if (response.ok) {
                setCartCount(prevCount => prevCount + 1);
                const data = await response.json();
             
                // alert("Product added to cart successfully!");
            } else {
                throw new Error('Failed to add product to cart');
            }
        } catch (error) {
            console.error(error);
            alert("Failed to add product to cart");
        }
    };

    const show = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8000/buyproduct/datashow`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                // Display the products in the cart
                console.log("showdata========",data);
                console.log(JSON.stringify(data.product),"======================data.products");
                alert("Products in Cart: " + JSON.stringify(data.products));
                  history.push('/cart');
            } else {
                throw new Error('Failed to fetch cart items');
            }
        } catch (error) {
            console.error(error);
            alert("Failed to fetch cart items");
        }
    };

    return (
        <>
            <header className="navbar">
                <h1>My Shopping App</h1>
                <div className="cart-icon" onClick={show}>
                    <FontAwesomeIcon icon={faCartPlus} />
                    <span>{cartCount}</span>
                </div>
            </header>
            <div className="container">
                <h1>Product Details</h1>
                <div className="row">
                    {products.map((product, index) => (
                        <div key={product._id} className="col-md-4 mb-4">
                            <div className="product-card">
                                <img src={`http://localhost:8000/upload/${product.imagename}`} className="product-image" alt="Product" />
                                <div className="product-info">
                                    <h5 className="product-title">{product.product_name}</h5>
                                    <p className="product-description">{product.description}</p>
                                    <p className="product-price">Price: ${product.price}</p>
                                    <button className="btn btn-primary" onClick={() => addToCart(product._id, product.price)}>
                                        <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <h1>Student Details</h1>
                <div className="row">
                    {user.map((user, index) => (
                        <div key={user._id} className="col-md-4 mb-4">
                            <div className="student-card">
                                <img src={`http://localhost:8000/upload/${user.imagename}`} className="student-image" alt="User" />
                                <div className="student-info">
                                    <h5 className="student-name">{user.firstname}</h5>
                                    <p className="student-lastname">{user.lastname}</p>
                                    <p className="student-marks">Marks: {user.marks}</p>
                                    <p className="student-std">{user.std}</p>
                                    <p className="student-mobile">{user.mobile_number}</p>
                                    <button className="btn btn-primary">
                                        <FontAwesomeIcon icon={faPhone} /> Call to Parents
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
