import React from 'react';

interface TypeScriptIconProps {
  size?: number;
  color?: string;
}

const TypeScriptIcon: React.FC<TypeScriptIconProps> = ({ size = 24, color = 'currentColor' }) => (
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
    alt="TypeScript"
    width={size}
    height={size}
    style={{ display: 'block' }}
  />
);

export default TypeScriptIcon;