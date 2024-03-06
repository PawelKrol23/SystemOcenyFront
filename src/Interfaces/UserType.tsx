export interface Login{
    _username: string;
    _password: string;
}

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

export interface UserSession {
    rola: string;
    token: string;
    pracownik: {
      idPracownika: number;
      imie: string;
      nazwisko: string;
      emailSluzbowy: string;
      stopienNaukowyNazwa: string;
      stanowiskoNazwa: string;
      rodzajDzialalnosciNazwa: string;
    };
    tokenExpiration: string;
    czyMaPodwladnych: boolean;
  }

  export interface Achievement{
    idOsiagniecia: number;
    nazwa: string;
    iloscPunktow: number;
    data: Date;
    czyZatwierdzone: boolean;
    podKategoriaNazwa: string;
    idWniosku: number;
  }
  