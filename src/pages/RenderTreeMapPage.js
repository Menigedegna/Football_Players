import axios from 'axios';
import React, { useState, useEffect } from 'react';
import RenderTreeMap from '../components/RenderTreeMap'
import ServerDown from "./ServerDown"
import RenderLoader from "../components/RenderLoader"
import {CalculatePlotSize} from '../components/CommonFunctions'
import ChooseData from "../components/ChooseData"

const MAX_WIDTH = 1000;
const MAX_HEIGHT = 500;
const WEIGHT_OBJECT = {width: 0.95, height: 0.85}

const COUNTRY_SERVER_PATH = 'https://mariamawit.pythonanywhere.com/api/countries/';
const CLUB_SERVER_PATH = 'https://mariamawit.pythonanywhere.com/api/clubs/';

var CLUB_TREE;
var COUNTRY_TREE;


const RenderTreeMapPage = () => {
   /**
   * @description This component fetches countries and clubs data from server and renders a treemap
   * @returns {ReactNode} A React element which renders a title and a treemap
   */

    //create state variables
    const [tree, setTree] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const [mapWidth, setMapWidth] = useState();

    const labels = ['Clubs', 'Countries'];

    const AdjustPlotSize = () => {
        var [width, height] = CalculatePlotSize(MAX_WIDTH, MAX_HEIGHT, WEIGHT_OBJECT);
        setMapWidth({width: width, height: height});
    }
    //add event listener to adjust treemap size when window is resized
    useEffect(() => {
    //Adjust plot size
      window.addEventListener("resize", AdjustPlotSize, false);
    }, []);

    // Fetch data from server
    useEffect(() => {
        async function fetchData() {
        try{
            //get data from /api/clubs
            var response = await axios.get(CLUB_SERVER_PATH)
            //create tree object with node type and leaf type
            CLUB_TREE = {
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
            //set state variable tree
            setTree(CLUB_TREE);
                    //get data from /api/clubs
            response = await axios.get(COUNTRY_SERVER_PATH)
            //create tree object with node type and leaf type
            COUNTRY_TREE = {
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
            AdjustPlotSize();
        } catch(error){
        console.log(error);
        } finally{
            setIsLoading(false);
        }
    }
    fetchData();
    }, []);

    if (isLoading){
        return <RenderLoader />
    }else{
        if (tree){
            return (
                <div className="treeMapPage">
                    <div className='pageHeader'>
                        <div className="pageTitle">
                            {tree===CLUB_TREE?labels[0]:labels[1]}
                        </div>
                        <ChooseData
                            funcName={setTree}
                            data={[CLUB_TREE, COUNTRY_TREE]}
                            stateVar={tree}
                            label={labels}
                        />
                    </div>
                    <RenderTreeMap key={mapWidth} data={tree} width={mapWidth.width} height={mapWidth.height} />
                </div>
            )
        } else{
            return <ServerDown />
        }
    }

}

export default RenderTreeMapPage;