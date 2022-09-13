import React from 'react';
import './style.css';
import Pages from './pages/Pages';
import Category from './components/Category';
import Search from './components/Search';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GiKnifeFork } from 'react-icons/gi';
export default function App() {
  return (
    <>
      <Nav>
        <Logo to="/">
          <GiKnifeFork />
        </Logo>
      </Nav>
      <Search />
      <Category />
      <Pages />
    </>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: 400;
`;

const Nav = styled.div`
  padding: 4rem 0;
  display: flex;
  justify-content: flex-start;
  align-otems: center;

    svg{
      fonst-size: 2rem;
    }
`;
