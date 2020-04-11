import React, { useState, useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _orderBy from 'lodash/orderBy';

import { size } from 'src/utils';

import Typography from 'Components/Typography';
import SortArrow from 'Components/Icons/SortArrow';
import SearchIcon from 'Components/Icons/Search';
import Input from 'Components/Input';
import Empty from 'Components/Empty';

import {
  TableElement,
  HeaderWrapper,
  TableWrapper,
  Header,
  SubRowWrapper,
  TableRow,
} from './styled';

const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

const Table = ({
  headers,
  data,
  title,
  searchKey,
  subRow: SubRow,
  summary: Summary,
  rowProps,
  subRowProps,
}) => {
  const [tableData, setTableData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [showSubRow, setShowSubRow] = useState({});
  const [sortData, setSortData] = useState({});
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setTableData(data);
    setMasterData(data);
    setSortData({});
    setShowSubRow({});
    setSearchText('');
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

  const toggleSubRow = key => {
    if (!SubRow) {
      return;
    }

    const coptData = { ...showSubRow };
    if (coptData[key]) {
      delete coptData[key];
    } else {
      coptData[key] = true;
    }
    setShowSubRow(coptData);
  };

  return (
    <TableWrapper>
      <Header>
        <Typography variant="h5">{title}</Typography>
        {searchKey && (
          <Input
            width="250px"
            value={searchText}
            onChange={onChangeSearch}
            suffix={<SearchIcon />}
            placeholder="Search..."
          />
        )}
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
          {!tableData.length ? (
            <tr>
              <td colSpan={headers.length}>
                <Empty message="No Data Found" />
              </td>
            </tr>
          ) : null}
          {tableData.map(d => {
            const rowKey = d[searchKey];
            return (
              <>
                <TableRow
                  key={rowKey}
                  clickable={!!SubRow}
                  isSubRowOpen={!!showSubRow[rowKey]}
                  onClick={() => toggleSubRow(rowKey)}
                >
                  {headers.map(({ key, fileSize, render, className }) => (
                    <td key={key} className={className}>
                      {render
                        ? render({ data: d[key], rowData: d, key, rowProps })
                        : fileSize
                        ? size(d[key])
                        : d[key]}
                    </td>
                  ))}
                </TableRow>
                {SubRow && showSubRow[rowKey] && (
                  <TableRow disableHover noBorder>
                    <SubRowWrapper colSpan={headers.length}>
                      <SubRow rowData={d} {...subRowProps} />
                    </SubRowWrapper>
                  </TableRow>
                )}
              </>
            );
          })}
        </tbody>
        {Summary && !!tableData.length && (
          <tfoot>
            <Summary tableData={tableData} />
          </tfoot>
        )}
      </TableElement>
    </TableWrapper>
  );
};

export default Table;
