import React from 'react';
import { Provider } from 'react-redux';
import { createProduct } from 'redux';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import authReducer from 'redux/auth/reducer';
import AvatarSettings from './index';

const testUser = {
  id: 1449,
  username: 'vadim',
  email: 'vadimas.workteam@gmail.com',
  firstName: 'frontend',
  lastName: 'dev',
  bio: null,
  avatar: 'profile/vadim.svg',
  banner: null,
  playCount: 0,
  gameCount: 0,
  badgeCount: 0,
  followCount: 0,
  followerCount: 0,
  birthDate: null,
};

const renderWithAuthReducer = (
  component = <AvatarSettings />,
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

describe('avatar settings', () => {
  test('renders the form without crash', async () => {
    const { asFragment } = renderWithAuthReducer(<AvatarSettings />, {
      initialState: { user: testUser },
    });

    expect(asFragment()).toMatchSnapshot();
  });

  test('shows edit image modal on image load', async () => {
    renderWithAuthReducer(<AvatarSettings />, {
      initialState: { user: testUser },
    });

    // TODO: Simulate file load event

    // global.URL.createObjectURL = jest.fn(() => 'details');
    // window.navigator.msSaveOrOpenBlob = jest.fn(() => 'details');

    // const file = new File(['(⌐□_□)'], 'avatar.png', { type: 'image/png' });
    // const fileElm = getByLabelText(/file-upload/);

    // act(() => {
    //   fireEvent.change(fileElm, { target: { files: [file] } });
    // });
  });

  test('disable the form button on load', () => {
    const { getByRole } = renderWithAuthReducer(<AvatarSettings />, {
      initialState: { user: testUser },
    });

    expect(getByRole('button', { name: 'Upload' }).disabled).toEqual(true);
  });

  test('renders the user avatar on load', () => {
    const { getByRole } = renderWithAuthReducer(<AvatarSettings />, {
      initialState: { user: testUser },
    });

    expect(
      getByRole('img', { name: testUser.username }).src.includes(
        testUser.avatar,
      ),
    ).toBe(true);
  });
});
