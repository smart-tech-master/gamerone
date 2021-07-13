import React from 'react';
import { Nullable } from 'interfaces';
import { Link } from 'react-router-dom';
import IsAuthenticated from 'components/utility/IsAuthenticated';
import Dropdown from 'components/common/Dropdown';
import './style.scss';
import Avatar from 'components/common/Avatar';

export interface HeaderProps {
  username: string;
  avatar?: Nullable<string>;
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  username,
  avatar,
  handleLogout,
}: HeaderProps): JSX.Element => {
  return (
    <header className="header">
      <div className="wrapper">
        <ul className="menu">
          <li className={'siteName'}>
            <Link to={'/'}>G1</Link>
          </li>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <IsAuthenticated auth={false}>
            <li>
              <Link to="/account/password-reset">Password Reset</Link>
            </li>
            <li>
              <Link to="/account/password-reset-new?token=xyzcws">
                Password Reset New
              </Link>
            </li>
            <li>
              <Link to="/account/email-verify/example@domain.com/token">
                Verify Email
              </Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </IsAuthenticated>
          <li>{/* <SearchProfile navigate /> */}</li>
        </ul>
        <IsAuthenticated>
          <div className="header__right">
            <Dropdown
              options={[
                { label: 'Profile', link: '/' + username },
                { label: 'Settings', link: '/settings' },
                {
                  label: 'Logout',
                  onClick: (): void => handleLogout(),
                },
              ]}
            >
              <Avatar src={avatar} alt="" />
              {/* <figure className="avatar">
                <Image src={'/' + avatar} alt="" title="" />
              </figure> */}
            </Dropdown>
          </div>
        </IsAuthenticated>
      </div>
    </header>
  );
};

export default React.memo(Header);
