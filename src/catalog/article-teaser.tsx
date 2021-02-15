import React from 'react';
import styled from 'styled-components';
import withConfiguration from '../hocs/withConfiguration';

const TextContainer = styled.div`
  box-sizing: border-box;
  outline: none;
  position: relative;
  height: 200px;
`;

export default withConfiguration(
  () => <TextContainer />,
  [{ fieldName: 'articleId', label: 'articleId' }],
  {
    type: 'article-teaser',
    componentName: 'Article Teaser',
    background: 'rgba(255,0,0,0.05)',
  },
);
