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
  if (!data || data.length === 0) {
    return <div>Aucune donnée disponible</div>;
  }

  const validData = data.filter((point) => point && point.x && point.y);

  if (validData.length === 0) {
    return <div>Données invalides</div>;
  }

  const temperatures = validData.map((point) => point.y);
  const minTemp = Math.min(...temperatures);
  const maxTemp = Math.max(...temperatures);
  const medianTemp = temperatures.sort((a, b) => a - b)[
    Math.floor(temperatures.length / 2)
  ];

  const tickValues = validData.map((point) => new Date(point.x).getTime());

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      width={300}
      height={150}
      domainPadding={{ x: 5, y: 5 }}
      containerComponent={<VictoryVoronoiContainer />}
      domain={{ x: [validData[0].x, validData[validData.length - 1].x] }}
    >
      <VictoryAxis
        tickValues={tickValues}
        tickFormat={(x) => {
          const date = new Date(x);
          return date.getHours().toString().padStart(2, "0") + "h";
        }}
        style={{
          tickLabels: { fontSize: 8 },
        }}
      />
      <VictoryAxis
        dependentAxis
        tickValues={[minTemp, medianTemp, maxTemp]}
        tickFormat={(t) => `${t.toFixed(1)}°C`}
        style={{
          tickLabels: { fontSize: 8 },
        }}
      />
      <VictoryLine
        data={validData}
        style={{
          data: { stroke: "#c43a31", strokeWidth: 2 },
        }}
      />
      <VictoryScatter
        data={validData}
        size={3}
        style={{
          data: { fill: "#c43a31" },
        }}
        labels={({ datum }) => `${datum.y.toFixed(1)}°C`}
        labelComponent={
          <VictoryTooltip
            cornerRadius={0}
            flyoutStyle={{ fill: "white" }}
            style={{ fontSize: 8 }}
          />
        }
      />
    </VictoryChart>
  );
};

export default Graph;
