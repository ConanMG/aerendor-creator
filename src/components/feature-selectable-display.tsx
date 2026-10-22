import { useState } from "react";

export function FeatureSelectableDisplay(props: {options: any}) {
    let options : [{"name":"", "description":""}] = props.options
    let [selectedOptionDescription, setSelectedOptionDescription] = useState("")
    
    function onSelectOption(selectedValue: string) {
        setSelectedOptionDescription(selectedValue)
    }

    return(
        <div className="feature-choices">
            <select onChange={ (selectedValue) => { onSelectOption(selectedValue.target.value) }}>
                {options.map((option)=>{
                    return(
                        <option key={option.name} value={option.description} >{option.name}</option>
                    );
                })}
            </select>
            <div><pre>{selectedOptionDescription}</pre></div>
        </div>
    )
}