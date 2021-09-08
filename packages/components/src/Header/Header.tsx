import React, { ReactElement } from 'react';
import { HeaderGroup, HeaderRoot, TextGroup } from './Header.styles';
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

const numberOfChanges = 0;

export const Header = (): ReactElement => (
  <HeaderRoot>
    <HeaderGroup columnNumber={1}>
      <IconButton>
        <BrandIcon fill />
      </IconButton>
    </HeaderGroup>

    <HeaderGroup columnNumber={2}>
      <IconButton>
        <StarIcon />
      </IconButton>
      <TextGroup>
        <Larger>Gute Zeiten Schlechte Zeiten | Alle Videos</Larger>
        <IconButton>
          <EditIcon />
        </IconButton>
      </TextGroup>
      <IconButton>
        <ShareIcon />
      </IconButton>
    </HeaderGroup>

    <HeaderGroup columnNumber={4} padding="xxs">
      <Button primary>publish</Button>
    </HeaderGroup>

    <HeaderGroup columnNumber={5}>
      <IconButton>
        <Badge value={numberOfChanges}>
          <LogIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <ClipboardIcon />
      </IconButton>
    </HeaderGroup>
  </HeaderRoot>
);
