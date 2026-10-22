import { useEffect } from "react";
import type { Feature, Spellcasting, Subclass } from "../models/class";
import { FeatureSelectableDisplay } from "./feature-selectable-display";

export function FeatureDisplay(props: {selectedClassFeatures:Feature[][], asi_levels:number[], subclasses: Subclass, spellcasting: Spellcasting | undefined}) {


    function fillFeatures() : Feature[][] {
        let classFeatures:Feature[][] = []
        let classFeatureIndex = 0

        let asiFeature : Feature = {
            "name":"Ability Score Improvement",
            "description":"You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can't increase an ability score above 20 using this feature."
        }

        let subclassFeature: Feature = {
            "name":`${props.subclasses.name} Feature`,
            "description": `${props.subclasses.name} Feature`
        }

        for(let i=0;i<20;i++){
            if(props.asi_levels.includes(i+1)){
                classFeatures[i]= [asiFeature];
            }
            else if([3,7,10,15,18].includes(i+1)){
                classFeatures[i]= [subclassFeature];
            }
            else {
                classFeatures[i]=props.selectedClassFeatures[classFeatureIndex]
                classFeatureIndex++
            }
        }
        
        return classFeatures
    }
    
    useEffect(()=>{
        fillFeatures()
    }, [])

    return(
        <div>
            {fillFeatures().map((levelFeatures, index)=>{
                return(
                    <div key={index} className="level-features">
                        <h1>Level {index+1}</h1>
                        {props.spellcasting != undefined ? <div>
                            <h4>Spellcasting</h4>
                            <ul>
                                <li>Mana: {props.spellcasting.mana[index]}</li>
                                <li>Prepared Spells: {props.spellcasting.prepared_spells[index]}</li>
                                {index === 0 ? <li>Cantrips Known: {props.spellcasting.starting_cantrips}</li> : props.spellcasting.extra_cantrip_levels.includes(index) ? <li>New Cantrip Learned</li> : <></>}
                            </ul>
                        </div>:
                        <></>}
                        {levelFeatures.map((feature, index)=>{
                            return(
                                <div key={index}>
                                    <h3>{feature.name}</h3>
                                    <div><pre>{feature.description}</pre></div>
                                    {
                                        feature.selectable != undefined ?  <FeatureSelectableDisplay options={feature.selectable}/> 
                                        : <div></div>
                                    }
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}