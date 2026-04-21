export function HitPointDisplay(props: { className:string, hit_die:number }) {
    return(
        <div>
            <h3>Hit Points</h3>
            <ul>
                <li>Hit Dice: 1d{props.hit_die} per {props.className} level.</li>
                <li>Hit Points at 1st Level: {props.hit_die} + your Strength modifier</li>
                <li>Hit Points at Higher Levels: 1d{props.hit_die} (or {(props.hit_die/2)+1}) + your Strength modifier per {props.className} level.</li>
            </ul>
        </div>
    )
}