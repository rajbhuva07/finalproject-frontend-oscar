// // import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheck, faEdit, faHome, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { Col, Row, Form, Button, Breadcrumb, Table } from '@themesberg/react-bootstrap';

// export default () => {
//   const [products, setProducts] = useState([]);
//   const [formData, setFormData] = useState({
//     product_name: '',
//     price: '',
//     description: '',
//     image: null
//   });

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(`http://localhost:8000/product`);
//         if (response.ok) {
//           const data = await response.json();
//           setProducts(data.product);
//         } else {
//           throw new Error('Failed to fetch products');
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchProduct();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formDataWithImage = new FormData();
//       formDataWithImage.append('product_name', formData.product_name);
//       formDataWithImage.append('price', formData.price);
//       formDataWithImage.append('description', formData.description);
//       formDataWithImage.append('image', formData.image);

//       const url = formData._id ? `http://localhost:8000/product/edit/${formData._id}` : 'http://localhost:8000/product';
//       const method = formData._id ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method: method,
//         body: formDataWithImage
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save product');
//       }

//       const updatedProduct = await response.json();

//       const updatedProducts = formData._id ? 
//         products.map(product => product._id === formData._id ? updatedProduct : product) : 
//         [...products, updatedProduct];

//       setProducts(updatedProducts);
//       setFormData({ _id: '', product_name: '', price: '', description: '', image: null });
//       alert('Product saved successfully');
//     } catch (error) {
//       console.error(error);
//       alert('Failed to save product');
//     }
//   };

//   const handleDelete = async (_id) => {
//     try {
//       const response = await fetch(`http://localhost:8000/product/delete/${_id}`, {
//         method: 'DELETE'
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete product');
//       }

//       const updatedProducts = products.filter(product => product._id !== _id);
//       setProducts(updatedProducts);
//       alert('Product deleted successfully');
//     } catch (error) {
//       console.error(error);
//       alert('Failed to delete product');
//     }
//   };

//   const handleEdit = async (_id) => {
//     try {
//       const selectedProduct = products.find(product => product._id === _id);
//       setFormData({
//         _id: selectedProduct._id,
//         product_name: selectedProduct.product_name,
//         price: selectedProduct.price,
//         description: selectedProduct.description
//       });
//     } catch (error) {
//       console.error(error);
//       alert('Failed to load product details for editing');
//     }
//   };

//   return (
//     <>
//       <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
//         <div className="d-block mb-4 mb-md-0">
//           <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
//             <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
//             <Breadcrumb.Item>Volt</Breadcrumb.Item>
//             <Breadcrumb.Item active>Product</Breadcrumb.Item>
//           </Breadcrumb>
//           <h4>Product</h4>
//           <p className="mb-0">Your product management panel.</p>
//         </div>
//       </div>

//       <Form onSubmit={handleSubmit}>
//         <Row>
//           <Form.Group controlId="image">
//             <Form.Label>Image</Form.Label>
//             <Form.Control type="file" name="image" onChange={handleImageChange} accept="image/*" />
//           </Form.Group>
//           <Col xs={12} md={6}>
//             <Form.Group controlId="product_name">
//               <Form.Label>Product Name</Form.Label>
//               <Form.Control type="text" name="product_name" value={formData.product_name} onChange={handleInputChange} required />
//             </Form.Group>
//           </Col>
//           <Col xs={12} md={6}>
//             <Form.Group controlId="price">
//               <Form.Label>Price</Form.Label>
//               <Form.Control type="number" name="price" value={formData.price} onChange={handleInputChange} required />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Form.Group controlId="description">
//           <Form.Label>Description</Form.Label>
//           <Form.Control type="text" name="description" value={formData.description} onChange={handleInputChange} />
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Add Product
//         </Button>
//       </Form>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Product Name</th>
//             <th>Price</th>
//             <th>Description</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product, index) => (
//             <tr key={product._id}>
//               <td>{index + 1}</td>
//               <td>{product._id}</td>
//               <td>{product.product_name}</td>
//               <td>{product.price}</td>
//               <td>{product.description}</td>
//               <td>
//                 <Button variant="info" size="sm" onClick={() => handleEdit(product._id)}>
//                   <FontAwesomeIcon icon={faEdit} />
//                 </Button>
//                 {' '}
//                 <Button variant="danger" size="sm" onClick={() => handleDelete(product._id)}>
//                   <FontAwesomeIcon icon={faTrash} />
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </>
//   );
// };
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faHome, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, Breadcrumb, Table } from '@themesberg/react-bootstrap';


