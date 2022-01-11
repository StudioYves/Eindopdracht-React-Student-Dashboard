import { VictoryChart, VictoryAxis, VictoryGroup, VictoryTheme, VictoryContainer } from 'victory'

function Chart(props) {
    return (

        <div>
            <VictoryChart horizontal theme={VictoryTheme.material}
                height={1024} width={800}
                containerComponent={<VictoryContainer responsive={false} />}
                domainPadding={{ x: 10, y: 15 }}
                padding={{ top: 40, bottom: 60, right: 100, left: 160 }}
            >

                <VictoryGroup offset={5} >
                    {props.renderFunBar}
                    {props.renderDifficultBar}
                </VictoryGroup>
                <VictoryAxis
                    tickValues={props.uniqueAssignments}
                    label="Assignments"
                    style={{
                        axis: { stroke: "#C5C3C6" },
                        grid: { stroke: "#46494C" },
                        axisLabel: { fontSize: 20, padding: 140, fill: "#f7f7f7" },
                        tickLabels: {
                            fontSize: 12,
                            fill: "#f7f7f7"
                        },
                        ticks: { stroke: "#46494C" }
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    tickValues={['1', '2', '3', '4', '5']}
                    label="Rating"
                    style={{
                        axis: { stroke: "#C5C3C6" },
                        grid: { stroke: "#46494C" },
                        axisLabel: { fontSize: 20, padding: 30, fill: "#f7f7f7" },
                        tickLabels: {
                            fontSize: 14,
                            fill: "#f7f7f7",
                            stroke: "#f7f7f7"
                        },
                        ticks: { stroke: "#46494C" }
                    }}
                />
            </VictoryChart>
        </div>
    )
}

export default Chart



