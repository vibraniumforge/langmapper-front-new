export interface Language {
  id: number;
  name: string;
  abbreviation: string;
  alphabet: string;
  macrofamily: string;
  family: string;
  subfamily: string;
  area1: string;
  area2: string;
  area3: string;
  notes: string;
  has_gender: boolean;
  flag?: string;
  alive: boolean;
}
