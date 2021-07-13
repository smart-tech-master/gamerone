import React, { Ref, ReactNode, useState, useEffect } from 'react';
import { InputError } from 'models/error';
import cn from 'classnames';
import InputHint from 'components/common/Form/InputHint';
import './style.scss';
import Button, { ButtonSchemeEnum } from 'components/common/Button';

type SelectOptionType = SelectOption;

export interface SelectOption {
  value?: string | number;
  label?: string;
  description?: string;
}

export interface InputProps
  extends React.InputHTMLAttributes<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > {
  type?: 'text' | 'email' | 'password' | 'textarea' | 'select';
  name: string;
  label?: string;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  placeholder?: string;
  value?: string;
  hint?: string;
  error?: InputError;
  inputRef?: Ref<HTMLInputElement>;
  textareaRef?: Ref<HTMLTextAreaElement>;

  appendLeft?: ReactNode;
  appendRight?: ReactNode;

  selectRef?: Ref<HTMLSelectElement>;
  selectOptions?: SelectOptionType[];
  selectInitValue?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  name,
  label,
  onChange,
  placeholder,
  value,
  hint,
  error,
  inputRef,
  textareaRef,

  appendLeft,
  appendRight,

  selectRef,
  selectOptions,
  selectInitValue,

  ...props
}: InputProps): JSX.Element => {
  const { disabled } = props;

  // Start Select specific functions
  const [selected, setSelected] = useState<string | undefined>(undefined);

  // Wrapper so the hint is updated on change
  const handleSelectOnChange = (e: any) => {
    // call the passed in onChange event
    onChange && onChange(e);
    // update the selected/hint
    const selectedOption =
      selectOptions &&
      selectOptions.find((opt: SelectOption) => opt.value === e.target.value);
    setSelected(selectedOption?.description);
  };

  useEffect(() => {
    setSelected(
      selectOptions &&
        selectOptions.find((opt: SelectOption) => opt.value === selectInitValue)
          ?.description,
    );
  }, [selectOptions, selectInitValue]);
  // End Select

  const wrapperClass = cn('input-wrapper', {
    'is-error': error,
    'is-disabled': disabled,
  });

  const inputClass = cn('input', {
    'is-error': error,
    'is-disabled': disabled,
  });

  return (
    <div className="input-group">
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
        </label>
      )}

      <div className={wrapperClass}>
        {appendLeft && <div className="input-append-left">{appendLeft}</div>}
        {appendRight && type !== 'select' && (
          <div className="input-append-right">{appendRight}</div>
        )}
        {type === 'textarea' && (
          <textarea
            name={name}
            disabled={disabled}
            className={inputClass}
            rows={3}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            ref={textareaRef}
            {...props}
          />
        )}
        {type === 'select' && (
          <>
            <div className="input-append-right">
              <Button
                type="button"
                scheme={ButtonSchemeEnum.SQUARE}
                schemes={[ButtonSchemeEnum.SUBTLE]}
              >
                ⌄
              </Button>
            </div>
            <select
              name={name}
              disabled={disabled}
              className={inputClass}
              onChange={handleSelectOnChange}
              aria-label={name}
              ref={selectRef}
            >
              {placeholder && (
                <option disabled selected>
                  {placeholder}
                </option>
              )}
              {selectOptions &&
                selectOptions.map((opt: SelectOptionType) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
            </select>
          </>
        )}
        {type !== 'select' && type !== 'textarea' && (
          <input
            type={type}
            name={name}
            disabled={disabled}
            className={inputClass}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            aria-label={name}
            ref={inputRef}
            {...props}
          />
        )}

        {(selected || hint || error) && (
          <InputHint
            type="input"
            hint={selected ? selected : hint}
            error={error}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