export default () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    product_name: '',
    price: '',
    descrption: '',
    image: null
  });
  const [formErrors, setFormErrors] = useState({});

  const validateInput = (name, value) => {
    let error = "";
    switch (name) {
      case "product_name":
      case "descrption":
        error = value ? "" : `${name} is required`;
        break;
      case "price":

        error = value && isNaN(value) ? `${name} must be a number` : "";
        break;

      case "image":
        error = value ? "" : "Image must be selected";
        break;
      default:
        break;
    }
    setFormErrors({ ...formErrors, [name]: error });
  };
  useEffect(() => {
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

        const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
          validateInput(name, value);
        };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = Object.values(formErrors).every((error) => !error);
    if (!isFormValid) {
      alert('Please fill out all required fields correctly');
      return;
    }
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append('product_name', formData.product_name);
      formDataWithImage.append('price', formData.price);
      formDataWithImage.append('descrption', formData.descrption);
      formDataWithImage.append('image', formData.image);

      const url = formData._id ? `http://localhost:8000/product/edit/${formData._id}` : 'http://localhost:8000/product';
      const method = formData._id ? 'PUT' : 'POST';
      const token = localStorage.getItem('token');

      const response = await fetch(url, {
        method: method,
        body: formDataWithImage,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to save product');
      }

      const updatedProduct = await response.json();

      const updatedProducts = formData._id ?
        products.map(product => product._id === formData._id ? updatedProduct : product) :
        [...products, updatedProduct];

      setProducts(updatedProducts);
      setFormData({ _id: '', product_name: '', price: '', description: '', image: null });
      window.location.reload();
      alert('Product saved successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to save product');
    }
  };

  const handleDelete = async (_id) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:8000/product/delete/${_id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      const updatedProducts = products.filter(product => product._id !== _id);
      setProducts(updatedProducts);
      alert('Product deleted successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to delete product');
    }
  };

  const handleEdit = async (_id) => {
    try {
      const selectedProduct = products.find(product => product._id === _id);
      setFormData({
        _id: selectedProduct._id,
        product_name: selectedProduct.product_name,
        price: selectedProduct.price,
        descrption: selectedProduct.descrption,
        imagename: selectedProduct.imagename
      });
    } catch (error) {
      console.error(error);
      alert('Failed to load product details for editing');
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Volt</Breadcrumb.Item>
            <Breadcrumb.Item active>Product</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Product</h4>
          <p className="mb-0">Your product management panel.</p>
        </div>
      </div>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" name="image" onChange={handleImageChange} accept="image/*" />
          </Form.Group>

          <Col xs={12} md={6}>
            <Form.Group controlId="product_name">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" name="product_name" value={formData.product_name} onChange={handleInputChange} required />
            </Form.Group>
            {formErrors.product_name && (
                <Form.Text className="text-danger">{formErrors.product_name}</Form.Text>
              )}

          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={formData.price} onChange={handleInputChange} required />
              {formErrors.price && (
                <Form.Text className="text-danger">{formErrors.price}</Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" name="descrption" value={formData.descrption} onChange={handleInputChange} />
          {formErrors.descrption && (
                <Form.Text className="text-danger">{formErrors.descrption}</Form.Text>
              )}
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product._id}</td>
              <td><img src={`http://localhost:8000/upload/${product.imagename}`} alt="Product Image" height={'100px'} width={'100px'} /></td>
              <td>{product.product_name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => handleEdit(product._id)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                {' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(product._id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
