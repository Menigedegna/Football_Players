import axios from 'axios';

import soccerField from "../img/soccerField/soccerField.jpg";
import soccerFieldPortrait from "../img/soccerField/soccerField_Portrait.jpg";

import { LazyLoadImage } from "react-lazy-load-image-component";
import RenderLoader from "../components/RenderLoader"
import ServerDown from "./ServerDown"
import ChooseData from "../components/ChooseData"

import React, { useState, useEffect } from 'react';


const SERVER_PATH = 'https://mariamawit.pythonanywhere.com/api/';
const POSITIONS = ['GK', 'SW', 'CB', 'DM', 'CAM', 'RM', 'LM', 'LB', 'LCB', 'RCB', 'RB', 'LWB', 'LDM', 'RDM', 'RWB', 'LCM', 'RCM', 'LW', 'LAM', 'RAM', 'RW', 'LS-LF-ST', 'RS-CF-RF', 'Sub']
var CLUB_POSITIONS = {};
var NATIONAL_POSITIONS = {};

const RenderPosition = ({list}) =>{
   /**
   * @description Function renders divs containing items in a grid display
   * @param {object} dictionary containing players list for each field position {field-position: [players-names]}
   * @returns {ReactNode} A React element which renders div component for each item in list
   */
    return POSITIONS.map((position) => {
            return<div className='positionFields' key={position} style={{gridArea: position}}>
                       <div className='fieldLabels' id={position}>{position}</div>
                       <div className='playersList'>
                            <span className='playerTitle'>{position} Players</span>
                            <hr/>
                            {list[position].length>0
                            ?<ul>
                                {list[position].map((item, id)=><li key={id}>{item}</li>)}
                            </ul>
                            :<span className='noPlayers'>No players in database</span>
                            }
                        </div>
                   </div>
    });
}

const checkPlayerPosition = (player, positionList, field) => {
   /**
   * @description Function checks for position name in player which matches label in POSITIONS. If match is found player name is added to positionList
   * @param {object} player attributes
   * @param {object} positionList {field-position: [players-list]}
   * @param {string} field = 'CLUB_POSITION' or 'NATIONAL_POSITION'
   * @returns {object} positionList is returned
   */
    if (POSITIONS.includes(player[field])){
        positionList[player[field]].push(player['Name']);
    }else if(['LS', 'LF', 'ST'].includes(player[field])){
        positionList['LS-LF-ST'].push(player['Name']);
    }else if(['RS', 'CF', 'RF'].includes(player[field])){
        positionList['RS-CF-RF'].push(player['Name']);
    }
    return positionList;
}
const PlayersPositions = () => {
   /**
   * @description This component renders Positions page
   * @returns {ReactNode} A React element which renders div components overlay on top of a background image
   */

    // state variable containing currently used players position list in chart
    const [list, setList] = useState();
    // state variable containing currently used background image
    const [image, setImage] = useState();
    const [mapWidth, setMapWidth] = useState();

    // isLoading {boolean}, default set to true, changes to false when useEffect completes  loading data from server
    const [isLoading, setIsLoading] = useState(true);

    // Get data from server
    useEffect(() => {
    axios.get(SERVER_PATH)
    .then(response => {
    const data = response.data;

    // Get list of players for each club and country
    POSITIONS.forEach(i=>
        {
        CLUB_POSITIONS[i]=[];
        NATIONAL_POSITIONS[i]=[];
        });
    data.forEach((player) => {
        CLUB_POSITIONS = checkPlayerPosition(player, CLUB_POSITIONS, 'Club_Position');
        NATIONAL_POSITIONS = checkPlayerPosition(player, NATIONAL_POSITIONS, 'National_Position');
    });

    //Set state variable to CLUB_POSITIONS
    setList(CLUB_POSITIONS);
    window.innerWidth>=800?setImage(soccerField):setImage(soccerFieldPortrait);
    window.innerWidth>=800?setMapWidth(900):setMapWidth('90%');
    })
    .catch(error => {
    console.log(error);
    })
    .finally(()=>{
        setIsLoading(false);
    });
    }, []);

    //add event listener to adjust background image orientation to window size
    useEffect(() => {
    //Adjust plot size
    const AdjustIMageOrientation = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth>=800){
            setImage(soccerField);
        }else{
            setImage(soccerFieldPortrait);
        }
    }
      window.addEventListener("resize", AdjustIMageOrientation, false);
    }, []);

    if(isLoading){
        return <RenderLoader />
    }else{
        if (list && image){
            return (
                <div className='positionPage'>

                {/* PAGE HEADER */}
                <div className="pageTitle">Field Positions</div>
                <div className='pageHeader' style={{width: mapWidth}}>

                    {/* INSTRUCTION FOR USER */}
                    <div className='positionInstructions'>
                        <p>
                        Hover to view list of players at each position.<br/>
                        Click on Club / National button to view club /national positions.
                        </p>
                    </div>

                    {/* USER CAN INTERACT BY CHOOSING DATA */}
                    <ChooseData
                        funcName={setList}
                        data={[CLUB_POSITIONS, NATIONAL_POSITIONS]}
                        stateVar={list}
                        label={['Club', 'National']}
                    />
                </div>



                {/* FIELD POSITIONS OVERLAYED ON SOCCER FIELD IMAGE*/}
                <div className="fieldContainer">
                    <div className='imageContainer'>
                    <LazyLoadImage src={image} className="soccerFieldImage"
                        alt="Page is not found"
                    />
                    <div class="overlay"></div>
                    </div>
                    <div className='positionsContainer'>
                        <RenderPosition list={list}/>
                    </div>
                </div>
               </div>
            );
        }else{
            return <ServerDown />
        }
    }
}

export default PlayersPositions;