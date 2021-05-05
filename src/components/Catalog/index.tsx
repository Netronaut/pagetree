import React from 'react';
import { GroupWrapper } from './GroupWrapper';
import { ComponentGroups } from '../../hocs/createCatalogComponent';

type Props = {
  componentGroups?: ComponentGroups;
};

export const Catalog: React.FC<Props> = ({ componentGroups }) => {
  return (
    componentGroups?.map(group =>
      <GroupWrapper key={group.name} group={group} />
    )
  );
};
