import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import {
  BrandIcon,
  EditIconOutline,
  StarIconOutline,
  PreviewIconOutline,
  LogIconOutline,
  HeaderIconButton,
  InspectorIconOutline,
  IconButton,
  Badge,
} from '../icons';
import { Button } from '../Button';
import { Larger } from '../Typography';
import { PageEntity, Tooltip } from '..';
import { HeaderGroup, HeaderRoot, TextGroup } from './Header.styles';

const numberOfChanges = 0;

interface HeaderProps {
  page: PageEntity;
  onUpdate?: (page: PageEntity) => void;
  link?: string;
}

export const Header = ({ page, onUpdate = () => undefined, link }: HeaderProps): ReactElement => (
  <HeaderRoot>
    <HeaderGroup columnNumber={1}>
      {link ? (
        <Link to={link}>
          <Tooltip content="Back to pages" position="bottom">
            <HeaderIconButton>
              <BrandIcon />
            </HeaderIconButton>
          </Tooltip>
        </Link>
      ) : (
        <HeaderIconButton>
          <BrandIcon />
        </HeaderIconButton>
      )}
    </HeaderGroup>

    <HeaderGroup columnNumber={2}>
      <Tooltip content="Star this page" position="bottom">
        <IconButton
          onClick={() => onUpdate({ ...page, starred: !page.starred })}
          active={page.starred}
        >
          <StarIconOutline />
        </IconButton>
      </Tooltip>
      <TextGroup>
        <Larger>{page.title}</Larger>
        <IconButton>
          <EditIconOutline />
        </IconButton>
      </TextGroup>
      <Tooltip content="Preview" position="bottom">
        <IconButton>
          <PreviewIconOutline />
        </IconButton>
      </Tooltip>
    </HeaderGroup>

    <HeaderGroup columnNumber={4} padding="xxs">
      <Button primary>publish</Button>
    </HeaderGroup>

    <HeaderGroup columnNumber={5}>
      <IconButton>
        <Badge value={numberOfChanges}>
          <LogIconOutline />
        </Badge>
      </IconButton>
      <IconButton>
        <InspectorIconOutline />
      </IconButton>
    </HeaderGroup>
  </HeaderRoot>
);
