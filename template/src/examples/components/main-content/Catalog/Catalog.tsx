import { FC } from 'react';
import { Buttons } from './Buttons/Buttons';
import { Icons } from './Icons/Icons';
import { Inputs } from './Inputs/Inputs';
import { TextCatalog } from './Text/TextCatalog';

export const Catalog: FC = () => {
  return (
    <>
      <TextCatalog />

      <br />

      <Buttons />

      <br />

      <Inputs />

      <br />

      <Icons />
    </>
  );
};
