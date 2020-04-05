import React, { useEffect, useRef } from 'react';

import { DataView } from '@antv/data-set';
import { Chart } from '@antv/g2';
import { size } from 'src/utils';

const getDataNodes = data => {
  const rootData = {
    name: 'root',
    children: data,
  };

  const dv = new DataView();

  dv.source(rootData, {
    type: 'hierarchy',
  }).transform({
    field: 'size',
    type: 'hierarchy.treemap',
    tile: 'treemapResquarify',
    as: ['x', 'y'],
  });

  const nodes = [];
  dv.getAllNodes().forEach(node => {
    if (node.data.name === 'root') {
      return;
    }

    nodes.push({
      name: node.data.name,
      x: node.x,
      y: node.y,
      size: node.data.size,
    });
  });

  return nodes;
};

const SizeChart = ({ id, data }) => {
  const graphRef = useRef(null);
  const graphId = `graph-${id}`;

  useEffect(() => {
    graphRef.current.innerHTML = '';
    const chart = new Chart({
      container: graphId,
      autoFit: true,
      height: 500,
    });
    chart.data(getDataNodes(data));
    chart.scale({
      x: {
        nice: true,
      },
      y: {
        nice: true,
      },
    });

    chart.axis(false);
    chart.legend(false);
    chart.tooltip({
      showTitle: false,
      showMarkers: false,
    });
    chart
      .polygon()
      .position('x*y')
      .color('name')
      .tooltip('name*size', (name, fileSize) => {
        return {
          name,
          value: size(fileSize),
        };
      })
      .style({
        lineWidth: 1,
        stroke: '#fff',
      })
      .label('name', {
        offset: 0,
        style: {
          textBaseline: 'middle',
        },
        content: obj => (obj.name !== 'root' ? obj.name : ''),
        layout: {
          type: 'limit-in-shape',
        },
      });
    chart.interaction('element-active');

    chart.render();
  }, [id]);

  return <div id={graphId} className="size-graph" ref={graphRef} />;
};

export default SizeChart;
