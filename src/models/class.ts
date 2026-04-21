import { Skills } from "./utils.ts"

export class ClassModel {
  _id: Object;
  name: string;
  description: string;

  hit_point_die_type: number;

  proficiencies: Proficiencies;
  spellcasting?: Spellcasting;
  subclasses: {
    name: string,
    description: string,
    selectable: Subclass
  };

  ability_score_improvement_levels: number[];
  features: Feature[][];

  constructor(params: {
    _id: Object;
    name: string;
    description: string;

    hit_point_die_type: number;

    proficiencies: Proficiencies;
    spellcasting?: Spellcasting;

    subclasses: {
      name: string;
      description: string;
      selectable: Subclass;
    };

    ability_score_improvement_levels: number[];
    features: Feature[][];
  }) {
    this._id = params._id;
    this.name = params.name;
    this.description = params.description;

    this.hit_point_die_type = params.hit_point_die_type;

    this.proficiencies = params.proficiencies;
    this.spellcasting = params.spellcasting;

    this.subclasses = params.subclasses;

    this.ability_score_improvement_levels =
      params.ability_score_improvement_levels;

    this.features = params.features;
  }
}

/** Proficiencies */
export class Proficiencies {
      saving_throw: Skills
      skill_points: number
      tools:
        {
          musical_instruments?: string[]
          artisan_tools?: string[],
          other_tools?: string[],
          gaming_sets?: string[]
        }
      weapons:
        {
          simple_melee?: string[],
          simple_ranged?: string[],
          martial_melee?: string[],
          martial_ranged?: string[]
          
        }
      armor?: string[]

  constructor(params: {
    saving_throw: Skills;
    skill_points: number;

    tools: {
      musical_instruments?: string[];
      artisan_tools?: string[];
      other_tools?: string[];
      gaming_sets?: string[];
    };

    weapons: {
      simple_melee?: string[];
      simple_ranged?: string[];
      martial_melee?: string[];
      martial_ranged?: string[];
    };

    armor?: string[];
  }) {
    this.saving_throw = params.saving_throw;
    this.skill_points = params.skill_points;

    this.tools = params.tools;
    this.weapons = params.weapons;

    this.armor = params.armor;
  }
      
}

/** Spellcasting */
export class Spellcasting {
  mana: number[];
  prepared_spells: number[];

  dc_ability: Skills;
  change_spells_on_rest: boolean;

  focus: string;
  starting_cantrips: number;
  extra_cantrip_levels: number[];

  constructor(params: {
    mana: number[];
    prepared_spells: number[];

    dc_ability: Skills;
    change_spells_on_rest: boolean;

    focus: string;
    starting_cantrips: number;
    extra_cantrip_levels: number[];
  }) {
    this.mana = params.mana;
    this.prepared_spells = params.prepared_spells;

    this.dc_ability = params.dc_ability;
    this.change_spells_on_rest = params.change_spells_on_rest;

    this.focus = params.focus;
    this.starting_cantrips = params.starting_cantrips;
    this.extra_cantrip_levels = params.extra_cantrip_levels;
  }
}

/** Subclasses */
export class Subclass {
  name: string;
  description: string;
  features?: Feature[][];

  constructor(params: {
    name: string;
    description: string;
    features?: Feature[][];
  }) {
    this.name = params.name;
    this.description = params.description;
    this.features = params.features;
  }
}

/** Feature */
export class Feature {
  name: string;
  description: string;
  selectable?: SelectableOption[];

  constructor(params: {
    name: string;
    description: string;
    selectable?: SelectableOption[];
  }) {
    this.name = params.name;
    this.description = params.description;
    this.selectable = params.selectable;
  }
}

export class SelectableOption {
  name: string;
  description: string;

  constructor(params: {
    name: string;
    description: string;
  }) {
    this.name = params.name;
    this.description = params.description;
  }
}

