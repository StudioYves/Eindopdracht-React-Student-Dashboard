import { useState, useEffect } from "react"
import datacsv from '../data/data.csv'
import { csv, path } from 'd3'
import Navbar from './navbar.js'
import ToggleSwitches from "./switches"
import Chart from './chart.js'
import { VictoryBar } from 'victory'
import { useParams } from "react-router-dom";




// SET STATE OUT OF CSV DATA AND PARSE EACH 'STRING' NUMBER TO NUMBER
function Main() {
    const [data, setData] = useState([])

    let { id } = useParams();

    useEffect(() => {
        csv(datacsv).then(data => {
            data.forEach(function (data) {
                ['fun', 'difficulty'].forEach(function (k) {
                    data[k] = Math.floor(+data[k]);
                });
            });
            setData(data);
            filterName(data);
        });
    }, [id]);


    // FUNCTION TO FILTER DATA ON NAME
    function filterName(data) {
        if (id) {
            const arrayPerName = data.filter(object => {
                return object.name == id;
            });
            setData(arrayPerName)
        }
    }


    // STATE OF CHECKBOXES
    const [checkboxState, setCheckboxState] = useState({
        showDifficult: true,
        showFun: true
    })

    function handleFilterChange(selectName) {
        if (selectName === 'difficult') {
            setCheckboxState(prevState => ({
                ...prevState, showDifficult: !prevState.showDifficult
            }))
        } else if (selectName === 'fun') {
            setCheckboxState(prevState => ({
                ...prevState, showFun: !prevState.showFun
            }))
        }
    }


    // RENDER BARCHART IF CHECKBOX IS TRUE
    const renderDifficultBar = (showDifficult) => {
        if (showDifficult) {
            return (
                <VictoryBar
                    data={averageDifficulty(data)}
                    x="assignment"
                    y="difficulty"
                    style={{ data: { fill: "#FF0000" } }}
                    barWidth={({ index }) => index * 0 + 6}
                />
            )
        }
    }

    const renderFunBar = (showFun) => {
        if (showFun) {
            return (
                <VictoryBar
                    data={averageFun(data)}
                    x="assignment"
                    y="fun"
                    style={{ data: { fill: "#00BFFF" } }}
                    barWidth={({ index }) => index * 0 + 6}
                />
            )
        }
    }


    // GENERATE ARRAY OF ALL UNIQUE ASSIGNMENTS
    const allAssignments = data.map(item => {
        return item.assignment
    })

    const uniqueAssignments = [...new Set(allAssignments)]


    // GENERATE ARRAY OF ALL UNIQUE NAMES
    const allNames = data.map(item => {
        return item.name
    })

    const uniqueNames = [...new Set(allNames)]


    //CALCULATE AVERAGE OF FUN PER ASSIGNMENT
    function averageFun(arr) {
        var sums = {}, counts = {}, results = [], assignment;
        for (var i = 0; i < arr.length; i++) {
            assignment = arr[i].assignment;
            if (!(assignment in sums)) {
                sums[assignment] = 0;
                counts[assignment] = 0;
            }
            sums[assignment] += arr[i].fun;
            counts[assignment]++;
        }

        for (assignment in sums) {
            results.push({ assignment: assignment, fun: sums[assignment] / counts[assignment] });
        }
        return results;
    }


    //CALCULATE AVERAGE OF DIFFICULTY PER ASSIGNMENT
    function averageDifficulty(arr) {
        var sums = {}, counts = {}, results = [], assignment;
        for (var i = 0; i < arr.length; i++) {
            assignment = arr[i].assignment;
            if (!(assignment in sums)) {
                sums[assignment] = 0;
                counts[assignment] = 0;
            }
            sums[assignment] += arr[i].difficulty;
            counts[assignment]++;
        }

        for (assignment in sums) {
            results.push({ assignment: assignment, difficulty: sums[assignment] / counts[assignment] });
        }
        return results;
    }


    //RENDER MAIN COMPONENT
    return (

        <div className="main">
            <div className="navbar">
                <Navbar
                    names={uniqueNames}
                    reset={Main}
                />
            </div>
            <div className="output-area">
                <div className="switches">
                    <ToggleSwitches
                        inputClass={'inputClassDifficult'}
                        selectName={'difficult'}
                        selectText={'Experienced difficulty of the assignments'}
                        selectChange={handleFilterChange}
                    />
                    <br />
                    <ToggleSwitches
                        inputClass={'inputClassFun'}
                        selectName={'fun'}
                        selectText={'Amount of fun experienced by making the assignments'}
                        selectChange={handleFilterChange}
                    />
                </div>
                <div className="chart">
                    <Chart
                        data={data}
                        uniqueAssignments={uniqueAssignments}
                        renderFunBar={renderFunBar(checkboxState.showFun)}
                        renderDifficultBar={renderDifficultBar(checkboxState.showDifficult)}
                    />
                </div>
            </div>
        </div>

    )
}


export default Main



