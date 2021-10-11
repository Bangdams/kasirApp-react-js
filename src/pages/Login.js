import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap';
import "./Login.css";
import { Redirect } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit (event) {
    event.preventDefault();
    console.log("Cek Data: ", email)
    if (email === "cek@gmail.com" && password === "cek") {
      Swal.fire(
      'Login Berhasil',
      'Berhasil Login',
      'success'
    )
    }else{
      Swal.fire(
      'Silahkan coba lagi!!',
      'Email Atau Password anda Salah!!',
      'error'
    )
    }
  }
  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
           
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            v
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}