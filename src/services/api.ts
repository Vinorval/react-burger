import { TIngredient, TOrder } from '../utils/types';
import { URL, checkReponse } from '../utils/utils';

type TResponseBody<TDataKey extends string = '', TDataType = {}> = {
    [key in TDataKey]: TDataType
  } & {
    success: boolean;
    message?: string;
    headers?: Headers;
    name?: string
  };

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
