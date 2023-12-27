import axios from 'axios';
import RenderTable from "../components/RenderTable";
import SelectAttribute from "../components/SelectAttributeForm";
import SplitScreen from "../components/SplitScreen";
import { Barplot } from "../components/BarPlot";
import {SelectFields, requiredAttributes, attributeForStarChart} from "../components/CommonFunctions"
import StarRatingChart from "../components/StarRatingChart"
import ServerDown from "./ServerDown"
import RenderLoader from "../components/RenderLoader"
import React, { useState, useEffect } from 'react';
import playerAvatar from "../img/avatar/PlayerAvatar.png";

const SERVER_PATH = 'https://mariamawit.pythonanywhere.com/api/';

const HomePage = () => {
   /**
   * @description This function renders home page
   * @returns {ReactNode} A React element which renders home page
   */

    // create state variables
    // list {object} contains players data
    const [list, setList] = useState();
    // barData {object} contains name of player (name), numerical attributes (profile) and categorical values (rating)
    const [barData, setBarData] = useState({name:"Player", profile:{}, rating:[]});
    // isLoading {boolean}, default set to true, changes to false when useEffect completes  loading data from server
    const [isLoading, setIsLoading] = useState(true);

    // Get {list} data from server
    useEffect(() => {
    axios.get(SERVER_PATH)
    .then(response => {
    setList(response.data);
    const formatedData = SelectFields(response.data[0], requiredAttributes);
    const playerRatings = attributeForStarChart.map((attr) => response.data[0][attr]);
    setBarData({name:response.data[0]["Name"], profile:formatedData, rating:playerRatings});
    })
    .catch(error => {
    console.log(error);
    })
    .finally(()=>{
        setIsLoading(false);
    });
    }, []);

    // create function to update list, to be served as props for child components
    const sortList = (data) => setList(data);

    // set attributes to be displayed on table by default
    const [attributes, setAttributes] = useState(['Name', 'Nationality', 'National_Position', 'National_Kit', 'Club',
        'Club_Position', 'Club_Kit', 'Height','Preffered_Foot']);

    // create function to update attribute list, to be served as props for child components
    const handleChange = (data) => setAttributes(data);

     // create function to update barData when a player is selected in table, to be served as props for child components
    const selectPlayer = (data) => setBarData(data);
    if(isLoading){
        return <RenderLoader />
    }else{
        if (list){
            return (
                <SplitScreen leftWeight={3} rightWeight={2} className={'homePage'}>

                    {/* SELECT ATTRIBUTE COMPONENT & INSTRUCTIONS*/}
                    <div className="leftContainer">
                        <div className="pageTitle">Players Attributes</div>
                        <div className="instructionContainer"> Select players' attributes you would like to view in the table below ↓↓↓</div>
                        <SelectAttribute updateAttribute={handleChange} attributes={attributes} />
                        <div className="instructionContainer">Click on the player's name in the table to view his skills → </div>

                        {/* TABLE*/}
                        <RenderTable
                            attributes={attributes}
                            list={list}
                            updateList={sortList}
                            selectPlayer={selectPlayer}
                            activePlayer={barData.name}
                            className="tableContainer"
                            />
                    </div>
                    <div className="rightContainer">

                        {/* PLAYER AVATAR IMAGE AND STAR CHART*/}
                        <div className="pageTitle">{barData.name}'s skills</div>
                        <div className="playerAvatarContainer">
                            <img src={playerAvatar} height={150} className="PlayerAvatarImage" alt="player's avatar"/>
                            <StarRatingChart data={barData.rating} />
                        </div>

                        {/* BARPLOT*/}
                        <div className="barplotContainer">
                                <Barplot className="skillBarplot"
                                    width={400}
                                    height={700}
                                    data={barData.profile}
                                />
                        </div>
                    </div>
                </SplitScreen>
            );
        }else{
            return <ServerDown />
        }
    }
}

export default HomePage;