import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { store } from 'redux/store';
import ProfileForm from './index';

import { waitForSec } from 'lib/testHelper';

/**
 * Mock input event to fill the form with email and password
 *
 * @return {Object}
 */
const renderProfileForm = () => {
  let utils;
  act(() => {
    utils = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProfileForm />
        </MemoryRouter>
      </Provider>,
    );
  });

  return {
    ...utils,
  };
};

/**
 * Fill in the form and submit the form
 *
 * @param {Object} utils
 * @param {String} firstName
 * @param {String} lastName
 * @param {String} email
 * @param {String} username
 * @param {String} password
 */
const fillAndSubmitForm = async (
  utils,
  {
    firstName,
    lastName,
    email,
    username,
    password = 'password',
    bio,
    birthDate,
    newPassword,
  },
) => {
  const { getByRole, getByLabelText } = utils;

  act(() => {
    fireEvent.change(getByLabelText(/firstname/i), {
      target: { value: firstName },
    });
    fireEvent.change(getByLabelText(/lastname/i), {
      target: { value: lastName },
    });
    fireEvent.change(getByLabelText(/username/i), {
      target: { value: username },
    });
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: email },
    });
    fireEvent.change(getByLabelText(/^bio$/i), {
      target: { value: bio },
    });
    fireEvent.change(getByLabelText(/date-picker/i), {
      target: { value: birthDate },
    });
    fireEvent.change(getByLabelText(/^password/i), {
      target: { value: password },
    });
    fireEvent.change(getByLabelText(/^new-password/i), {
      target: { value: newPassword },
    });
    fireEvent.submit(getByRole('button', { name: 'Save' }));
  });
};

test('checks duplicated email', async () => {
  const { getByText, getByLabelText, queryByLabelText } = renderProfileForm();
  const duplicationMessage = 'This email is already registered';

  // mock out window.fetch for the test
  const jestSpy = jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
    const error = new Error();
    error.code = 409;
    return Promise.reject(error);
  });

  const emailElm = getByLabelText(/email/i);

  // checks error message
  act(() => {
    fireEvent.change(emailElm, { target: { value: 'duplicated@email.com' } });
  });
  await waitForElement(() => getByText(duplicationMessage));
  expect(getByText(duplicationMessage)).toBeInTheDocument();

  // checks whether spinner is invisible
  expect(queryByLabelText(/spinner/i)).toBe(null);

  jestSpy.mockRestore();
});

test('checks duplicated username', async () => {
  const { getByText, getByLabelText, queryByLabelText } = renderProfileForm();
  const duplicationMessage = 'This username is taken';

  // mock out window.fetch for the test
  const jestSpy = jest
    .spyOn(window, 'fetch')
    .mockImplementationOnce(async () => {
      const error = new Error();
      error.code = 409;
      return Promise.reject(error);
    });

  const usernameElm = getByLabelText(/username/i);

  // checks error message
  fireEvent.change(usernameElm, { target: { value: 'duplicated-username' } });
  await waitForElement(() => getByText(duplicationMessage));
  expect(getByText(duplicationMessage)).toBeInTheDocument();

  // checks whether spinner is invisible
  expect(queryByLabelText(/spinner/i)).toBe(null);

  jestSpy.mockRestore();
});

test('updates profile and current user', async () => {
  const utils = renderProfileForm();
  const user = {
    email: 'xyz@domain.com',
    firstName: 'test',
    lastName: 'user',
    username: 'testuser',
    password: 'P@s2wordal',
    bio: '',
    birthDate: '',
    newPaswsword: '',
  };

  // mock out window.fetch for the test
  const spy = jest.spyOn(window, 'fetch').mockImplementation((url) => {
    let success = { status: 'success' };
    if (url.endsWith('profile/settings')) {
      success = user;
    }
    return Promise.resolve({
      status: 200,
      json: () => success,
    });
  });

  await fillAndSubmitForm(utils, user);

  await waitForSec(1000);

  // check token with one from localStorage
  expect(utils.asFragment()).toMatchSnapshot();

  // check user with one from the state
  expect(store.getState().Auth.user).toStrictEqual(user);

  spy.mockRestore();
});
