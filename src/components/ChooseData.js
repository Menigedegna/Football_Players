const ChooseData = ({funcName, data, stateVar, label}) => {
   /**
   * @description This component allows user to choose data to be displayed in charts/plots
   * @returns {ReactNode} A React element which renders buttons
   */
    return(
        <div className='positionChoice'>
            <button className='choiceButton' onClick={() => funcName(data[0])}>
                <div className={stateVar===data[0]?'activeDot':'inactiveDot'}></div>
                {label[0]}
            </button>
            <button className='choiceButton' onClick={() => funcName(data[1])}>
                <div className={stateVar===data[1]?'activeDot':'inactiveDot'}></div>
                {label[1]}
            </button>
        </div>
        )
    }

export default ChooseData;