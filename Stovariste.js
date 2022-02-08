import { Artikal } from "./Artikal.js";
import { Crep } from "./Crep.js";
import { Cement } from "./Cement.js";

export class Stovariste {

    constructor(ime) {
        this.ime = ime
        this.artikli = new Map()
    }

    dodajArtikal(nazivArtikla, artikal) {
        this.artikli.set(nazivArtikla, artikal)
    }

    konvertujUEure(cena) {
        return cena / 118
    }

    ispisiSifreIBrojArtikalaJeftinijihOd(cena) {
        const trazeniArtikli = []
        for(const [key, value] of this.artikli) {
            if(value.cena < cena) {
                trazeniArtikli.push(key)
            }
        }
        return trazeniArtikli
    }

    izracunajCenuUEurimaZaArtikleSaZadatomReci(rec) {
        const ceneTrazeniArtikalaUEurima = []
        for(const [key, value] of this.artikli) {
            if((`${value.opis}`).includes(`${rec}`)) {
                ceneTrazeniArtikalaUEurima.push(this.konvertujUEure(value.cena))
            }
        }
        return ceneTrazeniArtikalaUEurima
    }

    vratiNajskupljiArtikal() {
        const sviArtikli = this.artikli.entries()
        const [[key, value]] = sviArtikli
        let maximum = value.dajCenu()
        let trazeniArtikal = key
        for(const [key, value] of this.artikli) {
            if(value.dajCenu() > maximum) {
                maximum = value.dajCenu()
                trazeniArtikal = key
            }
        }
        return trazeniArtikal
    }

    ubacinNizArtikalaPoPovrsini(niz, zadataPovrsina) {
        let count = 0
        for(let i = 0; i < niz.length; i++) {
            this.artikli.set(`Crep`, niz[i])
            if(niz[i].izracunajPovrsinu() < zadataPovrsina) {
                count++
            }
        }
        return count
    }

    ubaciNizArtikalaPoBooleanima(niz) {
        for(let j = 0; j < niz.length; j++) {
            if(niz[j]) {
                const randomSifraCrep = Math.floor(100000 + Math.random() * 900000)
                const noviCrep = new Crep(`${randomSifraCrep}`, 'crep', '1250', 55, 25)
                this.dodajArtikal(`crep ${randomSifraCrep}`, noviCrep)
            } else {
                const randomSifraCement = Math.floor(100000 + Math.random() * 900000)
                const noviCement = new Cement(`${randomSifraCement}`, 'cement', '250', 5, 1.5)
                this.dodajArtikal(`cement ${randomSifraCement}`, noviCement)
            }
        }
    }

    prosecnaPovrsinaCrepova() {
        let sum = 0
        let num = 0
        for(const [key, value] of this.artikli) {
            if(value instanceof Crep) {
                sum += (value.duzina * value.sirina)
                num++
            }
        }
        return sum / num
    }

    vratiSifreCrepovaCijaJePovrsinaVecaOdProsecne() {
        let skupSifri = []
        for(const [key, value] of this.artikli) {
            if(value instanceof Crep) {
                if(value.izracunajPovrsinu() > this.prosecnaPovrsinaCrepova()) {
                    skupSifri.push(value.sifra)
                }
            }
        }
        return skupSifri
    }

}

const stovariste = new Stovariste('Viline vode')
const artikal1 = new Artikal('357615', 'fasadni stiropor', 475)
const artikal2 = new Artikal('291005', 'sljunak', 500)
const artikal3 = new Artikal('515312', 'cement', 250)
const crep1 = new Crep('313957', 'glineni crep', 1100, 50, 20)
const crep2 = new Crep('701019', 'betonski crep', 1250, 70, 30)
const crep3 = new Crep('191573', 'limeni crep', 1050, 90, 35)


stovariste.dodajArtikal('fasadni stiropor', artikal1)
stovariste.dodajArtikal('sljunak', artikal2)
stovariste.dodajArtikal('cement', artikal3)

// console.log(stovariste)
// console.log(stovariste.ispisiSifreIBrojArtikalaJeftinijihOd(501))
// console.log(stovariste.izracunajCenuUEurimaZaArtikleSaZadatomReci('sljunak'))
// console.log(stovariste.vratiNajskupljiArtikal())

const listaArtikala = [crep1, crep2, crep3]
console.log(stovariste.ubacinNizArtikalaPoPovrsini(listaArtikala, 1500))

const booleanNiz = [true, true, false, true, false]
stovariste.ubaciNizArtikalaPoBooleanima(booleanNiz)
// console.log(stovariste.artikli)

// console.log(stovariste.prosecnaPovrsinaCrepova())

console.log(stovariste.vratiSifreCrepovaCijaJePovrsinaVecaOdProsecne())



