export interface User {
    _rola: string;
    _token: string;
    _pracownik: Pracownik;
}

export interface Pracownik {
    _idPracownika: number;
    _imie: string;
    _nazwisko: string;
    _emailSluzbowy: string;
    _stopienNaukowyNazwa: string;
    _stanowiskoNazwa: string;
    _rodzajDzialalnosciNazwa: string;
}