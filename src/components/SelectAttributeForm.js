import { useState } from "react";
import Select from 'react-select'

// constant containing default attributes displayed in table
const ATTRIBUTES = ['Name', 'Nationality', 'National_Position', 'National_Kit', 'Club', 'Club_Position',
                           'Club_Kit', 'Club_Joining', 'Contract_Expiry', 'Rating', 'Height', 'Weight',
                           'Preffered_Foot', 'Birth_Date', 'Age', 'Preffered_Position', 'Work_Rate', 'Weak_foot',
                           'Skill_Moves', 'Ball_Control', 'Dribbling', 'Marking', 'Sliding_Tackle', 'Standing_Tackle',
                           'Aggression', 'Reactions', 'Attacking_Position', 'Interceptions', 'Vision', 'Composure',
                           'Crossing', 'Short_Pass', 'Long_Pass', 'Acceleration', 'Speed', 'Stamina', 'Strength',
                           'Balance', 'Agility', 'Jumping', 'Heading', 'Shot_Power', 'Finishing', 'Long_Shots', 'Curve',
                           'Freekick_Accuracy', 'Penalties', 'Volleys', 'GK_Positioning', 'GK_Diving', 'GK_Kicking',
                           'GK_Handling', 'GK_Reflexes']


const SelectAttribute = ({updateAttribute, attributes}) => {
   /**
   * @description This component renders a multiple choice input field for user to select attributes to view in table
   * @param {Function} updateAttribute is a function to update state variable attributes
   * @param {object} attributes is a list of attributes
   * @returns {ReactNode} A React element which renders a react Select component
   */
    const default_attributes = attributes.map(item => ({ label: item, value: item }));
    const [selectedItems, setSelectedItems] = useState(default_attributes);
    const attribute_option = ATTRIBUTES.map(item => ({ label: item, value: item }));
    const buttonSubmit = () => updateAttribute(selectedItems.map(option => option.value));

    // customize Select component
    const colourStyles : StylesConfig<ColourOption, true> = {
      control: (styles) => ({ ...styles, backgroundColor: 'var(--select-bg)' }),
      option: (styles, {isDisabled, isFocused, isSelected }) => {
        return {
          ...styles,
          backgroundColor: isDisabled
            ? undefined
            : isSelected
            ? 'var(--select-highLight)'
            : isFocused
            ? 'var(--select-highLight)'
            : 'var(--select-bg)',
          color: 'black',
          cursor: isDisabled ? 'not-allowed' : 'default',

          ':active': {
            ...styles[':active'],
            backgroundColor: !isDisabled
              ? isSelected
                ? 'var(--select-bg)'
                : 'var(--select-highLight)'
              : undefined,
          },
        };
      },
      multiValue: (styles) => {
        return {
          ...styles,
          backgroundColor: 'var(--select-highLight)',
        };
      },
      multiValueLabel: (styles) => ({
        ...styles,
        color: 'black',
      }),
      multiValueRemove: (styles) => ({
        ...styles,
        color: 'black',
        ':hover': {
          backgroundColor: 'var(--select-remove-button)',
          color: 'white',
        },
      }),
    };

    return (
        <div className="attributeFormContainer">
          <Select
            value={selectedItems}
            isMulti
            options={attribute_option}
            onChange={(selected) => setSelectedItems(selected)}
            styles={colourStyles}
          />
            <button className='selectButton' onClick={buttonSubmit}>Update List</button>
        </div>
    )
}

export default SelectAttribute;