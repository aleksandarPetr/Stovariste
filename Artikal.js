export class Artikal {

    constructor(sifra, opis, cena) {
        this.sifra = sifra
        this.opis = opis
        this.cena = cena
    }

    uvecajZaPdv() {
        this.cena *= 1.2
    }

    dajCenu() {
        return this.cena
    }

}

const artikal = new Artikal('111', 'cokolada', 100)
artikal.uvecajZaPdv()
console.log(artikal)
// console.log(artikal.konvertujUEure())
