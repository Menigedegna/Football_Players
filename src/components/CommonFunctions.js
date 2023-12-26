/**
    This file contains functions and constants used by more than one component
*/

// Function to select a subset of fields from a dictionary
export const SelectFields = (dictionary, fieldList) => {
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

