// src/components/Loader.tsx
import React from 'react';
import styled from 'styled-components';

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1); /* Light border */
  border-radius: 50%;
  border-top: 4px solid #f472b6; /* Pink color */
  width: 4rem; /* 16 */
  height: 4rem; /* 16 */
  animation: spin 1s linear infinite;
  border-opacity: 0.5;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Loader: React.FC = () => {
  return <Spinner />;
};

export default Loader;