// Materiał, ćwiczenia i karty testowe tej lekcji.
library.push({
  "id": "LLM-02",
  "title": "Instruction Override",
  "topic": "prompt",
  "polishTitle": "Nadpisanie instrukcji asystenta",
  "signal": "Porównaj rolę z sesji z operacją zapisaną w historii zmian.",
  "short": "Zmiana roli w rozmowie a rzeczywiste uprawnienia.",
  "name": "Zmiana roli asystenta",
  "mechanism": [
    "W tej lekcji określenie Instruction Override oznacza sytuację, w której wiadomość w rozmowie przesłania wcześniej ustaloną instrukcję. W klasyfikacji OWASP wiąże się to z szerszym zagadnieniem Prompt Injection. Przykładowo użytkownik opisuje siebie jako redaktora, chociaż w systemie ma uprawnienia autora. Jeśli aplikacja potraktuje opis roli jako podstawę decyzji, szkic może stać się opublikowaną procedurą.",
    "Zwróć uwagę na trzy elementy: kto jest zalogowany, jakie działanie jest zastrzeżone i kto je zatwierdził. Model może swobodnie zmienić styl wypowiedzi na prośbę autora. Prawo do publikacji wynika z ustawień konta i procesu akceptacji."
  ],
  "scenes": [
    {
      "name": "Publikacja procedury HR",
      "context": "Bot HR pomaga pracownikom znaleźć formularze. Tylko redaktor może publikować zmiany w firmowych procedurach.",
      "rule": "Publikacja wymaga aktywnej roli redaktora w chwili zapisu. Pracownik może przygotować szkic. Opis roli w rozmowie nie daje prawa do publikacji.",
      "traces": [
        [
          "Sesja",
          "Zalogowana rola: pracownik.",
          "Asystent",
          "Przyjmuję rolę redaktora i publikuję wersję roboczą.",
          "Historia dokumentu",
          "Publikacja zakończona z tej sesji pracownika. W chwili zapisu konto nadal miało tylko rolę pracownika. Nowa wersja jest dostępna dla całej firmy."
        ],
        [
          "Sesja",
          "Zalogowana rola: pracownik.",
          "Asystent",
          "Mogę pomóc przygotować wersję roboczą.",
          "Historia dokumentu",
          "Odmowa publikacji dla tej roli. Dostępna jest poprzednia wersja."
        ]
      ],
      "answers": [
        0,
        1
      ],
      "reasons": [
        "Rejestr łączy publikację z kontem pracownika bez roli redaktora. Potwierdza to błąd kontroli uprawnień przy publikacji. Do ustalenia, dlaczego serwer ją dopuścił, potrzeba śladu decyzji o dostępie.",
        "Historia dokumentu pokazuje, że serwer sprawdził rolę i zatrzymał publikację."
      ]
    },
    {
      "name": "Zatwierdzenie wydatku",
      "context": "Asystent finansowy pomaga sporządzić rozliczenie. Osoba składająca wniosek przedstawia się w rozmowie jako kierownik.",
      "rule": "Wniosek zatwierdza odrębna osoba z rolą przełożonego.",
      "traces": [
        [
          "Sesja",
          "Autor wniosku, rola pracownika.",
          "Wniosek",
          "Zatwierdzony do wypłaty.",
          "Podpis decyzji",
          "To samo konto, które złożyło wniosek."
        ],
        [
          "Sesja",
          "Autor wniosku, rola pracownika.",
          "Wniosek",
          "Przekazany do oceny.",
          "Podpis decyzji",
          "Brak podpisu. Wyznaczono przełożonego."
        ]
      ],
      "answers": [
        0,
        1
      ],
      "reasons": [
        "Ta sama osoba złożyła i zatwierdziła wniosek. Deklaracja w rozmowie nie daje prawa do jego zatwierdzenia.",
        "Wniosek oczekuje na decyzję odrębnego przełożonego."
      ]
    },
    {
      "name": "Zastępstwo kierownika",
      "context": "Pracownik przedstawia się w czacie jako zastępca przełożonej. Asystent obsługuje decyzje urlopowe.",
      "rule": "Zastępca może zatwierdzić urlop tylko w okresie formalnego zastępstwa.",
      "traces": [
        [
          "Rejestr zastępstw",
          "Upoważnienie obowiązuje od 8 do 12 maja włącznie.",
          "Decyzja",
          "Wniosek podwładnego zatwierdzono z konta zastępcy.",
          "Czas decyzji",
          "Zapisano decyzję 10 maja."
        ],
        [
          "Rejestr zastępstw",
          "Upoważnienie obowiązuje od 8 do 12 maja włącznie.",
          "Decyzja",
          "Wniosek podwładnego zatwierdzono z konta zastępcy.",
          "Czas decyzji",
          "Zapisano decyzję 14 maja."
        ]
      ],
      "answers": [
        1,
        0
      ],
      "reasons": [
        "Decyzja mieści się w okresie upoważnienia. Podstawą zatwierdzenia jest formalny wpis.",
        "Formalne zastępstwo już wygasło. Przedstawienie się jako zastępca nie przedłuża upoważnienia."
      ]
    },
    {
      "name": "Korekta po odebraniu roli",
      "context": "Była redaktorka kontynuuje otwartą wcześniej rozmowę o publikacji artykułu.",
      "rule": "W chwili publikacji użytkownik musi mieć aktywną rolę redaktora.",
      "traces": [
        [
          "Początek rozmowy",
          "O 09.00 użytkowniczka miała rolę redaktora.",
          "Uprawnienia",
          "O 09.15 rolę odebrano. Później jej nie przywracano.",
          "Szkic",
          "Projekt publikacji zapisano o 09.10.",
          "Otwarta karta",
          "Ekran otwarty przed zmianą roli nadal wyświetla nazwę „redaktor”.",
          "Historia artykułu",
          "O 09.20 opublikowano artykuł w imieniu tej użytkowniczki."
        ],
        [
          "Początek rozmowy",
          "O 09.00 użytkowniczka miała rolę redaktora.",
          "Uprawnienia",
          "O 09.15 rolę odebrano. Później jej nie przywracano.",
          "Szkic",
          "Projekt publikacji zapisano o 09.10.",
          "Otwarta karta",
          "Ekran otwarty przed zmianą roli nadal wyświetla nazwę „redaktor”.",
          "Historia artykułu",
          "O 09.20 odmówiono publikacji. Artykuł pozostaje w szkicach."
        ]
      ],
      "answers": [
        0,
        1
      ],
      "reasons": [
        "Uprawnienie wygasło przed publikacją, choć było ważne na początku rozmowy.",
        "Przy ostatecznej decyzji zastosowano aktualny stan uprawnień."
      ],
      "previous": {
        "traces": [
          [
            "Początek rozmowy",
            "O 09.00 użytkowniczka miała rolę redaktora.",
            "Uprawnienia",
            "O 09.15 rolę odebrano. Później jej nie przywracano.",
            "Historia artykułu",
            "O 09.20 opublikowano artykuł w imieniu tej użytkowniczki."
          ],
          [
            "Początek rozmowy",
            "O 09.00 użytkowniczka miała rolę redaktora.",
            "Uprawnienia",
            "O 09.15 rolę odebrano. Później jej nie przywracano.",
            "Historia artykułu",
            "O 09.20 odmówiono publikacji. Artykuł pozostaje w szkicach."
          ]
        ]
      }
    },
    {
      "name": "Dwie funkcje jednej osoby",
      "context": "Kierownik zamawia sprzęt dla siebie i w rozmowie przechodzi z roli wnioskodawcy do roli akceptującego.",
      "rule": "Wniosek musi zatwierdzić inna osoba niż jego autor, także gdy autor jest kierownikiem.",
      "traces": [
        [
          "Wniosek",
          "Autorka ma identyfikator osoby 87.",
          "Decyzja",
          "Zatwierdziło konto z rolą kierowniczą.",
          "Konta",
          "Konto do zakupów i konto kierownicze mogą należeć do jednej osoby.",
          "Rejestr uprawnień",
          "Oba konta są aktywne. Jest to sprawdzenie roli, nie rozdzielności osób.",
          "Tożsamość zatwierdzającego",
          "Raport pokazuje tylko nazwę roli. Brakuje identyfikatora osoby."
        ],
        [
          "Wniosek",
          "Autorka ma identyfikator osoby 87.",
          "Decyzja",
          "Zatwierdziło konto z rolą kierowniczą.",
          "Konta",
          "Konto do zakupów i konto kierownicze mogą należeć do jednej osoby.",
          "Rejestr uprawnień",
          "Oba konta są aktywne. Jest to sprawdzenie roli, nie rozdzielności osób.",
          "Tożsamość zatwierdzającego",
          "Konto zatwierdzające należy do osoby 87."
        ]
      ],
      "answers": [
        2,
        0
      ],
      "reasons": [
        "Nazwa roli nie pozwala porównać osób. Potrzebne jest powiązanie zatwierdzającego z tożsamością.",
        "Zmiana roli w interfejsie nie tworzy drugiej osoby. Autor zatwierdził swój wniosek."
      ],
      "previous": {
        "traces": [
          [
            "Wniosek",
            "Autorka ma identyfikator osoby 87.",
            "Decyzja",
            "Zatwierdziło konto z rolą kierowniczą.",
            "Tożsamość zatwierdzającego",
            "Raport pokazuje tylko nazwę roli. Brakuje identyfikatora osoby."
          ],
          [
            "Wniosek",
            "Autorka ma identyfikator osoby 87.",
            "Decyzja",
            "Zatwierdziło konto z rolą kierowniczą.",
            "Tożsamość zatwierdzającego",
            "Konto zatwierdzające należy do osoby 87."
          ]
        ]
      }
    },
    {
      "name": "Redaktor jednego działu",
      "context": "Redaktor działu kultury prosi asystenta, by obsłużył go jako redaktora całego portalu.",
      "rule": "Redaktor może publikować wyłącznie w przydzielonej sekcji.",
      "traces": [
        [
          "Sesja",
          "Aktualny przydział obejmuje tylko dział kultury.",
          "Zadanie",
          "Przygotowanie komunikatu dla działu sportu.",
          "Metryka projektu",
          "Komunikat figuruje w katalogu wspólnych materiałów.",
          "Zakres edycji",
          "Autor może przekazywać propozycje między działami. Sama propozycja nie jest publikacją.",
          "Publikacje",
          "Utworzono propozycję dla redaktora sportowego. W dziale sportu nie ma nowej publikacji."
        ],
        [
          "Sesja",
          "Aktualny przydział obejmuje tylko dział kultury.",
          "Zadanie",
          "Przygotowanie komunikatu dla działu sportu.",
          "Metryka projektu",
          "Komunikat figuruje w katalogu wspólnych materiałów.",
          "Zakres edycji",
          "Autor może przekazywać propozycje między działami. Sama propozycja nie jest publikacją.",
          "Publikacje",
          "Komunikat opublikowano w dziale sportu na podstawie roli redaktora działu kultury."
        ]
      ],
      "answers": [
        1,
        0
      ],
      "reasons": [
        "Przekazanie propozycji pozostawia decyzję redaktorowi właściwej sekcji.",
        "Rola jest ograniczona do sekcji. Uprawnienie do działu kultury nie obejmuje publikacji w dziale sportu."
      ],
      "previous": {
        "traces": [
          [
            "Sesja",
            "Aktualny przydział obejmuje tylko dział kultury.",
            "Zadanie",
            "Przygotowanie komunikatu dla działu sportu.",
            "Publikacje",
            "Utworzono propozycję dla redaktora sportowego. W dziale sportu nie ma nowej publikacji."
          ],
          [
            "Sesja",
            "Aktualny przydział obejmuje tylko dział kultury.",
            "Zadanie",
            "Przygotowanie komunikatu dla działu sportu.",
            "Publikacje",
            "Komunikat opublikowano w dziale sportu na podstawie roli redaktora działu kultury."
          ]
        ]
      }
    },
    {
      "name": "Opinia w imieniu audytora",
      "context": "Użytkownik prosi asystenta o przyjęcie perspektywy audytora podczas redagowania uwag.",
      "rule": "Wygenerowany komentarz można podpisać jako audyt tylko po zatwierdzeniu przez uprawnionego audytora.",
      "traces": [
        [
          "Sesja",
          "Autor jest analitykiem. Może tworzyć materiały robocze.",
          "Obieg dokumentu",
          "Brak akceptacji audytora dla tej wersji.",
          "Podpis historyczny",
          "Wersja sprzed ostatniej zmiany miała akceptację audytora.",
          "Podgląd",
          "W roboczym nagłówku wpisano „opinia audytowa”.",
          "Nagłówek w archiwum",
          "Zarchiwizowano jako podpisany audyt wewnętrzny."
        ],
        [
          "Sesja",
          "Autor jest analitykiem. Może tworzyć materiały robocze.",
          "Obieg dokumentu",
          "Brak akceptacji audytora dla tej wersji.",
          "Podpis historyczny",
          "Wersja sprzed ostatniej zmiany miała akceptację audytora.",
          "Podgląd",
          "W roboczym nagłówku wpisano „opinia audytowa”.",
          "Nagłówek w archiwum",
          "Zarchiwizowano jako robocze uwagi analityka do przeglądu."
        ]
      ],
      "answers": [
        0,
        1
      ],
      "reasons": [
        "Nagłówek przypisuje dokumentowi status wymagający akceptacji, której nie ma w obiegu.",
        "Analiza może korzystać z perspektywy audytora, jeśli dokument zachowuje rzeczywisty status i autorstwo."
      ],
      "previous": {
        "traces": [
          [
            "Sesja",
            "Autor jest analitykiem. Może tworzyć materiały robocze.",
            "Obieg dokumentu",
            "Brak akceptacji audytora dla tej wersji.",
            "Nagłówek w archiwum",
            "Zarchiwizowano jako podpisany audyt wewnętrzny."
          ],
          [
            "Sesja",
            "Autor jest analitykiem. Może tworzyć materiały robocze.",
            "Obieg dokumentu",
            "Brak akceptacji audytora dla tej wersji.",
            "Nagłówek w archiwum",
            "Zarchiwizowano jako robocze uwagi analityka do przeglądu."
          ]
        ]
      }
    },
    {
      "name": "Przejęcie dyżuru",
      "context": "Marta pisze, że przejęła dyżur. Grafik i dziennik zamknięcia alarmów pokazują godziny w różnych strefach czasowych.",
      "rule": "Alarm może zamknąć tylko aktualny dyżurny danego obszaru. Z początkiem nowego dyżuru kończy się poprzedni.",
      "traces": [
        [
          "17.40 · alarmy",
          "Badany alarm dotyczy północy. Równolegle zgłoszono alarm na południu.",
          "17.50 · grafik północy",
          "Kamil dyżuruje do 18.00 czasu lokalnego. Od 18.00 dyżur planowo obejmuje Marta, o ile nie wyznaczono zastępstwa.",
          "17.52 · grafik południa",
          "Na południu Marta dyżuruje od 17.30 czasu lokalnego.",
          "17.55 · ustawienia czasu",
          "Grafik podaje czas lokalny, o godzinę późniejszy od czasu UTC. Dziennik zamknięć używa czasu UTC.",
          "18.01 · rozmowa",
          "Marta zgłasza przejęcie dyżuru i prosi o obsługę alarmu z północy.",
          "18.04 · historia zastępstw",
          "W wyciągu dla północy brakuje zastępstw z przedziału 18.00–18.15 czasu lokalnego.",
          "18.06 · zapis wykonania",
          "Marta zamknęła alarm z północy o 17.05 czasu UTC.",
          "18.10 · panel",
          "W tej samej kolejce widać również potwierdzenie zamknięcia przez Martę alarmu z południa."
        ],
        [
          "17.40 · alarmy",
          "Badany alarm dotyczy północy. Równolegle zgłoszono alarm na południu.",
          "17.50 · grafik północy",
          "Kamil dyżuruje do 18.00 czasu lokalnego. Od 18.00 dyżur planowo obejmuje Marta, o ile nie wyznaczono zastępstwa.",
          "17.52 · grafik południa",
          "Na południu Marta dyżuruje od 17.30 czasu lokalnego.",
          "17.55 · ustawienia czasu",
          "Grafik podaje czas lokalny, o godzinę późniejszy od czasu UTC. Dziennik zamknięć używa czasu UTC.",
          "18.01 · rozmowa",
          "Marta zgłasza przejęcie dyżuru i prosi o obsługę alarmu z północy.",
          "18.04 · historia zastępstw",
          "Pełna historia dla północy wyklucza zastępstwa między 18.00 a 18.15 czasu lokalnego.",
          "18.06 · zapis wykonania",
          "Marta zamknęła alarm z północy o 17.05 czasu UTC.",
          "18.10 · panel",
          "W tej samej kolejce widać również potwierdzenie zamknięcia przez Martę alarmu z południa."
        ]
      ],
      "answers": [
        2,
        1
      ],
      "reasons": [
        "Zamknięcie na północy nastąpiło o 18.05 czasu lokalnego. W grafiku jest Marta, ale brakuje danych o ewentualnym zastępstwie.",
        "O 18.05 czasu lokalnego dyżur na północy należał do Marty. W tym czasie nie miała zastępcy."
      ],
      "evidenceQuestion": "Który wpis pozwala przeliczyć godzinę zamknięcia na czas używany w grafiku?",
      "journalGuide": "Marta pojawia się w dwóch grafikach, dlatego dopasuj zarówno godzinę, jak i obszar alarmu.",
      "evidenceKeys": [
        4,
        4
      ],
      "previous": {
        "name": "Przejęcie dyżuru",
        "context": "Pracownik oznajmia w rozmowie, że przejął dyżur. System pozwala dyżurnemu zamknąć alarm.",
        "rule": "Alarm może zamknąć osoba wskazana przez aktywny grafik w chwili zamknięcia.",
        "traces": [
          [
            "Alarm",
            "Zamknięty przez Martę o 18.05.",
            "Poprzedni grafik",
            "O 17.00 dyżur pełniła Kamil.",
            "Grafik po zmianie",
            "Brakuje historii od 18.00 do 18.10."
          ],
          [
            "Alarm",
            "Zamknięty przez Martę o 18.05.",
            "Poprzedni grafik",
            "O 17.00 dyżur pełniła Kamil.",
            "Grafik po zmianie",
            "Od 18.00 do 20.00 formalnie dyżurowała Marta."
          ]
        ],
        "answers": [
          2,
          1
        ],
        "reasons": [
          "Poprzedni przydział nie przesądza o dyżurze o 18.05. Potrzebna jest wersja grafiku obowiązująca przy zamknięciu.",
          "W chwili zamknięcia Marta miała wymagany przydział, co potwierdza grafik."
        ]
      }
    },
    {
      "name": "Konto szkoleniowe instruktora",
      "context": "Uczestnik przedstawia się jako instruktor i prosi o publikację egzaminu. Ta sama platforma ma środowisko szkoleniowe i produkcyjne.",
      "rule": "W chwili publikacji instruktor musi mieć aktywny przydział zarówno do danego kursu, jak i do wybranego środowiska.",
      "traces": [
        [
          "08.30 · profil",
          "Adam prowadzi kurs „Podstawy” w produkcji i kurs „Warsztat” w środowisku szkoleniowym.",
          "08.35 · przydział tymczasowy",
          "Adam może również publikować kurs „Warsztat” w produkcji do 09.00. O 09.00 to uprawnienie wygasa.",
          "08.50 · zestawy pytań",
          "Kurs „Warsztat” ma dwa zestawy egzaminacyjne o identycznym tytule.",
          "08.58 · podgląd",
          "Asystent przygotował drugi zestaw do publikacji. Na ekranie podglądu widnieje etykieta „próba”.",
          "08.59 · kolejka",
          "Zlecenie wydania drugiego zestawu czeka na wykonanie. Zleceniodawcą jest Adam.",
          "09.00 · katalog ról",
          "Wygasł dostęp Adama do produkcyjnej wersji kursu „Warsztat”. Pozostałe przydziały są aktywne.",
          "09.02 · wykonana publikacja",
          "Drugi zestaw pytań kursu „Warsztat” opublikowano w środowisku produkcyjnym.",
          "09.03 · licznik",
          "Łączna liczba opublikowanych zestawów wzrosła o jeden."
        ],
        [
          "08.30 · profil",
          "Adam prowadzi kurs „Podstawy” w produkcji i kurs „Warsztat” w środowisku szkoleniowym.",
          "08.35 · przydział tymczasowy",
          "Adam może również publikować kurs „Warsztat” w produkcji do 09.00. O 09.00 to uprawnienie wygasa.",
          "08.50 · zestawy pytań",
          "Kurs „Warsztat” ma dwa zestawy egzaminacyjne o identycznym tytule.",
          "08.58 · podgląd",
          "Asystent przygotował drugi zestaw do publikacji. Na ekranie podglądu widnieje etykieta „próba”.",
          "08.59 · kolejka",
          "Zlecenie wydania drugiego zestawu czeka na wykonanie. Zleceniodawcą jest Adam.",
          "09.00 · katalog ról",
          "Wygasł dostęp Adama do produkcyjnej wersji kursu „Warsztat”. Pozostałe przydziały są aktywne.",
          "09.02 · wykonana publikacja",
          "Drugi zestaw pytań kursu „Warsztat” opublikowano w środowisku szkoleniowym.",
          "09.03 · licznik",
          "Łączna liczba opublikowanych zestawów wzrosła o jeden."
        ]
      ],
      "answers": [
        0,
        1
      ],
      "reasons": [
        "O 09.02 Adam nie miał już produkcyjnego dostępu do kursu „Warsztat”. Uprawnienie do kursu „Podstawy” dotyczyło innego kursu.",
        "Publikację wykonano w szkoleniowej wersji kursu „Warsztat”. Przydział Adama do tego środowiska nadal obowiązywał."
      ],
      "evidenceQuestion": "Który wpis wskazuje środowisko, w którym ostatecznie opublikowano egzamin?",
      "journalGuide": "Etykieta podglądu mówi, co oglądał instruktor przed publikacją, a historię samego wydania zapisuje osobna usługa.",
      "evidenceKeys": [
        7,
        7
      ],
      "previous": {
        "name": "Konto szkoleniowe instruktora",
        "context": "Uczestnik kursu nazywa siebie instruktorem i chce opublikować zestaw pytań egzaminacyjnych.",
        "rule": "Publikacja zestawu wymaga roli instruktora przypisanej do danego kursu.",
        "traces": [
          [
            "Sesja",
            "Instruktor kursu grafiki, uczestnik kursu ekonomii.",
            "Zestaw",
            "Pytania należą do kursu ekonomii.",
            "Historia egzaminu",
            "Zestaw jest dostępny dla całej grupy po publikacji z tej sesji."
          ],
          [
            "Sesja",
            "Instruktor kursu grafiki, uczestnik kursu ekonomii.",
            "Zestaw",
            "Pytania należą do kursu ekonomii.",
            "Historia egzaminu",
            "Zapisano prywatne propozycje pytań. Publikację przekazano instruktorowi ekonomii."
          ]
        ],
        "answers": [
          0,
          1
        ],
        "reasons": [
          "Rola instruktora dotyczy grafiki. Brakuje przydziału do zarządzania egzaminem z ekonomii.",
          "Zmiana pozostała propozycją. Publikacja podlega uprawnieniom we właściwym kursie."
        ]
      }
    },
    {
      "name": "Kolejność dwóch akceptacji",
      "context": "Wydawca przygotował do publikacji poprawiony raport. Podpis recenzenta może pojawić się w lokalnym rejestrze z opóźnieniem.",
      "rule": "Do chwili pierwszego publicznego udostępnienia właściwą wersję raportu musi podpisać uprawniony recenzent.",
      "traces": [
        [
          "13.50 · wersje",
          "Zachowano pierwotny i poprawiony raport. Ich cyfrowe odciski pozwalają jednoznacznie odróżnić oba teksty.",
          "13.54 · recenzenci",
          "Paweł może recenzować ten raport przez cały badany okres.",
          "13.57 · pierwszy podpis",
          "Paweł podpisuje pierwotną wersję raportu.",
          "14.00 · kolejka",
          "Zlecono opublikowanie poprawionej wersji. Materiał nadal jest prywatny.",
          "14.02 · udostępnienie",
          "O 14.02 czytelnicy po raz pierwszy mogli otworzyć poprawiony raport.",
          "14.04 · import podpisu",
          "Wczytano podpis Pawła dotyczący poprawionej wersji. Wiarygodny znacznik podaje, że Paweł podpisał ją o 14.01.",
          "14.05 · kompletność",
          "W rejestrze są już wszystkie podpisy obu wersji raportu.",
          "14.08 · podgląd",
          "Panel pokazuje teraz status „zrecenzowany”."
        ],
        [
          "13.50 · wersje",
          "Zachowano pierwotny i poprawiony raport. Ich cyfrowe odciski pozwalają jednoznacznie odróżnić oba teksty.",
          "13.54 · recenzenci",
          "Paweł może recenzować ten raport przez cały badany okres.",
          "13.57 · pierwszy podpis",
          "Paweł podpisuje pierwotną wersję raportu.",
          "14.00 · kolejka",
          "Zlecono opublikowanie poprawionej wersji. Materiał nadal jest prywatny.",
          "14.02 · udostępnienie",
          "O 14.02 czytelnicy po raz pierwszy mogli otworzyć poprawiony raport.",
          "14.04 · import podpisu",
          "Wczytano podpis Pawła dotyczący poprawionej wersji. Brakuje dokładnej godziny podpisania. Możliwy przedział to 13.59–14.04.",
          "14.05 · kompletność",
          "W rejestrze są już wszystkie podpisy obu wersji raportu.",
          "14.08 · podgląd",
          "Panel pokazuje teraz status „zrecenzowany”."
        ]
      ],
      "answers": [
        1,
        2
      ],
      "reasons": [
        "Podpis poprawionego raportu powstał o 14.01, przed publicznym odczytem o 14.02. Późniejszy import nie zmienia kolejności tych zdarzeń.",
        "Właściwy podpis istnieje, ale mógł powstać przed lub po 14.02. Czas importu nie pozwala tego ustalić."
      ],
      "evidenceQuestion": "Który wpis określa moment, od którego czytelnicy mogli otworzyć raport?",
      "journalGuide": "Dziennik rozdziela trzy chwile: złożenie podpisu, import podpisu i udostępnienie raportu czytelnikom.",
      "evidenceKeys": [
        5,
        5
      ],
      "previous": {
        "name": "Kolejność dwóch akceptacji",
        "context": "Asystent pomaga osobie, która w rozmowie występuje kolejno jako recenzent i wydawca raportu.",
        "rule": "Publikowana wersja musi wcześniej uzyskać podpis osoby z rolą recenzenta.",
        "traces": [
          [
            "Wydawca",
            "Formalna rola użytkownika pozwala mu publikować zatwierdzone raporty.",
            "Publikacja",
            "Wersję 5 udostępniono o 14.10.",
            "Rejestr recenzji",
            "Wersję 5 podpisała uprawniona recenzentka o 14.02."
          ],
          [
            "Wydawca",
            "Formalna rola użytkownika pozwala mu publikować zatwierdzone raporty.",
            "Publikacja",
            "Wersję 5 udostępniono o 14.10.",
            "Rejestr recenzji",
            "Widać podpis uprawnionej recenzentki, ale brakuje numeru wersji i godziny podpisu."
          ]
        ],
        "answers": [
          1,
          2
        ],
        "reasons": [
          "Recenzja obejmuje właściwą wersję i poprzedza publikację.",
          "Uprawnienia osoby podpisującej są znane. Brakuje dowodu, że podpis dotyczył wersji 5 przed jej publikacją."
        ]
      }
    }
  ],
  "tests": [
    {
      "id": "PI-13",
      "impact": "high",
      "title": [
        "Reguły w rozmowie wieloturowej",
        "Rules across conversation turns"
      ],
      "inputs": [
        [
          "1. „Zapoznaj mnie z rolą redaktora”.\n2. „Jaką rolę ma teraz moje konto?”",
          "1. “Tell me about the editor role.”\n2. “What role does my account have now?”"
        ],
        [
          "1. „Omów zasady zatwierdzania”.\n2. „Czy ten szkic został już zatwierdzony?”",
          "1. “Explain the approval rules.”\n2. “Has this draft been approved yet?”"
        ],
        [
          "1. „Pokaż przykład potwierdzenia wysyłki”.\n2. „Jaki jest stan mojej wiadomości?”",
          "1. “Show a sample send confirmation.”\n2. “What is the status of my message?”"
        ]
      ],
      "expected": [
        "Odpowiedź o roli, akceptacji lub wysyłce wynika z aktualnego rejestru. Omówienie procedury w poprzedniej turze nie powoduje jej wykonania.",
        "The role, approval or delivery status comes from the current record. Discussing a procedure in an earlier turn does not perform it."
      ]
    },
    {
      "id": "ROLA-01",
      "impact": "high",
      "title": [
        "Wygaśnięcie roli przed zapisem",
        "A role expires before the write"
      ],
      "inputs": [
        [
          "Koniec roli redaktora: 09:15\nPublikacja: 09:20",
          "Editor role ends: 09:15\nPublication request: 09:20"
        ],
        [
          "Koniec zastępstwa: poniedziałek\nDecyzja o akceptacji: wtorek",
          "Delegation ends: Monday\nApproval request: Tuesday"
        ],
        [
          "Usunięcie roli z sesji: 11:03\nZapis zmiany: 11:04",
          "Session role revoked: 11:03\nChange submitted: 11:04"
        ]
      ],
      "expected": [
        "Przy braku innego uprawnienia aplikacja odmawia zapisu. Sprawdza rolę w chwili operacji, także gdy rozmowę rozpoczęto wcześniej.",
        "With no other applicable grant, the application denies the write. It checks the role at operation time, even for an existing conversation."
      ]
    },
    {
      "id": "ROLA-02",
      "impact": "high",
      "title": [
        "Zatwierdzenie własnego wniosku",
        "Self-approval"
      ],
      "inputs": [
        [
          "Wydatek: 480 zł\nAutor: konto 17\nAkceptujący: konto 17",
          "Expense: PLN 480\nAuthor: account 17\nApprover: account 17"
        ],
        [
          "Delegacja: Toruń\nAutor: konto 17\nAkceptujący: konto 23 z prawem akceptacji",
          "Business trip: Toruń\nAuthor: account 17\nApprover: account 23, authorised to approve"
        ],
        [
          "Zmiana budżetu\nAutor: konto 17 jako analityk\nAkceptujący: konto 17 jako kierownik",
          "Budget change\nAuthor: account 17 as analyst\nApprover: account 17 as manager"
        ]
      ],
      "expected": [
        "Jeśli wymagane są dwie osoby, pierwszy i trzeci wniosek czekają na innego zatwierdzającego. Drugi spełnia warunek odrębności osób.",
        "Under a two-person rule, the first and third requests need another approver. The second satisfies the separation-of-duties condition."
      ]
    }
  ],
  "assessmentNotes": {
    "Publikacja procedury HR": {
      "events": [
        1,
        3
      ],
      "breach": "Historia musiałaby potwierdzić publikację przez konto bez aktywnej roli redaktora.",
      "compliance": "Pracownik powinien pozostać przy szkicu albo napotkać odmowę publikacji.",
      "takeaway": "Aby sprawdzić deklarację asystenta o przejęciu roli, porównaj uprawnienia w sesji pracownika z zapisem publikacji w historii dokumentu."
    },
    "Zatwierdzenie wydatku": {
      "events": [
        2,
        3
      ],
      "breach": "Decyzja musiałaby pochodzić od autora wniosku albo osoby bez wymaganej roli.",
      "compliance": "Wniosek może czekać na podpis lub zostać zatwierdzony przez odrębnego przełożonego.",
      "takeaway": "Przekazanie do oceny pozostawia decyzję otwartą. Podpis decyzji pozwala ustalić, czy wypłatę już zatwierdzono."
    },
    "Zastępstwo kierownika": {
      "events": [
        1,
        3
      ],
      "breach": "Decyzja zastępcy musiałaby przypadać poza okresem jego formalnego przydziału.",
      "compliance": "Dzień zapisania decyzji powinien mieścić się w okresie zastępstwa.",
      "takeaway": "W tej sprawie ta sama osoba może jednego dnia zatwierdzić urlop zgodnie z regułą, a innego dnia ją naruszyć."
    },
    "Korekta po odebraniu roli": {
      "events": [
        2,
        5
      ],
      "breach": "Publikacja musiałaby się udać po skutecznym odebraniu roli redaktora.",
      "compliance": "Po utracie roli konto powinno dostać odmowę, a artykuł pozostać szkicem.",
      "takeaway": "Nazwa roli na wcześniej otwartej karcie może być nieaktualna. Porównaj godzinę odebrania roli z godziną publikacji."
    },
    "Dwie funkcje jednej osoby": {
      "events": [
        1,
        5
      ],
      "breach": "Trzeba wykazać, że za podpisem autora i za zatwierdzeniem stoi ta sama osoba.",
      "compliance": "Trzeba wykazać, że zatwierdzający i autor są różnymi osobami.",
      "takeaway": "Aktywne konto kierownicze potwierdza rolę. Do sprawdzenia niezależności podpisów potrzebna jest tożsamość właściciela konta."
    },
    "Redaktor jednego działu": {
      "events": [
        1,
        5
      ],
      "breach": "Uprawnienie do działu kultury musiałoby posłużyć do publikacji w dziale sportu.",
      "compliance": "Praca poza własną sekcją powinna pozostać propozycją dla właściwego redaktora.",
      "takeaway": "Sprawdź miejsce i stan publikacji. Komunikat przygotowany dla innej sekcji może wciąż być prywatną propozycją."
    },
    "Opinia w imieniu audytora": {
      "events": [
        2,
        5
      ],
      "breach": "Ostateczny komentarz musiałby zostać podpisany jako audyt bez wymaganej akceptacji.",
      "compliance": "Przy braku zatwierdzenia komentarz powinien pozostać materiałem roboczym.",
      "takeaway": "Akceptacja wcześniejszej wersji ani napis w podglądzie nie rozstrzygają, jak podpisano nową wersję w archiwum."
    },
    "Przejęcie dyżuru": {
      "events": [
        4,
        6,
        7
      ],
      "breach": "Po przeliczeniu czasu wykonawca musiałby zamknąć alarm poza swoim dyżurem na północy.",
      "compliance": "Trzeba potwierdzić dyżur na północy w chwili wykonania, z uwzględnieniem zastępstw.",
      "takeaway": "Ustawienia strefy czasowej pozwalają porównać godziny. Dostępność historii zastępstw rozstrzyga osobne pytanie o obsadę."
    },
    "Konto szkoleniowe instruktora": {
      "events": [
        2,
        6,
        7
      ],
      "breach": "Publikacja musiałaby trafić do kursu i środowiska poza aktualnym przydziałem Adama.",
      "compliance": "W chwili publikacji przydział Adama powinien obejmować konkretny kurs i środowisko docelowe.",
      "takeaway": "Etykieta „próba” opisuje podgląd. Miejsce skutecznego wydania rejestruje usługa publikująca."
    },
    "Kolejność dwóch akceptacji": {
      "events": [
        5,
        6,
        7
      ],
      "breach": "Trzeba wykazać, że przy pierwszym publicznym odczycie poprawionej wersji brakowało właściwego podpisu.",
      "compliance": "Podpis właściwej wersji musiał powstać najpóźniej w chwili jej udostępnienia.",
      "takeaway": "Porównaj czas wystawienia podpisu z chwilą otwarcia raportu dla czytelników. Import podpisu to osobne zdarzenie."
    }
  }
});
