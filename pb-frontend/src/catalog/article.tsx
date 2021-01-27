import React from 'react';
import withConfiguration from 'src/hocs/withConfiguration';
import styled from 'styled-components';

const TextContainer = styled.div`
  box-sizing: border-box;
  outline: none;
  position: relative;
  height: 15vw;
`;

export default withConfiguration(
  () => <TextContainer />,
  [{ fieldName: 'articleId', label: 'articleId' }],
  {
    type: 'article',
    componentName: 'Article',
    background: 'rgba(255,0,0,0.05)',
  },
);
