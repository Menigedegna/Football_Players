const ChooseData = ({funcName, data, stateVar, label}) => {
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