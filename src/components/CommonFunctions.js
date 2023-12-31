/**
    This file contains functions and constants used by more than one component
*/

export const SelectFields = (dictionary, fieldList) => {
   /**
   * @description Function to select a subset of fields from a dictionary
   * @param {object} dictionary
   * @param {object} fieldList list of dictionary keys
   * @returns {object} dictionary with keys=fieldList
   */
    var result = {};
    fieldList.forEach(function(field) {
        result[field] = dictionary[field];
    });
    return result;
}

// constant containing numerical attributes used for barplot
export const requiredAttributes = ['Rating', 'Ball_Control', 'Dribbling', 'Marking', 'Sliding_Tackle', 'Standing_Tackle',
                           'Aggression', 'Reactions', 'Attacking_Position', 'Interceptions', 'Vision', 'Composure',
                           'Crossing', 'Short_Pass', 'Long_Pass', 'Acceleration', 'Speed', 'Stamina', 'Strength',
                           'Balance', 'Agility', 'Jumping', 'Heading', 'Shot_Power', 'Finishing', 'Long_Shots', 'Curve',
                           'Freekick_Accuracy', 'Penalties', 'Volleys', 'GK_Positioning', 'GK_Diving', 'GK_Kicking',
                           'GK_Handling', 'GK_Reflexes'];


// constant containing categorical attributes used for star chart
export const attributeForStarChart = ["Weak_foot", "Skill_Moves"]



export const CalculatePlotSize = (maxWidth, maxHeight, weightObject) => {
   /**
   * @description Function calculateS plot width and height proportion to media size
   * @param {number} maxWidth max width of plot
   * @param {number} maxHeight max width of plot
   * @param {object} weightObject {width: number, height: number} proportion of plot width/height compared to window size
   * @param {string} field = 'CLUB_POSITION' or 'NATIONAL_POSITION'
   * @returns {object} list containing width and height
   */
  var width = 0;
  var height = 0;

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight

  if (windowWidth>=800){
    width = maxWidth;
    height = maxHeight;
  }else{
    width = windowWidth*weightObject.width;
    height = windowHeight*weightObject.height;
  }
  return [width, height];
}

