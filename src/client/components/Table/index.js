import React, { useState, useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _orderBy from 'lodash/orderBy';

import { size } from 'src/utils';

import Typography from 'Components/Typography';
import SortArrow from 'Components/Icons/SortArrow';
import SearchIcon from 'Components/Icons/Search';
import Input from 'Components/Input';

import { TableElement, HeaderWrapper, TableWrapper, Header } from './styled';

const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

const Table = ({ headers, data, title, searchKey }) => {
  const [tableData, setTableData] = useState(data);
  const [masterData, setMasterData] = useState(data);
  const [sortData, setSortData] = useState({});
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setTableData(data);
    setMasterData(data);
    setSortData({});
  }, [data]);

  useEffect(() => {
    if (!_isEmpty(sortData)) {
      const sortedData = _orderBy(tableData, sortData.key, sortData.order);
      setTableData(sortedData);
    }
  }, [sortData]);

  const onHeaderClick = key => {
    if (!sortData.key) {
      setSortData({
        key,
        order: SORT_ORDER.ASC,
      });
    } else {
      setSortData({
        key,
        order:
          sortData.order === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC,
      });
    }
  };

  const onChangeSearch = event => {
    const { value } = event.target;
    setSearchText(value);
    setSortData({});

    const filteredData = masterData.filter(m =>
      m[searchKey].toLowerCase().includes(value.toLowerCase()),
    );
    setTableData(filteredData);
  };

  return (
    <TableWrapper>
      <Header>
        <Typography variant="h5">{title}</Typography>
        <Input
          width="250px"
          value={searchText}
          onChange={onChangeSearch}
          suffix={<SearchIcon />}
          placeholder="Search..."
        />
      </Header>
      <TableElement>
        <thead>
          <tr>
            {headers.map(({ key, header, sort }) => (
              <th key={key}>
                <HeaderWrapper
                  sort={sort}
                  onClick={() => (sort ? onHeaderClick(key) : {})}
                >
                  {header}
                  {sort && (
                    <SortArrow
                      active={
                        sortData.key === key &&
                        (sortData.order === SORT_ORDER.ASC ? 'up' : 'down')
                      }
                    />
                  )}
                </HeaderWrapper>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map(d => {
            return (
              <tr key={d[searchKey]}>
                {headers.map(({ key, fileSize }) => (
                  <td key={key}>{fileSize ? size(d[key]) : d[key]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </TableElement>
    </TableWrapper>
  );
};

export default Table;
