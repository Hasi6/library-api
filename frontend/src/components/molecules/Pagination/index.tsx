import { Pagination } from '@mantine/core';
import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { Query, getQueryParams } from '@/utils/queryParams';
import queryString from 'query-string';
import { setFilters } from '@/store/filters';

interface Props {
  total: number;
}

const PaginationContainer: FC<Props> = ({ total }) => {
  const dispatch = useAppDispatch();
  const { params: filterParams } = useAppSelector((store) => store.filters);

  const currentPage = filterParams.page ? +filterParams.page : 1;

  const { params } = getQueryParams();

  const handleChangePage = (page: number) => {
    const simpleSearch: Query = { ...params };
    simpleSearch['page'] = String(page);
    const query = queryString.stringify(simpleSearch);
    window.history.pushState(null, '', `?${query}`);
    dispatch(
      setFilters({
        url: query,
        params: simpleSearch,
      })
    );
  };

  return (
    <Pagination value={currentPage} onChange={handleChangePage} total={total} />
  );
};

export default PaginationContainer;
