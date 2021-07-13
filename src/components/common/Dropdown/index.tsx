import React, { ReactNode, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import useOutsideClick from 'lib/useOutsideClick';
import './style.scss';

export type DropdownOptionType = DropdownOption;

export interface DropdownOption {
  label: string;
  link?: string;
  onClick?: (e?: any) => void;
}

export interface DropdownProps {
  options: DropdownOptionType[];
  children: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  children,
}: DropdownProps): JSX.Element => {
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hideDropdown = useCallback(() => {
    setDropDownIsOpen(false);
  }, []);

  const toggleDropdown = () => {
    setDropDownIsOpen(!dropDownIsOpen);
  };

  const optionsWithCloseToggle =
    options &&
    options.map((o: DropdownOption, i: number) => {
      const handleClick = () => {
        const clickFn = o.onClick || null;
        if (clickFn) {
          clickFn();
        }
        toggleDropdown();
      };

      return (
        <li key={i}>
          {o.onClick ? (
            <button type="button" onClick={handleClick}>
              {o.label}
            </button>
          ) : (
            <Link to={o.link ? o.link : '/#'} onClick={handleClick}>
              {o.label}
            </Link>
          )}
        </li>
      );
    });

  useOutsideClick([dropdownRef], hideDropdown);

  return (
    <div className="dropdown-wrapper">
      <span onClick={toggleDropdown}>{children}</span>

      <div
        className={`dropdown dropdown--has-close ${
          dropDownIsOpen ? 'is-open' : ''
        }`}
        ref={dropdownRef}
      >
        <button
          onClick={toggleDropdown}
          className="button button--square button--inset close"
        >
          <span
            style={{
              fontWeight: 200,
              fontSize: '1.5rem',
              lineHeight: '2rem',
            }}
          >
            &times;
          </span>
        </button>
        <ul>{optionsWithCloseToggle}</ul>
      </div>
    </div>
  );
};

export default Dropdown;
