import axios from "axios";
import { StrictMode, useEffect, useState } from 'react'
import configData from "../config/config.json";
import { ClassModel, ClassModelMapper } from '../models/class';
import { FeatureDisplay } from "./feature-display";
import { ProficienciesDisplay } from "./proficiencies-display";
import { HitPointDisplay } from "./hit-point-display";

export function CharacterClassSelector() {

  const [classes, setClasses] = useState<Array<ClassModel>>();
  const [displayedClass, setDisplayedClass] = useState<ClassModel>();

  function getClasses() {
      axios({
              method: 'get',
              url: `${configData["dev-server-url"]}/classes`,
              responseType: 'json'
      }).then( (res) =>{
        let gameClasses : ClassModel[] = []

        res.data.forEach((element: JSON) => {
          gameClasses.push(ClassModelMapper.fromJson(element))
        });

        setClasses(gameClasses)})
  }

  useEffect(()=>{
      getClasses()
  }, [])

  function classSelectOnChange(selectedClass : string){
      setDisplayedClass(classes!.find(gameClass => { return selectedClass == gameClass.name}))
  }

  return (
      <StrictMode>
        <div>
          <select onChange={e => classSelectOnChange(e.target.value)}>
              <option>Select a class...</option>
              { classes != undefined ? classes.map(gameClass => {
                return(
                  <option key={gameClass.name} value={gameClass.name}>
                    {gameClass.name}
                  </option>
                )
              }) : <></>}
          </select>

          { displayedClass != undefined ? 
            <div>
              <h2>{displayedClass.name}</h2>
              <div dangerouslySetInnerHTML={{__html: displayedClass.description}} ></div>
              <h2>Class Features</h2>
              As an {displayedClass.name}, you gain the following benefits.
              <HitPointDisplay className={displayedClass.name} hit_die={displayedClass.hit_point_die_type}/>
              <ProficienciesDisplay proficiencies={displayedClass.proficiencies}/>
              <FeatureDisplay asi_levels={displayedClass.ability_score_improvement_levels} selectedClassFeatures={displayedClass.features} spellcasting={displayedClass.spellcasting} subclasses={displayedClass.subclasses}/>
            </div>
            : <div></div> 
          }
        </div>
      </StrictMode>
    );
}

