import React from 'react';
import withConfiguration from 'src/hocs/withConfiguration';
import styled from 'styled-components';

const TextContainer = styled.div`
  box-sizing: border-box;
  outline: none;
  position: relative;
  height: 3vw;
`;

export default withConfiguration(
  () => <TextContainer />,
  [{ fieldName: 'headline', label: 'Headline' }],
  {
    type: 'headline',
    componentName: 'Headline',
    background: 'rgba(0,0,255,0.05)',
  },
);
