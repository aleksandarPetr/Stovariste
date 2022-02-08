import { Artikal } from "./Artikal.js";

export class Cement extends Artikal {

    constructor(sifra, opis, cena, pakovanje, cvrstoca) {
        super(sifra, opis, cena);
        this.pakovanje = pakovanje
        this.cvrstoca = cvrstoca
    }

}
