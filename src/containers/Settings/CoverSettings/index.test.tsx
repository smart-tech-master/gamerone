import React from 'react';
import { Provider } from 'react-redux';
import { createProduct } from 'redux';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import authReducer from 'redux/auth/reducer';
import BannerSettings from './index';

const testUser = {
  id: 1449,
  username: 'vadim',
  email: 'vadimas.workteam@gmail.com',
  firstName: 'frontend',
  lastName: 'dev',
  bio: null,
  banner: 'profile/vadim.svg',
  avatar: null,
  playCount: 0,
  gameCount: 0,
  badgeCount: 0,
  followCount: 0,
  followerCount: 0,
  birthDate: null,
};

const renderWithAuthReducer = (
  component = <BannerSettings />,
  {
    initialState,
    store = createProduct(authReducer, { Auth: initialState }),
  } = {},
) => {
  let utils = {};
  act(() => {
    utils = render(<Provider store={store}>{component}</Provider>);
  });

  return utils;
};

describe('banner settings', () => {
  test('renders the form without crash', async () => {
    const { asFragment } = renderWithAuthReducer(<BannerSettings />, {
      initialState: { user: testUser },
    });

    expect(asFragment()).toMatchSnapshot();
  });

  test('shows edit image modal on image load', async () => {
    renderWithAuthReducer(<BannerSettings />, {
      initialState: { user: testUser },
    });

    // TODO: Simulate file load event
  });

  test('disable the form button on load', () => {
    const { getByRole } = renderWithAuthReducer(<BannerSettings />, {
      initialState: { user: testUser },
    });

    expect(getByRole('button', { name: 'Upload' }).disabled).toEqual(true);
  });

  test('renders the user banner on load', () => {
    const { getByLabelText } = renderWithAuthReducer(<BannerSettings />, {
      initialState: { user: testUser },
    });

    expect(
      getByLabelText(/banner/).style.backgroundImage.includes(testUser.banner),
    ).toBe(true);
  });
});
