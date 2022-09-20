import { InputVariantProp } from 'design/types/input-variant-prop';

export function mapVariantToMaterialButton(
  value?: InputVariantProp,
): 'outlined' | 'contained' | 'text' | undefined {
  switch (value) {
    case 'filled':
      return 'contained';
    case 'default':
      return 'text';
    case 'outlined':
      return 'outlined';
    default:
      break;
  }
}

export function mapVariantToMaterialInput(
  value?: InputVariantProp,
): 'outlined' | 'filled' | 'standard' | undefined {
  switch (value) {
    case 'filled':
      return 'filled';
    case 'default':
      return 'standard';
    case 'outlined':
      return 'outlined';
    default:
      break;
  }
}
