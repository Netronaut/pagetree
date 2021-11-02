import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import {
  BrandIcon,
  EditIcon,
  ShareIcon,
  StarIcon,
  ClipboardIcon,
  LogIcon,
  IconButton,
  Badge,
} from '../icons';
import { Button } from '../Button';
import { Larger } from '../Typography';
import { Tooltip } from '..';
import { HeaderIcon, HeaderGroup, HeaderRoot, TextGroup } from './Header.styles';
import { PageEntity } from '../types';

const numberOfChanges = 0;

interface HeaderProps {
  page: PageEntity;
  onUpdate?: (page: PageEntity) => void;
  link?: string;
  onToggleChangelog: () => void;
  sidebarOpen: boolean;
}

export const Header = ({
  page,
  onUpdate = () => undefined,
  link,
  onToggleChangelog,
  sidebarOpen,
}: HeaderProps): ReactElement => (
  <HeaderRoot>
    <HeaderGroup columnNumber={1}>
      {link ? (
        <Link to={link}>
          <Tooltip content="Back to pages" position="bottom">
            <HeaderIcon>
              <BrandIcon fill />
            </HeaderIcon>
          </Tooltip>
        </Link>
      ) : (
        <HeaderIcon>
          <BrandIcon fill />
        </HeaderIcon>
      )}
    </HeaderGroup>

    <HeaderGroup columnNumber={2}>
      <Tooltip content="Star this page" position="bottom">
        <IconButton onClick={() => onUpdate({ ...page, starred: !page.starred })}>
          <StarIcon fill={page.starred} />
        </IconButton>
      </Tooltip>
      <TextGroup>
        <Larger>{page.title}</Larger>
        <IconButton>
          <EditIcon />
        </IconButton>
      </TextGroup>
      <Tooltip content="Open preview" position="bottom">
        <IconButton>
          <ShareIcon />
        </IconButton>
      </Tooltip>
    </HeaderGroup>

    <HeaderGroup columnNumber={4} padding="xxs">
      <Button
        primary
        onClick={() => {
          const updatedHistory = page.history?.slice();
          const updatedVersion = String(Number(page.version) + 1 || 1);
          updatedHistory?.push({
            version: updatedVersion,
            date: new Date().toISOString(),
          });
          onUpdate({ ...page, history: updatedHistory, version: updatedVersion });
        }}
      >
        publish
      </Button>
    </HeaderGroup>

    <HeaderGroup columnNumber={5}>
      <IconButton onClick={onToggleChangelog}>
        <Badge value={numberOfChanges}>
          <LogIcon stroke={sidebarOpen} />
        </Badge>
      </IconButton>
      <IconButton>
        <ClipboardIcon />
      </IconButton>
    </HeaderGroup>
  </HeaderRoot>
);
