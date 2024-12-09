import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faHome, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, Breadcrumb, Table } from '@themesberg/react-bootstrap';


export default () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    marks: '',
    std: '',
    mobile_number: '',
    image: null
  });
  const [formErrors, setFormErrors] = useState({});

  const validateInput = (name, value) => {
    let error;
    switch (name) {
      case "firstname":
      case "lastname":
        error = value ? "" : `${name} is required`;
        break;
      case "marks":
      case "mobile_number":
        error = value && isNaN(value) ? `${name} must be a number` : "";
        break;
      case "std":
        error = value ? "" : "std field must not be empty";
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
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/student`, {
          headers: {  
            'Authorization': `Bearer ${token}`
          } 
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data.user);
        } else {
          throw new Error('Failed to fetch users');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
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

    // Check if any required fields are empty
    const requiredFields = ["firstname", "lastname", "marks", "std", "mobile_number"];
    const isEmpty = requiredFields.some(field => !formData[field]);

    if (isEmpty) {
      alert('Please fill out all required fields');
      return;
    }

    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append('firstname', formData.firstname);
      formDataWithImage.append('lastname', formData.lastname);
      formDataWithImage.append('marks', formData.marks);
      formDataWithImage.append('std', formData.std);
      formDataWithImage.append('mobile_number', formData.mobile_number);
      if (formData.image) {
        formDataWithImage.append('image', formData.image);
      }
      const url = formData._id ? `${process.env.REACT_APP_SERVER_DOMAIN}/student/edit/${formData._id}` : `${process.env.REACT_APP_SERVER_DOMAIN}/student`;
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
        throw new Error('Failed to save user');
      }

      const updatedUser = await response.json();

      const updatedUsers = formData._id ?
        users.map(user => user._id === formData._id ? updatedUser : user) :
        [...users, updatedUser];

      setUsers(updatedUsers);
      setFormData({
        _id: '',
        firstname: '',
        lastname: '',
        marks: '',
        std: '',
        mobile_number: '',
        image: formData.image ? formData.image : null
      });
      window.location.reload();
      alert('User saved successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to save user');
    }
  };

  const handleDelete = async (_id) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/student/delete/${_id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      const updatedUsers = users.filter(user => user._id !== _id);
      setUsers(updatedUsers);
      alert('User deleted successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to delete user');
    }
  };

  const handleEdit = async (_id) => {
    try {
      const selectedUser = users.find(user => user._id === _id);
      console.log("selectedUser._id=================", selectedUser._id);
      setFormData({
        _id: selectedUser._id,
        firstname: selectedUser.firstname,
        lastname: selectedUser.lastname,
        marks: selectedUser.marks,
        std: selectedUser.std,
        mobile_number: selectedUser.mobile_number,
        image: selectedUser.image,
      });
    } catch (error) {
      console.error(error);
      alert('Failed to load user details for editing');
    }
  };


  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Volt</Breadcrumb.Item>
            <Breadcrumb.Item active>Students</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Students</h4>
          <p className="mb-0">Your student management panel.</p>
        </div>
      </div>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group controlId="firstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="firstname" value={formData.firstname} onChange={handleInputChange} required />
              {formErrors.firstname && (
                <Form.Text className="text-danger">{formErrors.firstname}</Form.Text>
              )}
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="lastname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="lastname" value={formData.lastname} onChange={handleInputChange} required />
              {formErrors.lastname && (
                <Form.Text className="text-danger">{formErrors.lastname}</Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="marks">
          <Form.Label>Marks</Form.Label>
          <Form.Control type="number" name="marks" value={formData.marks} onChange={handleInputChange} />
          {formErrors.marks && (
            <Form.Text className="text-danger">{formErrors.marks}</Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId="std">
          <Form.Label>Std</Form.Label>
          <Form.Control type="text" name="std" value={formData.std} onChange={handleInputChange} />
          {formErrors.std && (
            <Form.Text className="text-danger">{formErrors.std}</Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="mobile_number">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control type="number" name="mobile_number" value={formData.mobile_number} onChange={handleInputChange} />
          {formErrors.mobile_number && (
            <Form.Text className="text-danger">{formErrors.mobile_number}</Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" name="image" onChange={handleImageChange} accept="image/*" />
          {formErrors.image && (
            <Form.Text className="text-danger">{formErrors.image}</Form.Text>
          )}
        </Form.Group>
        {formData.image && (
          <div className="image-preview-container">
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Preview"
              className="rounded-image-preview"
              height={'100px'}
              width={'100px'}
              key={formData.image.name}
            />
          </div>
        )}

        <Button variant="primary" type="submit">
          {formData._id ? 'Update User' : 'Add User'}
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Marks</th>
            <th>Mobile Number</th>
            <th>Image</th>
            <th>Std</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.marks}</td>
              <td>{user.mobile_number}</td>
              <td>
                <img src={`http://localhost:8000/upload/${user.imagename}`} alt="User Image" height={'100px'} width={'100px'} />
              </td>
              <td>{user.std}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => handleEdit(user._id)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(user._id)}>
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
