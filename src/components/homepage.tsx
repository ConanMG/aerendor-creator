import { StrictMode } from "react";
import { CharacterDisplay } from "./character-display";

export function Homepage() {

  return (
      <StrictMode>
        <div>
          <h1>Dremaria Character Creator</h1>
          <div>
            <CharacterDisplay/>
          </div>
        </div>
      </StrictMode>
    );
}

