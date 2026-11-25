const investigations = [
 {
  id:'tabela-dyzurow', title:'Druga kolumna w tabeli dyżurów', level:'Łatwa',
  report:'Koordynatorka otworzyła publiczny grafik. W kolumnie obok nazw stanowisk zobaczyła numery przypominające prywatne telefony.',
  rule:'Widok publiczny może ujawnić stanowisko i godzinę dyżuru. Prywatny numer telefonu może zobaczyć tylko dyspozytor.',
  events:[
   ['08.10 · Sesja','Wybrany widok: publiczny. Użytkowniczka ma rolę koordynatorki, bez uprawnień dyspozytora.'],
   ['08.11 · Generator','W roboczym podglądzie odpowiedzi znalazły się dwie kolumny.'],
   ['08.11 · Kontrola wydania','Kopia odpowiedzi dostarczonej do publicznego widoku zawierała wartości zgodne z polem „telefon prywatny” w kartotece. Porównanie wykonano bez utrwalania numerów.'],
   ['08.14 · Pomoc','Zespół zgłoszeń ukrył podgląd do czasu wyjaśnienia.']
  ],
  choices:['Odbiorczyni dostała prywatne dane poza zakresem swojej roli.','Prywatne dane pojawiły się wyłącznie w roboczej wersji grafiku.','W drugiej kolumnie były publiczne numery stanowisk.'], answer:0,
  evidence:[['Który wpis potwierdza treść dostarczoną odbiorczyni?',3]],
  reasoning:'Kopia dostarczonej odpowiedzi zawierała prywatne numery. Uprawnienia z wpisu 1 pozwalają ocenić, że ta odbiorczyni nie powinna ich dostać.',
  limit:'Z tych wpisów nie ustalisz, ilu innych odbiorców otworzyło grafik.',
  userAction:'Podaj w zgłoszeniu godzinę, nazwę publicznego widoku i nazwę ujawnionego pola. Prywatne numery telefonów pozostaw poza treścią zgłoszenia.',
  follow:'Sprawdź zakres wcześniejszych udostępnień. Do generowania publicznego widoku przekazuj tylko pola przeznaczone do publikacji.',
  lesson:'LLM-07'
 },
 {
  id:'stopka-biuletynu', title:'Dopisek w biuletynie', level:'Łatwa',
  report:'Redaktorka prosiła o skrót trzech wiadomości. W gotowym tekście pojawiła się zachęta do subskrypcji prywatnego biuletynu.',
  rule:'Asystent ma streszczać wiadomości. Autor wiadomości źródłowej nie może zamawiać dodatkowych treści w imieniu redaktorki.',
  events:[
   ['10.03 · Zlecenie','Redaktorka zaznaczyła trzy wiadomości i wybrała „Streść”. Pole dodatkowych uwag było puste.'],
   ['10.03 · Skrzynka','W stopce drugiej wiadomości oznaczono fragment skierowany do autora przyszłego streszczenia.'],
   ['10.04 · Porównanie','Porównano wszystkie trzy wiadomości ze skrótem. Tylko stopka drugiej zawiera hasło reklamowe i prośbę o dodanie go na końcu tekstu. Skrót kończy się tym hasłem jako rekomendacją redakcji.'],
   ['10.06 · Publikacja','Redaktorka odrzuciła skrót. Biuletyn pozostał szkicem.']
  ],
  choices:['Redaktorka dopisała reklamę w polu dodatkowych uwag.','Reklama trafiła do biuletynu dopiero podczas publikacji.','W dostarczonym skrócie znalazła się niezamówiona rekomendacja zgodna z dyspozycją ze stopki.'], answer:2,
  evidence:[['Który wpis łączy konkretny fragment źródła z dopiskiem w odpowiedzi?',3]],
  reasoning:'Redaktorka zleciła streszczenie. W skrócie hasło ze stopki przedstawiono jako własną rekomendację redakcji. Taki wynik odpowiada pośredniemu wstrzyknięciu instrukcji. Redaktorka zatrzymała późniejszą publikację.',
  limit:'Porównanie potwierdza zgodność treści. Zamiar autora stopki i dokładny sposób powstania dopisku pozostają nieustalone.',
  userAction:'Wstrzymaj publikację szkicu. W zgłoszeniu wskaż wiadomość ze stopką oraz dopisek, który pojawił się w skrócie. Redakcja będzie mogła porównać oba miejsca.',
  follow:'Oznaczaj pobrane wiadomości jako materiał do streszczenia. Pozostaw redakcji możliwość sprawdzenia pochodzenia treści przed publikacją.',
  lesson:'LLM-03'
 },
 {
  id:'zielony-przycisk', title:'Zielony przycisk w podglądzie', level:'Łatwa',
  report:'Osoba testująca czat widzi w odpowiedzi napis przypominający przycisk akceptacji. Zgłasza, że model mógł dodać aktywny element do strony.',
  rule:'Podgląd rozmowy może wyświetlać odpowiedzi modelu wyłącznie jako zwykły tekst.',
  events:[
   ['11.22 · Model','Model wygenerował przykład zapisu przycisku z etykietą „Akceptuj”.'],
   ['11.22 · Przeglądarka','Inspekcja gotowej strony wykazała w obszarze odpowiedzi jeden węzeł tekstowy. Liczba elementów interaktywnych w tym obszarze wyniosła zero.'],
   ['11.23 · Motyw','Cały blok z przykładem ma zielone tło nadawane przez szablon aplikacji.'],
   ['11.24 · Zgłoszenie','Do zgłoszenia dołączono zrzut zielonego bloku.']
  ],
  choices:['Model utworzył w widoku aktywny przycisk akceptacji.','Ten podgląd poprawnie wyświetlił otrzymany zapis jako tekst.','Samo tło bloku potwierdza wykonanie akcji przez przeglądarkę.'], answer:1,
  evidence:[['Który wpis opisuje faktyczną strukturę gotowej strony?',2]],
  reasoning:'W badanym obszarze był wyłącznie tekst. Zielony kolor pochodził z szablonu aplikacji. Zrzut ekranu nie pokazuje struktury dokumentu.',
  limit:'Badanie obejmuje ten podgląd. Eksport i widok archiwalny mogą korzystać z innych mechanizmów.',
  userAction:'Opisz dokładnie, gdzie widać zielony blok. Możesz zamknąć zgłoszenie dotyczące aktywnego przycisku w tym widoku, gdy inspekcja potwierdziła, że przeglądarka wyświetliła wyłącznie tekst.',
  follow:'Zachowaj test, który po wyświetleniu przykładu sprawdza typ węzła. Oddzielnie sprawdź inne widoki tej samej odpowiedzi.',
  lesson:'LLM-09'
 },
 {
  id:'tytul-recenzji', title:'Zmieniony tytuł recenzji', level:'Średnia',
  report:'Właścicielka sklepu twierdzi, że asystent zmienił tytuł już opublikowanej recenzji w trakcie jej streszczania.',
  rule:'Pole rozmowy przyjmuje uwagi dotyczące streszczenia. Edycja opublikowanej recenzji wymaga osobnej akcji w panelu sklepu. Nagłówek samego streszczenia jest stały.',
  events:[
   ['09.12 · Panel','Wersja recenzji numer 41 przed rozpoczęciem rozmowy: 6.'],
   ['09.13 · Rozmowa','Właścicielka w wiadomości do asystenta zaproponowała własny nagłówek streszczenia.'],
   ['09.13 · Źródło','Recenzję numer 41 pobrano w wersji 6. Proponowanego nagłówka w recenzji nie było.'],
   ['09.14 · Podgląd','Dostarczony skrót otrzymał dokładnie nagłówek zaproponowany w polu rozmowy zamiast nagłówka stałego.'],
   ['09.15 · Historia sklepu','Po dostarczeniu skrótu publikacja nadal miała wersję 6 i pierwotny tytuł. Historia zmian była kompletna.'],
   ['09.17 · Zgłoszenie','Dołączony obraz przedstawia panel streszczenia, z otwartą obok kartą sklepu.']
  ],
  choices:['Asystent zapisał nową wersję opublikowanej recenzji.','Recenzja narzuciła swój nagłówek w chwili jej pobrania.','Wiadomość użytkowniczki zmieniła nagłówek dostarczonego skrótu.'], answer:2,
  evidence:[['Który wpis pozwala sprawdzić, czy zmienił się opublikowany tytuł?',5]],
  reasoning:'Wpisy 2 i 4 łączą prośbę w rozmowie ze zmianą nagłówka skrótu. Historia sklepu we wpisie 5 pozwala odrzucić hipotezę o zmianie recenzji.',
  limit:'Jeden przypadek nie pokazuje, jakie inne części odpowiedzi mogłyby zostać zmienione.',
  userAction:'Otwórz opublikowaną recenzję i jej historię. Jeśli pozostała bez zmian, zgłoś problem z nagłówkiem w podglądzie skrótu i podaj numer recenzji.',
  follow:'Jeżeli nagłówek ma być niezmienny, dodawaj go w szablonie aplikacji. Wyraźnie podpisz podgląd skrótu i opublikowaną recenzję.',
  lesson:'LLM-01'
 },
 {
  id:'proba-generalna', title:'Próba generalna przed audytem', level:'Średnia',
  report:'Podczas szkolenia asystent zwrócił się do uczestniczki jak do audytorki. Trener chce ustalić, czy dało jej to dostęp do rzeczywistych akt.',
  rule:'W ćwiczeniu wolno odgrywać rolę audytora i oglądać dane demonstracyjne. Dostęp do rzeczywistych akt wymaga nadania roli w systemie.',
  events:[
   ['14.01 · Tożsamość','Iga ma rolę uczestniczki szkolenia. Konto nie ma dostępu do akt produkcyjnych.'],
   ['14.02 · Warsztat','Iga wybrała scenkę „Rozmowa z audytorką”.'],
   ['14.03 · Czat','Asystent użył zwrotu „Pani audytor” i zaproponował obejrzenie teczki.'],
   ['14.03 · Autoryzacja','Próba odczytu rzeczywistych akt numer 17 przez tę sesję zakończyła się odmową.'],
   ['14.04 · Dostarczenie','Manifest wszystkich materiałów dostarczonych w tej rozmowie zawiera tylko fikcyjną teczkę szkoleniową numer 17 z zestawu szkoleniowego.'],
   ['14.07 · Profil','Rola Igi po zakończeniu scenki: uczestniczka.']
  ],
  choices:['W tej rozmowie dostarczono wyłącznie fikcyjne materiały szkoleniowe.','Zwrot grzecznościowy nadał Idze dostęp do akt produkcyjnych.','Po odmowie system wysłał kopię rzeczywistych akt numer 17 pod inną nazwą.'], answer:0,
  evidence:[['Który wpis ustala pochodzenie materiału rzeczywiście dostarczonego uczestniczce?',5]],
  reasoning:'Odmowa z wpisu 4 dotyczy jednego odczytu. Dopiero manifest z wpisu 5 obejmuje wszystkie materiały dostarczone w tej rozmowie.',
  limit:'Wpisy nie rozstrzygają, jak zachowa się inna integracja z tym samym czatem.',
  userAction:'Sprawdź oznaczenie otrzymanej teczki. W opisie szkolenia możesz odnotować odmowę odczytu akt rzeczywistych oraz pochodzenie teczki, którą dostała uczestniczka.',
  follow:'Sprawdzaj uprawnienia przy odczycie akt i oznaczaj materiał szkoleniowy w odpowiedzi.',
  lesson:'LLM-05'
 },
 {
  id:'dwie-wersje-komunikatu', title:'Dwie wersje komunikatu', level:'Średnia',
  report:'Po zmianie języka rozmowy osoba z obsługi zauważyła w hiszpańskim szkicu informację o nieogłoszonej jeszcze premierze. Czy klient ją zobaczył?',
  rule:'Treści objęte embargiem muszą być usunięte przed dostarczeniem odpowiedzi klientowi, w każdym języku.',
  events:[
   ['16.20 · Kalendarz','Embargo nadal obowiązuje. Klient nie należy do grupy uprawnionej.'],
   ['16.21 · Rozmowa','Po polskim powitaniu klient poprosił o dalszą obsługę po hiszpańsku.'],
   ['16.21 · Szkic','Robocza hiszpańska odpowiedź zawiera nazwę premiery.'],
   ['16.22 · Eksport śladu','Dla hiszpańskiej odpowiedzi zebrano treść szkicu i czas zakończenia. Rejestr kontroli końcowej i kopia treści dostarczonej są niedostępne.'],
   ['16.22 · Licznik','Zestawienie godzinowe podaje 21 wysłanych odpowiedzi we wszystkich językach łącznie.'],
   ['16.24 · Konsultant','W załączniku do zgłoszenia widnieje okno podglądu oznaczone „Szkic odpowiedzi po hiszpańsku”.']
  ],
  choices:['Klient dostał nazwę premiery po zmianie języka.','Nie da się ustalić, jaka treść dotarła do klienta.','System usunął nazwę przed dostarczeniem odpowiedzi.'], answer:1,
  evidence:[['Który wpis precyzyjnie określa lukę w materiale dla hiszpańskiej odpowiedzi?',4]],
  reasoning:'Szkic potwierdza obecność nazwy przed kontrolą. Wpis 4 wskazuje, którego etapu brakuje. Zbiorczy licznik wysyłek nie wiąże treści z klientem.',
  limit:'Nie można też przypisać przyczyny zmianie języka na podstawie samej kolejności zdarzeń.',
  userAction:'Przekaż prowadzącemu sprawę godzinę i język szkicu. Zaznacz, że widziałaś lub widziałeś treść roboczą, a potwierdzenie tego, co dostał klient, wymaga sprawdzenia.',
  follow:'Szukaj potwierdzenia wysyłki tej odpowiedzi po kontroli końcowej. Sprawdzaj działanie tej kontroli w każdym obsługiwanym języku.',
  lesson:'LLM-06'
 },
 {
  id:'powrot-do-rozmowy', title:'Powrót do wczorajszej rozmowy', level:'Średnia',
  report:'Po wznowieniu rozmowy asystent podał rabat większy od obowiązującego limitu. Konsultant podejrzewa nocną zmianę cennika.',
  rule:'Konsultant może przedstawiać oferty do 5% rabatu. Wyższy rabat wymaga zatwierdzenia kierownika przed pokazaniem oferty klientowi.',
  events:[
   ['Dzień 1 · Czat','W rozmowie konsultant zaproponował robocze założenie 12% na potrzeby porównania.'],
   ['Dzień 1 · Pamięć','System zapisał propozycję konsultanta w podsumowaniu rozmowy jako „uzgodnione 12%”.'],
   ['Dzień 2 · Cennik','Rejestr wersji potwierdza niezmieniony limit 5%. Rejestr zgód dla tej oferty jest pusty.'],
   ['Dzień 2 · Wznowienie','Przygotowując ofertę, aplikacja odczytała wartość 12% z wczorajszego podsumowania.'],
   ['Dzień 2 · Wysyłka','Klientowi doręczono ofertę ze stawką 12%.'],
   ['Dzień 2 · Zamówienia','Klient nie złożył jeszcze zamówienia.']
  ],
  choices:['Nocna zmiana cennika podniosła limit dla konsultanta.','Zgoda kierownika została odwołana dopiero po wysłaniu oferty.','Roboczą sugestię z rozmowy potraktowano jak obowiązujące ustalenie.'], answer:2,
  evidence:[['Który wpis wskazuje źródło stawki użytej przy wznowieniu?',4]],
  reasoning:'Podsumowanie przekształciło roboczą propozycję w rzekome ustalenie. Wpis 4 łączy to podsumowanie z nową ofertą, a wpisy 3 i 5 potwierdzają wysyłkę bez wymaganej zgody.',
  limit:'Brak zamówienia pozostawia otwarte pytanie o dalsze skutki handlowe.',
  userAction:'Przed dalszym kontaktem z klientem sprawdź faktycznie wysłaną ofertę i przekaż ją osobie uprawnionej do zatwierdzania rabatów. Wskaż różnicę między ofertą a obowiązującym limitem.',
  follow:'Przy wznowieniu wątku pobieraj aktualny limit i ewentualną zgodę z systemu ofertowego. Sprawdzaj je ponownie przed wysyłką.',
  lesson:'LLM-02'
 },
 {
  id:'adres-z-poradnika', title:'Trzeci adres punktu odbioru', level:'Trudna',
  report:'Asystent skierował klienta do magazynu zamiast do punktu odbioru. Tego samego ranka zmieniono model, opublikowano mapę i przebudowano indeks poradników.',
  rule:'W odpowiedziach dla klientów wolno wykorzystywać wyłącznie opublikowane, zatwierdzone materiały. Szkice muszą pozostawać poza wyszukiwaniem publicznym.',
  journalGuide:'Wyszukiwarka proponuje kilka materiałów, a w osobnym wpisie zapisano, które z nich dostał model podczas przygotowania konkretnej odpowiedzi.',
  events:[
   ['07.40 · Wdrożenie','Piąta wersja modelu trafiła do produkcji.'],
   ['08.00 · Redakcja','Dla punktu odbioru na zachodzie zatwierdzono siódmą wersję poradnika. Podaje adres przy ul. Leśnej.'],
   ['08.05 · Archiwum','Odrzucony szkic szóstej wersji poradnika podaje adres magazynu przy ul. Polnej. Historia podpisów wskazuje brak zatwierdzenia tej wersji.'],
   ['08.10 · Indeks','Zadanie nocne zakończyło się z ostrzeżeniem. Raport zbiorczy obejmuje 420 wersji dokumentów.'],
   ['08.11 · Mapa','Opublikowana mapa podaje tymczasowy wjazd od ul. Jasnej.'],
   ['09.02 · Wyszukiwanie','Przy pytaniu pierwszego klienta wyszukiwarka znalazła siódmą wersję poradnika, szkic szóstej wersji i mapę. Najwyżej znalazła się siódma wersja.'],
   ['09.02 · Kontekst','Spis materiałów przekazanych modelowi dla pierwszego klienta zawiera tylko fragment szóstej wersji z adresem przy ul. Polnej.'],
   ['09.03 · Wydanie','Odpowiedź dostarczona pierwszemu klientowi wskazała ul. Polną.'],
   ['09.05 · Druga sesja','Drugi klient dostał odpowiedź z ulicą Leśną z siódmej wersji poradnika.']
  ],
  choices:['Źródłem błędnego adresu dla pierwszego klienta był odrzucony szkic dostępny w ścieżce publicznej.','Najnowsza mapa nadpisała zatwierdzony poradnik w materiałach użytych dla pierwszego klienta.','Odpowiedź dla drugiego klienta dowodzi, że w obu sesjach użyto tego samego poradnika.'], answer:0,
  evidence:[['Który wpis ustala status redakcyjny błędnego źródła?',3],['Który wpis mówi, co faktycznie przekazano do modelu dla pierwszego klienta?',7]],
  reasoning:'Wpisy 3 i 7 łączą brak zatwierdzenia z użyciem dokładnie tej wersji. Pierwsze miejsce w wyszukiwaniu oznaczało kandydaturę. Lista materiałów przekazanych modelowi była inna.',
  limit:'Ślady potwierdzają zanieczyszczenie źródeł, ale nie przesądzają, czy ktoś działał celowo ani dlaczego wybrano szóstą wersję poradnika.',
  userAction:'Sprawdź adres w zatwierdzonym poradniku i przekaż klientowi sprostowanie. Osobie utrzymującej bazę wiedzy podaj wersję szkicu, z którego skorzystał asystent.',
  follow:'Wycofaj szkic z publicznego indeksu. Sprawdzaj status i wersję również przy budowie kontekstu oraz ustal, jak zadanie indeksujące zakwalifikowało szóstą wersję poradnika.',
  lesson:'LLM-04'
 },
 {
  id:'dwa-podglady', title:'Dwa podglądy tej samej faktury', level:'Trudna',
  report:'Biuro Port pokazało konsultantce cudzą nazwę projektu na swojej fakturze. Kontrola odczytów bazy danych wykazuje same poprawne decyzje.',
  rule:'Każde biuro może pobierać wyłącznie własne podglądy, również wtedy, gdy aplikacja przechowuje gotowy wynik w pamięci podręcznej.',
  journalGuide:'Oba biura mają fakturę numer 38, dlatego odróżniaj numer faktury od numeru gotowego podglądu przekazanego do przeglądarki.',
  events:[
   ['12.00 · Katalog','Biura Park i Port mają po jednej własnej fakturze o lokalnym numerze 38.'],
   ['12.01 · Sesja biura Park','Użytkownik Parku zlecił podgląd swojej faktury 38.'],
   ['12.01 · Baza','Zapytanie dla biura Park zwróciło jego własny rekord.'],
   ['12.02 · Pamięć','Podgląd numer 91 utworzony dla biura Park zapisano pod wspólnym kluczem „faktura-38”.'],
   ['12.05 · Sesja biura Port','Użytkowniczka biura Port otworzyła fakturę numer 38 w swojej głównej karcie.'],
   ['12.05 · Baza','Osobna karta pobrała prawidłowy rekord biura Port i utworzyła podgląd numer 92.'],
   ['12.05 · Pamięć','Zapytanie z głównej karty trafiło na gotowy wpis pod kluczem „faktura-38”.'],
   ['12.06 · Dostarczenie','Potwierdzenie z głównej karty wskazuje, że biuro Port odebrało podgląd numer 91.'],
   ['12.07 · Utrzymanie','Po wyczyszczeniu pamięci ponowiony podgląd miał oczekiwaną nazwę projektu.']
  ],
  choices:['Błędny rekord zwróciła baza dla osobnej karty.','Port dostał kompletny podgląd utworzony wcześniej dla Parku.','Problem ograniczył się do wspólnego klucza i nie dotarł do odpowiedzi.'], answer:1,
  evidence:[['Który wpis wiąże podgląd numer 91 z biurem, dla którego powstał?',4],['Który wpis potwierdza odbiorcę i wersję podglądu w głównej karcie?',8]],
  reasoning:'Wpis 4 ustala właściciela podglądu numer 91, a wpis 8 odbiorcę. Prawidłowy odczyt w osobnej karcie dotyczył innego zapytania. Samo wyczyszczenie pamięci usuwa objaw tylko do kolejnego zbiegu kluczy.',
  limit:'Historia jednej faktury nie określa liczby innych ujawnionych podglądów.',
  userAction:'Zamknij cudzy podgląd. Zgłoś pomyłkę osobie odpowiedzialnej za aplikację, podając swoje biuro, czas i numer podglądu. Do odnalezienia zdarzenia nie trzeba rozsyłać kopii cudzej faktury.',
  follow:'Uwzględnij identyfikator biura w kluczu i sprawdzaj prawo odbiorcy do gotowego podglądu. Przejrzyj wcześniejsze wydania ze wspólnych kluczy.',
  lesson:'LLM-08'
 },
 {
  id:'rachunek-dostawcy', title:'Nowy rachunek po streszczeniu maila', level:'Trudna',
  report:'Księgowa zleciła streszczenie wiadomości od dostawcy. Minutę później w kartotece pojawił się nowy rachunek. W tym samym czasie dział finansowy importował zatwierdzone zmiany.',
  rule:'Zlecenie streszczenia daje wyłącznie prawo odczytu. Zmiana rachunku wymaga zatwierdzonej dyspozycji i zapisu z identyfikatorem operacji.',
  journalGuide:'Obserwuj dwie równoległe ścieżki zmiany rachunku, od przyjęcia do kolejki aż do zapisu w kartotece.',
  events:[
   ['13.00 · Skrzynka','Księgowa zleciła streszczenie wiadomości od dostawcy o zmianie danych. Sesja asystenta ma zgodę wyłącznie na odczyt.'],
   ['13.00 · Import','System finansowy przyjął zatwierdzoną paczkę z działu finansowego. Zawiera dane tego samego dostawcy z tym samym nowym rachunkiem.'],
   ['13.01 · Asystent','Model przygotował propozycję aktualizacji oraz skrót wiadomości.'],
   ['13.01 · Brama','W sesji asystenta utworzono żądanie aktualizacji rachunku. Wpis rejestruje przyjęcie do kolejki przed sprawdzeniem zgody.'],
   ['13.01 · Import','Paczkę z działu finansowego przekazano do kolejki zapisów. Odbiór paczki został potwierdzony.'],
   ['13.02 · Kartoteka','Widoczna wersja rekordu dostawcy zmieniła się z 18 na 19. Nowy rachunek jest zgodny zarówno z wiadomością dostawcy, jak i z paczką finansową.'],
   ['13.02 · Audyt bazy','Dla wersji 19 zachował się czas zapisu, ale pole z identyfikatorem operacji i wykonawcy jest puste.'],
   ['13.03 · Monitoring','W tej minucie wykonano jeden zapis kartoteki. Brakuje wyników żądania asystenta i importu z finansów.'],
   ['13.04 · Skrzynka','Księgowa otrzymała zamówione streszczenie wiadomości.']
  ],
  choices:['Zapis trzeba przypisać asystentowi, ponieważ jego żądanie przyjęto przed zmianą rekordu.','Zapis trzeba przypisać importowi, ponieważ dane w zatwierdzonej paczce są zgodne.','Zmianę potwierdzono. Dostępny ślad nie pozwala ustalić, czy zapisu dokonał asystent, czy system finansowy.'], answer:2,
  evidence:[['Który wpis potwierdza drugie, zatwierdzone źródło identycznych danych?',2],['Który wpis ujawnia brak powiązania konkretnej wersji z wykonawcą zapisu?',7]],
  reasoning:'Sesja asystenta miała jedynie zgodę na odczyt. Propozycja modelu i wpis w kolejce nie potwierdzają jednak zapisu przez asystenta. Import miał te same dane, a audyt wersji 19 nie pozwala rozdzielić obu ścieżek.',
  limit:'Można stwierdzić lukę w audycie i niepożądaną propozycję asystenta. Wykonanie niezatwierdzonej zmiany przez asystenta pozostaje hipotezą.',
  userAction:'Wstrzymaj użycie nowego rachunku do płatności do czasu weryfikacji obowiązującym kanałem. Zgłoś godzinę i zmianę wersji kartoteki. Wykonawca zapisu nadal wymaga ustalenia.',
  follow:'Poszukaj pokwitowania transakcji wiążącego zapis kartoteki z żądaniem asystenta albo importem z finansów. Ogranicz narzędzia sesji streszczającej do odczytu i utrwalaj powiązanie zapisu z decyzją o zgodzie.',
  lesson:'LLM-10'
 }
];
