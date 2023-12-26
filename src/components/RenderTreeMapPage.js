import axios from 'axios';
import React, { useState, useEffect } from 'react';
import RenderTreeMap from './RenderTreeMap'
import ServerDown from "../pages/ServerDown"
import RenderLoader from "./RenderLoader"

const MAX_WIDTH = 1000;
const MAX_HEIGHT = 500;
const WIDTH_WEIGHT = 0.95;
const HEIGHT_WEIGHT = 0.85;


const RenderTreeMapPage = ({serverPath, dataType}) => {
   /**
   * @description This component fetches countries and clubs data from server and renders a treemap
   * @param {string} serverPath is the path to api server
   * @param {string} dataType is the title of the treemap
   * @returns {ReactNode} A React element which renders a title and a treemap
   */

    //calculate treemap width and height proportion to media size
    const calculateTreeSize = (windowWidth, windowHeight) => {
      var width = 0;
      var height = 0;
      if (windowWidth>=800){
        width = MAX_WIDTH;
        height = MAX_HEIGHT;
      }else{
        width = windowWidth*WIDTH_WEIGHT;
        height = windowHeight*HEIGHT_WEIGHT;
      }
      return [width, height];
    }

    //create state variables
    const [tree, setTree] = useState();
    const [isLoading, setIsLoading] = useState(true);
    var [width, height] = calculateTreeSize(window.innerWidth, window.innerHeight);
    const [mapWidth, setMapWidth] = useState({width:width, height: height});

    //create function to set mapWidth state variable
    const setTreemapWidth = () => {
        var [width, height] = calculateTreeSize(window.innerWidth, window.innerHeight);
        setMapWidth({width: width, height: height});
    }
    //add event listener to call setTreemapWidth function window is resized
    window.addEventListener('resize', setTreemapWidth);

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