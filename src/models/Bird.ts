export class Bird {
  alphaSort: number;
  sasol4PageNo: number;
  sasolPageNo: number | null;
  roberts6Sort: number | string | null;
  sabap2: number;
  fullName: string;
  scientificName: string;
  robertsVII: number | null;
  robertsVI: number | string | null;
  afrikaans: string;
  zulu: string;

  constructor(data: Partial<Bird>) {
    Object.assign(this, data);
  }
}