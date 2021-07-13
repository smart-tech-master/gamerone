import React, { ReactNode } from 'react';
import cn from 'classnames';
import InputLoading from '../Form/InputLoading';
import './style.scss';

export type ButtonScheme =
  | 'primary'
  | 'subtle'
  | 'reveal'
  | 'small'
  | 'square'
  | 'inset'
  | null;
export type ButtonSize = 'small' | 'medium' | 'large';

export enum ButtonSchemeEnum {
  PRIMARY = 'primary',
  SUBTLE = 'subtle',
  REVEAL = 'reveal',
  SMALL = 'small',
  SQUARE = 'square',
  INSET = 'inset',
}

export enum ButtonSizeEnum {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  scheme?: ButtonScheme;
  schemes?: ButtonScheme[];
  submitting?: boolean;
  text?: string;
  size?: ButtonSize;
  children?: ReactNode;
  onClick?: (e?: any) => void;
}

const Button = ({
  type = 'submit',
  submitting = false,
  scheme,
  schemes,
  size = ButtonSizeEnum.MEDIUM,
  children,
  className,
  ...props
}: ButtonProps): JSX.Element => {
  const { disabled } = props;

  const btnClassName = cn('button', className, {
    [`button--${scheme}`]: !!scheme,
    [`button--${size}`]: !!size,
    'is-disabled': disabled,
  });

  const additionalSchemes = schemes?.map((s: ButtonScheme) => ` button--${s}`);

  return submitting ? (
    <button
      type={type}
      className={btnClassName + additionalSchemes}
      {...props}
      disabled
    >
      <InputLoading show={true} />
    </button>
  ) : (
    <button
      type={type}
      className={btnClassName + (additionalSchemes ? additionalSchemes : '')}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
