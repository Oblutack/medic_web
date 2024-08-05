// src/components/Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import RegisterUser from "./RegisterUser";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [show, setShow] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5144/api/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUsers(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  const handleClose = () => setShow(false);
  const handleShow = (user) => {
    setSelectedUser(user);
    setShow(true);
  };

  const handleRegisterClose = () => setShowRegister(false);
  const handleRegisterShow = () => setShowRegister(true);

  const refreshUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5144/api/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
      <Button variant="primary" onClick={handleRegisterShow} className="ml-3">
        Register New User
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Last Login Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userID}>
              <td>{user.userID}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.lastLoginDate}</td>
              <td>
                <Button variant="info" onClick={() => handleShow(user)}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedUser && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formUserID">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.userID}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formName" className="mt-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={selectedUser.name} readOnly />
              </Form.Group>
              <Form.Group controlId="formUsername" className="mt-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.username}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formOrders" className="mt-3">
                <Form.Label>Orders</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.orders}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formLastLoginDate" className="mt-3">
                <Form.Label>Last Login Date</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.lastLoginDate}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formImageURL" className="mt-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.imageURL}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formStatus" className="mt-3">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.status}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formDateOfBirth" className="mt-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.dateOfBirth}
                  readOnly
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <RegisterUser
        show={showRegister}
        handleClose={handleRegisterClose}
        refreshUsers={refreshUsers}
      />
    </div>
  );
};

export default Home;
