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
      id: number;
      imie: string;
      nazwisko: string;
      email: string;
      stopienNaukowy: string;
      stanowisko: string;
      grupa: string;
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

  export interface Podkategoria {
    idPodKategorii: number;
    maxPunktow: number;
    minPunktow: number;
    idGrupy: number;
    nazwa: string;
  }
