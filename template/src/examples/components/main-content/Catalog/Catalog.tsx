import { FC } from 'react';
import { Buttons } from './Buttons/Buttons';
import { Icons } from './Icons/Icons';
import { Selects } from './Selects/Selects';
import { TextCatalog } from './Text/TextCatalog';

export const Catalog: FC = () => {
  return (
    <>
      <TextCatalog />

      <br />

      <Buttons />

      <br />

      <Selects />

      <br />

      <Icons />
    </>
  );
};
