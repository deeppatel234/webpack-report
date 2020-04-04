import React, { useContext } from 'react';
import AppContext from 'src/AppContext';

import StatisticsCard from 'UI/StatisticsCard';
import WarningIcon from 'UI/Icons/Warning';
import CloseCircleIcon from 'UI/Icons/CloseCircle';
import JavascriptIcon from 'UI/Icons/Javascript';
import CSSIcon from 'UI/Icons/CSS';
import FileIcon from 'UI/Icons/File';
import ImageFileIcon from 'UI/Icons/ImageFile';
import TimeIcon from 'UI/Icons/Time';

import { size, timeConversion } from 'src/utils';

import { StatisticsWrapper } from './styled';

const Statistics = () => {
  const { stateData } = useContext(AppContext);
  const { errors, warnings, time, dashboardState } = stateData;

  const {
    totalJSSize,
    totalCSSSize,
    totalStaticFileSize,
    totalAssetsSize,
    initialJSSize,
    initialCSSSize,
  } = dashboardState;

  return (
    <StatisticsWrapper>
      <StatisticsCard
        to="/info/warnings"
        icon={<WarningIcon width="2.3rem" />}
        color="warning"
        header="Warnings"
        text={warnings.length}
      />
      <StatisticsCard
        to="/info/errors"
        icon={<CloseCircleIcon width="2.3rem" />}
        color="error"
        header="Errors"
        text={errors.length}
      />
      <StatisticsCard
        icon={<TimeIcon width="2.3rem" />}
        color="info"
        header="Build Time"
        text={timeConversion(time)}
      />
      <StatisticsCard
        icon={<JavascriptIcon width="2.3rem" />}
        header="Total Javascript Size"
        text={size(totalJSSize)}
        className="javascript"
      />
      <StatisticsCard
        icon={<CSSIcon width="2.2rem" />}
        header="Total CSS Size"
        text={size(totalCSSSize)}
        className="css"
      />
      <StatisticsCard
        icon={<JavascriptIcon width="2.3rem" />}
        header="Initial Javascript Size"
        text={size(initialJSSize)}
        className="javascript"
      />
      <StatisticsCard
        icon={<CSSIcon width="2.2rem" />}
        header="Initial CSS Size"
        text={size(initialCSSSize)}
        className="css"
      />
      <StatisticsCard
        icon={<ImageFileIcon width="2.3rem" />}
        color="info"
        header="Total Media Files Size"
        text={size(totalStaticFileSize)}
      />
      <StatisticsCard
        icon={<FileIcon width="2.3rem" />}
        color="info"
        header="Total Assets Size"
        text={size(totalAssetsSize)}
      />
    </StatisticsWrapper>
  );
};

export default Statistics;
