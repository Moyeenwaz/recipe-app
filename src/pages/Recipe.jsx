import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Recipe = () => {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('instructions');
  const { id } = useParams();

  const fetchDetails = async (id) => {
    const check = localStorage.getItem(`${id}`);
    if (check) {
      setDetails(JSON.parse(check));
    } else {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=ef9cba5e603b4a2fb9fb534b5f65e1f2`
      );
      const data = await response.json();
      localStorage.setItem(`${id}`, JSON.stringify(data));
      setDetails(data);
    }
  };

  useEffect(() => {
    fetchDetails(id);
  }, [id]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button
          className={`${activeTab === 'instructions' ? 'active' : ''}`}
          onClick={() => setActiveTab('instructions')}
        >
          Instructions
        </Button>
        <Button
          className={`${activeTab === 'ingredients' ? 'active' : ''}`}
          onClick={() => setActiveTab('ingredients')}
        >
          Ingredients
        </Button>
        {activeTab === 'instructions' && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}

        {activeTab === 'ingredients' && (
          <ul>
            <li>Sample Ingredient</li>
            <li>Sample Ingredient</li>
            <li>Sample Ingredient</li>
            <li>Sample Ingredient</li>
            <li>Sample Ingredient</li>
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
    .active {
     background: linear-gradient(35deg, #494949, #313131);
     color: white;
    }
    h2 {
      margin-bottom: 2rem;      
    }

    li {
      font-size: 1.2rem;
      line-height: 2.5rem;
    }

    ul {
      margin-top: 2rem;
    }
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
    cursor: pointer;
`;

const Info = styled.div`
    margin-left: 10rem;

`;

export default Recipe;
