import { Artikal } from "./Artikal.js";

export class Crep extends Artikal {

    constructor(sifra, opis, cena, duzina, sirina) {
        super(sifra, opis, cena);
        this.duzina = duzina
        this.sirina = sirina
    }

    izracunajPovrsinu() {
        return this.duzina * this.sirina
    }

    opisCrepa() {
        return `Proizvod sa sifrom ${this.sifra} je ${this.opis} i kosta ${this.cena} dinara.`
    }

}
