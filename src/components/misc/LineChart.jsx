import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';

export default function LineChart({ data = [] }) {
  const graphData = data.map(d => ({ ...d, symbol: "circle", stroke: "#fff" }))

  return (
    <VictoryLine
      animate={{
        duration: 1000,
        onLoad: { duration: 1000 }
      }}
      style={{ 
        data: { stroke: "#fff" },
      }}
      standalone={true}
      width={300}
      height={50}
      padding={0}
      interpolation="natural"
      domainPadding={{ y: [5, 5] }}
      data={graphData}
    />
  )
}