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

  // Calculer les heures uniques pour l'axe des abscisses
  const uniqueHours = Array.from(
    new Set(data.map((point) => new Date(point.x).getHours()))
  );
  const tickValues = uniqueHours.map((hour) => {
    const date = new Date(data[0].x);
    date.setHours(hour);
    return date.getTime();
  });

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      width={600}
      height={300}
      domainPadding={20}
      containerComponent={<VictoryVoronoiContainer />}
    >
      <VictoryAxis
        tickValues={tickValues}
        tickFormat={(x) => {
          const date = new Date(x);
          return date.getHours().toString().padStart(2, "0") + "h";
        }}
        style={{
          tickLabels: { fontSize: 12 },
        }}
      />
      <VictoryAxis
        dependentAxis
        tickValues={[minTemp, medianTemp, maxTemp]}
        tickFormat={(t) => `${t.toFixed(1)}°C`}
        style={{
          axisLabel: { padding: 35 },
        }}
      />
      <VictoryLine
        data={data}
        style={{
          data: { stroke: "#c43a31" },
        }}
      />
      <VictoryScatter
        data={data}
        size={5}
        style={{
          data: { fill: "#c43a31" },
        }}
        labels={({ datum }) => `${datum.y.toFixed(1)}°C`}
        labelComponent={
          <VictoryTooltip cornerRadius={0} flyoutStyle={{ fill: "white" }} />
        }
      />
    </VictoryChart>
  );
};

export default Graph;
