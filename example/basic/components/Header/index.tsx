import React from 'react';
import {
  HeadWrapper,
  Logo,
  HeadContent,
  ToggleButton,
  Label,
} from './componentsStyles';

type Props = {
  setShowPreview: void;
};

export const Header: React.FC<Props> = ({ setShowPreview }) => {
  return (
    <HeadWrapper>
      <Logo>
        <LogoSvg />
        <span>Pagio</span>
      </Logo>
      <HeadContent>
        <Label htmlFor="toggle-button">Preview mode</Label>
        <ToggleButton
          id="toggle-button"
          type="checkbox"
          onChange={() => setShowPreview(prev => !prev)}
        />
      </HeadContent>
    </HeadWrapper>
  );
};

const LogoSvg: React.FC = () => (
  <svg
    viewBox="0 0 180 198"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d)">
      <path
        d="M44.59 189.28H14.56C6.52 189.28 0 182.76 0 174.72V130.13H59.15V174.72C59.15 182.76 52.63 189.28 44.59 189.28Z"
        fill="#39A7FF"
      />
      <path
        d="M175.63 14.56V58.24H141.04C140.8 53.67 137.03 50.05 132.4 50.05H0V14.56C0 6.52 6.52 0 14.56 0H161.07C169.11 0 175.63 6.52 175.63 14.56Z"
        fill="#FF394B"
      />
      <path
        d="M175.63 58.24V102.83C175.63 110.87 169.11 117.39 161.07 117.39H0V67.34H132.4C134.78 67.34 136.95 66.38 138.52 64.81C140.09 63.24 141.05 61.08 141.05 58.69C141.05 58.54 141.05 58.39 141.04 58.24H175.63Z"
        fill="#FFBD39"
      />
    </g>
    <defs>
      <filter
        id="filter0_d"
        x="-4"
        y="0"
        width="183.63"
        height="197.28"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
