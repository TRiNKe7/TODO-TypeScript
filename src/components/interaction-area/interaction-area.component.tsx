import React, {ChangeEvent, FC} from 'react'


interface Props {
    inputValue: string
    handleInputCallBack: (event: ChangeEvent<HTMLInputElement>) => void
    addButton: () => void;
    addButtonText: string;
}
console.log('1')
    const InteractionArea:FC<Props> = ({inputValue, handleInputCallBack, addButton, addButtonText}) => {

    return(
        <div>
            <input value={inputValue} onChange={handleInputCallBack}/>
            <button onClick={addButton}>{addButtonText}</button>
        </div>
    )
}

export default InteractionArea