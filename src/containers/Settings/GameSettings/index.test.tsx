import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { store } from 'redux/store';
import GameSettings from './index';

// region testing for GameSettings Initial
test('games list initial', () => {
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <GameSettings />
      </MemoryRouter>
    </Provider>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchregion();
});

/**
 * Mock input event to fill the form with a game
 *
 * @return {Object}
 */
const renderGameSettings = () => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <GameSettings />
      </MemoryRouter>
    </Provider>,
  );
};

/**
 * Fill in and submit the form
 *
 * @param {Object} gamertag
 * @param {String} platform
 * @param {String} region
 */
const fillAndSubmitForm = (utils, { gamertag, platform, region }) => {
  const { getByRole, getByLabelText } = utils;

  act(() => {
    fireEvent.change(getByLabelText(/gamertag/i), {
      target: { value: gamertag },
    });
    fireEvent.change(getByLabelText(/platform/i), {
      target: { value: platform },
    });
    fireEvent.submit(getByRole('button', { name: 'Save' }));
  });
};

test('update games list', async () => {
  const utils = renderGameSettings();
  const game = {
    gamertag: 'testgamertag',
    platform: 'testplatform',
    region: 'testregion',
  };

  // mock out window.fetch for the test
  const spy = jest.spyOn(window, 'fetch').mockImplementation((url) => {
    let success = { status: 'success' };
    if (url.endsWith('profile/get/5/games')) {
      success = games;
    }
    return Promise.resolve({
      status: 200,
      json: () => success,
    });
  });

  act(() => {
    fireEvent.click(utils.getByText('Add'));
  });

  fillAndSubmitForm(utils, game);

  spy.mockRestore();
});

test('delete a game', async () => {
  const utils = renderGameSettings();
  const game = {
    id: 5,
    gamertag: 'testgamertag',
    platform: 'testplatform',
    region: 'testregion',
  };

  // mock out window.fetch for the test
  const spy = jest.spyOn(window, 'fetch').mockImplementation((url) => {
    let success = { status: 'success' };
    if (url.endsWith('game/delete/5')) {
      success = game;
    }
    return Promise.resolve({
      status: 200,
      json: () => success,
    });
  });

  act(() => {
    fireEvent.click(utils.getByText('Add'));
  });

  fillAndSubmitForm(utils, game);

  spy.mockRestore();
});
