export const URL = 'https://norma.nomoreparties.space/api';

export function getCookie(name: string) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)') // eslint-disable-line
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
  
export function setCookie(name: string, value: string, props?: any) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
      props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
      updatedCookie += '; ' + propName;
      const propValue = props[propName];
      if (propValue !== true) {
        updatedCookie += '=' + propValue;
      }
    }
    document.cookie = updatedCookie;
}

interface CustomResponse<T> extends Body {
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly trailer?: Promise<Headers>;
    readonly type: ResponseType;
    readonly url: string;
    clone(): Response;
    json(): Promise<T>;
  }
  
export function deleteCookie(name: string) {
    setCookie(name, '', { expires: -1 });
}

export const checkReponse = (res: CustomResponse<JSON>) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getDate = (date: string) => { return `${date.slice(0, 10)}, ${date.slice(11, 16)} i-GMT+3`; };