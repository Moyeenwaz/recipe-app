import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/searched/${input}`);
  };

  return (
    <Form onSubmit={submitHandler}>
      <div>
        <FaSearch />
        <input type="text" value={input} onChange={handleInputChange} />
      </div>
    </Form>
  );
};

const Form = styled.form`
  margin: 2rem 20rem 0rem;
  

    div{
      position: relative;
      width: 100%;
    }
    input{
      width: 100%;
      border: none;
      background: linear-gradient(35deg, #494949, #313131);
      font-size: 1.5rem;
      color: white;
      font-family: inherit;
      padding: 1rem 3rem;
      border: none;
      border-radius: 1rem;
      outline: none;
    }
    svg{
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(100%, -50%);
      color: white;
    }
`;

export default Search;
