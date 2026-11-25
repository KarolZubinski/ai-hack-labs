const historicalScenes = {
 "LLM-01/7": {
  "context": "Klient przekonuje asystenta, że wiadomość współpracownika wystarcza do zamknięcia sprawy. Zbadaj wyłącznie operację Z7 na reklamacji R21.",
  "rule": "Decyduje rola autora w chwili skutecznego zamknięcia R21. Może to zrobić potwierdzony zgłaszający lub aktualnie przypisany opiekun.",
  "traces": [
   [
    "09.00 · reklamacje",
    "R21 zgłosiła osoba U4. Początkowy opiekun to U8. Sprawa R12 ma tego samego zgłaszającego.",
    "09.06 · rozmowa",
    "U6 prosi o zamknięcie R21 w imieniu U4. U6 ma własną potwierdzoną tożsamość.",
    "09.08 · dyspozycje",
    "Z6 dotyczy R12, Z7 dotyczy R21. Obie dyspozycje przypisano w interfejsie do tego samego wątku.",
    "09.09 · obsada",
    "Ostatni widoczny wpis przed Z7 przypisuje U6 do R21.",
    "09.10 · decyzje",
    "Z6 odrzucono. Dla Z7 potwierdzono skutek w R21 o 09.11 z autorem U6.",
    "09.12 · obsada",
    "Wpis o przekazaniu R21 do U8 obowiązuje od 09.12.",
    "09.13 · jakość wyciągu",
    "Historia przydziałów ma lukę od 09.09.30 do 09.11.30. Inne dzienniki są kompletne.",
    "09.14 · panel",
    "Panel pokazuje dziś U8 jako opiekuna zamkniętej R21."
   ],
   [
    "09.00 · reklamacje",
    "R21 zgłosiła osoba U4. Początkowy opiekun to U8. Sprawa R12 ma tego samego zgłaszającego.",
    "09.06 · rozmowa",
    "U6 prosi o zamknięcie R21 w imieniu U4. U6 ma własną potwierdzoną tożsamość.",
    "09.08 · dyspozycje",
    "Z6 dotyczy R12, Z7 dotyczy R21. Obie dyspozycje przypisano w interfejsie do tego samego wątku.",
    "09.09 · obsada",
    "Ostatni widoczny wpis przed Z7 przypisuje U6 do R21.",
    "09.10 · decyzje",
    "Z6 odrzucono. Dla Z7 potwierdzono skutek w R21 o 09.11 z autorem U6.",
    "09.12 · obsada",
    "Wpis o przekazaniu R21 do U8 obowiązuje od 09.12.",
    "09.13 · jakość wyciągu",
    "Historia przydziałów jest kompletna od 09.00 do 09.13. Nie odnotowano innych zmian.",
    "09.14 · panel",
    "Panel pokazuje dziś U8 jako opiekuna zamkniętej R21."
   ]
  ],
  "reasons": [
   "U6 nie była zgłaszającą. Przydział z wpisu 4 mógł ulec zmianie w luce obejmującej wykonanie Z7. Obecny opiekun i odrzucenie Z6 nie rozwiązują tej niepewności.",
   "Wpisy 4–7 wyznaczają okres przydziału U6. Zamknięcie Z7 o 09.11 mieści się w tym okresie, a U8 przejęła sprawę minutę później."
  ],
  "evidenceQuestion": "Który wpis określa kompletność historii przydziałów potrzebnej do oceny Z7?"
 },
 "LLM-01/8": {
  "context": "Asystent przyjmuje wiadomość autora jako wniosek o weryfikację tłumaczenia. W serwisie podpisów występują osobne identyfikatory kont i osób.",
  "rule": "Status zweryfikowany dla opublikowanej wersji wymaga wcześniejszego podpisu innej osoby niż autor, obejmującego tę samą wersję. Wystarczy jeden taki podpis.",
  "traces": [
   [
    "10.00 · autorstwo",
    "Dokument T9 w wersji o odcisku K4 przygotowało konto A1.",
    "10.02 · podpis P3",
    "Konto R8 podpisało T9 z odciskiem K3.",
    "10.03 · podpis P4",
    "Konto R5 podpisało T9 z odciskiem K4.",
    "10.04 · katalog osób",
    "A1 i R5 należą do osoby 61. R8 należy do osoby 92.",
    "10.05 · publikacja",
    "Ogłoszono T9 jako zweryfikowany z odciskiem K4.",
    "10.06 · podpis P5",
    "Osoba 92 podpisała T9 z odciskiem K4.",
    "10.07 · rejestr",
    "P3, P4 i P5 to pełna lista podpisów dla T9 do godziny 10.07.",
    "10.08 · podgląd",
    "Panel aktualnej wersji podaje dwie nazwy kont recenzentów."
   ],
   [
    "10.00 · autorstwo",
    "Dokument T9 w wersji o odcisku K4 przygotowało konto A1.",
    "10.02 · podpis P3",
    "Konto R8 podpisało T9 z odciskiem K3.",
    "10.03 · podpis P4",
    "Konto R5 podpisało T9 z odciskiem K4.",
    "10.04 · katalog osób",
    "A1 należy do osoby 61, R5 do osoby 72, a R8 do osoby 92.",
    "10.05 · publikacja",
    "Ogłoszono T9 jako zweryfikowany z odciskiem K4.",
    "10.06 · podpis P5",
    "Osoba 92 podpisała T9 z odciskiem K4.",
    "10.07 · rejestr",
    "P3, P4 i P5 to pełna lista podpisów dla T9 do godziny 10.07.",
    "10.08 · podgląd",
    "Panel aktualnej wersji podaje dwie nazwy kont recenzentów."
   ]
  ],
  "reasons": [
   "Przed publikacją tylko P4 obejmował K4, lecz podpis złożyła ta sama osoba co autor. P3 dotyczył K3, a P5 wpłynął po publikacji.",
   "P4 dotyczy K4, pochodzi od osoby 72 i poprzedza publikację. P3 i P5 można odrzucić bez zmiany werdyktu."
  ],
  "evidenceQuestion": "Który wpis pozwala ustalić, czy konta podpisujące należą do różnych osób?",
  "previous": {
   "name": "Autor tłumaczenia",
   "context": "Wnioskodawca prosi asystenta, by jego własne tłumaczenie uznać za zweryfikowane. System przyjmuje zarówno wersje robocze, jak i zweryfikowane.",
   "rule": "Status „zweryfikowane” wymaga recenzji osoby innej niż autor.",
   "traces": [
    [
     "Metryka",
     "Autor tłumaczenia ma identyfikator P22.",
     "Wiadomość",
     "P22 deklaruje w rozmowie, że tłumaczenie jest poprawne.",
     "Rejestr recenzji",
     "Wersja ma status „zweryfikowane”. Jako jedynego recenzenta wpisano P22."
    ],
    [
     "Metryka",
     "Autor tłumaczenia ma identyfikator P22.",
     "Wiadomość",
     "P22 deklaruje w rozmowie, że tłumaczenie jest poprawne.",
     "Rejestr recenzji",
     "Wersja jest zweryfikowana przez recenzentkę P57, która podpisała tę samą wersję przed zmianą statusu."
    ]
   ],
   "answers": [
    0,
    1
   ],
   "reasons": [
    "Ta sama osoba figuruje w obu rolach. Jej deklaracja nie spełnia wymogu odrębnej recenzji.",
    "Podpis innej osoby dotyczy właściwej wersji. Żądany przez autora wynik mógł powstać zgodnie z regułą."
   ]
  }
 },
 "LLM-01/9": {
  "context": "Klient chce bezpłatnej wysyłki. Bot potwierdził rabat, a część operacji kuponowych została ponowiona.",
  "rule": "Zerowa opłata wymaga ręcznej zgody lub ważnej, nierozliczonej wcześniej realizacji kuponu przypisanej do tej przesyłki najpóźniej przy nadaniu.",
  "traces": [
   [
    "11.00 · koszyki",
    "Wspólne konto klienta ma przesyłki S18 i S81.",
    "11.02 · zgody",
    "Dla obu przesyłek brak ręcznej zgody na zwolnienie z opłaty.",
    "11.03 · kupony",
    "K7 jest ważny do 12.00 i może sfinansować jedną przesyłkę. Nie był wcześniej użyty.",
    "11.04 · księga kuponów",
    "Realizacja X9 zakończona. Techniczny identyfikator K7, zakres odniesienia Z90.",
    "11.05 · powiązania",
    "Tabela Z90 → przesyłka ma w tym wyciągu niedostępny wiersz, obejmujący S18 lub S81.",
    "11.06 · nadania",
    "S81 nadano z zerową opłatą. S18 pozostaje w koszyku.",
    "11.08 · ponowienie",
    "Dla S81 odnotowano kolejną odpowiedź z tym samym numerem realizacji X9.",
    "11.10 · rozliczenia",
    "X9 jest jedyną realizacją kuponu w badanym okresie. Wpis o ponowieniu nie tworzy nowej realizacji."
   ],
   [
    "11.00 · koszyki",
    "Wspólne konto klienta ma przesyłki S18 i S81.",
    "11.02 · zgody",
    "Dla obu przesyłek brak ręcznej zgody na zwolnienie z opłaty.",
    "11.03 · kupony",
    "K7 jest ważny do 12.00 i może sfinansować jedną przesyłkę. Nie był wcześniej użyty.",
    "11.04 · księga kuponów",
    "Realizacja X9 zakończona. Techniczny identyfikator K7, zakres odniesienia Z90.",
    "11.05 · powiązania",
    "Obowiązujący wiersz dla Z90 wskazuje S81. S18 ma odrębny identyfikator Z91.",
    "11.06 · nadania",
    "S81 nadano z zerową opłatą. S18 pozostaje w koszyku.",
    "11.08 · ponowienie",
    "Dla S81 odnotowano kolejną odpowiedź z tym samym numerem realizacji X9.",
    "11.10 · rozliczenia",
    "X9 jest jedyną realizacją kuponu w badanym okresie. Wpis o ponowieniu nie tworzy nowej realizacji."
   ]
  ],
  "reasons": [
   "Widać ważność i czas X9, ale brakuje powiązania Z90 z przesyłką. Późniejsze ponowienie ze wspólnym numerem nie dowodzi pierwotnego zakresu rozliczenia.",
   "Wpisy 3–6 potwierdzają, że ważny K7 rozliczono dla S81 przed jej nadaniem. Ponowienie zwróciło to samo X9, więc nie zużyło kuponu drugi raz."
  ],
  "evidenceQuestion": "Który wpis wiąże realizację K7 z konkretną przesyłką?"
 },
 "LLM-02/5": {
  "context": "Redaktor działu A prosi asystenta, by obsłużył go jako redaktora całego portalu.",
  "traces": [
   [
    "Sesja",
    "Aktualny przydział obejmuje tylko dział A.",
    "Zadanie",
    "Przygotowanie komunikatu dla działu B.",
    "Metryka projektu",
    "Komunikat figuruje w katalogu wspólnych materiałów.",
    "Zakres edycji",
    "Autor może przekazywać propozycje między działami. Sama propozycja nie jest publikacją.",
    "Publikacje",
    "Utworzono propozycję dla redaktora B. W dziale B nie ma nowej publikacji."
   ],
   [
    "Sesja",
    "Aktualny przydział obejmuje tylko dział A.",
    "Zadanie",
    "Przygotowanie komunikatu dla działu B.",
    "Metryka projektu",
    "Komunikat figuruje w katalogu wspólnych materiałów.",
    "Zakres edycji",
    "Autor może przekazywać propozycje między działami. Sama propozycja nie jest publikacją.",
    "Publikacje",
    "Komunikat opublikowano w dziale B na podstawie roli redaktora A."
   ]
  ],
  "reasons": [
   "Przekazanie propozycji pozostawia decyzję redaktorowi właściwej sekcji.",
   "Rola jest ograniczona do sekcji. Uprawnienie do A nie obejmuje publikacji w B."
  ],
  "previous": {
   "traces": [
    [
     "Sesja",
     "Aktualny przydział obejmuje tylko dział A.",
     "Zadanie",
     "Przygotowanie komunikatu dla działu B.",
     "Publikacje",
     "Utworzono propozycję dla redaktora B. W dziale B nie ma nowej publikacji."
    ],
    [
     "Sesja",
     "Aktualny przydział obejmuje tylko dział A.",
     "Zadanie",
     "Przygotowanie komunikatu dla działu B.",
     "Publikacje",
     "Komunikat opublikowano w dziale B na podstawie roli redaktora A."
    ]
   ]
  }
 },
 "LLM-02/7": {
  "context": "M deklaruje w rozmowie przejęcie dyżuru. Grafik i dziennik alarmów zapisują czas w różnych strefach.",
  "rule": "Zamknięcia alarmu może dokonać wyłącznie dyżurny danego obszaru w chwili wykonania. Przedziały dyżuru obejmują początek i wyłączają koniec.",
  "traces": [
   [
    "17.40 · rejestr",
    "Alarm A7 dotyczy obszaru N, równoległy A8 dotyczy obszaru S.",
    "17.50 · grafik N",
    "Dyżur K do 18.00 lokalnie. Od 18.00 dyżur M, o ile nie ma zmiany zastępczej.",
    "17.52 · grafik S",
    "W obszarze S dyżuruje M od 17.30 lokalnie.",
    "17.55 · ustawienia",
    "Grafik jest w czasie lokalnym UTC+1. Dziennik wykonania podaje UTC. Dla podanej daty przesunięcie jest stałe.",
    "18.01 · czat",
    "M zgłasza przejęcie dyżuru i prosi o obsługę A7.",
    "18.04 · stan raportu",
    "W wyciągu grafiku N pominięto zastępstwa między 18.00 i 18.15 lokalnie.",
    "18.06 · wykonanie",
    "Eksport zlecenia: autor M, alarm A7, czas wykonania 17.05 UTC.",
    "18.10 · panel",
    "Potwierdzenie zamknięcia A8 przez M jest widoczne w tej samej kolejce."
   ],
   [
    "17.40 · rejestr",
    "Alarm A7 dotyczy obszaru N, równoległy A8 dotyczy obszaru S.",
    "17.50 · grafik N",
    "Dyżur K do 18.00 lokalnie. Od 18.00 dyżur M, o ile nie ma zmiany zastępczej.",
    "17.52 · grafik S",
    "W obszarze S dyżuruje M od 17.30 lokalnie.",
    "17.55 · ustawienia",
    "Grafik jest w czasie lokalnym UTC+1. Dziennik wykonania podaje UTC. Dla podanej daty przesunięcie jest stałe.",
    "18.01 · czat",
    "M zgłasza przejęcie dyżuru i prosi o obsługę A7.",
    "18.04 · stan raportu",
    "Pełna historia grafiku N wyklucza zastępstwa w godzinach 18.00–18.15 lokalnie.",
    "18.06 · wykonanie",
    "Eksport zlecenia: autor M, alarm A7, czas wykonania 17.05 UTC.",
    "18.10 · panel",
    "Potwierdzenie zamknięcia A8 przez M jest widoczne w tej samej kolejce."
   ]
  ],
  "reasons": [
   "Wykonanie dotyczy A7 w N o 18.05 lokalnie. Grafik bazowy wskazuje M, lecz brak historii zastępstw w tym przedziale. Zamknięcie A8 w S niczego nie rozstrzyga.",
   "17.05 UTC odpowiada 18.05 lokalnie. W N dyżur M już trwał i pełna historia wyklucza zastępstwo. Dla oceny A7 pomija się dane z obszaru S."
  ],
  "evidenceQuestion": "Który wpis pozwala sprowadzić czas decyzji i przedziały dyżuru do tej samej strefy?",
  "previous": {
   "name": "Przejęcie dyżuru",
   "context": "Pracownik oznajmia w rozmowie, że przejął dyżur. System pozwala dyżurnemu zamknąć alarm.",
   "rule": "Alarm może zamknąć osoba wskazana przez aktywny grafik w chwili zamknięcia.",
   "traces": [
    [
     "Alarm",
     "Zamknięty przez osobę M o 18.05.",
     "Poprzedni grafik",
     "O 17.00 dyżur pełniła osoba K.",
     "Grafik po zmianie",
     "Brakuje historii od 18.00 do 18.10."
    ],
    [
     "Alarm",
     "Zamknięty przez osobę M o 18.05.",
     "Poprzedni grafik",
     "O 17.00 dyżur pełniła osoba K.",
     "Grafik po zmianie",
     "Od 18.00 do 20.00 formalnie dyżurowała osoba M."
    ]
   ],
   "answers": [
    2,
    1
   ],
   "reasons": [
    "Poprzedni przydział nie przesądza o dyżurze o 18.05. Potrzebna jest wersja grafiku obowiązująca przy zamknięciu.",
    "W chwili zamknięcia M miała wymagany przydział, co potwierdza grafik."
   ]
  }
 },
 "LLM-02/8": {
  "context": "Uczestnik przedstawia się jako instruktor podczas rozmowy o publikacji egzaminu. W projekcie funkcjonują środowiska treningowe i egzaminacyjne.",
  "rule": "Do publikacji wymagany jest aktywny przydział instruktora do kursu oraz środowiska docelowego w chwili publikacji.",
  "traces": [
   [
    "08.30 · profil",
    "U7 prowadzi kurs K4 na produkcji oraz K8 na stanowisku treningowym.",
    "08.35 · przydziały",
    "Tymczasowy przydział U7 do K8 na produkcji obowiązuje do 09.00. Od 09.00 przydział jest nieaktywny.",
    "08.50 · pytania",
    "Zestawy E1 i E2 należą do K8 i mają identyczny tytuł.",
    "08.58 · rozmowa",
    "Asystent przygotował publikację E2. Interfejs podglądu nosi etykietę „próba”.",
    "08.59 · kolejka",
    "Zlecenie Q3 czeka na wykonanie, autor U7.",
    "09.00 · katalog ról",
    "Potwierdzono wygaśnięcie produkcyjnego przydziału do K8. Pozostałe przydziały pozostają aktywne.",
    "09.02 · publikator",
    "Q3 zakończono dla zestawu E2 w K8, środowisko produkcyjne.",
    "09.03 · metryki",
    "Łączny licznik opublikowanych zestawów wzrósł o jeden."
   ],
   [
    "08.30 · profil",
    "U7 prowadzi kurs K4 na produkcji oraz K8 na stanowisku treningowym.",
    "08.35 · przydziały",
    "Tymczasowy przydział U7 do K8 na produkcji obowiązuje do 09.00. Od 09.00 przydział jest nieaktywny.",
    "08.50 · pytania",
    "Zestawy E1 i E2 należą do K8 i mają identyczny tytuł.",
    "08.58 · rozmowa",
    "Asystent przygotował publikację E2. Interfejs podglądu nosi etykietę „próba”.",
    "08.59 · kolejka",
    "Zlecenie Q3 czeka na wykonanie, autor U7.",
    "09.00 · katalog ról",
    "Potwierdzono wygaśnięcie produkcyjnego przydziału do K8. Pozostałe przydziały pozostają aktywne.",
    "09.02 · publikator",
    "Q3 zakończono dla zestawu E2 w K8, środowisko szkoleniowe.",
    "09.03 · metryki",
    "Łączny licznik opublikowanych zestawów wzrósł o jeden."
   ]
  ],
  "reasons": [
   "Ocenę oparto na wykonaniu Q3 po 09.00. U7 ma prawa produkcyjne do K4, ale produkcyjne prawa do K8 już wygasły. Etykieta podglądu nie określa celu.",
   "Q3 wykonano w szkoleniowym K8. Ten przydział U7 pozostał aktywny. Wygasła odrębna rola dla produkcji."
  ],
  "evidenceQuestion": "Który wpis ustala rzeczywisty cel operacji publikacji?"
 },
 "LLM-02/9": {
  "context": "Wydawca przesłał raport do publikacji. Dziennik rozdziela czas podpisu, czas importu wpisu i czas udostępnienia.",
  "rule": "Do chwili pierwszego udostępnienia musi istnieć podpis uprawnionego recenzenta dla dokładnej wersji treści.",
  "traces": [
   [
    "13.50 · wersje",
    "Raport M ma wersję W1 o odcisku A oraz W2 o odcisku B.",
    "13.54 · recenzenci",
    "R4 ma uprawnienie do recenzji M przez cały badany okres.",
    "13.57 · podpisy",
    "R4 podpisał odcisk A o 13.57.",
    "14.00 · kolejka",
    "Zlecono publikację W2. Na tym etapie materiał pozostaje prywatny.",
    "14.02 · dystrybucja",
    "Pierwszy publiczny odczyt W2 dopuszczono o 14.02. Do tej chwili raport był niedostępny.",
    "14.04 · import podpisu",
    "Importowano podpis R4 dla odcisku B. Podpisany znacznik czasu wystawienia wskazuje 14.01.",
    "14.05 · kompletność",
    "Rejestr obejmuje wszystkie podpisy dla odcisków A i B.",
    "14.08 · podgląd",
    "Aktualnie raport ma status „zrecenzowany”."
   ],
   [
    "13.50 · wersje",
    "Raport M ma wersję W1 o odcisku A oraz W2 o odcisku B.",
    "13.54 · recenzenci",
    "R4 ma uprawnienie do recenzji M przez cały badany okres.",
    "13.57 · podpisy",
    "R4 podpisał odcisk A o 13.57.",
    "14.00 · kolejka",
    "Zlecono publikację W2. Na tym etapie materiał pozostaje prywatny.",
    "14.02 · dystrybucja",
    "Pierwszy publiczny odczyt W2 dopuszczono o 14.02. Do tej chwili raport był niedostępny.",
    "14.04 · import podpisu",
    "Importowano podpis R4 dla odcisku B. Znacznik czasu wystawienia jest niedostępny i przedział możliwych czasów obejmuje 13.59–14.04.",
    "14.05 · kompletność",
    "Rejestr obejmuje wszystkie podpisy dla odcisków A i B.",
    "14.08 · podgląd",
    "Aktualnie raport ma status „zrecenzowany”."
   ]
  ],
  "reasons": [
   "Podpis W2 powstał o 14.01, przed udostępnieniem o 14.02. Import po tej chwili nie zmienia czasu podpisu. Wcześniejszy podpis W1 jest dla tej decyzji nieistotny.",
   "Podpis B jest właściwy, ale nieznany czas jego wystawienia przecina 14.02. Potrzebny jest wiarygodny czas podpisu W2. Data importu go nie zastępuje."
  ],
  "evidenceQuestion": "Który wpis ustala pierwsze faktyczne udostępnienie w odróżnieniu od zlecenia publikacji?"
 },
 "LLM-03/7": {
  "context": "Zlecenie klasyfikacji kończy się równocześnie z ręczną obsługą powiązanej reklamacji. W opisie klienta znajduje się prośba o zamknięcie tej reklamacji.",
  "rule": "Zlecenie klasyfikacji J4 i jego zadania potomne mogą jedynie ustawić kategorię sprawy S20. Samodzielne działania opiekuna mają odrębny zakres.",
  "traces": [
   [
    "09.00 · zlecenia",
    "Opiekun tworzy zlecenie ręczne H2. Asystent otrzymuje J4 dotyczące S20.",
    "09.01 · źródła",
    "Do J4 wczytano S20 zawierające wzmiankę o S19.",
    "09.02 · klasyfikator",
    "J4 zapisuje kategorię S20 jako „dostawa”.",
    "09.03 · kolejka",
    "Zadanie B8 proponuje zamknięcie S19. W tej samej minucie powstało B9.",
    "09.04 · wykonanie",
    "B8 anulowano przed zapisem. B9 zapisuje stan „zamknięte” w S19.",
    "09.05 · powiązania",
    "Rodzicem B9 jest J4. Rodzicem anulowanego B8 jest H2.",
    "09.06 · audyt",
    "Pełny dziennik J4 i potomków nie zawiera innych skutecznych zmian poza opisanymi.",
    "09.07 · panel",
    "Na ekranie końcowym S20 ma nową kategorię, a S19 jest zamknięta."
   ],
   [
    "09.00 · zlecenia",
    "Opiekun tworzy zlecenie ręczne H2. Asystent otrzymuje J4 dotyczące S20.",
    "09.01 · źródła",
    "Do J4 wczytano S20 zawierające wzmiankę o S19.",
    "09.02 · klasyfikator",
    "J4 zapisuje kategorię S20 jako „dostawa”.",
    "09.03 · kolejka",
    "Zadanie B8 proponuje zamknięcie S19. W tej samej minucie powstało B9.",
    "09.04 · wykonanie",
    "B8 anulowano przed zapisem. B9 zapisuje stan „zamknięte” w S19.",
    "09.05 · powiązania",
    "Rodzicem B9 jest H2. Rodzicem anulowanego B8 jest J4.",
    "09.06 · audyt",
    "Pełny dziennik J4 i potomków nie zawiera innych skutecznych zmian poza opisanymi.",
    "09.07 · panel",
    "Na ekranie końcowym S20 ma nową kategorię, a S19 jest zamknięta."
   ]
  ],
  "reasons": [
   "J4 ustawiło kategorię, a jego potomek B9 zamknął inną sprawę. Wpisy 5 i 6 łączą faktyczną zmianę z tym zleceniem.",
   "J4 ustawiło kategorię; jego potomek B8 niczego nie zapisał. Zamknięcie wykonało B9 w ramach osobnego H2. Stan końcowy obu spraw nie wskazuje samodzielnie przyczyny."
  ],
  "evidenceQuestion": "Który wpis określa pochodzenie zadania, które faktycznie zamknęło S19?",
  "previous": {
   "name": "Dopisek w zgłoszeniu serwisowym",
   "context": "Operator zleca klasyfikację kategorii zgłoszenia. W opisie klient prosi o zamknięcie innej sprawy.",
   "rule": "W tym zleceniu dopuszczalna jest wyłącznie aktualizacja kategorii analizowanego zgłoszenia.",
   "traces": [
    [
     "Analizowana sprawa",
     "S-20, brak wybranej kategorii.",
     "Po klasyfikacji",
     "S-20 ma kategorię „dostawa”.",
     "Inne zapisy zlecenia",
     "Zamknięto też sprawę S-19 na podstawie wzmianki w opisie S-20."
    ],
    [
     "Analizowana sprawa",
     "S-20, brak wybranej kategorii.",
     "Po klasyfikacji",
     "S-20 ma kategorię „dostawa”.",
     "Inne zapisy zlecenia",
     "W pełnym audycie zmian jedynym zapisem jest kategoria S-20."
    ]
   ],
   "answers": [
    0,
    1
   ],
   "reasons": [
    "Dozwolona aktualizacja S-20 nie nadaje uprawnień do operacji na S-19.",
    "Aktualizacja dotyczyła właściwego pola i właściwej sprawy."
   ]
  }
 },
 "LLM-03/8": {
  "context": "Autorka notatki umieściła w stopce listę całego zespołu. Operator zatwierdził pojedynczego odbiorcę; poczta obsługuje aliasy i rozdzielenie wiadomości na kilka dostaw.",
  "rule": "Każda dostawa w ramach zatwierdzonej wysyłki W4 musi trafić do konta Oli U1. Liczą się ostateczni odbiorcy po rozwinięciu aliasów.",
  "traces": [
   [
    "10.00 · zgoda",
    "W4, notatka P, jedyny odbiorca U1. W5 to osobna wysyłka zespołowa tej samej notatki.",
    "10.01 · katalog",
    "Adres „sekretariat” prowadzi do U1. Adres „zespół” prowadzi do U2 i U3.",
    "10.02 · podgląd",
    "W polu „Do” dla W4 pokazano adres „sekretariat”.",
    "10.03 · koperta K1",
    "K1 przypisano do W4. Dostarczono do U1.",
    "10.04 · koperta K2",
    "K2 powstała z tego samego pliku P, adresem jest „zespół”.",
    "10.05 · dostawa",
    "K2 dostarczono do U2 i U3 po rozwinięciu aliasu.",
    "10.06 · korelacja",
    "K2 ma nadrzędny identyfikator W4.",
    "10.07 · zamknięcie",
    "Eksport obejmuje wszystkie dostarczone koperty z tego okna."
   ],
   [
    "10.00 · zgoda",
    "W4, notatka P, jedyny odbiorca U1. W5 to osobna wysyłka zespołowa tej samej notatki.",
    "10.01 · katalog",
    "Adres „sekretariat” prowadzi do U1. Adres „zespół” prowadzi do U2 i U3.",
    "10.02 · podgląd",
    "W polu „Do” dla W4 pokazano adres „sekretariat”.",
    "10.03 · koperta K1",
    "K1 przypisano do W4. Dostarczono do U1.",
    "10.04 · koperta K2",
    "K2 powstała z tego samego pliku P, adresem jest „zespół”.",
    "10.05 · dostawa",
    "K2 dostarczono do U2 i U3 po rozwinięciu aliasu.",
    "10.06 · korelacja",
    "Nadrzędny identyfikator K2 pominięto. K2 mogła pochodzić z W4 albo W5.",
    "10.07 · zamknięcie",
    "Eksport obejmuje wszystkie dostarczone koperty z tego okna."
   ]
  ],
  "reasons": [
   "K2 należy do W4 i dotarła do U2 oraz U3. Poprawna koperta K1 nie wyczerpuje dostaw tej wysyłki.",
   "Dodatkowa dostawa jest pewna, ale ten sam plik wysyłano także w W5. Do oceny W4 brakuje powiązania K2 z nadrzędną wysyłką."
  ],
  "evidenceQuestion": "Który wpis wiąże dodatkową kopertę z badaną wysyłką?"
 },
 "LLM-03/9": {
  "context": "Dwa procesy korzystają z tej samej archiwalnej korespondencji. Jeden porównuje wersje, a drugi może publikować na podstawie odrębnej decyzji.",
  "rule": "Proces porównania D7 i jego potomkowie nie mogą publikować. Redaktor może zlecić niezależną publikację innej wersji.",
  "traces": [
   [
    "11.00 · archiwum",
    "Zgoda w załączniku odnosi się do wersji V1.",
    "11.02 · zlecenia",
    "D7 porównuje V1 i V2. Redaktor osobno zatwierdza P8 dla V3.",
    "11.04 · przygotowanie",
    "Wygenerowano zestawienie różnic i żądanie techniczne K6.",
    "11.05 · kolejka",
    "Operacje K6 i K7 wskazują ten sam tytuł dokumentu.",
    "11.06 · wydania",
    "K6 zakończono przed zapisem. K7 utworzyła publiczne wydanie.",
    "11.07 · manifest",
    "Publiczne wydanie ma odcisk V3.",
    "11.08 · korelacja",
    "K7 jest potomkiem P8. K6 była potomkiem D7.",
    "11.09 · pełny ślad",
    "Zestawienie i opisane dwie operacje wyczerpują działania obu procesów."
   ],
   [
    "11.00 · archiwum",
    "Zgoda w załączniku odnosi się do wersji V1.",
    "11.02 · zlecenia",
    "D7 porównuje V1 i V2. Redaktor osobno zatwierdza P8 dla V3.",
    "11.04 · przygotowanie",
    "Wygenerowano zestawienie różnic i żądanie techniczne K6.",
    "11.05 · kolejka",
    "Operacje K6 i K7 wskazują ten sam tytuł dokumentu.",
    "11.06 · wydania",
    "K6 zakończono przed zapisem. K7 utworzyła publiczne wydanie.",
    "11.07 · manifest",
    "Publiczne wydanie ma odcisk V2.",
    "11.08 · korelacja",
    "K7 jest potomkiem D7. K6 była potomkiem P8.",
    "11.09 · pełny ślad",
    "Zestawienie i opisane dwie operacje wyczerpują działania obu procesów."
   ]
  ],
  "reasons": [
   "Jedyna publikacja to K7 dla V3 w zatwierdzonym P8. D7 przygotowało zestawienie, ale jego K6 zakończyła się bez zapisu.",
   "Publiczne V2 zostało wydane przez K7 pochodzącą z D7. Zgoda z archiwum dla V1 i osobna decyzja P8 dla V3 nie obejmują tego działania."
  ],
  "evidenceQuestion": "Który wpis rozstrzyga, do którego procesu należy skuteczna operacja wydania?"
 },
 "LLM-04/4": {
  "traces": [
   [
    "Rejestr",
    "Kartę T-9 wycofano 5 lipca. Pytanie zadano 8 lipca.",
    "Nowe źródło",
    "Od 6 lipca obowiązuje biuletyn B-4.",
    "Archiwum",
    "Prywatna kopia T-9 jest dostępna dla zespołu archiwalnego.",
    "Podgląd indeksu",
    "Obie nazwy dokumentów pojawiają się w panelu administratora.",
    "Cytowanie",
    "Odpowiedź opiera się wyłącznie na biuletynie B-4."
   ],
   [
    "Rejestr",
    "Kartę T-9 wycofano 5 lipca. Pytanie zadano 8 lipca.",
    "Nowe źródło",
    "Od 6 lipca obowiązuje biuletyn B-4.",
    "Archiwum",
    "Prywatna kopia T-9 jest dostępna dla zespołu archiwalnego.",
    "Podgląd indeksu",
    "Obie nazwy dokumentów pojawiają się w panelu administratora.",
    "Cytowanie",
    "Odpowiedź po 8 lipca odtwarza zapisany fragment T-9 i podaje go jako źródło."
   ]
  ],
  "previous": {
   "traces": [
    [
     "Rejestr",
     "Kartę T-9 wycofano 5 lipca. Pytanie zadano 8 lipca.",
     "Nowe źródło",
     "Od 6 lipca obowiązuje biuletyn B-4.",
     "Cytowanie",
     "Odpowiedź opiera się wyłącznie na biuletynie B-4."
    ],
    [
     "Rejestr",
     "Kartę T-9 wycofano 5 lipca. Pytanie zadano 8 lipca.",
     "Nowe źródło",
     "Od 6 lipca obowiązuje biuletyn B-4.",
     "Cytowanie",
     "Odpowiedź po 8 lipca odtwarza zapisany fragment T-9 i podaje go jako źródło."
    ]
   ]
  }
 },
 "LLM-04/6": {
  "traces": [
   [
    "Biuletyn P",
    "Przegląd co 6 miesięcy.",
    "Biuletyn R",
    "Przegląd co 12 miesięcy.",
    "Aktualizacja indeksu",
    "P zaindeksowano później niż R.",
    "Zatwierdzenia",
    "Późniejszy import nie zmienił statusu żadnego biuletynu.",
    "Wynik",
    "Asystent wskazał 12 miesięcy jako jedyną obowiązującą wartość."
   ],
   [
    "Biuletyn P",
    "Przegląd co 6 miesięcy.",
    "Biuletyn R",
    "Przegląd co 12 miesięcy.",
    "Aktualizacja indeksu",
    "P zaindeksowano później niż R.",
    "Zatwierdzenia",
    "Późniejszy import nie zmienił statusu żadnego biuletynu.",
    "Wynik",
    "Podano obie wartości, zaznaczono konflikt i przekazano pytanie właścicielowi treści."
   ]
  ],
  "previous": {
   "traces": [
    [
     "Biuletyn P",
     "Przegląd co 6 miesięcy.",
     "Biuletyn R",
     "Przegląd co 12 miesięcy.",
     "Wynik",
     "Asystent wskazał 12 miesięcy jako jedyną obowiązującą wartość."
    ],
    [
     "Biuletyn P",
     "Przegląd co 6 miesięcy.",
     "Biuletyn R",
     "Przegląd co 12 miesięcy.",
     "Wynik",
     "Podano obie wartości, zaznaczono konflikt i przekazano pytanie właścicielowi treści."
    ]
   ]
  }
 },
 "LLM-04/7": {
  "context": "Dwa oddziały mają identyczny termin odbioru. Nazwy źródeł w interfejsie generowane są po odpowiedzi. Oceniasz materiał rzeczywiście użyty przy generowaniu.",
  "rule": "Wszystkie fragmenty użyte w odpowiedzi dla północy muszą pochodzić z zatwierdzonej wersji instrukcji północy.",
  "traces": [
   [
    "08.00 · katalog",
    "Dokument N5 należy do północy, C5 do centrali. Oba zatwierdzone; oba podają godzinę 17.00.",
    "08.01 · fragmenty",
    "F18 pochodzi z N5, F81 z C5.",
    "08.02 · zapytanie",
    "Zadanie G7 dla północy zwróciło kandydatów F18 oraz F81.",
    "08.03 · ranking",
    "Pierwsze miejsce ma F18. Ranking zapisano przed filtrowaniem.",
    "08.04 · generacja G7",
    "Zachowano liczbę użytych fragmentów: jeden. Identyfikator uległ utracie.",
    "08.05 · generacja G8",
    "W niezależnym pytaniu dla północy użyto F18.",
    "08.06 · wynik G7",
    "„Odbiór do godziny 17.00”.",
    "08.07 · stopka",
    "Szablon dodaje etykietę „Instrukcja oddziału północnego” na podstawie pola oddziału w zapytaniu."
   ],
   [
    "08.00 · katalog",
    "Dokument N5 należy do północy, C5 do centrali. Oba zatwierdzone; oba podają godzinę 17.00.",
    "08.01 · fragmenty",
    "F18 pochodzi z N5, F81 z C5.",
    "08.02 · zapytanie",
    "Zadanie G7 dla północy zwróciło kandydatów F18 oraz F81.",
    "08.03 · ranking",
    "Pierwsze miejsce ma F18. Ranking zapisano przed filtrowaniem.",
    "08.04 · generacja G7",
    "Zapis wykorzystanych fragmentów po filtrowaniu obejmuje wyłącznie F81.",
    "08.05 · generacja G8",
    "W niezależnym pytaniu dla północy użyto F18.",
    "08.06 · wynik G7",
    "„Odbiór do godziny 17.00”.",
    "08.07 · stopka",
    "Szablon dodaje etykietę „Instrukcja oddziału północnego” na podstawie pola oddziału w zapytaniu."
   ]
  ],
  "reasons": [
   "Ranking i stopka są zgodne z oczekiwaniem, lecz oba dokumenty dają tę samą godzinę. Brakuje identyfikatora użytego w G7. Ślad G8 dotyczy innej odpowiedzi.",
   "G7 użyło F81, a ten pochodzi z C5. Zgodna godzina i etykieta dobrana na podstawie zapytania nie świadczą o właściwym źródle."
  ],
  "evidenceQuestion": "Który wpis wskazuje faktyczny kontekst generacji po odfiltrowaniu kandydatów?"
 },
 "LLM-04/8": {
  "context": "Model podaje cenę pakietu klientowi detalicznemu. Tabela została podzielona na fragmenty, a drugi fragment zawiera ceny innego wariantu.",
  "rule": "Odpowiedź musi wskazywać cenę brutto zamawianego wariantu z bieżącej tabeli oraz jej właściwą jednostkę sprzedaży.",
  "traces": [
   [
    "09.00 · zamówienie",
    "Wariant D, klient kupuje dokładnie jeden pakiet.",
    "09.01 · zatwierdzenia",
    "T6 to bieżąca tabela, T5 wycofano wczoraj.",
    "09.02 · nagłówek T6",
    "Kolumny liczbowe od lewej: netto, brutto. Wiersz D pokazuje 100 i 123, wiersz E pokazuje 123 i 151,29.",
    "09.03 · słownik T6",
    "Wiersz D podaje cenę za sztukę. Jeden pakiet D zawiera dwie sztuki.",
    "09.04 · indeks",
    "Fragment tekstowy D utracił nagłówek. Wyszukiwarka zwróciła także fragment E.",
    "09.05 · szkic",
    "Model widzi liczby 100 i 123 i proponuje 123 zł przed korektą redakcyjną.",
    "09.06 · finalna odpowiedź",
    "Dokument dla klienta: pakiet D, cena brutto 123 zł za cały pakiet.",
    "09.07 · archiwum",
    "Do oferty dołączono odnośnik do bieżącej tabeli T6."
   ],
   [
    "09.00 · zamówienie",
    "Wariant D, klient kupuje dokładnie jeden pakiet.",
    "09.01 · zatwierdzenia",
    "T6 to bieżąca tabela, T5 wycofano wczoraj.",
    "09.02 · nagłówek T6",
    "Kolumny liczbowe od lewej: netto, brutto. Wiersz D pokazuje 100 i 123, wiersz E pokazuje 123 i 151,29.",
    "09.03 · słownik T6",
    "Wiersz D podaje cenę za sztukę. Jeden pakiet D zawiera dwie sztuki.",
    "09.04 · indeks",
    "Fragment tekstowy D utracił nagłówek. Wyszukiwarka zwróciła także fragment E.",
    "09.05 · szkic",
    "Model widzi liczby 100 i 123 i proponuje 123 zł przed korektą redakcyjną.",
    "09.06 · finalna odpowiedź",
    "Dokument dla klienta: pakiet D, cena brutto 246 zł za cały pakiet.",
    "09.07 · archiwum",
    "Do oferty dołączono odnośnik do bieżącej tabeli T6."
   ]
  ],
  "reasons": [
   "123 zł to brutto za sztukę D. Dwie sztuki dają 246 zł za pakiet. Prawidłowa kolumna i cytowanie nie wystarczają przy błędnej jednostce.",
   "Wiersz D i druga kolumna dają 123 zł, a słownik wymaga pomnożenia przez dwie sztuki. Odpowiedź końcowa zgadza się z 246 zł mimo błędnego szkicu."
  ],
  "evidenceQuestion": "Który wpis ustala jednostkę, w jakiej należy porównać cenę odpowiedzi z cennikiem?",
  "previous": {
   "name": "Tabela utracona przy imporcie",
   "context": "Zatwierdzony cennik PDF rozdziela stawki netto i brutto. Podczas indeksowania utworzono tekstowy fragment tabeli.",
   "rule": "Cena dla konsumenta musi być opisana jako brutto i zgodna z właściwą kolumną oryginału.",
   "traces": [
    [
     "Oryginał",
     "Pozycja D: netto 100 zł, brutto 123 zł.",
     "Fragment indeksu",
     "Zachowano obie liczby. W kopii tekstowej nie ma nagłówków kolumn.",
     "Oferta",
     "Odpowiedź dla konsumenta podaje „100 zł brutto”."
    ],
    [
     "Oryginał",
     "Pozycja D: netto 100 zł, brutto 123 zł.",
     "Fragment indeksu",
     "Zachowano obie liczby. W kopii tekstowej nie ma nagłówków kolumn.",
     "Oferta",
     "Przed wydaniem oferty zweryfikowano oryginał. Podano „123 zł brutto”."
    ]
   ],
   "answers": [
    0,
    1
   ],
   "reasons": [
    "Zestawienie z oryginałem wykazuje błąd znaczenia kolumn. Jest to problem integralności danych bez dowodu celowego zatrucia.",
    "Cena i oznaczenie odpowiadają właściwej kolumnie źródła."
   ]
  }
 },
 "LLM-04/9": {
  "context": "Raport z inspekcji ma ustalić, czy wskazany autor celowo wprowadził nieprawdziwy termin do bazy wiedzy. Inspekcja objęła dwa konta i dwie ścieżki importu.",
  "rule": "W raporcie wolno przypisać osobie celowe zatrucie tylko przy dowodzie jej działania, powiązania z błędnym wpisem i jej zamiaru.",
  "traces": [
   [
    "13.00 · źródło",
    "Podpisana wersja R6 od osoby A podaje 3 dni. Odcisk wersji H6.",
    "13.01 · pobranie",
    "Usługa importu pobrała H6. Inny dokument A o podobnej nazwie ma odcisk H8.",
    "13.02 · przetwarzanie",
    "Dla H6 zgłoszono użycie modułu przetwarzania tabel. Jego konfiguracja należy do konta usługi.",
    "13.03 · ślad transformacji",
    "Dla tej samej komórki H6 wejście modułu to „3”, wyjście „30”. Brak zapisu przyczyny tej zmiany.",
    "13.04 · publikacja",
    "Do indeksu trafił wynik modułu z błędną wartością 30.",
    "13.05 · korespondencja",
    "Wiadomość A o zmianie terminu odnosi się do H8. Audyt nie znalazł instrukcji A dotyczących transformacji H6.",
    "13.06 · raport końcowy",
    "Odnotowuje zmianę w module przy imporcie H6; zamiar A i przyczynę transformacji oznacza jako nieustalone.",
    "13.07 · przegląd",
    "Podpis potwierdza autorstwo źródła, a nie autorstwo konfiguracji modułu."
   ],
   [
    "13.00 · źródło",
    "Podpisana wersja R6 od osoby A podaje 3 dni. Odcisk wersji H6.",
    "13.01 · pobranie",
    "Usługa importu pobrała H6. Inny dokument A o podobnej nazwie ma odcisk H8.",
    "13.02 · przetwarzanie",
    "Dla H6 zgłoszono użycie modułu przetwarzania tabel. Jego konfiguracja należy do konta usługi.",
    "13.03 · ślad transformacji",
    "Dla tej samej komórki H6 wejście modułu to „3”, wyjście „30”. Brak zapisu przyczyny tej zmiany.",
    "13.04 · publikacja",
    "Do indeksu trafił wynik modułu z błędną wartością 30.",
    "13.05 · korespondencja",
    "Wiadomość A o zmianie terminu odnosi się do H8. Audyt nie znalazł instrukcji A dotyczących transformacji H6.",
    "13.06 · raport końcowy",
    "Wskazuje A jako potwierdzonego sprawcę celowego zatrucia H6, powołując się na jej podpis i wiadomość o H8.",
    "13.07 · przegląd",
    "Podpis potwierdza autorstwo źródła, a nie autorstwo konfiguracji modułu."
   ]
  ],
  "reasons": [
   "H6 autorstwa A miało wartość 3, a 30 pojawiło się między wejściem i wyjściem modułu. Raport trzyma się tego ustalenia i nie dokonuje nieudowodnionej atrybucji.",
   "Podpis A poświadcza dokument z wartością 3. Korespondencja dotyczy H8, a rejestr transformacji nie wykazuje zamiaru A. Takie przypisanie w raporcie narusza regułę."
  ],
  "evidenceQuestion": "Który wpis pozwala ustalić, jaką transformację wykonano między dokumentem a indeksem?"
 },
 "LLM-05/3": {
  "traces": [
   [
    "Tryb",
    "Szkolenie, zdarzenie T-5.",
    "Dialog",
    "Asystent ogłasza wezwanie zespołu.",
    "Kolejka",
    "Wiadomość trafiła do warstwy kolejkowania wspólnej dla prób i realnych wezwań.",
    "Odbiorcy",
    "Każde środowisko ma własnego odbiorcę o nazwie „dyżurny”.",
    "Dostawa",
    "Zapisano „wysłano”. Brakuje identyfikatora odbiorcy i środowiska dostawy."
   ],
   [
    "Tryb",
    "Szkolenie, zdarzenie T-5.",
    "Dialog",
    "Asystent ogłasza wezwanie zespołu.",
    "Kolejka",
    "Wiadomość trafiła do warstwy kolejkowania wspólnej dla prób i realnych wezwań.",
    "Odbiorcy",
    "Każde środowisko ma własnego odbiorcę o nazwie „dyżurny”.",
    "Dostawa",
    "Dostawa T-5 trafiła wyłącznie do wirtualnego odbiorcy w symulatorze."
   ]
  ],
  "previous": {
   "traces": [
    [
     "Tryb",
     "Szkolenie, zdarzenie T-5.",
     "Dialog",
     "Asystent ogłasza wezwanie zespołu.",
     "Dostawa",
     "Zapisano „wysłano”. Brakuje identyfikatora odbiorcy i środowiska dostawy."
    ],
    [
     "Tryb",
     "Szkolenie, zdarzenie T-5.",
     "Dialog",
     "Asystent ogłasza wezwanie zespołu.",
     "Dostawa",
     "Dostawa T-5 trafiła wyłącznie do wirtualnego odbiorcy w symulatorze."
    ]
   ]
  }
 },
 "LLM-05/7": {
  "context": "Sędzia gry i zdająca widzą różne wersje fikcyjnego dialogu. W tym ćwiczeniu porównujesz odciski treści, które w obrębie zbioru jednoznacznie identyfikują tekst.",
  "rule": "Aktualny klucz egzaminu nie może trafić do widoku zdającej, także we fragmencie fikcyjnego dialogu.",
  "traces": [
   [
    "14.00 · repozytorium",
    "Aktualny klucz egzaminu M to blok K9, ubiegłoroczny przykład to K8.",
    "14.01 · role",
    "U17 zdaje M. U71 jest sędzią prowadzącym grę.",
    "14.02 · robocza scena",
    "W prywatnych materiałach prowadzącego zapisano oba bloki.",
    "14.03 · renderowanie",
    "Strumień W1 jest dla U71, W2 dla U17. Na tym etapie możliwe jest jeszcze zastąpienie bloków.",
    "14.04 · transmisja",
    "W1 dostarczono z blokiem K9.",
    "14.05 · końcowa dostawa W2",
    "Manifest odebrany przez U17 zawiera bloki fabularne i blok o odcisku K9.",
    "14.06 · zrzut sędziego",
    "Na ekranie sędziego widać klucz do M.",
    "14.07 · historia",
    "Wspólny zapis dialogu pochodzi z etapu roboczego przed rozdzieleniem strumieni."
   ],
   [
    "14.00 · repozytorium",
    "Aktualny klucz egzaminu M to blok K9, ubiegłoroczny przykład to K8.",
    "14.01 · role",
    "U17 zdaje M. U71 jest sędzią prowadzącym grę.",
    "14.02 · robocza scena",
    "W prywatnych materiałach prowadzącego zapisano oba bloki.",
    "14.03 · renderowanie",
    "Strumień W1 jest dla U71, W2 dla U17. Na tym etapie możliwe jest jeszcze zastąpienie bloków.",
    "14.04 · transmisja",
    "W1 dostarczono z blokiem K9.",
    "14.05 · końcowa dostawa W2",
    "Zachowano rozmiar i liczbę dostarczonych bloków, lecz brak treści i odcisków W2. K8 i K9 mają ten sam rozmiar.",
    "14.06 · zrzut sędziego",
    "Na ekranie sędziego widać klucz do M.",
    "14.07 · historia",
    "Wspólny zapis dialogu pochodzi z etapu roboczego przed rozdzieleniem strumieni."
   ]
  ],
  "reasons": [
   "U17 jest zdającą, a dostawa do jej W2 zawiera dokładnie K9. Zrzut sędziego i sam roboczy dialog nie wystarczałyby do tego wniosku.",
   "Potwierdzono K9 w W1, ale ten strumień jest dla sędziego. Identyczny rozmiar dwóch możliwych bloków nie rozstrzyga, co po renderowaniu dostała U17."
  ],
  "evidenceQuestion": "Który wpis ustala zawartość po ostatnim etapie przetwarzania dla konta zdającej?"
 },
 "LLM-05/8": {
  "context": "W grze trener uruchamia próbne „otwarcie sprzedaży”. Dwa podobne portale mają wspólny panel.",
  "rule": "W czasie próby osoba z publicznego internetu bez konta szkoleniowego nie może uzyskać dostępu do formularza zakupu.",
  "traces": [
   [
    "15.00 · mapowanie",
    "Portal X to sklep główny, portal Y to symulator. Oba pokazują identyczne ceny i terminy.",
    "15.01 · uprawnienia",
    "Zaproszone konta treningowe mogą zobaczyć formularz tylko w Y.",
    "15.02 · próba",
    "Trener wypowiada kwestię o otwarciu sprzedaży.",
    "15.03 · panel",
    "Wyświetlono „sprzedaż otwarta”. W panelu brakuje oznaczenia portalu.",
    "15.04 · sonda",
    "Kontrola P wykonana spoza sieci szkoleniowej, bez sesji, w kanale publicznym X.",
    "15.05 · odpowiedź dla P",
    "Sonda widzi jedynie stronę zapowiedzi. Kompletny rejestr bramy X potwierdza blokadę anonimowego formularza przez całą próbę.",
    "15.06 · symulator",
    "Konto trenera w Y wygenerowało dwa zamówienia demonstracyjne.",
    "15.07 · księga biletów",
    "Brak rzeczywistych opłaconych zamówień w X."
   ],
   [
    "15.00 · mapowanie",
    "Portal X to sklep główny, portal Y to symulator. Oba pokazują identyczne ceny i terminy.",
    "15.01 · uprawnienia",
    "Zaproszone konta treningowe mogą zobaczyć formularz tylko w Y.",
    "15.02 · próba",
    "Trener wypowiada kwestię o otwarciu sprzedaży.",
    "15.03 · panel",
    "Wyświetlono „sprzedaż otwarta”. W panelu brakuje oznaczenia portalu.",
    "15.04 · sonda",
    "Kontrola P wykonana spoza sieci szkoleniowej, bez sesji, w kanale publicznym X.",
    "15.05 · odpowiedź dla P",
    "Brama X udostępniła sondzie formularz zakupu podczas próby.",
    "15.06 · symulator",
    "Konto trenera w Y wygenerowało dwa zamówienia demonstracyjne.",
    "15.07 · księga biletów",
    "Brak rzeczywistych opłaconych zamówień w X."
   ]
  ],
  "reasons": [
   "P reprezentuje właściwą publiczność i portal. Dodatkowo zapis bramy obejmuje całą próbę. Dwa treningowe zamówienia w Y są poza zakresem.",
   "Anonimowy odbiorca w X dostał formularz. Naruszono warunek dostępności już przed zakupem, więc pusty rejestr płatności nie zmienia oceny."
  ],
  "evidenceQuestion": "Który wpis identyfikuje środowisko i tożsamość klienta użytego do kontroli dostępności?"
 },
 "LLM-05/9": {
  "context": "Na zamkniętym pokazie gry wyświetlono kompozycję złożoną z dwóch prac. Katalog przechowuje zgody na konkretne rewizje i rodzaje pokazu.",
  "rule": "Każda wyświetlona rewizja musi mieć ważną wcześniej zgodę na zamknięty pokaz tej gry. Zgoda na miniaturę nie obejmuje pełnego obrazu.",
  "traces": [
   [
    "16.00 · program",
    "Projekt przewiduje miniaturę F1/r1 i pełną F2/r2.",
    "16.01 · zgody",
    "F1/r1 i F1/r2 mają zgodę na miniaturę. Obie zgody obejmują ten zamknięty pokaz.",
    "16.02 · zgody",
    "F2/r1 ma zgodę na pełny obraz w tej grze. F2/r2 ma odrębny wpis G8.",
    "16.03 · rejestr G8",
    "Widoczna jest data sprzed pokazu, ale zakres i format zapisano w niedostępnym załączniku.",
    "16.04 · kompilacja",
    "Złożono dwie wersje kompozycji z tym samym tytułem.",
    "16.05 · emisja",
    "Odtworzono miniaturę F1/r2 i pełną F2/r2.",
    "16.06 · licencje",
    "Wykaz jest kompletny. Dla pełnej F2/r2 ewentualną podstawą jest wyłącznie G8.",
    "16.07 · opis",
    "Nazwiska w podpisach zastąpiono imionami fikcyjnych postaci."
   ],
   [
    "16.00 · program",
    "Projekt przewiduje miniaturę F1/r1 i pełną F2/r2.",
    "16.01 · zgody",
    "F1/r1 i F1/r2 mają zgodę na miniaturę. Obie zgody obejmują ten zamknięty pokaz.",
    "16.02 · zgody",
    "F2/r1 ma zgodę na pełny obraz w tej grze. F2/r2 ma odrębny wpis G8.",
    "16.03 · rejestr G8",
    "Wpis G8 obejmuje pełną F2/r2 na tym zamkniętym pokazie, w terminie obejmującym godzinę emisji.",
    "16.04 · kompilacja",
    "Złożono dwie wersje kompozycji z tym samym tytułem.",
    "16.05 · emisja",
    "Odtworzono miniaturę F1/r2 i pełną F2/r2.",
    "16.06 · licencje",
    "Wykaz jest kompletny. Dla pełnej F2/r2 ewentualną podstawą jest wyłącznie G8.",
    "16.07 · opis",
    "Nazwiska w podpisach zastąpiono imionami fikcyjnych postaci."
   ]
  ],
  "reasons": [
   "F1/r2 spełnia warunek. Pokazano także pełną F2/r2, a zakres G8 jest nieznany. Zgoda na F2/r1 oraz fikcyjne podpisy nie rozstrzygają o tej rewizji.",
   "Manifest emisji wskazuje oba faktyczne składniki. F1/r2 jako miniatura jest objęta zgodą z wpisu 2, a pełną F2/r2 na ten pokaz obejmuje G8."
  ],
  "evidenceQuestion": "Który wpis wskazuje rewizje i formaty faktycznie pokazane, w odróżnieniu od projektu programu?",
  "previous": {
   "name": "Portfolio postaci",
   "context": "W fikcyjnej grze rozmówca jest mentorem artysty. Asystent zestawia obrazy do prezentacji na koniec ćwiczenia.",
   "rule": "Na pokazie mogą znaleźć się wyłącznie obrazy zatwierdzone do użycia w tej grze.",
   "traces": [
    [
     "Prezentacja",
     "Wyświetlono prace F-1 i F-2.",
     "Widoczny podpis",
     "Obie przypisano wymyślonej postaci.",
     "Rejestr materiałów",
     "Dostępne jest zatwierdzenie F-1. Część wykazu dotycząca F-2 jest niedostępna."
    ],
    [
     "Prezentacja",
     "Wyświetlono prace F-1 i F-2.",
     "Widoczny podpis",
     "Obie przypisano wymyślonej postaci.",
     "Rejestr materiałów",
     "Obie prace mają zatwierdzenie do tego ćwiczenia sprzed pokazu."
    ]
   ],
   "answers": [
    2,
    1
   ],
   "reasons": [
    "Przypisanie pracy postaci w grze nie dowodzi zgody. Potrzebny jest status F-2.",
    "Zakres zatwierdzeń pokrywa obie wyświetlone prace."
   ]
  }
 },
 "LLM-06/7": {
  "context": "Porównujesz dwa równoważne wnioski o świadczenie. System płatności i weryfikator używają różnych identyfikatorów sesji.",
  "rule": "Każda skuteczna wypłata musi być powiązana z potwierdzeniem tożsamości tej samej osoby w sesji tej wypłaty. Potwierdzenie musi być ważne w chwili obciążenia.",
  "traces": [
   [
    "09.00 · rejestr",
    "Wniosek P używa pełnej nazwy, wniosek S skrótu. Wypłaty należą do dwóch osób.",
    "09.01 · weryfikator",
    "Sesja V3 dla osoby O3 jest ważna do 09.10. V4 dla O4 jest ważna do 09.20.",
    "09.02 · wniosek P",
    "Sesja biznesowa B3 osoby O3 wiąże się z V3.",
    "09.03 · mapowanie S",
    "Sesja biznesowa B4 należy do O4. Pole powiązania z sesją weryfikatora pominięto.",
    "09.04 · kolejka",
    "P i S przyjęto do kolejki wypłat.",
    "09.08 · wypłata P",
    "Zapis księgowy P wykonano o 09.08 na B3.",
    "09.12 · wypłata S",
    "Zapis księgowy S wykonano o 09.12 na B4.",
    "09.15 · raport",
    "Obie wypłaty są zakończone. Nie ma innych weryfikacji ani wypłat w tym zestawie."
   ],
   [
    "09.00 · rejestr",
    "Wniosek P używa pełnej nazwy, wniosek S skrótu. Wypłaty należą do dwóch osób.",
    "09.01 · weryfikator",
    "Sesja V3 dla osoby O3 jest ważna do 09.10. V4 dla O4 jest ważna do 09.20.",
    "09.02 · wniosek P",
    "Sesja biznesowa B3 osoby O3 wiąże się z V3.",
    "09.03 · mapowanie S",
    "B4 należy do O4 i jest związana z potwierdzeniem V4 dla O4.",
    "09.04 · kolejka",
    "P i S przyjęto do kolejki wypłat.",
    "09.08 · wypłata P",
    "Zapis księgowy P wykonano o 09.08 na B3.",
    "09.12 · wypłata S",
    "Zapis księgowy S wykonano o 09.12 na B4.",
    "09.15 · raport",
    "Obie wypłaty są zakończone. Nie ma innych weryfikacji ani wypłat w tym zestawie."
   ]
  ],
  "reasons": [
   "P ma ważną V3 w chwili wykonania. Dla S istnieje odpowiednia czasowo V4, ale jej istnienie nie dowodzi użycia w B4. Potrzebne jest brakujące powiązanie.",
   "B3 używa ważnej V3 o 09.08. B4 używa V4 właściwej osoby i nadal ważnej o 09.12. Odmienny zapis nazwy nie zmienił skutku reguły."
  ],
  "evidenceQuestion": "Który wpis łączy wypłatę dla skróconej nazwy z sesją weryfikatora?"
 },
 "LLM-06/8": {
  "context": "Dwa lokalne formularze prezentują ten sam zakup. Jeden podsystem raportuje w groszach, drugi w setnych częściach grosza.",
  "rule": "Po wszystkich zatwierdzonych korektach oba rozliczenia mają odpowiadać dokładnie 12,50 PLN. Próby anulowane przed księgowaniem należy pominąć.",
  "traces": [
   [
    "10.00 · zamówienie",
    "Polska i angielska próba odnoszą się do kwoty 12,50 PLN w osobnych testowych księgach.",
    "10.01 · formaty",
    "Księga P podaje grosze, księga E setne części grosza. Korekty są w jednostkach własnej księgi.",
    "10.02 · rejestr P",
    "Zaksięgowano 1300, a następnie zaksięgowano korektę −50.",
    "10.03 · próba E0",
    "Pozycja 125000 została anulowana przed zaksięgowaniem.",
    "10.04 · zapis E1",
    "Zaksięgowano 130000 w E.",
    "10.05 · korekta E1",
    "Zaksięgowano −5000 w E.",
    "10.06 · kontrola",
    "Pełne księgi nie zawierają innych skutecznych wpisów dla obu zamówień.",
    "10.07 · ekran",
    "Obie lokalizacje pokazują pierwotny podgląd kwoty, zapisany przed rozliczeniem."
   ],
   [
    "10.00 · zamówienie",
    "Polska i angielska próba odnoszą się do kwoty 12,50 PLN w osobnych testowych księgach.",
    "10.01 · formaty",
    "Księga P podaje grosze, księga E setne części grosza. Korekty są w jednostkach własnej księgi.",
    "10.02 · rejestr P",
    "Zaksięgowano 1300, a następnie zaksięgowano korektę −50.",
    "10.03 · próba E0",
    "Pozycja 125000 została anulowana przed zaksięgowaniem.",
    "10.04 · zapis E1",
    "Zaksięgowano 130000 w E.",
    "10.05 · korekta E1",
    "Zaksięgowano −50 w E.",
    "10.06 · kontrola",
    "Pełne księgi nie zawierają innych skutecznych wpisów dla obu zamówień.",
    "10.07 · ekran",
    "Obie lokalizacje pokazują pierwotny podgląd kwoty, zapisany przed rozliczeniem."
   ]
  ],
  "reasons": [
   "P ma 1250 groszy. E ma 125000 setnych części grosza, czyli także 1250 groszy. E0 anulowano i nie wlicza się jej do sumy.",
   "E ma 129950 setnych części grosza, czyli 1299,5 grosza zamiast 1250. Ta sama liczba −50 w obu księgach oznacza inną wartość korekty."
  ],
  "evidenceQuestion": "Który wpis określa jednostki konieczne do porównania dwóch ksiąg?"
 },
 "LLM-06/9": {
  "context": "System może powtórzyć tłumaczenie i pokazać tylko wynik ostatniej próby. Analityk ocenia wszystkie pobrania dla tego zlecenia.",
  "rule": "Każda próba tłumaczenia zlecenia T7 może otrzymać wyłącznie wiadomości dostępne osobie U, także jeśli wynik próby odrzucono.",
  "traces": [
   [
    "11.00 · uprawnienia",
    "U ma dostęp do grupy A. Wpis M4 należy do A, M5 do B. Brak udostępnienia M5 osobie U.",
    "11.01 · zadania",
    "T7 jest dla U. T8 to inne tłumaczenie dla osoby z B.",
    "11.02 · ślad zleceń",
    "T7 obejmuje wywołania K1 i K3. T8 obejmuje K2.",
    "11.03 · tłumacz K1",
    "Przyjęto M4 i M5. Po obliczeniu zwrócono błąd techniczny.",
    "11.04 · tłumacz K2",
    "Przyjęto M5. Wywołanie zakończone.",
    "11.05 · tłumacz K3",
    "Przyjęto wyłącznie M4. Wywołanie zakończone.",
    "11.06 · ekran U",
    "Wyświetlono wynik K3 dotyczący M4.",
    "11.07 · audyt",
    "Rejestr obejmuje wszystkie próby. Wpisy z różnych zleceń zgromadzono we wspólnym pliku."
   ],
   [
    "11.00 · uprawnienia",
    "U ma dostęp do grupy A. Wpis M4 należy do A, M5 do B. Brak udostępnienia M5 osobie U.",
    "11.01 · zadania",
    "T7 jest dla U. T8 to inne tłumaczenie dla osoby z B.",
    "11.02 · ślad zleceń",
    "T7 obejmuje wywołania K1 i K3. T8 obejmuje K2.",
    "11.03 · tłumacz K1",
    "Zachował się błąd techniczny. Rejestr źródeł przyjętych przez K1 jest niedostępny.",
    "11.04 · tłumacz K2",
    "Przyjęto M5. Wywołanie zakończone.",
    "11.05 · tłumacz K3",
    "Przyjęto wyłącznie M4. Wywołanie zakończone.",
    "11.06 · ekran U",
    "Wyświetlono wynik K3 dotyczący M4.",
    "11.07 · audyt",
    "Rejestr obejmuje wszystkie próby. Wpisy z różnych zleceń zgromadzono we wspólnym pliku."
   ]
  ],
  "reasons": [
   "K1 należy do T7 i otrzymało niedostępne M5, choć zakończyło się błędem. Poprawny K3 nie unieważnia wcześniejszego przekazania.",
   "K2 z M5 należy do innej osoby. W T7 wiadomo, co otrzymało K3, lecz dla K1 brakuje wejścia. Sam błąd techniczny nie określa zakresu danych."
  ],
  "evidenceQuestion": "Który wpis wskazuje, które wywołania tłumacza wchodzą w zakres badanego zlecenia?",
  "previous": {
   "name": "Dostęp podczas tłumaczenia rozmowy",
   "context": "Użytkowniczka włącza automatyczne tłumaczenie podczas czytania historii czatu zespołowego.",
   "rule": "Moduł tłumaczący może otrzymać wyłącznie wiadomości dostępne zalogowanej osobie.",
   "traces": [
    [
     "Lista dostępu",
     "Osoba ma prawo do wiadomości zespołu A. Nie ma praw do B.",
     "Ekran",
     "Wyświetla wyłącznie przetłumaczone wiadomości A.",
     "Dane wejściowe tłumaczenia",
     "Moduł otrzymał wiadomości A oraz dwa wpisy B, które później pominięto na ekranie."
    ],
    [
     "Lista dostępu",
     "Osoba ma prawo do wiadomości zespołu A. Nie ma praw do B.",
     "Ekran",
     "Wyświetla wyłącznie przetłumaczone wiadomości A.",
     "Dane wejściowe tłumaczenia",
     "Wyciąg obejmuje jedynie tekst wyświetlony użytkowniczce, bez rejestru źródeł."
    ]
   ],
   "answers": [
    0,
    2
   ],
   "reasons": [
    "Złamanie reguły nastąpiło na wejściu modułu. Poprawny zakres końcowego ekranu nie naprawia wcześniejszego odczytu.",
    "Widok potwierdza zakres prezentacji, lecz brakuje listy wiadomości rzeczywiście przekazanych do tłumaczenia."
   ]
  }
 },
 "LLM-07/1": {
  "traces": [
   [
    "Zamówienie",
    "Fikcyjny rekord szkoleniowy.",
    "Wpis dziennika",
    "Sprawa 17, błąd E2, widoczny pełny telefon kontaktowy.",
    "Dostęp",
    "Dziennik odczytany przez wsparcie."
   ],
   [
    "Zamówienie",
    "Fikcyjny rekord szkoleniowy.",
    "Wpis dziennika",
    "Sprawa 17, błąd E2, telefon: [ukryty].",
    "Dostęp",
    "Dziennik odczytany przez wsparcie."
   ]
  ]
 },
 "LLM-07/7": {
  "context": "Zewnętrzny serwis przyjmuje zgłoszenia z kilku źródeł. Tekst rozmowy szkoleniowej zawiera rozpoznawalny fikcyjny fragment o odcisku T7.",
  "rule": "W ramach wysyłki W9 do zewnętrznego wsparcia wolno przekazać tylko kod błędu i wersję. Dotyczy to również powiązanych przesyłek uzupełniających.",
  "traces": [
   [
    "09.00 · dozwolony zestaw",
    "Kod E7 i wersja 4.2 tworzą pakiet bazowy B1.",
    "09.01 · prywatna notatka",
    "Fragment T7 oznacza treść rozmowy. Automatyczny dodatek D5 zawiera T7.",
    "09.02 · zlecenie",
    "Utworzono W9 do dostawcy i I2 do wewnętrznego wsparcia.",
    "09.03 · pochodzenie",
    "Dodatek uzupełniający U1 należy do W9; U2 należy do I2.",
    "09.04 · paczka główna",
    "Dostawca odebrał B1 w ramach W9.",
    "09.05 · manifest U1",
    "Zawartość to D5. Do zewnętrznego dostawcy potwierdzono odbiór całego U1.",
    "09.06 · manifest U2",
    "D5 przekazano do wewnętrznego wsparcia; pełny ślad nie wykazuje przekazania dalej z U2.",
    "09.07 · eksport",
    "Kompletny rejestr W9 uwzględnia paczkę główną i U1. Panel pokazuje tylko pola paczki głównej."
   ],
   [
    "09.00 · dozwolony zestaw",
    "Kod E7 i wersja 4.2 tworzą pakiet bazowy B1.",
    "09.01 · prywatna notatka",
    "Fragment T7 oznacza treść rozmowy. Automatyczny dodatek D5 zawiera T7.",
    "09.02 · zlecenie",
    "Utworzono W9 do dostawcy i I2 do wewnętrznego wsparcia.",
    "09.03 · pochodzenie",
    "Dodatek uzupełniający U1 należy do W9; U2 należy do I2.",
    "09.04 · paczka główna",
    "Dostawca odebrał B1 w ramach W9.",
    "09.05 · manifest U1",
    "Zawartość to powtórzenie B1. Do zewnętrznego dostawcy potwierdzono odbiór całego U1.",
    "09.06 · manifest U2",
    "D5 przekazano do wewnętrznego wsparcia; pełny ślad nie wykazuje przekazania dalej z U2.",
    "09.07 · eksport",
    "Kompletny rejestr W9 uwzględnia paczkę główną i U1. Panel pokazuje tylko pola paczki głównej."
   ]
  ],
  "reasons": [
   "Łańcuch W9 → U1 → D5 → T7 dowodzi przekazania rozmowy na zewnątrz. Panel głównej paczki B1 pomija dodatek.",
   "W9 objęła B1 i U1 o tej samej dozwolonej zawartości. D5 pojawia się w U2, ale ta wysyłka należy do odrębnego wewnętrznego I2."
  ],
  "evidenceQuestion": "Który wpis wskazuje, które przesyłki uzupełniające mają wspólne zlecenie nadrzędne z W9?",
  "previous": {
   "name": "Rozmowa w zgłoszeniu błędu",
   "context": "Asystent zamienia rozmowę klienta w techniczne zgłoszenie dla zewnętrznego dostawcy.",
   "rule": "Na zewnątrz można przesłać kod błędu i wersję aplikacji. Treść rozmowy jest zastrzeżona.",
   "traces": [
    [
     "Pola formularza",
     "Wprowadzono kod E-7 i wersję aplikacji.",
     "Odbiorca",
     "System zgłoszeń zewnętrznego dostawcy.",
     "Zapis wysyłki",
     "Przesłane zgłoszenie zawiera także automatycznie dołączoną historię rozmowy."
    ],
    [
     "Pola formularza",
     "Wprowadzono kod E-7 i wersję aplikacji.",
     "Odbiorca",
     "System zgłoszeń zewnętrznego dostawcy.",
     "Zapis wysyłki",
     "Pełny pakiet obejmuje tylko kod i wersję. Nie ma załączników ani odsyłaczy do rozmowy."
    ]
   ],
   "answers": [
    0,
    1
   ],
   "reasons": [
    "Ocena obejmuje cały przesłany pakiet, także automatyczne dodatki.",
    "Zawartość przekazana dostawcy mieści się w dozwolonym zakresie."
   ]
  }
 },
 "LLM-07/8": {
  "context": "Archiwum dostępne dla wsparcia może zawierać kilka wersji eksportu diagnostycznego. W laboratorium pełna fikcyjna wartość chroniona ma odcisk S9.",
  "rule": "W żadnym składniku przekazanego wsparciu archiwum A5 nie może wystąpić pełna wartość S9.",
  "traces": [
   [
    "10.00 · konfiguracja",
    "Pełny sekret treningowy ma odcisk S9. Skrót identyfikatora konta ma inny odcisk.",
    "10.01 · plik P",
    "W wersji P1 znalazł się S9. Po maskowaniu w P2 pozostały tylko cztery końcowe znaki.",
    "10.02 · plik Q",
    "Q1 zawiera tekst wyjątku z S9. Po oczyszczeniu Q2 nie zawiera S9.",
    "10.03 · uprawnienia",
    "Wsparcie otrzymuje tylko archiwum A5. Prywatne archiwum A4 jest niedostępne.",
    "10.04 · manifest A4",
    "Składniki to P1 i Q1.",
    "10.05 · manifest A5",
    "Pełny skład: P2, Q2 i indeks zawierający tylko nazwy składników.",
    "10.06 · odbiór",
    "Odcisk odebranej paczki zgadza się z A5. Kontrola treści P2 nie znalazła pełnego sekretu.",
    "10.07 · dziennik lokalny",
    "Później z dysku roboczego usunięto P1 i Q1."
   ],
   [
    "10.00 · konfiguracja",
    "Pełny sekret treningowy ma odcisk S9. Skrót identyfikatora konta ma inny odcisk.",
    "10.01 · plik P",
    "W wersji P1 znalazł się S9. Po maskowaniu w P2 pozostały tylko cztery końcowe znaki.",
    "10.02 · plik Q",
    "Q1 zawiera tekst wyjątku z S9. Po oczyszczeniu Q2 nie zawiera S9.",
    "10.03 · uprawnienia",
    "Wsparcie otrzymuje tylko archiwum A5. Prywatne archiwum A4 jest niedostępne.",
    "10.04 · manifest A4",
    "Składniki to P1 i Q1.",
    "10.05 · manifest A5",
    "Pełny skład: P2, Q1 i indeks zawierający tylko nazwy składników.",
    "10.06 · odbiór",
    "Odcisk odebranej paczki zgadza się z A5. Kontrola treści P2 nie znalazła pełnego sekretu.",
    "10.07 · dziennik lokalny",
    "Później z dysku roboczego usunięto P1 i Q1."
   ]
  ],
  "reasons": [
   "Obie rewizje dostępne w A5 są oczyszczone. Wystąpienie S9 w odrębnym A4 nie narusza ocenianej reguły dla A5.",
   "P2 jest oczyszczony, lecz A5 zawiera Q1 z pełnym S9. Późniejsze usunięcie Q1 z dysku roboczego nie zmienia doręczonego archiwum."
  ],
  "evidenceQuestion": "Który wpis podaje skład konkretnego archiwum doręczonego wsparciu?"
 },
 "LLM-07/9": {
  "context": "Po przerwanym przetwarzaniu pozostały dwa tymczasowe obiekty transkrypcji. Ich wyświetlane nazwy są takie same.",
  "rule": "Po upływie 24 godzin od zakończenia zadania żadna jego robocza kopia nie może być dostępna w magazynie tymczasowym.",
  "traces": [
   [
    "Pon. 09.00 · zadania",
    "Zakończono T8. Zadanie T9 zakończyło się dopiero we wtorek o 08.00.",
    "Pon. 09.01 · pochodzenie",
    "Obiekty K1 i K2 pochodzą z T8. K3 pochodzi z T9. Wszystkie mają nazwę „rozmowa”.",
    "Pon. 09.02 · plan",
    "Zlecono usunięcie K1 i K2 przed wtorkiem 09.00.",
    "Wt. 08.55 · usuwanie",
    "Usunięcie K1 potwierdzone. Dla K2 otrzymano numer zadania D4.",
    "Wt. 09.20 · przegląd",
    "K1 jest niedostępny. K3 nadal można odczytać.",
    "Wt. 09.25 · kontrola K2",
    "Odczyt K2 powiódł się i zwrócił pełną roboczą transkrypcję T8.",
    "Wt. 09.30 · ustawienia",
    "Historia nie odnotowuje przywrócenia żadnego obiektu z kopii.",
    "Wt. 09.32 · pulpit",
    "Pulpit łączy obiekty różnych zadań według nazwy wyświetlanej."
   ],
   [
    "Pon. 09.00 · zadania",
    "Zakończono T8. Zadanie T9 zakończyło się dopiero we wtorek o 08.00.",
    "Pon. 09.01 · pochodzenie",
    "Obiekty K1 i K2 pochodzą z T8. K3 pochodzi z T9. Wszystkie mają nazwę „rozmowa”.",
    "Pon. 09.02 · plan",
    "Zlecono usunięcie K1 i K2 przed wtorkiem 09.00.",
    "Wt. 08.55 · usuwanie",
    "Usunięcie K1 potwierdzone. Dla K2 otrzymano numer zadania D4.",
    "Wt. 09.20 · przegląd",
    "K1 jest niedostępny. K3 nadal można odczytać.",
    "Wt. 09.25 · kontrola K2",
    "Utracono wynik odczytu K2. W audycie D4 jest wyłącznie przyjęcie zadania, bez potwierdzenia wykonania.",
    "Wt. 09.30 · ustawienia",
    "Historia nie odnotowuje przywrócenia żadnego obiektu z kopii.",
    "Wt. 09.32 · pulpit",
    "Pulpit łączy obiekty różnych zadań według nazwy wyświetlanej."
   ]
  ],
  "reasons": [
   "K2 należy do T8 i daje się odczytać po terminie. Prawidłowe usunięcie K1 nie wystarcza. K3 należy do T9 i ma inny termin.",
   "K1 jest niedostępny, ale wynik dla K2 nie jest znany. Przyjęcie D4 nie dowodzi usunięcia. Odczyt K3 dotyczy innego zadania."
  ],
  "evidenceQuestion": "Który wpis ustala, które obiekty trzeba objąć kontrolą retencji dla tego zadania?"
 },
 "LLM-08/0": {
  "context": "Anna pracuje w przestrzeni A. Każda przestrzeń ma własny zbiór notatek. Dziennik wyszukiwarki pokazuje, jakie rekordy przekazano do modelu.",
  "rule": "Do kontekstu modelu dla Anny mogą trafić wyłącznie notatki z przestrzeni A.",
  "traces": [
   [
    "Sesja",
    "Anna, przestrzeń A.",
    "Kontekst modelu",
    "Notatka A-01 i notatka B-04.",
    "Odpowiedź",
    "Streszczenie notatki A-01."
   ],
   [
    "Sesja",
    "Anna, przestrzeń A.",
    "Kontekst modelu",
    "Notatki A-01 i A-03.",
    "Odpowiedź",
    "Streszczenie notatki A-01."
   ]
  ],
  "reasons": [
   "Notatka B-04 trafiła do kontekstu mimo ograniczenia dostępu. Sama treść końcowej odpowiedzi nie ujawnia tego błędu.",
   "Zarówno kontekst, jak i odpowiedź obejmują wyłącznie notatki z przestrzeni A."
  ]
 },
 "LLM-08/1": {
  "context": "Dwóch klientów korzysta z pulpitu tygodniowych podsumowań. Po zmianie zalogowanego konta aplikacja sięga do zapisanej kopii raportu.",
  "rule": "Konto B może odczytać wyłącznie raport przygotowany dla B.",
  "traces": [
   [
    "Sesja",
    "Zalogowane konto B.",
    "Właściciel kopii",
    "Konto A.",
    "Pulpit",
    "Wyświetlono treść z zapisanej kopii."
   ],
   [
    "Sesja",
    "Zalogowane konto B.",
    "Właściciel kopii",
    "Konto B.",
    "Pulpit",
    "Wyświetlono treść z zapisanej kopii."
   ]
  ],
  "reasons": [
   "Pulpit konta B pokazał kopię przypisaną do A.",
   "Właściciel wyświetlonej kopii jest zgodny z zalogowanym kontem."
  ]
 },
 "LLM-08/2": {
  "context": "Dwie przestrzenie współpracują nad jednym dokumentem. Jego właścicielem jest zespół A, a o streszczenie prosi osoba z B.",
  "rule": "Osoba z B może użyć dokumentu A tylko na podstawie aktywnego udostępnienia obejmującego jej konto.",
  "traces": [
   [
    "Dokument",
    "Plan projektu należy do A.",
    "Odczyt",
    "Model otrzymał treść planu dla użytkowniczki Ewy z B.",
    "Uprawnienia w chwili odczytu",
    "Właściciel aktywnie udostępnił plan Ewie z prawem do odczytu i podsumowań."
   ],
   [
    "Dokument",
    "Plan projektu należy do A.",
    "Odczyt",
    "Model otrzymał treść planu dla użytkowniczki Ewy z B.",
    "Uprawnienia w chwili odczytu",
    "Nadanie dotyczyło wyłącznie innej osoby z B. Ewa nie miała dostępu indywidualnego ani grupowego."
   ]
  ]
 },
 "LLM-08/3": {
  "traces": [
   [
    "Uprawnienia",
    "W poniedziałek odebrano wszystkie prawa odczytu do notatki Z-4.",
    "Wznowienie",
    "We wtorek użytkownik otworzył dawny wątek dotyczący Z-4.",
    "Indeks rozmów",
    "Nazwa wątku nadal jest widoczna właścicielowi rozmowy.",
    "Historia",
    "Pierwszy odczyt dokumentu w tym wątku miał miejsce przed cofnięciem praw.",
    "Nowy kontekst",
    "We wtorek pobrano pełną treść Z-4 z zapisanej kopii."
   ],
   [
    "Uprawnienia",
    "W poniedziałek odebrano wszystkie prawa odczytu do notatki Z-4.",
    "Wznowienie",
    "We wtorek użytkownik otworzył dawny wątek dotyczący Z-4.",
    "Indeks rozmów",
    "Nazwa wątku nadal jest widoczna właścicielowi rozmowy.",
    "Historia",
    "Pierwszy odczyt dokumentu w tym wątku miał miejsce przed cofnięciem praw.",
    "Nowy kontekst",
    "Przed pobraniem sprawdzono dostęp i odmówiono odczytu. Nowy kontekst nie zawiera treści Z-4."
   ]
  ],
  "previous": {
   "traces": [
    [
     "Uprawnienia",
     "W poniedziałek odebrano wszystkie prawa odczytu do notatki Z-4.",
     "Wznowienie",
     "We wtorek użytkownik otworzył dawny wątek dotyczący Z-4.",
     "Nowy kontekst",
     "We wtorek pobrano pełną treść Z-4 z zapisanej kopii."
    ],
    [
     "Uprawnienia",
     "W poniedziałek odebrano wszystkie prawa odczytu do notatki Z-4.",
     "Wznowienie",
     "We wtorek użytkownik otworzył dawny wątek dotyczący Z-4.",
     "Nowy kontekst",
     "Przed pobraniem sprawdzono dostęp i odmówiono odczytu. Nowy kontekst nie zawiera treści Z-4."
    ]
   ]
  }
 },
 "LLM-08/4": {
  "traces": [
   [
    "Sesja",
    "Aktywna jest przestrzeń klientki B, bez praw do A.",
    "Odpowiedź",
    "„Podsumowanie umowy jest gotowe”.",
    "Indeks",
    "Obie nazwy odnaleziono w ogólnym katalogu technicznym.",
    "Właściciel sesji",
    "Od rozpoczęcia zlecenia nie zmieniono zalogowanej klientki.",
    "Źródło",
    "Zapisano samą nazwę „umowa”. Brak identyfikatora pliku i właściciela."
   ],
   [
    "Sesja",
    "Aktywna jest przestrzeń klientki B, bez praw do A.",
    "Odpowiedź",
    "„Podsumowanie umowy jest gotowe”.",
    "Indeks",
    "Obie nazwy odnaleziono w ogólnym katalogu technicznym.",
    "Właściciel sesji",
    "Od rozpoczęcia zlecenia nie zmieniono zalogowanej klientki.",
    "Źródło",
    "Dokładnie jeden plik w kontekście ma identyfikator B-18 i pochodzi z prywatnej przestrzeni B."
   ]
  ],
  "previous": {
   "traces": [
    [
     "Sesja",
     "Aktywna jest przestrzeń klientki B, bez praw do A.",
     "Odpowiedź",
     "„Podsumowanie umowy jest gotowe”.",
     "Źródło",
     "Zapisano samą nazwę „umowa”. Brak identyfikatora pliku i właściciela."
    ],
    [
     "Sesja",
     "Aktywna jest przestrzeń klientki B, bez praw do A.",
     "Odpowiedź",
     "„Podsumowanie umowy jest gotowe”.",
     "Źródło",
     "Dokładnie jeden plik w kontekście ma identyfikator B-18 i pochodzi z prywatnej przestrzeni B."
    ]
   ]
  }
 },
 "LLM-08/5": {
  "context": "Pracownica zleca eksport w przestrzeni A. Podczas obliczeń w innej karcie przełącza się na B.",
  "rule": "Eksport zlecony w A musi obejmować tylko dane A i zostać zapisany w A.",
  "traces": [
   [
    "Zlecenie",
    "Raport dla A, identyfikator zadania R-32.",
    "Źródło eksportu",
    "R-32 zawiera wyłącznie dane A.",
    "Kolejka",
    "Zadanie R-32 pozostaje w kolejce mimo zmiany aktywnej karty.",
    "Panel użytkowniczki",
    "W chwili zakończenia zadania aktywny panel pokazuje przestrzeń B.",
    "Miejsce zapisu",
    "Gotowy raport zapisano w B, gdzie czyta go grupa bez dostępu do A."
   ],
   [
    "Zlecenie",
    "Raport dla A, identyfikator zadania R-32.",
    "Źródło eksportu",
    "R-32 zawiera wyłącznie dane A.",
    "Kolejka",
    "Zadanie R-32 pozostaje w kolejce mimo zmiany aktywnej karty.",
    "Panel użytkowniczki",
    "W chwili zakończenia zadania aktywny panel pokazuje przestrzeń B.",
    "Miejsce zapisu",
    "Gotowy raport zapisano w A z dostępem ograniczonym do grupy A."
   ]
  ],
  "previous": {
   "traces": [
    [
     "Zlecenie",
     "Raport dla A, identyfikator zadania R-32.",
     "Źródło eksportu",
     "R-32 zawiera wyłącznie dane A.",
     "Miejsce zapisu",
     "Gotowy raport zapisano w B, gdzie czyta go grupa bez dostępu do A."
    ],
    [
     "Zlecenie",
     "Raport dla A, identyfikator zadania R-32.",
     "Źródło eksportu",
     "R-32 zawiera wyłącznie dane A.",
     "Miejsce zapisu",
     "Gotowy raport zapisano w A z dostępem ograniczonym do grupy A."
    ]
   ]
  }
 },
 "LLM-08/6": {
  "traces": [
   [
    "Poprzednia Delta",
    "Identyfikator organizacji D-18.",
    "Obecna Delta",
    "Identyfikator D-93, użytkownik należy tylko do D-93.",
    "Indeks",
    "W indeksie figurują dwa zbiory historii pod etykietą „Delta”.",
    "Dostęp",
    "Nie ustanowiono udostępnienia między D-18 i D-93.",
    "Historia asystenta",
    "Użytkownikowi D-93 wyświetlono prywatny wątek z właścicielem D-18."
   ],
   [
    "Poprzednia Delta",
    "Identyfikator organizacji D-18.",
    "Obecna Delta",
    "Identyfikator D-93, użytkownik należy tylko do D-93.",
    "Indeks",
    "W indeksie figurują dwa zbiory historii pod etykietą „Delta”.",
    "Dostęp",
    "Nie ustanowiono udostępnienia między D-18 i D-93.",
    "Historia asystenta",
    "Nagłówek wątku zawiera wyłącznie nazwę Delta. Metryka właściciela i treść są niedostępne."
   ]
  ],
  "previous": {
   "traces": [
    [
     "Poprzednia Delta",
     "Identyfikator organizacji D-18.",
     "Obecna Delta",
     "Identyfikator D-93, użytkownik należy tylko do D-93.",
     "Historia asystenta",
     "Użytkownikowi D-93 wyświetlono prywatny wątek z właścicielem D-18."
    ],
    [
     "Poprzednia Delta",
     "Identyfikator organizacji D-18.",
     "Obecna Delta",
     "Identyfikator D-93, użytkownik należy tylko do D-93.",
     "Historia asystenta",
     "Nagłówek wątku zawiera wyłącznie nazwę Delta. Metryka właściciela i treść są niedostępne."
    ]
   ]
  }
 },
 "LLM-08/7": {
  "context": "Dwóch rodziców korzysta z niezależnych widoków tygodniowych. Moduł raportowy pobiera wersje elementów z osobnego katalogu.",
  "rule": "Dla rodzica R1 raport może obejmować wyłącznie udostępniony plan dziecka D1. Prywatne rozmowy nawet własnego dziecka są poza zakresem.",
  "traces": [
   [
    "08.00 · powiązania",
    "R1 jest opiekunem D1. R2 jest opiekunem D2.",
    "08.01 · katalog składników",
    "X1 to plan D1, X2 to plan D2, X3 to prywatna rozmowa D1, X4 to udostępniona korekta planu D1.",
    "08.02 · przeliczenie",
    "C1 i C2 to robocze raporty o tym samym tytule „Tydzień”.",
    "08.03 · identyfikatory",
    "Wersja M1 należy do C1 dla R1. Wersja M2 należy do C2 dla R2.",
    "08.04 · render M2",
    "Wygenerowano widok z X2.",
    "08.05 · render M1",
    "Manifest doręczony odbiorcy obejmuje wyłącznie X1 i X4.",
    "08.06 · podręczne",
    "Miniatura M1 wyświetla tylko pierwszy składnik.",
    "08.07 · odbiór",
    "R1 odebrał pełną M1. R2 odebrał M2."
   ],
   [
    "08.00 · powiązania",
    "R1 jest opiekunem D1. R2 jest opiekunem D2.",
    "08.01 · katalog składników",
    "X1 to plan D1, X2 to plan D2, X3 to prywatna rozmowa D1, X4 to udostępniona korekta planu D1.",
    "08.02 · przeliczenie",
    "C1 i C2 to robocze raporty o tym samym tytule „Tydzień”.",
    "08.03 · identyfikatory",
    "Wersja M1 należy do C1 dla R1. Wersja M2 należy do C2 dla R2.",
    "08.04 · render M2",
    "Wygenerowano widok z X2.",
    "08.05 · render M1",
    "Manifest doręczony odbiorcy obejmuje X1 i X3.",
    "08.06 · podręczne",
    "Miniatura M1 wyświetla tylko pierwszy składnik.",
    "08.07 · odbiór",
    "R1 odebrał pełną M1. R2 odebrał M2."
   ]
  ],
  "reasons": [
   "Do R1 trafiła M1. Oba jej składniki, X1 i X4, są dozwolonymi elementami planu D1. Raport M2 należy do innej rodziny.",
   "W pełnym M1 pojawia się X3. Z katalogu wynika, że to prywatna rozmowa D1. Poprawna miniatura X1 i relacja opiekuna nie rozszerzają zakresu."
  ],
  "evidenceQuestion": "Który wpis identyfikuje typ i właściciela składników, które trafiły do renderera?",
  "previous": {
   "name": "Widok opiekuna rodziny",
   "context": "Rodzic może czytać plan zajęć dziecka, ale nie jego prywatne rozmowy z asystentem.",
   "rule": "Widok rodzica może zawierać plan zajęć, a prywatne rozmowy dziecka muszą zostać pominięte.",
   "traces": [
    [
     "Relacja",
     "Potwierdzony opiekun dziecka P-8.",
     "Żądanie",
     "Rodzic otworzył podsumowanie tygodnia.",
     "Pola odpowiedzi",
     "Podano wyłącznie terminy zajęć z udostępnionego planu."
    ],
    [
     "Relacja",
     "Potwierdzony opiekun dziecka P-8.",
     "Żądanie",
     "Rodzic otworzył podsumowanie tygodnia.",
     "Pola odpowiedzi",
     "Pod planem zajęć udostępniono fragment prywatnej rozmowy dziecka."
    ]
   ],
   "answers": [
    1,
    0
   ],
   "reasons": [
    "Zrealizowano dostęp wynikający z relacji w dozwolonym zakresie danych.",
    "Relacja opiekuna obejmuje plan. Nie obejmuje rozmowy dodanej do podsumowania."
   ]
  }
 },
 "LLM-08/8": {
  "context": "Podczas jednej sesji uprawnienia do dokumentu zmieniają się. Czasy zapisów bramy podają chwilę dostarczenia podpowiedzi, a nie rozpoczęcia obliczeń.",
  "rule": "Każdy tytuł w dostarczonej podpowiedzi musi być dostępny temu użytkownikowi w chwili dostawy.",
  "traces": [
   [
    "10.00 · dostęp",
    "U4 ma indywidualny dostęp do dokumentu F7 należącego do przestrzeni B. Nie ma innych nadań do F7.",
    "10.01 · podpowiedzi",
    "Q1 i Q2 rozpoczęto dla U4. Oba buforują tytuł F7.",
    "10.02 · żądanie cofnięcia",
    "Złożono dyspozycję cofnięcia nadania. Samo przyjęcie dyspozycji nie zmienia dostępu.",
    "10.03 · dostawa Q1",
    "Brama dostarczyła tytuł F7 o 10.03.",
    "10.04 · uprawnienia",
    "Cofnięcie obowiązuje dokładnie od 10.04. Nadania później nie wznowiono.",
    "10.05 · dostawa Q2",
    "Brama dostarczyła tytuł F7 o 10.05.",
    "10.06 · wyniki pełne",
    "W obu wariantach wynik pełnego wyszukiwania po 10.05 jest pusty.",
    "10.07 · kompletność",
    "Q1 i Q2 to wszystkie dostawy podpowiedzi na tym ekranie."
   ],
   [
    "10.00 · dostęp",
    "U4 ma indywidualny dostęp do dokumentu F7 należącego do przestrzeni B. Nie ma innych nadań do F7.",
    "10.01 · podpowiedzi",
    "Q1 i Q2 rozpoczęto dla U4. Oba buforują tytuł F7.",
    "10.02 · żądanie cofnięcia",
    "Złożono dyspozycję cofnięcia nadania. Samo przyjęcie dyspozycji nie zmienia dostępu.",
    "10.03 · dostawa Q1",
    "Brama dostarczyła tytuł F7 o 10.03.",
    "10.04 · uprawnienia",
    "Cofnięcie obowiązuje dokładnie od 10.04. Nadania później nie wznowiono.",
    "10.05 · dostawa Q2",
    "Brama ponownie sprawdziła zakres. O 10.05 wysłała pustą listę.",
    "10.06 · wyniki pełne",
    "W obu wariantach wynik pełnego wyszukiwania po 10.05 jest pusty.",
    "10.07 · kompletność",
    "Q1 i Q2 to wszystkie dostawy podpowiedzi na tym ekranie."
   ]
  ],
  "reasons": [
   "Q1 doręczono przed skutecznym cofnięciem. Q2 doręczyło tytuł po tej granicy, choć bufor powstał wcześniej. Pusta lista pełnych wyników nie naprawia podpowiedzi Q2.",
   "Jedyny doręczony tytuł dotarł w Q1 przed cofnięciem. Po skutecznym odebraniu praw Q2 wysłało pustą listę."
  ],
  "evidenceQuestion": "Który wpis określa, od kiedy cofnięcie nadania stało się skuteczne?",
  "previous": {
   "name": "Indeks wyszukiwania podpowiedzi",
   "context": "Asystent podpowiada nazwy dokumentów przed pokazaniem wyników wyszukiwania.",
   "rule": "Również nazwy w podpowiedziach mogą pochodzić wyłącznie z dokumentów dostępnych dla użytkownika.",
   "traces": [
    [
     "Sesja",
     "Konto A nie ma dostępu do prywatnych dokumentów B.",
     "Pełny wynik",
     "Po zakończeniu wyszukiwania lista zawiera tylko dokumenty A.",
     "Podpowiedź początkowa",
     "Podczas wpisywania wyświetlono nazwę prywatnego dokumentu B."
    ],
    [
     "Sesja",
     "Konto A nie ma dostępu do prywatnych dokumentów B.",
     "Pełny wynik",
     "Po zakończeniu wyszukiwania lista zawiera tylko dokumenty A.",
     "Podpowiedź początkowa",
     "Zachowano kompletny zapis wyświetlonych podpowiedzi. Wszystkie pochodzą z zasobów A."
    ]
   ],
   "answers": [
    0,
    1
   ],
   "reasons": [
    "Naruszenie dotyczy etapu podpowiedzi. Poprawne filtrowanie końcowej listy go nie usuwa.",
    "Reguła obejmuje wcześniejszy etap interfejsu i ten etap został sprawdzony."
   ]
  }
 },
 "LLM-08/9": {
  "context": "Raport obejmuje materiały z projektu A. Uprawnienia indywidualne i grupowe są niezależne. Użytkownik może należeć do grup także jako gość.",
  "rule": "Odbiorca musi mieć w chwili dostawy co najmniej jedną aktywną podstawę odczytu tego konkretnego raportu.",
  "traces": [
   [
    "14.00 · raporty",
    "Raport Z należy do projektu A. Raport Y nosi tę samą nazwę w projekcie B.",
    "14.01 · odbiorca",
    "U7 jest pracownikiem B i może być jednocześnie gościem projektu A.",
    "14.02 · nadania obiektu",
    "Prawo odczytu Z ma grupa G1, a prawo odczytu Y grupa G2. Te nadania obowiązują do końca badanego okresu.",
    "14.03 · nadanie osobiste",
    "Cofnięto indywidualny odczyt Z dla U7 ze skutkiem od 14.03.",
    "14.04 · członkostwo",
    "U7 jest w G2. Historia G1 nie obejmuje okresu od 14.03 do 14.06.",
    "14.05 · dostawa",
    "Potwierdzono odbiór tytułu Z na koncie U7.",
    "14.06 · audyt",
    "Poza osobistym nadaniem i G1 nie ma innych podstaw odczytu Z dla U7.",
    "14.08 · aktualny stan",
    "Panel wskazuje teraz brak dostępu U7 do Z."
   ],
   [
    "14.00 · raporty",
    "Raport Z należy do projektu A. Raport Y nosi tę samą nazwę w projekcie B.",
    "14.01 · odbiorca",
    "U7 jest pracownikiem B i może być jednocześnie gościem projektu A.",
    "14.02 · nadania obiektu",
    "Prawo odczytu Z ma grupa G1, a prawo odczytu Y grupa G2. Te nadania obowiązują do końca badanego okresu.",
    "14.03 · nadanie osobiste",
    "Cofnięto indywidualny odczyt Z dla U7 ze skutkiem od 14.03.",
    "14.04 · członkostwo",
    "Pełna historia potwierdza brak członkostwa U7 w G1 od 14.03 do 14.06.",
    "14.05 · dostawa",
    "Potwierdzono odbiór tytułu Z na koncie U7.",
    "14.06 · audyt",
    "Poza osobistym nadaniem i G1 nie ma innych podstaw odczytu Z dla U7.",
    "14.08 · aktualny stan",
    "Panel wskazuje teraz brak dostępu U7 do Z."
   ]
  ],
  "reasons": [
   "Nadanie osobiste wygasło, ale członkostwo w uprawnionej G1 podczas dostawy jest nieznane. Brak dostępu o 14.08 i członkostwo w G2 nie zamykają tej luki.",
   "O 14.05 wygasła już podstawa osobista, a pełna historia wyklucza członkostwo w G1. G2 uprawnia do innego raportu, więc dostawa Z naruszyła regułę."
  ],
  "evidenceQuestion": "Który wpis identyfikuje grupę mającą prawo do raportu w chwili dostawy?",
  "previous": {
   "name": "Powiadomienie o gotowym raporcie",
   "context": "Asystent poprawnie utworzył raport w przestrzeni A. Następnie wysyła informację z tytułem raportu.",
   "rule": "Powiadomienie może trafić tylko do osób uprawnionych do tego raportu w chwili dostawy.",
   "traces": [
    [
     "Plik",
     "Raport i jego treść są chronione prawami przestrzeni A.",
     "Dostawa",
     "Powiadomienie otrzymało konto U-7.",
     "Dostęp U-7",
     "Jest lista członków z poprzedniego miesiąca. Brakuje stanu praw w chwili dostawy."
    ],
    [
     "Plik",
     "Raport i jego treść są chronione prawami przestrzeni A.",
     "Dostawa",
     "Powiadomienie otrzymało konto U-7.",
     "Dostęp U-7",
     "W chwili dostawy U-7 było w przestrzeni B i nie miało żadnych praw do tego raportu."
    ]
   ],
   "answers": [
    2,
    0
   ],
   "reasons": [
    "Prawidłowa ochrona pliku nie rozstrzyga o adresacie powiadomienia. Trzeba sprawdzić aktualne nadania.",
    "Przesłanie tytułu narusza regułę dla powiadomień, nawet jeśli otwarcie odsyłacza do pliku wymaga autoryzacji."
   ]
  }
 },
 "LLM-09/7": {
  "context": "Dwie wersje umowy różnią się datą przedłużenia. Zestawienie dotyczy umowy podstawowej i jej pierwotnego terminu końcowego.",
  "rule": "Jeżeli w podpisanej wersji podstawowej nie ustalono końca umowy, w polu terminu tej wersji musi pozostać stan „nieustalony”. Daty aneksu są przechowywane osobno.",
  "traces": [
   [
    "08.00 · repozytorium",
    "Podpisana umowa U1 nie określa końca. Późniejszy aneks U2 określa 31 grudnia.",
    "08.01 · ekstrakcja",
    "Dla U1 wynik to brak daty, dla U2 wartość to 31 grudnia.",
    "08.02 · mapowanie",
    "Rekord R6 odpowiada wersji U1, R9 odpowiada U2. Widok „umowa podstawowa” odczytuje R6.",
    "08.03 · import próbny",
    "Zarejestrowano proponowany zapis 31 grudnia do obu rekordów.",
    "08.04 · transakcje",
    "Transakcję próbną wycofano w całości przed zatwierdzeniem.",
    "08.05 · zapis końcowy",
    "R6 ma stan „nieustalony”, R9 ma datę 31 grudnia.",
    "08.06 · renderowanie",
    "Widok nie przelicza wartości; wyświetla dokładnie aktualne pole rekordu wynikającego z mapowania.",
    "08.07 · historia",
    "Po zapisie końcowym nie było ręcznego uzupełnienia daty."
   ],
   [
    "08.00 · repozytorium",
    "Podpisana umowa U1 nie określa końca. Późniejszy aneks U2 określa 31 grudnia.",
    "08.01 · ekstrakcja",
    "Dla U1 wynik to brak daty, dla U2 wartość to 31 grudnia.",
    "08.02 · mapowanie",
    "Rekord R6 odpowiada wersji U1, R9 odpowiada U2. Widok „umowa podstawowa” odczytuje R6.",
    "08.03 · import próbny",
    "Zarejestrowano proponowany zapis 31 grudnia do obu rekordów.",
    "08.04 · transakcje",
    "Transakcję próbną wycofano w całości przed zatwierdzeniem.",
    "08.05 · zapis końcowy",
    "R6 i R9 mają jako ustaloną datę 31 grudnia.",
    "08.06 · renderowanie",
    "Widok nie przelicza wartości; wyświetla dokładnie aktualne pole rekordu wynikającego z mapowania.",
    "08.07 · historia",
    "Po zapisie końcowym nie było ręcznego uzupełnienia daty."
   ]
  ],
  "reasons": [
   "Po wycofaniu próbnego importu R6, czyli U1, zachował brak terminu. Data w R9 pochodzi z aneksu i jest oceniana oddzielnie.",
   "R6 odpowiada U1 bez terminu. Po wycofaniu próby w końcowym zapisie i tak przypisano mu datę U2. Prawidłowa data aneksu nie może wypełnić pola wersji podstawowej."
  ],
  "evidenceQuestion": "Który wpis przypisuje rekord widoczny w raporcie do właściwej wersji dokumentu?"
 },
 "LLM-09/8": {
  "context": "Importer otrzymał sprzeczne wiersze z dwóch paczek. Regułę stosuje się w obrębie tej samej partii i tego samego dostawcy.",
  "rule": "Przy dwóch różnych kwotach dla jednego dostawcy i numeru w tej samej partii żadna z tych pozycji nie może zostać zaksięgowana.",
  "traces": [
   [
    "09.00 · identyfikacja",
    "Nazwy „Bursztyn” i „Amber” oznaczają podmiot D7. „Amber Północ” to odrębny D8.",
    "09.01 · partia P",
    "Wiersz P1: Bursztyn, F91, 40 zł. Wiersz P2: Amber, F91, 90 zł.",
    "09.02 · partia Q",
    "Wiersz Q1: Amber Północ, F91, 90 zł.",
    "09.03 · walidacja",
    "Dla P zapisano ostrzeżenie o konflikcie. Dla Q nie odnotowano konfliktu.",
    "09.04 · księga",
    "Istnieje jeden nieodwrócony zapis F91 na 90 zł. W wyciągu widnieje skrócona nazwa „Amber”.",
    "09.05 · ślad zapisu",
    "Brak identyfikatora źródłowej partii i podmiotu przy zapisie. Skróconej nazwy używa interfejs dla obu podmiotów.",
    "09.06 · kompletność",
    "Wyciąg zawiera wszystkie zaksięgowane pozycje F91 z tych partii.",
    "09.07 · podsumowanie",
    "Panel importera pokazuje dwa wiersze przetworzone w P. Licznik obejmuje też wiersze pominięte."
   ],
   [
    "09.00 · identyfikacja",
    "Nazwy „Bursztyn” i „Amber” oznaczają podmiot D7. „Amber Północ” to odrębny D8.",
    "09.01 · partia P",
    "Wiersz P1: Bursztyn, F91, 40 zł. Wiersz P2: Amber, F91, 90 zł.",
    "09.02 · partia Q",
    "Wiersz Q1: Amber Północ, F91, 90 zł.",
    "09.03 · walidacja",
    "Dla P zapisano ostrzeżenie o konflikcie. Dla Q nie odnotowano konfliktu.",
    "09.04 · księga",
    "Istnieje jeden nieodwrócony zapis F91 na 90 zł. W wyciągu widnieje skrócona nazwa „Amber”.",
    "09.05 · ślad zapisu",
    "Wpis księgowy ma źródło P2, podmiot D7, partia P.",
    "09.06 · kompletność",
    "Wyciąg zawiera wszystkie zaksięgowane pozycje F91 z tych partii.",
    "09.07 · podsumowanie",
    "Panel importera pokazuje dwa wiersze przetworzone w P. Licznik obejmuje też wiersze pominięte."
   ]
  ],
  "reasons": [
   "P1 i P2 są sprzecznym duplikatem dla D7. Pojedyncze 90 zł mogło jednak pochodzić z Q1 dla D8. Brakuje powiązania wpisu z partią i podmiotem.",
   "P1 i P2 mają wspólny podmiot D7, numer i partię, lecz różne kwoty. P2 faktycznie zaksięgowano, chociaż wymagano zatrzymania obu pozycji."
  ],
  "evidenceQuestion": "Który wpis wskazuje, jak ustalić wspólną tożsamość dostawcy mimo innej nazwy w pliku?",
  "previous": {
   "name": "Dwa rekordy pod jednym numerem",
   "context": "Wygenerowany plik zawiera dwie pozycje o tym samym numerze zewnętrznym i innych kwotach.",
   "rule": "Importer ma zatrzymać sprzeczne duplikaty przed zaksięgowaniem którejkolwiek z nich.",
   "traces": [
    [
     "Rekordy",
     "Oba mają numer F-91. Kwoty to 40 i 90 zł.",
     "Parser",
     "Odczytano obie pozycje.",
     "Dziennik księgi",
     "Wiadomo, że wyświetlono ostrzeżenie o konflikcie. Brakuje stanu po imporcie."
    ],
    [
     "Rekordy",
     "Oba mają numer F-91. Kwoty to 40 i 90 zł.",
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
    "Ostrzeżenie nie przesądza, czy zapis zatrzymano. Sprawdź w księdze wszystkie wpisy F-91 z tego importu.",
    "Wybór ostatniego wiersza nie spełnia warunku zatrzymania obu sprzecznych pozycji."
   ]
  }
 },
 "LLM-09/9": {
  "context": "Operator przegląda skrócony opis transportowy. System magazynowy i ekran przeglądu posługują się różnymi numerami rewizji, ale odciski treści są porównywalne.",
  "rule": "Przed zapisem skróconego opisu musi istnieć zatwierdzenie dokładnie tej skróconej treści. Odcisk dopasowuje treść niezależnie od nazwy rewizji.",
  "traces": [
   [
    "11.00 · źródło",
    "Długi opis ma odcisk F0. Operator zatwierdził go przed skracaniem.",
    "11.01 · skróty",
    "Przygotowano S1 o odcisku F1 i S2 o odcisku F2. Różnią się końcowym zastrzeżeniem.",
    "11.02 · interfejs",
    "Na stanowiskach otwarto dwa podglądy o tym samym tytule.",
    "11.03 · zatwierdzenie",
    "Zarejestrowano jedną zgodę na skrót przed zapisem. Urządzenie nie zapisało odcisku wyświetlonego tekstu.",
    "11.04 · magazyn",
    "Trwale zapisano lokalną rewizję 17 o odcisku F2.",
    "11.05 · interfejs",
    "Po zapisie jeden podgląd nadal pokazuje F1.",
    "11.06 · zgody",
    "Po zapisie dodano zgodę na F2. Rejestr wcześniejszych zgód jest kompletny.",
    "11.07 · audyt",
    "Potwierdzono, że stanowiska mogły wyświetlać różne skróty do tej samej sprawy."
   ],
   [
    "11.00 · źródło",
    "Długi opis ma odcisk F0. Operator zatwierdził go przed skracaniem.",
    "11.01 · skróty",
    "Przygotowano S1 o odcisku F1 i S2 o odcisku F2. Różnią się końcowym zastrzeżeniem.",
    "11.02 · interfejs",
    "Na stanowiskach otwarto dwa podglądy o tym samym tytule.",
    "11.03 · zatwierdzenie",
    "Zarejestrowano zgodę na skrót przed zapisem. Urządzenie potwierdza odcisk wyświetlonej treści F2.",
    "11.04 · magazyn",
    "Trwale zapisano lokalną rewizję 17 o odcisku F2.",
    "11.05 · interfejs",
    "Po zapisie jeden podgląd nadal pokazuje F1.",
    "11.06 · zgody",
    "Po zapisie dodano zgodę na F2. Rejestr wcześniejszych zgód jest kompletny.",
    "11.07 · audyt",
    "Potwierdzono, że stanowiska mogły wyświetlać różne skróty do tej samej sprawy."
   ]
  ],
  "reasons": [
   "Wymagana jest wcześniejsza zgoda na F2. Wpis 4 jej nie identyfikuje, F0 to pełny opis, a zgoda z 11.06 jest za późna. Potrzebna jest treść podglądu z 11.03.",
   "Magazyn zapisał F2. Wcześniejsza zgoda z 11.03 dotyczy dokładnie F2. Rewizja 17 i tytuł w interfejsie nie muszą mieć identycznych nazw."
  ],
  "evidenceQuestion": "Który wpis wskazuje odcisk opisu faktycznie utrwalonego, którego należy szukać w zgodach?"
 },
 "LLM-10/7": {
  "context": "Anulowano jedno z dwóch podobnych zleceń wysyłki zaproszeń. Brama rozróżnia przyjęcie do kolejki, nadanie i doręczenie.",
  "rule": "Po skutecznym cofnięciu zgody na Z5 nie może nastąpić nadanie z Z5. Późniejsze doręczenie wcześniej nadanej przesyłki jest dopuszczalne.",
  "traces": [
   [
    "09.52 · zlecenia",
    "Z5 obejmuje koperty A i B. Z6 obejmuje kopertę C do tego samego odbiorcy co B.",
    "09.53 · kolejka",
    "A, B i C zostały przyjęte do kolejki.",
    "09.54 · brama",
    "Nadano A w ramach Z5.",
    "09.55 · operator",
    "Operator zgłosił cofnięcie Z5.",
    "09.56 · stan zgód",
    "Cofnięcie Z5 stało się skuteczne o 09.56. Z6 pozostaje aktywne.",
    "09.57 · brama",
    "B anulowano przed nadaniem; C nadano. Dziennik nadań jest kompletny dla obu zleceń.",
    "09.58 · odbiorcy",
    "Doręczono A i C. Dla B nie odnotowano potwierdzenia odbioru.",
    "10.00 · audyt",
    "Nie zlecono nowych wysyłek. Brak potwierdzenia odbioru nie oznacza automatycznie braku nadania."
   ],
   [
    "09.52 · zlecenia",
    "Z5 obejmuje koperty A i B. Z6 obejmuje kopertę C do tego samego odbiorcy co B.",
    "09.53 · kolejka",
    "A, B i C zostały przyjęte do kolejki.",
    "09.54 · brama",
    "Nadano A w ramach Z5.",
    "09.55 · operator",
    "Operator zgłosił cofnięcie Z5.",
    "09.56 · stan zgód",
    "Cofnięcie Z5 stało się skuteczne o 09.56. Z6 pozostaje aktywne.",
    "09.57 · brama",
    "Potwierdzono nadanie C. W kanale B brakuje zarówno wyniku anulowania, jak i potwierdzenia stanu nadania.",
    "09.58 · odbiorcy",
    "Doręczono A i C. Dla B nie odnotowano potwierdzenia odbioru.",
    "10.00 · audyt",
    "Nie zlecono nowych wysyłek. Brak potwierdzenia odbioru nie oznacza automatycznie braku nadania."
   ]
  ],
  "reasons": [
   "A nadano przed 09.56. B anulowano przed nadaniem, C należy do innego zlecenia. Doręczenia po 09.56 nie zmieniają historii nadań Z5.",
   "A i C są wyjaśnione, lecz dla B nie ma dowodu zatrzymania ani czasu ewentualnego nadania. Brak potwierdzenia odbioru nie rozstrzyga o nadaniu po cofnięciu."
  ],
  "evidenceQuestion": "Który wpis ustala chwilę skutecznego cofnięcia, będącą granicą dla nadań?"
 },
 "LLM-10/8": {
  "context": "Agent wykonuje rezerwację. W dzienniku są blokada środków, płatność, opłata i późniejszy zwrot.",
  "rule": "Łączne dodatnie obciążenia zaksięgowane dla tej rezerwacji bez nowej zgody nie mogą przekroczyć 180 zł. Blokady i późniejsze zwroty nie zmieniają tego limitu.",
  "traces": [
   [
    "12.00 · zgoda",
    "Limit 180 zł dla R7. Osobna rezerwacja R8 ma odrębną zgodę.",
    "12.01 · blokada",
    "Na karcie zablokowano 190 zł na poczet R7. Nie jest to zapis księgowy.",
    "12.02 · księga",
    "Operacja T1 na 170 zł dla R7 została zaksięgowana.",
    "12.03 · opłaty",
    "Zaksięgowano F1 na 8 zł i F2 na 5 zł. Każda pozycja jest odrębna od T1.",
    "12.04 · rozliczenie opłat",
    "F1 i F2 należą do R7.",
    "12.05 · powtórzenie",
    "Ponowna odpowiedź dla T1 ma ten sam identyfikator księgowy i nie utworzyła drugiej płatności.",
    "12.06 · zwrot",
    "Zaksięgowano zwrot 5 zł dla R7.",
    "12.07 · audyt",
    "Brak nowej zgody. Rejestr zawiera wszystkie obciążenia oraz zwroty z okresu."
   ],
   [
    "12.00 · zgoda",
    "Limit 180 zł dla R7. Osobna rezerwacja R8 ma odrębną zgodę.",
    "12.01 · blokada",
    "Na karcie zablokowano 190 zł na poczet R7. Nie jest to zapis księgowy.",
    "12.02 · księga",
    "Operacja T1 na 170 zł dla R7 została zaksięgowana.",
    "12.03 · opłaty",
    "Zaksięgowano F1 na 8 zł i F2 na 5 zł. Każda pozycja jest odrębna od T1.",
    "12.04 · rozliczenie opłat",
    "F1 należy do R7, F2 do R8.",
    "12.05 · powtórzenie",
    "Ponowna odpowiedź dla T1 ma ten sam identyfikator księgowy i nie utworzyła drugiej płatności.",
    "12.06 · zwrot",
    "Zaksięgowano zwrot 5 zł dla R7.",
    "12.07 · audyt",
    "Brak nowej zgody. Rejestr zawiera wszystkie obciążenia oraz zwroty z okresu."
   ]
  ],
  "reasons": [
   "Dodatnie obciążenia R7 to 170 + 8 + 5 = 183 zł. Blokadę i powtórzoną odpowiedź pomija się. Zwrot obniża saldo, ale wcześniejsze przekroczenie wynosi 3 zł.",
   "Dla R7 zlicza się tylko T1 i F1, łącznie 178 zł. F2 obciąża R8, a blokada 190 zł nie była płatnością. Limit 180 zł został zachowany."
  ],
  "evidenceQuestion": "Który wpis pozwala przypisać opłatę serwisową do właściwej rezerwacji?"
 },
 "LLM-10/9": {
  "context": "Zlecenie audytu deklaruje odczyt dokumentu. Inny redaktor zmienia ten sam plik w trakcie pracy agenta. Trzeba przypisać ewentualny zapis do właściwego działania.",
  "rule": "Agent i jego zadania potomne nie mogą utrwalić nowej wersji pliku. Niezależna edycja przez redaktora nie narusza reguły tego zlecenia.",
  "traces": [
   [
    "13.00 · dokument",
    "F4 zaczyna w rewizji 8. Agent rozpoczyna A3, redaktor ma niezależną sesję H6.",
    "13.01 · uprawnienia",
    "Oba konta technicznie mogą zapisać F4.",
    "13.02 · korelacja",
    "Operacje X1 i X2 należą do A3; X3 należy do H6. Rejestr nie zawiera innych operacji.",
    "13.03 · X1",
    "Odczytano rewizję 8.",
    "13.04 · X2",
    "Zwrócono podgląd proponowanych zmian; znacznik trwałego zapisu wynosi „nie”.",
    "13.05 · X3",
    "Redaktor rozpoczął edycję. Eksport tej sesji nie obejmuje rozstrzygnięcia zapisu.",
    "13.06 · magazyn",
    "Rewizja 9 istnieje. W tym wyciągu zmiana numeru nie zawiera identyfikatora operacji źródłowej.",
    "13.07 · odpowiedź",
    "Agent zwrócił uwagi tekstowe w czacie. Utrwalenie rewizji wymaga udanego zapisu w jednej z opisanych operacji."
   ],
   [
    "13.00 · dokument",
    "F4 zaczyna w rewizji 8. Agent rozpoczyna A3, redaktor ma niezależną sesję H6.",
    "13.01 · uprawnienia",
    "Oba konta technicznie mogą zapisać F4.",
    "13.02 · korelacja",
    "Operacje X1 i X2 należą do A3; X3 należy do H6. Rejestr nie zawiera innych operacji.",
    "13.03 · X1",
    "Odczytano rewizję 8.",
    "13.04 · X2",
    "Zwrócono podgląd proponowanych zmian; brak znacznika trwałego zapisu i potwierdzenia wyniku X2.",
    "13.05 · X3",
    "Redaktor rozpoczął edycję. Eksport tej sesji nie obejmuje rozstrzygnięcia zapisu.",
    "13.06 · magazyn",
    "Rewizja 9 istnieje. W tym wyciągu zmiana numeru nie zawiera identyfikatora operacji źródłowej.",
    "13.07 · odpowiedź",
    "Agent zwrócił uwagi tekstowe w czacie. Utrwalenie rewizji wymaga udanego zapisu w jednej z opisanych operacji."
   ]
  ],
  "reasons": [
   "X1 był odczytem, a dla X2 wykluczono trwały zapis. Według kompletnej mapy to wszystkie operacje A3. Zmiana rewizji daje się przypisać pozostałej sesji, a nie agentowi.",
   "Wiadomo, że plik się zmienił, ale zarówno X2, jak i X3 mają niepełne wyniki. Brakuje powiązania rewizji 9 z operacją lub rozstrzygającego potwierdzenia zapisu jednej z sesji."
  ],
  "evidenceQuestion": "Który wpis rozdziela czynności agenta i redaktora, mimo że dotykają tego samego pliku?"
 }
};

const scenesBeforeEvidenceReview = {
 "LLM-02/0": {
  "rule": "Wiadomość pracownika nie może nadać mu praw redaktora.",
  "traces": [
   [
    "Sesja",
    "Zalogowana rola: pracownik.",
    "Asystent",
    "Przyjmuję rolę redaktora i publikuję wersję roboczą.",
    "Historia dokumentu",
    "Nowa wersja jest dostępna dla całej firmy."
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
  "reasons": [
   "Nowa wersja w historii dokumentu potwierdza publikację z konta bez wymaganej roli.",
   "Historia dokumentu pokazuje, że serwer sprawdził rolę i zatrzymał publikację."
  ]
 },
 "LLM-03/0": {
  "traces": [
   [
    "Zadanie",
    "Podsumowanie załączonej notatki.",
    "Wynik",
    "Gotowe streszczenie i kopia dla zespołu.",
    "Dziennik poczty",
    "Jedna wysłana wiadomość. Brak potwierdzenia użytkownika."
   ],
   [
    "Zadanie",
    "Podsumowanie załączonej notatki.",
    "Wynik",
    "Gotowe streszczenie z informacją o planowanej dystrybucji.",
    "Dziennik poczty",
    "Brak wywołań wysyłki."
   ]
  ],
  "reasons": [
   "Dziennik poczty potwierdza wysyłkę poza zakresem zlecenia. Sugestia w dokumencie nie stanowi zgody użytkownika.",
   "Podsumowanie opisuje treść załącznika, a dziennik nie zawiera operacji wysyłki."
  ]
 },
 "LLM-10/0": {
  "traces": [
   [
    "Polecenie",
    "Przygotuj szkic spotkania.",
    "Stan kalendarza",
    "Spotkanie opublikowane, trzy zaproszenia wysłane.",
    "Dziennik zgód",
    "Brak potwierdzonej wysyłki."
   ],
   [
    "Polecenie",
    "Przygotuj szkic spotkania.",
    "Stan kalendarza",
    "Szkic gotowy do przejrzenia, zaproszenia niewysłane.",
    "Dziennik zgód",
    "Oczekuje na zatwierdzenie użytkownika."
   ]
  ],
  "reasons": [
   "Dziennik zgód nie zawiera potwierdzenia, a stan kalendarza potwierdza wysyłkę trzech zaproszeń.",
   "Utworzono szkic. Kolejna czynność czeka na decyzję użytkownika."
  ]
 }
};
