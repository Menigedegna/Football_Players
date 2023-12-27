import axios from 'axios';
import React, { useState, useEffect } from 'react';
import RenderTreeMap from './RenderTreeMap'
import ServerDown from "../pages/ServerDown"
import RenderLoader from "./RenderLoader"
import {CalculatePlotSize} from './CommonFunctions'

const MAX_WIDTH = 1000;
const MAX_HEIGHT = 500;
const WEIGHT_OBJECT = {width: 0.95, height: 0.85}

const RenderTreeMapPage = ({serverPath, dataType}) => {
   /**
   * @description This component fetches countries and clubs data from server and renders a treemap
   * @param {string} serverPath is the path to api server
   * @param {string} dataType is the title of the treemap
   * @returns {ReactNode} A React element which renders a title and a treemap
   */

    //create state variables
    const [tree, setTree] = useState();
    const [isLoading, setIsLoading] = useState(true);
    var [width, height] = CalculatePlotSize(MAX_WIDTH, MAX_HEIGHT, WEIGHT_OBJECT);
    const [mapWidth, setMapWidth] = useState({width:width, height: height});


    //add event listener to adjust treemap size when window is resized
    useEffect(() => {
    //Adjust plot size
    const AdjustPlotSize = () => {
        var [width, height] = CalculatePlotSize(MAX_WIDTH, MAX_HEIGHT, WEIGHT_OBJECT);
        setMapWidth({width: width, height: height});
    }
      window.addEventListener("resize", AdjustPlotSize, false);
    }, []);

    // Fetch data from server
    useEffect(() => {
    axios.get(serverPath)
    .then(response => {

    //create tree object with node type and leaf type
    const treeData = {
      type: 'node',
      name: "boss",
      value: 0,
      players: [],
      children: response.data.map((child) => ({
        type: 'leaf',
        name: child.name,
        value: child.players.length,
        players: child.players
        })),
    }

    setTree(treeData);
    })
    .catch(error => {
    console.log(error);
    })
    .finally(()=>{
        setIsLoading(false);
    });
    }, [serverPath]);

    if (isLoading){
        return <RenderLoader />
    }else{
        if (tree){
            return (
                <div className="treeMapPage">
                    <div className="pageTitle">{dataType}</div>
                    <RenderTreeMap key={mapWidth} data={tree} width={mapWidth.width} height={mapWidth.height} />
                </div>
            )
        } else{
            return <ServerDown />
        }
    }

}

export default RenderTreeMapPage;