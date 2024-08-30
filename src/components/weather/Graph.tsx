import React from "react";
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryScatter,
} from "victory";

interface GraphProps {
  data: Array<{
    x: Date;
    y: number;
  }>;
}

const Graph: React.FC<GraphProps> = ({ data }) => {
  const temperatures = data.map((point) => point.y);
  const minTemp = Math.min(...temperatures);
  const maxTemp = Math.max(...temperatures);
  const medianTemp = temperatures.sort((a, b) => a - b)[
    Math.floor(temperatures.length / 2)
  ];

  const tickValues = data.map((point) => new Date(point.x).getTime());

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      width={300}
      height={150}
      domainPadding={{ x: 5, y: 5 }}
      containerComponent={<VictoryVoronoiContainer />}
      domain={{ x: [data[0].x, data[data.length - 1].x] }}
    >
      <VictoryAxis
        tickValues={tickValues}
        tickFormat={(x) => {
          const date = new Date(x);
          return date.getHours().toString().padStart(2, "0") + "h";
        }}
        style={{
          tickLabels: { fontSize: 5 },
        }}
      />
      <VictoryAxis
        dependentAxis
        tickValues={[minTemp, medianTemp, maxTemp]}
        tickFormat={(t) => `${t.toFixed(1)}°C`}
        style={{
          tickLabels: { fontSize: 5 },
        }}
      />
      <VictoryLine
        data={data}
        style={{
          data: { stroke: "#c43a31", strokeWidth: 1 },
        }}
      />
      <VictoryScatter
        data={data}
        size={2}
        style={{
          data: { fill: "#c43a31" },
        }}
        labels={({ datum }) => `${datum.y.toFixed(1)}°C`}
        labelComponent={
          <VictoryTooltip
            cornerRadius={0}
            flyoutStyle={{ fill: "white" }}
            style={{ fontSize: 5 }}
          />
        }
      />
    </VictoryChart>
  );
};

export default Graph;
