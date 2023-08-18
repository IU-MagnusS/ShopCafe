import React, { useState } from 'react';

const CreateUser = ({ createUser }) => {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const newUser = {
      name,
      contactNumber,
      email,
      password,
      status: 'false',
      role: 'user',
    };
    createUser(newUser);
    setName('');
    setContactNumber('');
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Contact Number:</label>
        <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
