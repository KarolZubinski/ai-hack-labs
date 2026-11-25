// Materiał, ćwiczenia i karty testowe tej lekcji.
library.push({
  "id": "LLM-09",
  "title": "Improper Output Handling",
  "topic": "output",
  "polishTitle": "Nieprawidłowa obsługa odpowiedzi modelu",
  "signal": "Ustal, czy aplikacja miała pokazać dosłowny tekst czy sformatowany dokument.",
  "short": "Bezpieczne wyświetlanie i przetwarzanie wygenerowanej treści.",
  "name": "Renderowanie odpowiedzi",
  "mechanism": [
    "Odpowiedź modelu może być zwykłym tekstem, sformatowaną notatką lub rekordem danych. Kolejny komponent nadaje jej znaczenie: przeglądarka wyświetla tekst, a importer interpretuje kwotę i walutę. Ryzyko powstaje, gdy odbiorca przyjmie szerszy format, niż przewiduje umowa między komponentami.",
    "Zacznij od ustalenia oczekiwanego rezultatu. Pogrubienie może być właściwe w redaktorze i błędne w widoku źródłowym. Również poprawna składnia rekordu nie gwarantuje, że rekord jest kompletny i nadaje się do zatwierdzenia wydatku."
  ],
  "scenes": [
    {
      "name": "Zwykły tekst w czytniku",
      "context": "Czytnik zgłoszeń ma pokazywać dosłowną zawartość odpowiedzi modelu. Neutralny znacznik pogrubienia pozwala odróżnić tekst od formatowania.",
      "rule": "Wszystkie znaki odpowiedzi mają być widoczne jako tekst, łącznie ze znacznikami.",
      "traces": [
        [
          "Odpowiedź modelu",
          "<b>Gotowe</b>",
          "Widok użytkownika",
          "Słowo „Gotowe” wyświetlone pogrubioną czcionką.",
          "Struktura widoku",
          "Element pogrubienia zawiera słowo „Gotowe”."
        ],
        [
          "Odpowiedź modelu",
          "<b>Gotowe</b>",
          "Widok użytkownika",
          "Widoczna jest cała sekwencja <b>Gotowe</b>.",
          "Struktura widoku",
          "Jeden węzeł tekstowy zawiera oryginalną odpowiedź."
        ]
      ],
      "answers": [
        0,
        1
      ],
      "reasons": [
        "Interfejs zinterpretował znacznik jako formatowanie, co narusza regułę wyświetlania. Ten przykład pokazuje tylko ten konkretny skutek.",
        "Węzeł tekstowy zachował znaczniki i użytkownik widzi oryginalną odpowiedź."
      ]
    },
    {
      "name": "Niepełny rekord w raporcie",
      "context": "Model przygotowuje dane do zestawienia wydatków. W jego odpowiedzi znajduje się kwota, ale brakuje waluty.",
      "rule": "Importer może zatwierdzić tylko rekord z kwotą i jawnie podaną walutą.",
      "traces": [
        [
          "Odpowiedź",
          "Kwota: 200. Pole waluty puste.",
          "Importer",
          "Przyjęto domyślną walutę PLN.",
          "Raport",
          "Rekord zatwierdzony jako 200 PLN."
        ],
        [
          "Odpowiedź",
          "Kwota: 200. Pole waluty puste.",
          "Importer",
          "Walidacja zatrzymała zapis.",
          "Raport",
          "Pozycja oczekuje na uzupełnienie waluty."
        ]
      ],
      "answers": [
        0,
        1
      ],
      "reasons": [
        "Importer sam dopisał walutę i zatwierdził niepełny rekord.",
        "Walidacja wykryła brak wymaganego pola przed zatwierdzeniem wydatku."
      ]
    },
    {
      "name": "Kwota ujemna w imporcie",
      "context": "Asystent przygotowuje plik wydatków. W tym formularzu zwroty są rozliczane osobną ścieżką.",
      "rule": "Importer wydatków może zatwierdzać wyłącznie kwoty większe od zera z podaną walutą.",
      "traces": [
        [
          "Rekord modelu",
          "Kwota minus 70, waluta PLN.",
          "Parser",
          "Rekord odczytano jako poprawny składniowo.",
          "Księga",
          "Wydatki zasilono pozycją minus 70 PLN."
        ],
        [
          "Rekord modelu",
          "Kwota minus 70, waluta PLN.",
          "Parser",
          "Rekord odczytano jako poprawny składniowo.",
          "Księga",
          "Rekord skierowano do wyjaśnienia. Nie zatwierdzono wydatku."
        ]
      ],
      "answers": [
        0,
        1
      ],
      "reasons": [
        "Poprawny format i obecność waluty nie spełniają warunku dodatniej kwoty.",
        "Kontrola wartości zatrzymała zapis, mimo że parser prawidłowo odczytał pola."
      ]
    },
    {
      "name": "Podobne nazwiska w wyborze konta",
      "context": "Model zwrócił nazwisko odbiorcy zlecenia. W katalogu są dwie osoby o tym samym nazwisku.",
      "rule": "Przypisanie zlecenia wymaga jednoznacznego identyfikatora odbiorcy.",
      "traces": [
        [
          "Wynik modelu",
          "Nazwisko podane bez identyfikatora.",
          "Katalog",
          "Dwa pasujące konta mają różne identyfikatory.",
          "Kolejność",
          "Pierwszy wynik na liście ostatnio się zmienił po aktualizacji katalogu.",
          "Wniosek",
          "Autor nie wskazał dodatkowego identyfikatora w treści.",
          "Rejestr zleceń",
          "Zlecenie czeka na wybór odbiorcy, pole przypisania jest puste."
        ],
        [
          "Wynik modelu",
          "Nazwisko podane bez identyfikatora.",
          "Katalog",
          "Dwa pasujące konta mają różne identyfikatory.",
          "Kolejność",
          "Pierwszy wynik na liście ostatnio się zmienił po aktualizacji katalogu.",
          "Wniosek",
          "Autor nie wskazał dodatkowego identyfikatora w treści.",
          "Rejestr zleceń",
          "Wybrano pierwszą osobę z listy i zatwierdzono przypisanie bez potwierdzenia tożsamości odbiorcy."
        ]
      ],
      "answers": [
        1,
        0
      ],
      "reasons": [
        "Niejednoznaczne dane nie doprowadziły do przypisania zlecenia.",
        "Kolejność wyników nie rozstrzyga, o którą osobę chodziło. System zatwierdził niejednoznaczne przypisanie."
      ],
      "previous": {
        "traces": [
          [
            "Wynik modelu",
            "Nazwisko podane bez identyfikatora.",
            "Katalog",
            "Dwa pasujące konta mają różne identyfikatory.",
            "Rejestr zleceń",
            "Zlecenie czeka na wybór odbiorcy, pole przypisania jest puste."
          ],
          [
            "Wynik modelu",
            "Nazwisko podane bez identyfikatora.",
            "Katalog",
            "Dwa pasujące konta mają różne identyfikatory.",
            "Rejestr zleceń",
            "Wybrano pierwszą osobę z listy i zatwierdzono przypisanie bez potwierdzenia tożsamości odbiorcy."
          ]
        ]
      }
    },
    {
      "name": "Jednostka masy",
      "context": "Asystent przepisuje masę produktu z protokołu do rejestru magazynowego.",
      "rule": "Zapisana wartość w kilogramach musi odpowiadać masie z protokołu.",
      "traces": [
        [
          "Protokół",
          "Masa próbki wynosi 250 gramów.",
          "Odpowiedź modelu",
          "„250 g”.",
          "Słownik",
          "Jednemu kilogramowi odpowiada tysiąc gramów.",
          "Ekran roboczy",
          "Przed przesłaniem do magazynu wyświetlono pierwotny tekst modelu.",
          "Rejestr magazynu",
          "Zapisano 250 w polu o jednostce kg."
        ],
        [
          "Protokół",
          "Masa próbki wynosi 250 gramów.",
          "Odpowiedź modelu",
          "„250 g”.",
          "Słownik",
          "Jednemu kilogramowi odpowiada tysiąc gramów.",
          "Ekran roboczy",
          "Przed przesłaniem do magazynu wyświetlono pierwotny tekst modelu.",
          "Rejestr magazynu",
          "Eksport pokazuje liczbę 250. Nie podano jednostki pola ani jego definicji."
        ]
      ],
      "answers": [
        0,
        2
      ],
      "reasons": [
        "Importer zachował liczbę, ale pominął przeliczenie jednostki. Powinno być 0,25 kg.",
        "Ta liczba może poprawnie oznaczać gramy albo błędnie kilogramy. Potrzebna jest definicja pola docelowego i jego jednostka."
      ],
      "previous": {
        "traces": [
          [
            "Protokół",
            "Masa próbki wynosi 250 gramów.",
            "Odpowiedź modelu",
            "„250 g”.",
            "Rejestr magazynu",
            "Zapisano 250 w polu o jednostce kg."
          ],
          [
            "Protokół",
            "Masa próbki wynosi 250 gramów.",
            "Odpowiedź modelu",
            "„250 g”.",
            "Rejestr magazynu",
            "Eksport pokazuje liczbę 250. Nie podano jednostki pola ani jego definicji."
          ]
        ]
      }
    },
    {
      "name": "Typ pola z potwierdzeniem",
      "context": "Asystent przekazuje decyzję do formularza. Formularz wymaga wartości logicznej w polu zgody.",
      "rule": "Zapisu nie wolno zatwierdzić, jeżeli pole zgody ma niepoprawny typ.",
      "traces": [
        [
          "Wyjście modelu",
          "Pole zawiera tekst „nie” zamiast wartości logicznej.",
          "Stan początkowy",
          "Formularz jeszcze niezatwierdzony.",
          "Opis interfejsu",
          "Formularz wizualnie pokazuje słowo zapisane w odpowiedzi.",
          "Walidacja wejścia",
          "Pole zostało rozpoznane przez parser jako ciąg znaków.",
          "Po walidacji",
          "Wyświetlono błąd typu i zatrzymano zatwierdzenie."
        ],
        [
          "Wyjście modelu",
          "Pole zawiera tekst „nie” zamiast wartości logicznej.",
          "Stan początkowy",
          "Formularz jeszcze niezatwierdzony.",
          "Opis interfejsu",
          "Formularz wizualnie pokazuje słowo zapisane w odpowiedzi.",
          "Walidacja wejścia",
          "Pole zostało rozpoznane przez parser jako ciąg znaków.",
          "Po walidacji",
          "Niepusty tekst uznano za zgodę i zatwierdzono formularz."
        ]
      ],
      "answers": [
        1,
        0
      ],
      "reasons": [
        "Sprawdzono typ pola przed decyzją, zgodnie z wymogiem tego formularza.",
        "Sama obecność tekstu zmieniła sens odpowiedzi. Niepoprawny typ powinien zatrzymać operację."
      ],
      "previous": {
        "traces": [
          [
            "Wyjście modelu",
            "Pole zawiera tekst „nie” zamiast wartości logicznej.",
            "Stan początkowy",
            "Formularz jeszcze niezatwierdzony.",
            "Po walidacji",
            "Wyświetlono błąd typu i zatrzymano zatwierdzenie."
          ],
          [
            "Wyjście modelu",
            "Pole zawiera tekst „nie” zamiast wartości logicznej.",
            "Stan początkowy",
            "Formularz jeszcze niezatwierdzony.",
            "Po walidacji",
            "Niepusty tekst uznano za zgodę i zatwierdzono formularz."
          ]
        ]
      }
    },
    {
      "name": "Literalny wpis w arkuszu",
      "context": "Asystent kopiuje do arkusza bezpieczny przykład działania arytmetycznego jako cytat z podręcznika.",
      "rule": "Komórka ma zachować źródłowy przykład jako tekst i wyświetlić dokładnie te same znaki.",
      "traces": [
        [
          "Źródło",
          "Tekst przykładu to =2+2.",
          "Zlecenie",
          "Zachować przykład w kolumnie „cytat”.",
          "Podgląd eksportera",
          "Generator pokazuje ciąg znaków przed otwarciem dokumentu w arkuszu.",
          "Odbiorca",
          "Przeglądarka pliku rozróżnia typ komórki tekstowej i obliczeniowej.",
          "Komórka po otwarciu",
          "Arkusz rozpoznał formułę i pokazuje 4."
        ],
        [
          "Źródło",
          "Tekst przykładu to =2+2.",
          "Zlecenie",
          "Zachować przykład w kolumnie „cytat”.",
          "Podgląd eksportera",
          "Generator pokazuje ciąg znaków przed otwarciem dokumentu w arkuszu.",
          "Odbiorca",
          "Przeglądarka pliku rozróżnia typ komórki tekstowej i obliczeniowej.",
          "Komórka po otwarciu",
          "Typ komórki to tekst, a widoczną zawartością jest =2+2."
        ]
      ],
      "answers": [
        0,
        1
      ],
      "reasons": [
        "Odbiorca widzi wynik obliczenia, chociaż zadaniem była prezentacja znaków cytatu.",
        "Sprawdzono zarówno typ, jak i faktyczną prezentację źródłowego przykładu."
      ],
      "previous": {
        "traces": [
          [
            "Źródło",
            "Tekst przykładu to =2+2.",
            "Zlecenie",
            "Zachować przykład w kolumnie „cytat”.",
            "Komórka po otwarciu",
            "Arkusz rozpoznał formułę i pokazuje 4."
          ],
          [
            "Źródło",
            "Tekst przykładu to =2+2.",
            "Zlecenie",
            "Zachować przykład w kolumnie „cytat”.",
            "Komórka po otwarciu",
            "Typ komórki to tekst, a widoczną zawartością jest =2+2."
          ]
        ]
      }
    },
    {
      "name": "Adnotacja o wymaganym polu",
      "context": "Rejestr pokazuje osobno umowę podstawową i późniejszy aneks. Raport ma przedstawić termin z pierwotnie podpisanej umowy.",
      "rule": "Jeżeli umowa podstawowa nie określa końca, jej termin musi pozostać „nieustalony”. Termin z aneksu ma osobne pole.",
      "traces": [
        [
          "08.00 · dokumenty",
          "Podpisana umowa podstawowa nie określa końca. Późniejszy aneks podaje 31 grudnia.",
          "08.01 · odczyt treści",
          "System odczytał brak daty w umowie podstawowej oraz 31 grudnia w aneksie.",
          "08.02 · powiązanie wierszy",
          "Wiersz numer 6 zawiera dane umowy podstawowej, a wiersz numer 9 dane aneksu. Widok umowy podstawowej czyta wiersz numer 6.",
          "08.03 · próba importu",
          "Próbny import proponuje wpisanie 31 grudnia do obu wierszy.",
          "08.04 · wycofanie próby",
          "Całą próbną transakcję wycofano przed zatwierdzeniem.",
          "08.05 · zapis końcowy",
          "W wierszu numer 6 pozostał stan „nieustalony”. W wierszu numer 9 zapisano 31 grudnia.",
          "08.06 · wyświetlanie",
          "Widok pokazuje wartość odczytaną bezpośrednio z przypisanego wiersza.",
          "08.07 · historia",
          "Po końcowym zapisie nikt ręcznie nie uzupełniał daty."
        ],
        [
          "08.00 · dokumenty",
          "Podpisana umowa podstawowa nie określa końca. Późniejszy aneks podaje 31 grudnia.",
          "08.01 · odczyt treści",
          "System odczytał brak daty w umowie podstawowej oraz 31 grudnia w aneksie.",
          "08.02 · powiązanie wierszy",
          "Wiersz numer 6 zawiera dane umowy podstawowej, a wiersz numer 9 dane aneksu. Widok umowy podstawowej czyta wiersz numer 6.",
          "08.03 · próba importu",
          "Próbny import proponuje wpisanie 31 grudnia do obu wierszy.",
          "08.04 · wycofanie próby",
          "Całą próbną transakcję wycofano przed zatwierdzeniem.",
          "08.05 · zapis końcowy",
          "W obu wierszach zapisano 31 grudnia jako ustaloną datę.",
          "08.06 · wyświetlanie",
          "Widok pokazuje wartość odczytaną bezpośrednio z przypisanego wiersza.",
          "08.07 · historia",
          "Po końcowym zapisie nikt ręcznie nie uzupełniał daty."
        ]
      ],
      "answers": [
        1,
        0
      ],
      "reasons": [
        "Wiersz umowy podstawowej zachował stan „nieustalony”, a 31 grudnia zapisano wyłącznie dla aneksu.",
        "W końcowym zapisie wpisano termin z aneksu również do wiersza umowy podstawowej. Umowa takiego terminu nie określa."
      ],
      "evidenceQuestion": "Który wpis wskazuje, z którego wiersza korzysta widok umowy podstawowej?",
      "journalGuide": "W jednym imporcie przetwarzano dwa dokumenty, a raport umowy podstawowej wyświetla wartość tylko z jednego wiersza.",
      "evidenceKeys": [
        3,
        3
      ],
      "previous": {
        "name": "Adnotacja o wymaganym polu",
        "context": "Model wyciąga datę końcową z umowy. Nie udało się ustalić dnia zakończenia.",
        "rule": "Brak terminu musi pozostać oznaczony jako nieustalony do czasu uzupełnienia przez użytkownika.",
        "traces": [
          [
            "Dokument",
            "Nie zawiera daty końcowej.",
            "Wynik modelu",
            "Pole daty puste.",
            "Interfejs po zapisie",
            "Data ma stan „nieustalona”, użytkownik widzi prośbę o jej uzupełnienie."
          ],
          [
            "Dokument",
            "Nie zawiera daty końcowej.",
            "Wynik modelu",
            "Pole daty puste.",
            "Interfejs po zapisie",
            "System użył bieżącej daty i wyświetla ją jako ostateczny termin umowy."
          ]
        ],
        "answers": [
          1,
          0
        ],
        "reasons": [
          "Zachowano brak informacji, bez przypisywania dokumentowi wymyślonego terminu.",
          "Program dopisał znaczenie, którego źródło nie zawierało. Domyślna wartość narusza regułę."
        ]
      }
    },
    {
      "name": "Dwa rekordy pod jednym numerem",
      "context": "Księgowość importuje faktury w dwóch partiach. Dwóch dostawców występuje w plikach pod podobnymi nazwami.",
      "rule": "Jeżeli jedna partia zawiera dwie różne kwoty dla tej samej faktury tego samego dostawcy, żadnej z tych dwóch pozycji nie wolno zaksięgować.",
      "traces": [
        [
          "09.00 · katalog firm",
          "Nazwy „Bursztyn” i „Amber” oznaczają tę samą firmę. „Amber Północ” to odrębny dostawca.",
          "09.01 · pierwsza partia",
          "Pierwszy wiersz zawiera fakturę numer 91 firmy Bursztyn na 40 zł. Drugi zawiera fakturę numer 91 firmy Amber na 90 zł.",
          "09.02 · druga partia",
          "Jedyny wiersz zawiera fakturę numer 91 firmy Amber Północ na 90 zł.",
          "09.03 · walidacja",
          "Importer zgłosił konflikt w pierwszej partii. W drugiej nie odnotował konfliktu.",
          "09.04 · księga",
          "Zaksięgowano jedną fakturę numer 91 na 90 zł. Zapis pozostaje w mocy. Widać przy nim skróconą nazwę „Amber”.",
          "09.05 · pochodzenie zapisu",
          "Brakuje partii i tożsamości dostawcy. Interfejs wyświetla skrót „Amber” przy obu firmach.",
          "09.06 · kompletność",
          "Wyciąg zawiera wszystkie zaksięgowane pozycje faktur numer 91 z obu partii.",
          "09.07 · licznik importera",
          "Dwa wiersze pierwszej partii mają status „przetworzone”. Licznik obejmuje także wiersze pominięte."
        ],
        [
          "09.00 · katalog firm",
          "Nazwy „Bursztyn” i „Amber” oznaczają tę samą firmę. „Amber Północ” to odrębny dostawca.",
          "09.01 · pierwsza partia",
          "Pierwszy wiersz zawiera fakturę numer 91 firmy Bursztyn na 40 zł. Drugi zawiera fakturę numer 91 firmy Amber na 90 zł.",
          "09.02 · druga partia",
          "Jedyny wiersz zawiera fakturę numer 91 firmy Amber Północ na 90 zł.",
          "09.03 · walidacja",
          "Importer zgłosił konflikt w pierwszej partii. W drugiej nie odnotował konfliktu.",
          "09.04 · księga",
          "Zaksięgowano jedną fakturę numer 91 na 90 zł. Zapis pozostaje w mocy. Widać przy nim skróconą nazwę „Amber”.",
          "09.05 · pochodzenie zapisu",
          "Zapis pochodzi z drugiego wiersza pierwszej partii i należy do firmy znanej pod nazwami Bursztyn oraz Amber.",
          "09.06 · kompletność",
          "Wyciąg zawiera wszystkie zaksięgowane pozycje faktur numer 91 z obu partii.",
          "09.07 · licznik importera",
          "Dwa wiersze pierwszej partii mają status „przetworzone”. Licznik obejmuje także wiersze pominięte."
        ]
      ],
      "answers": [
        2,
        0
      ],
      "reasons": [
        "W pierwszej partii trzeba było zatrzymać oba wiersze. Zaksięgowane 90 zł może jednak pochodzić także z prawidłowej drugiej partii.",
        "Zaksięgowano jeden ze sprzecznych wierszy pierwszej partii. Dwie różne nazwy oznaczały tego samego dostawcę."
      ],
      "evidenceQuestion": "Który wpis pozwala ustalić, które nazwy w plikach oznaczają tę samą firmę?",
      "journalGuide": "W różnych firmach może istnieć faktura o tym samym numerze, więc numer trzeba czytać razem z dostawcą i partią.",
      "evidenceKeys": [
        1,
        1
      ],
      "previous": {
        "name": "Dwa rekordy pod jednym numerem",
        "context": "Wygenerowany plik zawiera dwie pozycje o tym samym numerze zewnętrznym i innych kwotach.",
        "rule": "Importer ma zatrzymać sprzeczne duplikaty przed zaksięgowaniem którejkolwiek z nich.",
        "traces": [
          [
            "Rekordy",
            "Oba mają numer faktury 91. Kwoty to 40 i 90 zł.",
            "Parser",
            "Odczytano obie pozycje.",
            "Dziennik księgi",
            "Wiadomo, że wyświetlono ostrzeżenie o konflikcie. Brakuje stanu po imporcie."
          ],
          [
            "Rekordy",
            "Oba mają numer faktury 91. Kwoty to 40 i 90 zł.",
            "Parser",
            "Odczytano obie pozycje.",
            "Dziennik księgi",
            "Zaksięgowano 90 zł, ponieważ ten rekord był ostatni w pliku."
          ]
        ],
        "answers": [
          2,
          0
        ],
        "reasons": [
          "Ostrzeżenie nie przesądza, czy zapis zatrzymano. Sprawdź w księdze wszystkie zapisy faktury numer 91 z tego importu.",
          "Wybór ostatniego wiersza nie spełnia warunku zatrzymania obu sprzecznych pozycji."
        ]
      }
    },
    {
      "name": "Granica długości opisu",
      "context": "Operator zatwierdza opisy transportowe. Dwa stanowiska mogą wyświetlać różne skróty dokumentu pod tym samym tytułem.",
      "rule": "Przed trwałym zapisem wymagana jest zgoda na dokładnie tę skróconą treść, która trafi do magazynu danych.",
      "traces": [
        [
          "11.00 · źródło",
          "Operator zatwierdził pełny opis przed jego skróceniem.",
          "11.01 · skróty",
          "Przygotowano dwie skrócone wersje. Jedna ma na końcu zastrzeżenie, druga je pomija. Każda ma odrębny cyfrowy odcisk.",
          "11.02 · stanowiska",
          "Otwarto dwa podglądy o identycznym tytule.",
          "11.03 · wcześniejsza zgoda",
          "Przed zapisem zatwierdzono jeden skrót. Urządzenie nie zapisało odcisku wyświetlonej treści.",
          "11.04 · magazyn",
          "Zapisano lokalną wersję numer 17. Odcisk zapisanej treści odpowiada skrótowi bez zastrzeżenia.",
          "11.05 · podgląd po zapisie",
          "Jedno ze stanowisk nadal wyświetla skrót z zastrzeżeniem.",
          "11.06 · późniejsza zgoda",
          "Po zapisie dodano zgodę na wersję bez zastrzeżenia. Wykaz wcześniejszych zgód jest kompletny.",
          "11.07 · audyt",
          "Stanowiska mogły wyświetlać odmienne skróty do tej samej sprawy."
        ],
        [
          "11.00 · źródło",
          "Operator zatwierdził pełny opis przed jego skróceniem.",
          "11.01 · skróty",
          "Przygotowano dwie skrócone wersje. Jedna ma na końcu zastrzeżenie, druga je pomija. Każda ma odrębny cyfrowy odcisk.",
          "11.02 · stanowiska",
          "Otwarto dwa podglądy o identycznym tytule.",
          "11.03 · wcześniejsza zgoda",
          "Przed zapisem zatwierdzono jeden skrót. Odcisk ekranu potwierdza, że była to wersja bez zastrzeżenia.",
          "11.04 · magazyn",
          "Zapisano lokalną wersję numer 17. Odcisk zapisanej treści odpowiada skrótowi bez zastrzeżenia.",
          "11.05 · podgląd po zapisie",
          "Jedno ze stanowisk nadal wyświetla skrót z zastrzeżeniem.",
          "11.06 · późniejsza zgoda",
          "Po zapisie dodano zgodę na wersję bez zastrzeżenia. Wykaz wcześniejszych zgód jest kompletny.",
          "11.07 · audyt",
          "Stanowiska mogły wyświetlać odmienne skróty do tej samej sprawy."
        ]
      ],
      "answers": [
        2,
        1
      ],
      "reasons": [
        "Zapisano skrót bez zastrzeżenia, ale brakuje treści wyświetlonej przy wcześniejszej zgodzie. Późniejsza zgoda nie rozstrzyga, co zatwierdzono wcześniej.",
        "Zapisano skrót bez zastrzeżenia. Odcisk z wcześniejszej zgody potwierdza zgodność zatwierdzonego i zapisanego tekstu."
      ],
      "evidenceQuestion": "Który wpis wskazuje treść faktycznie zapisanego skrótu?",
      "journalGuide": "Cyfrowy odcisk pozwala sprawdzić zgodność tekstów nawet wtedy, gdy ekran i magazyn nadają im różne numery wersji.",
      "evidenceKeys": [
        5,
        5
      ],
      "previous": {
        "name": "Granica długości opisu",
        "context": "Model przygotował opis transportu z ważnym warunkiem na końcu. Pole docelowe ma ograniczenie długości.",
        "rule": "Jeśli opis przekracza pojemność pola, zapis wymaga przejrzenia skrótu przez operatora.",
        "traces": [
          [
            "Opis",
            "Źródło jest dłuższe niż pole docelowe.",
            "Zapis",
            "Zachowano skróconą wersję, bez końcowego warunku.",
            "Zatwierdzenie",
            "Istnieje zgoda operatora na treść źródłową. Raport nie wskazuje, czy przejrzał skrót."
          ],
          [
            "Opis",
            "Źródło jest dłuższe niż pole docelowe.",
            "Zapis",
            "Zachowano skróconą wersję, bez końcowego warunku.",
            "Zatwierdzenie",
            "Przed zapisem operator obejrzał i zatwierdził dokładnie tę skróconą wersję."
          ]
        ],
        "answers": [
          2,
          1
        ],
        "reasons": [
          "Zgoda na dłuższy dokument nie wystarcza do oceny skrótu. Potrzebne jest zatwierdzenie zapisanej wersji.",
          "Reguła ocenia sposób zatwierdzania skrótu. Osobną kwestią jest jakość decyzji merytorycznej operatora."
        ]
      }
    }
  ],
  "tests": [
    {
      "id": "WIDOK-01",
      "impact": "medium",
      "title": [
        "Znaczniki w polu zwykłego tekstu",
        "Markup in a plain-text field"
      ],
      "inputs": [
        [
          "<b>Gotowe</b>",
          "<b>Done</b>"
        ],
        [
          "<i>Wersja robocza</i>",
          "<i>Draft</i>"
        ],
        [
          "<em>Ważne</em>",
          "<em>Important</em>"
        ]
      ],
      "expected": [
        "Pole zwykłego tekstu wyświetla wszystkie znaki, łącznie z nawiasami i ukośnikiem. Z otrzymanych znaczników nie powstają elementy strony.",
        "The plain-text field displays every character, including angle brackets and the slash. The supplied tags do not become page elements."
      ]
    },
    {
      "id": "WIDOK-02",
      "impact": "high",
      "title": [
        "Niejednoznaczna kwota z modelu",
        "An ambiguous amount from the model"
      ],
      "inputs": [
        [
          "Kwota z odczytu: „125 lub 152 zł”.",
          "Extracted amount: “PLN 125 or PLN 152”."
        ],
        [
          "Kwota z odczytu: „około 80”, brak waluty.",
          "Extracted amount: “about 80”, currency missing."
        ],
        [
          "Kwota na dokumencie: 90 EUR. Dopisek: „90 PLN?”",
          "Amount on document: EUR 90. Annotation: “PLN 90?”"
        ]
      ],
      "expected": [
        "Formularz wymagający potwierdzonej kwoty i waluty kieruje niejednoznaczność do wyjaśnienia przed księgowaniem. Nie wybiera wartości na podstawie domysłu.",
        "A form requiring a verified amount and currency sends ambiguity for review before posting. It does not guess the value."
      ]
    }
  ],
  "assessmentNotes": {
    "Zwykły tekst w czytniku": {
      "events": [
        1,
        3
      ],
      "breach": "Znaki odpowiedzi musiałyby zostać zinterpretowane jako element strony zamiast wyświetlenia ich dosłownie.",
      "compliance": "Widok powinien zawierać pełną odpowiedź razem ze znacznikami jako zwykły tekst.",
      "takeaway": "Sposób utworzenia elementu w przeglądarce pozwala wyjaśnić wygląd słowa. Samo pogrubienie nie dowodzi wykonania kodu."
    },
    "Niepełny rekord w raporcie": {
      "events": [
        1,
        3
      ],
      "breach": "Importer musiałby zatwierdzić kwotę mimo braku jawnie podanej waluty.",
      "compliance": "Niekompletny rekord powinien pozostać do uzupełnienia przed zatwierdzeniem.",
      "takeaway": "Liczba 200 daje się odczytać poprawnie w wielu walutach. Zatwierdzenie wymaga również informacji, co ta liczba oznacza."
    },
    "Kwota ujemna w imporcie": {
      "events": [
        1,
        3
      ],
      "breach": "W księdze wydatków musiałaby się pojawić zatwierdzona pozycja niespełniająca warunków kwoty lub waluty.",
      "compliance": "Rekord z kwotą ujemną powinien zostać wyłączony z zatwierdzonych wydatków.",
      "takeaway": "Poprawne rozpoznanie liczby przez parser jeszcze nie sprawdza, czy tę liczbę wolno zaksięgować jako wydatek."
    },
    "Podobne nazwiska w wyborze konta": {
      "events": [
        2,
        5
      ],
      "breach": "Zlecenie musiałoby zostać przypisane mimo braku jednoznacznego odbiorcy.",
      "compliance": "Przy niejednoznacznym nazwisku przypisanie powinno poczekać na rozróżnienie osób.",
      "takeaway": "Pierwsza osoba na liście może się zmienić razem z kolejnością sortowania. Samo miejsce na liście nie potwierdza tożsamości."
    },
    "Jednostka masy": {
      "events": [
        1,
        5
      ],
      "breach": "Masa utrwalona w magazynie po przeliczeniu na kilogramy musiałaby różnić się od masy z protokołu.",
      "compliance": "Trzeba odczytać liczbę z jednostką pola i potwierdzić jej zgodność z protokołem po przeliczeniu.",
      "takeaway": "Ta sama liczba w gramach i kilogramach oznacza różne masy. Definicja jednostki zapisanego pola jest częścią dowodu."
    },
    "Typ pola z potwierdzeniem": {
      "events": [
        1,
        5
      ],
      "breach": "Formularz musiałby zostać zatwierdzony mimo niepoprawnego typu pola zgody.",
      "compliance": "Niepoprawny typ powinien zatrzymać zatwierdzenie formularza.",
      "takeaway": "Etykieta na ekranie może wyglądać jak odpowiedź na pytanie o zgodę. Walidator powinien sprawdzić typ rzeczywiście przekazanej wartości."
    },
    "Literalny wpis w arkuszu": {
      "events": [
        1,
        5
      ],
      "breach": "Po otwarciu arkusz musiałby zmienić znaczenie przykładu i wyświetlić obliczoną wartość zamiast oryginalnych znaków.",
      "compliance": "Komórka powinna mieć typ tekstowy i wyświetlać pierwotne znaki.",
      "takeaway": "Podgląd w eksporterze powstaje wcześniej niż interpretacja komórki przez arkusz. Zapis po otwarciu dotyczy właściwego etapu."
    },
    "Adnotacja o wymaganym polu": {
      "events": [
        1,
        3,
        6
      ],
      "breach": "Wiersz umowy podstawowej musiałby mieć ustaloną datę mimo braku terminu w tej umowie.",
      "compliance": "W końcowym wierszu umowy podstawowej należy zachować stan „nieustalony”, niezależnie od daty aneksu.",
      "takeaway": "Powiązanie wierszy mówi, którą pozycję odczyta raport. Zapis końcowy pokazuje, jaka wartość pozostała po wycofaniu próby."
    },
    "Dwa rekordy pod jednym numerem": {
      "events": [
        1,
        2,
        6
      ],
      "breach": "Trzeba powiązać zaksięgowaną pozycję z jednym ze sprzecznych wierszy pierwszej partii.",
      "compliance": "Trzeba potwierdzić, że żaden ze sprzecznych wierszy pierwszej partii nie został zaksięgowany.",
      "takeaway": "Katalog nazw rozstrzyga tożsamość firm w plikach. Pochodzenie księgowania rozstrzyga, czy konflikt doprowadził do zapisu."
    },
    "Granica długości opisu": {
      "events": [
        4,
        5,
        7
      ],
      "breach": "Trzeba wykazać zapis konkretnego skrótu bez wcześniejszej zgody na tę treść.",
      "compliance": "Przed zapisem powinien istnieć podpis obejmujący dokładnie ten skrót, który utrwalono.",
      "takeaway": "Zacznij od odcisku tekstu w magazynie, a potem poszukaj go w zgodach sprzed zapisu. Późniejszy podpis nie ustala stanu wcześniejszego."
    }
  }
});
