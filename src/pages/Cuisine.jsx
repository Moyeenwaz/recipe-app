import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

const Cuisine = () => {
  const [cuisine, setCuisine] = useState([]);
  const { type } = useParams();

  const getCuisine = async (name) => {
    const check = localStorage.getItem(`${type}-cuisine`);
    if (check) {
      setCuisine(JSON.parse(check));
    } else {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=ef9cba5e603b4a2fb9fb534b5f65e1f2&cuisine=${name}`
      );
      const data = await response.json();
      localStorage.setItem(`${type}-cuisine`, JSON.stringify(data.results));
      setCuisine(data.results);
    }
  };

  useEffect(() => {
    getCuisine(type);
  }, [type]);
  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cuisine.map((recipe) => (
        <Link to={`/recipe/${recipe.id}`}>
          <Card key={recipe.id}>
            <img src={recipe.image} alt={recipe.title} />
            <h4>{recipe.title}</h4>
          </Card>
        </Link>
      ))}
    </Grid>
  );
};

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
  border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4{
    text-align: center;
    padding: 1rem;
  }
`;
export default Cuisine;
