import React from 'react';

function BarGroup(props) {
  let barPadding = 2;
  let barColour = '#348AA7';
  let widthScale = d => d * 10;

  let width = widthScale(props.d.value);
  let yMid = props.barHeight * 0.5;

  return (
    <g className="bar-group">
      <text className="name-label" x="-40" y={yMid} alignmentBaseline="middle">
        {props.d.name}
      </text>
      <rect
        y={barPadding * 0.5}
        width={width}
        height={props.barHeight - barPadding}
        fill={barColour}
      />
      <text
        className="value-label"
        x={width - 25}
        y={yMid}
        alignmentBaseline="middle">
        {props.d.value}
      </text>
    </g>
  );
}

class BarChart extends React.Component {
  state = {
    data: [
      { name: 'Mon', value: 20 },
      { name: 'Tue', value: 40 },
      { name: 'Wed', value: 35 },
      { name: 'Thu', value: 50 },
      { name: 'Fri', value: 55 },
      { name: 'Sat', value: 40 },
      { name: 'Sun', value: 30 },
    ],
  };

  render() {
    let barHeight = 30;

    let barGroups = this.state.data.map((d, i) => (
      <g key={i} transform={`translate(0, ${i * barHeight})`}>
        <BarGroup d={d} barHeight={barHeight} />
      </g>
    ));

    return (
      <svg width="800" height="300">
        <g className="container">
          <text className="title" x="10" y="30">
            Week beginning 9th July
          </text>
          <g className="chart" transform="translate(100,60)">
            {barGroups}
          </g>
        </g>
      </svg>
    );
  }
}

export default BarChart;
