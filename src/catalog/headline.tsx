import React from 'react';
import styled from 'styled-components';

import { withConfiguration } from '../hocs/withConfiguration';

const Container = styled.div`
  box-sizing: border-box;
  outline: none;
  position: relative;
  height: 50px;
`;

export default withConfiguration(
  () => <Container />,
  [{ fieldName: 'headline', label: 'Headline' }],
  {
    type: 'headline',
    componentName: 'Headline',
    background: 'rgba(0,0,255,0.05)',
  },
);
