import React, { useState, useRef} from 'react';
import {SelectFields, requiredAttributes, attributeForStarChart} from "./CommonFunctions"

const RenderTableColumn = ({players, playerId, attributes, selectPlayer}) => {
   /**
   * @description This component renders each cell in row
   * @param {object} attributes list of players attributes
   * @param {object} player is list of players (dictionaries)
   * @returns {ReactNode} A React element which renders each cell in row
   */
   const player = players[playerId];
   const barData = SelectFields(player, requiredAttributes);
   const ratings = attributeForStarChart.map((attr) => player[attr]);
    return attributes.map((attribute) => {
        const isName = attribute==="Name";
        if (isName){
            return(
            <td key={player.Name+attribute} className="fixColumn">
                <button className="playerNameButton" onClick={()=>selectPlayer({name:player.Name, profile:barData, rating:ratings})}>
                    {player[attribute]}
                </button>
            </td>
            )
        }else{
            return <td key={player.Name+attribute}>{player[attribute]}</td>
        }
           });
}



const RenderTableHeader = ({attributes, list, updateList, updateKey, tableKey}) => {
   /**
   * @description This component renders headers of table
   * @param {object} attributes list of players attributes
   * @param {object} list is list of players (dictionaries)
   * @param {Function} updateList function to update state variable list
   * @param {Function} updateKey function to update state variable key
   * @returns {ReactNode} A React element which renders table headers
   */

   //Function sorts list of object containing 'attribute' in the direction given by 'direction'
   const sortData = (attribute, direction, data) => {
        data.sort(function (a, b) {
            if (direction==="up") {
                if (a[attribute] === null || b[attribute] === null ) {
                    return a[attribute]  === null?1:-1;
                }else{
                    return a[attribute].toString().localeCompare(b[attribute].toString())
                }
            }else{
                if (a[attribute] === null || b[attribute] === null ) {
                    return b[attribute]  === null?1:-1;
                }else{
                    return b[attribute].toString().localeCompare(a[attribute].toString())
                }
            }
        });
        return data;
    }


    //Function handles sort button submit by sorting data and updating state variables
    const handleSubmit = ({attribute}) => {
        //sort list
        let sortingDirection = "";
        let tableKeyComponents = tableKey.split("-")
        console.log(list[0][attribute]);
        if ( tableKeyComponents[0] === attribute & tableKeyComponents[1] === "up" ){
            list = sortData(attribute, "down", list)
            sortingDirection = "down";
        }else{
            list = sortData(attribute, "up", list)
            sortingDirection = "up"
        }

        //update state variables list and tableKey
        updateList(list);
        updateKey(attribute+"-"+sortingDirection);
    }

    return attributes.map((attribute, id) => {
      return (
          <th key={attribute} className={id===0?'fixColumn': 'normalColumn'}>
              <div className="columnTitleContainer">
                  <div className="columnTitle">{attribute.toUpperCase()}</div>
                  <div className="sortingIcons">
                    <button className="sortingButton" onClick={() => handleSubmit({attribute: attribute})}>
                        <div className="sortingIcons">
                            <i className="fa fa-chevron-up" aria-hidden="true"></i>
                            <i className="fa fa-chevron-down" aria-hidden="true"></i>
                        </div>
                    </button>
                  </div>
              </div>
          </th>
          );
      });
}


const RenderTableRow = ({players, attributes, selectPlayer, activePlayer}) => {
   /**
   * @description This component renders each row
   * @param {object} attributes list of players attributes
   * @param {object} players is list of players (dictionaries)
   * @returns {ReactNode} A React element which renders each row in table
   */
   return players.map((player, id) => {
       return <tr key={player.Name} className={player.Name===activePlayer?"activeRow":"inactiveRow"}>
                    <RenderTableColumn  players={players} playerId={id} attributes={attributes} selectPlayer={selectPlayer}/>
                </tr>
       });
    }


const RenderTable = ({attributes, list, updateList, selectPlayer, activePlayer, className}) => {
   /**
   * @description This component renders a table of a data
   * @param {object} attributes list of players attributes
   * @param {object} list is list of players (dictionaries)
   * @param {Function} updateList function to update state variable
   * @returns {ReactNode} A React element which renders a table
   */

  // key to force remount of table rows
  const [tableKey, setTableKey] = useState(" ");

  // create function to update key, to be served as props for child components
  const updateKey = (data) => setTableKey(data);


    const tableContainerRef = useRef();

    //create function to scroll table left and write with buttons
    const scrollTable = (direction) => {
        const tableContainer = tableContainerRef.current;
        const scrollAmount = 99;

        if (direction === 'left') {
            tableContainer.scrollLeft -= scrollAmount;
        } else if (direction === 'right') {
            tableContainer.scrollLeft += scrollAmount;
        }
    };

  return (
      <div>
          {/* SCROLL BUTTON FOR TABLE*/}
          <div className="scrollTableButton">
            <button className="scrollButton" onClick={() => scrollTable('left')}>
                <i className="fa fa-angle-left" aria-hidden="true"></i>
            </button>
            <button className="scrollButton" style={{ right: 0 }} onClick={() => scrollTable('right')}>
                <i className="fa fa-angle-right" aria-hidden="true"></i>
            </button>
         </div>
       {/* TABLE*/}
        <div ref={tableContainerRef} className={className}>
          <table>
            <thead>
            <tr>
            <RenderTableHeader
                attributes={attributes}
                list={list}
                updateList={updateList}
                updateKey={updateKey}
                tableKey={tableKey}
            />
            </tr>
            </thead>
            <tbody key={tableKey}>
                <RenderTableRow
                    players={list}
                    attributes={attributes}
                    selectPlayer={selectPlayer}
                    activePlayer={activePlayer}
                />
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default RenderTable;