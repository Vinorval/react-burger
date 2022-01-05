import { TIngredient, TOrder, TProfile, TResetPassword } from '../utils/types';
import { URL } from '../utils/utils';

export type TResponseBody<TDataKey extends string = '', TDataType = {}> = {
    [key in TDataKey]: TDataType
  } & {
    success: boolean;
    message?: string;
    headers?: Headers;
    name?: string;
    refreshToken?: string;
    accessToken?: string;
  };

export const registerRequest = async (data: TProfile): Promise<
TResponseBody<'user', TProfile>
> => await fetch(`${URL}/auth/register`, {
  method: "POST",
  headers: {
    "content-type": "application/json"
  },
  body: JSON.stringify({
    "email": data.email, 
    "password": data.password, 
    "name": data.name
    }),
  })
  .then(res => res.json())
  .then(data => data);

export const loginRequest = async (data: TProfile): Promise<
  TResponseBody<'user', TProfile>
  > => await fetch(`${URL}/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      "email": data.email, 
      "password": data.password,
      }),
    })
    .then(res => res.json())
    .then(data => data);
 
    
export const forgotPasswordRequest = async (data: TProfile): Promise<
    TResponseBody<'success', boolean>
    > => await fetch(`${URL}/password-reset`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "email": data.email
        }),
    })
    .then(res => res.json())
    .then(data => data);
    
export const resetPasswordRequest = async (data: TResetPassword): Promise<
    TResponseBody<'success', boolean>
    > => await fetch(`${URL}/password-reset/reset`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "password": data.password,
        "token": data.value
      }),
      })
      .then(res => res.json())
      .then(data => data);
 
export const logoutRequest = async (): Promise<
    TResponseBody<'success', boolean>
    > => await fetch(`${URL}/auth/logout`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "token": localStorage.getItem('token')
      }),
      })
      .then(res => res.json())
      .then(data => data);
   
export const getItemsRequest = async (): Promise<
  TResponseBody<'data', ReadonlyArray<TIngredient>>
  > =>
  await fetch(`${URL}/ingredients`, {
    method: 'GET'
  })
    .then(res => res.json())
    .then(data => data);

export const postOrderRequest = async (idsData: string[]): Promise<TResponseBody<'order', TOrder>> =>
        await fetch(`${URL}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"ingredients": idsData})
        }).then(res => res.json())
        .then(data => data);
