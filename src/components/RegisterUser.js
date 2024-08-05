// src/components/RegisterUser.js
import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

const RegisterUser = ({ show, handleClose, refreshUsers }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [orders, setOrders] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5144/api/users",
        { username, password, name, orders, imageURL, dateOfBirth },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      refreshUsers();
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Register New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleRegister}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formName" className="mt-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formOrders" className="mt-3">
            <Form.Label>Orders</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter orders"
              value={orders}
              onChange={(e) => setOrders(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formImageURL" className="mt-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDateOfBirth" className="mt-3">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter date of birth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Register
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterUser;
