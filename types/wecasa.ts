type UniverseReference =
  | "cleaning"
  | "beauty"
  | "massage"
  | "haircut"
  | "childcare"
  | "sports_coaching";

export type Zone = {
  number: number;
  area_codes: string[];
};

export type Universe = {
  available_departments?: string[];
  reference: UniverseReference;
  title: string;
  minimum_price: number;
  minimum_appointment: string;
  childcare_caf_allowance_min_hours_by_month?: number;
  holidays: string[];
  zones: Zone[];
  pro_first_steps_quizz_url?: string;
  weekly_recurrences?: Record<string, number | number[]>;
};
