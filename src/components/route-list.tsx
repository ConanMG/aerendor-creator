import { Route, Routes, useNavigate } from "react-router-dom";
import { Homepage } from "./homepage";
import { NotFound } from "./not-found";
import { CharacterCreator } from "./character-creator";

export function RouteList(){

  const navigate = useNavigate();

    return(
      <>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/creator" element={<CharacterCreator/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <button onClick={ () => navigate("/creator") }>Create Character</button>
      </>        
    )
}