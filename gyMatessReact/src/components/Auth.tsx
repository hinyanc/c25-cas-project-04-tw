// import React, { FormEvent, useState } from "react";
// import { Button, Form } from "react-bootstrap";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../app/store";
// import { login } from "./authSlice";
// import { fetchLogin } from "./authAPI";

// export function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPasswrod] = useState("");

//   const dispatch = useDispatch<AppDispatch>();

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     const result = await fetchLogin(email, password);
//     if (result) {
//       dispatch(login(email));
//     }
//   };
//   return (
//     <Form>
//       <Form.Group className="mb-3" controlId="formUsername">
//         <Form.Label>Username</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter username"
//           value={email}
//           onChange={(e) => {
//             setEmail(e.target.value);
//           }}
//         />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formBasicPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => {
//             setPasswrod(e.target.value);
//           }}
//         />
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="formBasicCheckbox">
//         <Form.Check type="checkbox" label="Check me out" />
//       </Form.Group>
//       <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
//         Submit
//       </Button>
//     </Form>
//   );
// }
