import queryString from 'query-string';

export interface Query {
  [key: string]: string;
}

export function getQueryParams() {
  const params = queryString.parse(window.location.search) as Query;
  let url = '';
  for (let key in params) {
    url += key + '=' + encodeURIComponent(params[key]) + '&';
  }

  return {
    url: url.slice(0, -1),
    params,
  };
}
