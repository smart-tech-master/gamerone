import React, { Ref } from 'react';
import { InputError } from 'models/error';
import DatePicker from '../../DatePicker';
import InputHint from '../InputHint';
import cn from 'classnames';
import './style.scss';

export interface DatePickerInputProps {
  name: string;
  label?: string;
  initValue: any;
  dateFormat?: string;
  hint?: string;
  inputRef?: Ref<HTMLInputElement>;
  error?: InputError;
  disabled?: boolean;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  name,
  label,
  initValue,
  dateFormat = 'yyyy-MM-dd',
  hint,
  inputRef,
  error,
  disabled,
}: DatePickerInputProps): JSX.Element => {
  const wrapperClass = cn('datepicker-wrapper', {
    'is-error': error,
    'is-disabled': disabled,
  });

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {label && (
        <label htmlFor={name} className="datepicker-label">
          {label}
        </label>
      )}
      <div className={wrapperClass}>
        <DatePicker
          name={name}
          initValue={initValue}
          dateFormat={dateFormat}
          register={inputRef}
          onDatePick={(_) => null}
        />
        {(hint || error) && (
          <InputHint type="datepicker" hint={hint} error={error} />
        )}
      </div>
    </div>
  );
};

export default DatePickerInput;
