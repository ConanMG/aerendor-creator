import type { Proficiencies } from "../models/class";

export function ProficienciesDisplay(props:{proficiencies:Proficiencies}) {

    function concatWeaponProficiencies(proficiencies : Proficiencies) : string[] {
        let weaponProficiencies : string[] = []
        if(proficiencies.weapons.martial_melee != undefined)
        weaponProficiencies = weaponProficiencies.concat(proficiencies.weapons.martial_melee)
        
        if(proficiencies.weapons.martial_ranged != undefined)
        weaponProficiencies = weaponProficiencies.concat(proficiencies.weapons.martial_ranged)

        if(proficiencies.weapons.simple_melee != undefined)
        weaponProficiencies = weaponProficiencies.concat(proficiencies.weapons.simple_melee)

        if(proficiencies.weapons.simple_ranged != undefined)
        weaponProficiencies = weaponProficiencies.concat(proficiencies.weapons.simple_ranged)

        return weaponProficiencies;
    }

    return(
        <div>
            <h3>Proficiencies</h3>
            <ul>
                <li>Armor: {props.proficiencies.armor?.filter(value=> { return value}).keys.toString()}</li>
                <li>Weapons: {concatWeaponProficiencies(props.proficiencies).join(", ")}</li>
                <li>Saving Throws: {props.proficiencies.saving_throw.toString().toLowerCase()}</li>
            </ul>
        </div>
    )
}