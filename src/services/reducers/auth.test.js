import { auth } from './auth';
import {
    REGISTRATION,
    AUTHORIZATION,
    EXIT,
    GET_USER,
    UPDATE_USER,
    POST_EMAIL,
    RESET_PASSWORD
  } from "../actions/auth";

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(auth(undefined, {})).toEqual(
      {
        email: '',
        name: '',
        accessToken: '',
        refreshToken: '',
        toForgotPassword: false,
      }
    )
  })

  it('should handle REGISTRATION', () => {
    expect(
      auth(undefined, {
        type: REGISTRATION,
        email: 'vinor@mail.ru',
        name: 'vinor',
        accessToken: 'fghrbbft468679',
        refreshToken: 'fghrbbft468679'
      })
    ).toEqual(
      {
        email: 'vinor@mail.ru',
        name: 'vinor',
        accessToken: 'fghrbbft468679',
        refreshToken: 'fghrbbft468679',
        toForgotPassword: false,
      }
    )
  })

  it('should handle AUTHORIZATION', () => {
    expect(
      auth(undefined, {
        type: AUTHORIZATION,
        email: 'vinor@mail.ru',
        name: 'vinor',
        accessToken: 'fghrbbft468679',
        refreshToken: 'fghrbbft468679'
      })
    ).toEqual(
      {
        email: 'vinor@mail.ru',
        name: 'vinor',
        accessToken: 'fghrbbft468679',
        refreshToken: 'fghrbbft468679',
        toForgotPassword: false,
      }
    )
  })

  it('should handle EXIT', () => {
    expect(
      auth(undefined, {
        type: EXIT,
        email: '',
        name: '',
        accessToken: '',
        refreshToken: ''
      })
    ).toEqual(
      {
        email: '',
        name: '',
        accessToken: '',
        refreshToken: '',
        toForgotPassword: false,
      }
    )
  })

  it('should handle GET_USER', () => {
    expect(
      auth(undefined, {
        type: GET_USER,
        email: 'vinor@mail.ru',
        name: 'vinor'
      })
    ).toEqual(
      {
        email: 'vinor@mail.ru',
        name: 'vinor',
        accessToken: '',
        refreshToken: '',
        toForgotPassword: false,
      }
    )
  })

  it('should handle UPDATE_USER', () => {
    expect(
      auth(undefined, {
        type: UPDATE_USER,
        email: 'vinor@mail.ru',
        name: 'vinor'
      })
    ).toEqual(
      {
        email: 'vinor@mail.ru',
        name: 'vinor',
        accessToken: '',
        refreshToken: '',
        toForgotPassword: false,
      }
    )
  })

  it('should handle POST_EMAIL', () => {
    expect(
      auth(undefined, {
        type: POST_EMAIL,
        toForgotPassword: true,
      })
    ).toEqual(
      {
        email: '',
        name: '',
        accessToken: '',
        refreshToken: '',
        toForgotPassword: true,
      }
    )
  })

  it('RESET_PASSWORD', () => {
    expect(
      auth(undefined, {
        type: RESET_PASSWORD,
        toForgotPassword: false,
      })
    ).toEqual(
      {
        email: '',
        name: '',
        accessToken: '',
        refreshToken: '',
        toForgotPassword: false,
      }
    )
  })
})