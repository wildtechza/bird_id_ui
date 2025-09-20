export class Bird {
  alphaSort: number | null = null;
  sasol4PageNo: number | null = null;
  sasolPageNo: number | null = null;
  roberts6Sort: number | string | null = null;
  sabap2!: number;
  fullName!: string;
  scientificName!: string;
  robertsVII: number | null = null;
  robertsVI: number | string | null = null;
  afrikaans!: string;
  zulu!: string;

  constructor(data: Partial<Bird>) {
    Object.assign(this, data);
  }
}