export const ClassModelMapper = {
  fromJson(json: any): ClassModel {
    return {
      _id: json._id,

      name: json.name,
      description: json.description,

      hit_point_die_type: json.hit_point_die_type,

      proficiencies: ProficienciesMapper.fromJson(json.proficiencies),

      spellcasting: json.spellcasting
        ? SpellcastingMapper.fromJson(json.spellcasting)
        : undefined,

      subclasses: {
        name: json.subclasses.name,
        description: json.subclasses.description,
        selectable: SubclassMapper.fromJson(json.subclasses.selectable),
      },

      ability_score_improvement_levels:
        json.ability_score_improvement_levels ?? [],

      features: json.features.map((level: Feature[]) =>
        level.map((f) => FeatureMapper.fromJson(f))
      ),
    };
  },

  toJson(model: ClassModel): any {
    return {
      _id: model._id,

      name: model.name,
      description: model.description,

      hit_point_die_type: model.hit_point_die_type,

      proficiencies: ProficienciesMapper.toJson(model.proficiencies),

      spellcasting: model.spellcasting
        ? SpellcastingMapper.toJson(model.spellcasting)
        : undefined,

      subclasses: {
        name: model.subclasses.name,
        description: model.subclasses.description,
        selectable: SubclassMapper.toJson(model.subclasses.selectable),
      },

      ability_score_improvement_levels:
        model.ability_score_improvement_levels,

      features: model.features.map((level) =>
        level.map((f) => FeatureMapper.toJson(f))
      ),
    };
  },
};

export const ProficienciesMapper = {
  fromJson(json: any): Proficiencies {
    return {
      saving_throw: json.saving_throw,
      skill_points: json.skill_points,

      tools: {
        musical_instruments: json.tools?.musical_instruments,
        artisan_tools: json.tools?.artisan_tools,
        other_tools: json.tools?.other_tools,
        gaming_sets: json.tools?.gaming_sets,
      },

      weapons: {
        simple_melee: json.weapons?.simple_melee,
        simple_ranged: json.weapons?.simple_ranged,
        martial_melee: json.weapons?.martial_melee,
        martial_ranged: json.weapons?.martial_ranged,
      },

      armor: json.armor,
    };
  },

  toJson(model: Proficiencies): any {
    return {
      saving_throw: model.saving_throw,
      skill_points: model.skill_points,

      tools: {
        musical_instruments: model.tools.musical_instruments,
        artisan_tools: model.tools.artisan_tools,
        other_tools: model.tools.other_tools,
        gaming_sets: model.tools.gaming_sets,
      },

      weapons: {
        simple_melee: model.weapons.simple_melee,
        simple_ranged: model.weapons.simple_ranged,
        martial_melee: model.weapons.martial_melee,
        martial_ranged: model.weapons.martial_ranged,
      },

      armor: model.armor,
    };
  },
};

export const SpellcastingMapper = {
  fromJson(json: any): Spellcasting {
    return {
      mana: json.mana ?? [],
      prepared_spells: json.prepared_spells ?? [],

      dc_ability: json.dc_ability,
      change_spells_on_rest: json.change_spells_on_rest,

      focus: json.focus,
      starting_cantrips: json.starting_cantrips,
      extra_cantrip_levels: json.extra_cantrip_levels ?? [],
    };
  },

  toJson(model: Spellcasting): any {
    return {
      mana: model.mana,
      prepared_spells: model.prepared_spells,

      dc_ability: model.dc_ability,
      change_spells_on_rest: model.change_spells_on_rest,

      focus: model.focus,
      starting_cantrips: model.starting_cantrips,
      extra_cantrip_levels: model.extra_cantrip_levels,
    };
  },
};

export const SubclassMapper = {
  fromJson(json: any): Subclass {
    return {
      name: json.name,
      description: json.description,
      features: (json.features ?? []).map((level: any[]) =>
        level.map((f) => FeatureMapper.fromJson(f))
      ),
    };
  },

  toJson(model: Subclass): any {
    return {
      name: model.name,
      description: model.description,
      features: model.features?.map((level) =>
        level.map((f) => FeatureMapper.toJson(f))
      ),
    };
  },
};

export const FeatureMapper = {
  fromJson(json: any): Feature {
    return {
      name: json.name,
      description: json.description,
      selectable: json.selectable
        ? json.selectable.map((s: any) =>
            SelectableOptionMapper.fromJson(s)
          )
        : undefined,
    };
  },
  toJson(model: Feature): any {
    return {
      name: model.name,
      description: model.description,
      selectable: model.selectable
        ? model.selectable.map((s) => SelectableOptionMapper.toJson(s))
        : undefined,
    };
  }
};

export const SelectableOptionMapper = {
  fromJson(json: any): SelectableOption {
    return {
      name: json.name,
      description: json.description,
    };
  },
  toJson(model: SelectableOption): any {
    return {
      name: model.name,
      description: model.description,
    };
  }

}