export const SEARCH = 'SEARCH';
export const SEARCH_ROUTE = 'SEARCH_ROUTE';
export const SEARCH_ID = 'SEARCH_ID';

export function search(value) {
  console.log('actions', value);
  return {type: SEARCH, value};
}

export function search_route(value) {
  console.log('search_route', value);
  return {type: SEARCH_ROUTE, value};
}

export function search_id(value) {
  console.log('search_id', value);
  return {type: SEARCH_ID, value};
}
