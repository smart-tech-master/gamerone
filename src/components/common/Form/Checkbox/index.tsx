import React, { Ref } from 'react';
import { InputError } from 'models/error';
import cn from 'classnames';
import InputHint from '../InputHint';
import './style.scss';

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  hint?: string;
  error?: InputError;
  inputRef?: Ref<HTMLInputElement>;
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  hint,
  error,
  inputRef,
  ...props
}: CheckboxProps): JSX.Element => {
  const { disabled } = props;
  const wrapperClass = cn('checkbox-wrapper', {
    'is-error': error,
    'is-disabled': disabled,
  });

  const checkboxClass = cn('checkbox', {
    'is-error': error,
    'is-disabled': disabled,
  });

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {label && (
        <label htmlFor={name} className="checkbox-label">
          {label}
        </label>
      )}
      <div className={wrapperClass}>
        <input
          type="checkbox"
          id={name}
          name={name}
          disabled={disabled}
          className={checkboxClass}
          aria-label={name}
          ref={inputRef}
          {...props}
        />
        {(hint || error) && (
          <InputHint type="checkbox" hint={hint} error={error} />
        )}
      </div>
    </div>
  );
};

export default Checkbox;
