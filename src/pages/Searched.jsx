import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

export default function Searched() {
  const [searchRecipes, setSearchRecipes] = useState([]);
  const { search } = useParams();

  const getSearched = async (input) => {
    const check = localStorage.getItem(`${search}`);
    if (check) {
      setSearchRecipes(JSON.parse(check));
    } else {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=ef9cba5e603b4a2fb9fb534b5f65e1f2&query=${input}`
      );
      const data = await response.json();
      localStorage.setItem(`${search}`, JSON.stringify(data.results));
      setSearchRecipes(data.results);
    }
  };

  useEffect(() => {
    getSearched(search);
  }, [search]);
  return (
    <Grid>
      {searchRecipes.map((recipe) => (
        <Link to={`/recipe/${recipe.id}`}>
          <Card key={recipe.id}>
            <img src={recipe.image} alt={recipe.title} />
            <h4>{recipe.title}</h4>
          </Card>
        </Link>
      ))}
    </Grid>
  );
}

const Grid = styled.div`
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
