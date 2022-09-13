import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Link } from 'react-router-dom';
import '@splidejs/react-splide/css';

const Popular = () => {
  const [popular, setPopular] = useState([]);
  const getPopular = async () => {
    const check = localStorage.getItem('popular');
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=ef9cba5e603b4a2fb9fb534b5f65e1f2&number=9`
      );
      const data = await response.json();
      localStorage.setItem('popular', JSON.stringify(data.recipes));
      setPopular(data.recipes);
      console.log(data.recipes);
    }
  };

  useEffect(() => {
    getPopular();
  }, []);

  return (
    <Wrapper>
      <h3>Popular Picks</h3>

      <Splide
        options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          drag: 'free',
          gap: '5rem',
        }}
      >
        {popular.map((recipe) => (
          <SplideSlide key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>
              <Card>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title} />
                <Gradient />
              </Card>
            </Link>
          </SplideSlide>
        ))}
      </Splide>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 4rem 0;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
    img {
    border-radius: 2rem;
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%
    }
    p {
      position: absolute;
      z-index: 10;
      left: 50%;
      bottom: 0%;
      transform: translateX(-50%);
      color: white;
      width: 100%;
      text-align: center;
      font-weight: 600;
      font-size: 1.2em;
      height: 40%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))
`;
export default Popular;
