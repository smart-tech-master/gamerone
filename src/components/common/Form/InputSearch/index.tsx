import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { useForm, ValidationOptions } from 'react-hook-form';
import { InputError } from 'models/error';
import cn from 'classnames';
import InputHint from 'components/common/Form/InputHint';
import './style.scss';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import InputLoading from '../InputLoading';
import useSearchApi, { SearchApi } from 'lib/useSearchApi';
import { Game, User, Club } from 'interfaces';
import useOutsideClick from 'lib/useOutsideClick';
import debounce from 'lib/debounce';

export interface InputSearchProps<T>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  hint?: string;
  error?: InputError;
  register?: ReturnType<typeof useForm>['register'];
  validateOptions?: ValidationOptions;

  api: SearchApi;
  renderItem: (item: T, hideResults: () => void) => React.ReactElement;
  onSearchFinish: (results: T[]) => void;
}

export type SearchData = Game | User | Club;

function InputSearch<T extends SearchData>({
  name,
  label,
  hint,
  error,
  register,
  validateOptions,
  api,
  renderItem,
  onSearchFinish,
  ...props
}: InputSearchProps<T>) {
  const { disabled, onChange, onClick } = props;
  const [isOpen, setIsOpen] = useState(true);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [{ results, isSearching }, doSearch] = useSearchApi<T>(api, null, []);

  const wrapperClass = cn('input-search-wrapper', {
    'is-error': error,
    'is-disabled': disabled,
  });

  const inputClass = cn('input-search', {
    'is-error': error,
    'is-disabled': disabled,
  });

  const handleInputFocus = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      if (onClick) {
        onClick(e);
      }

      setIsOpen(true);
    },
    [onClick],
  );

  const debouncedSearch = useMemo(
    () => debounce((value) => doSearch(value), 800),
    [doSearch],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }

      e.persist(); // https://fb.me/react-event-pooling
      debouncedSearch(e.target.value);
    },
    [onChange, debouncedSearch],
  );

  const hideResults = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    // send search results
    if (!isSearching) onSearchFinish(results);

    return () => {
      onSearchFinish([]);
    };
  }, [isSearching, results, onSearchFinish]);

  useOutsideClick([searchResultsRef, searchInputRef], hideResults);

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {label && (
        <label htmlFor={name} className="input-search-label">
          {label}
        </label>
      )}

      <div className={wrapperClass}>
        <div className="input-append-right">
          {isSearching ? (
            <InputLoading show={true} />
          ) : (
            <Button
              scheme={ButtonSchemeEnum.SQUARE}
              schemes={[ButtonSchemeEnum.INSET]}
            >
              <span
                style={{
                  fontWeight: 200,
                  fontSize: '1.5rem',
                  lineHeight: '2rem',
                }}
              >
                &uarr; {/* Icon will be inserted here */}
              </span>
            </Button>
          )}
        </div>
        <input
          type="text"
          name={name}
          disabled={disabled}
          className={inputClass}
          aria-label={name}
          ref={(e) => {
            searchInputRef.current = e;
            if (register && e) register(e, validateOptions);
          }}
          {...props}
          onChange={handleInputChange}
          onClick={handleInputFocus}
        />

        {(hint || error) && (
          <InputHint type="input-search" hint={hint} error={error} />
        )}

        {results && isOpen && (
          <div
            className={'input-search-results is-open'}
            ref={searchResultsRef}
          >
            {results.map((item: T) => renderItem(item, hideResults))}
          </div>
        )}
      </div>
    </div>
  );
}

export default InputSearch;
