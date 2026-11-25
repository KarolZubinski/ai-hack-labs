# AI Hack Labs

Statyczna aplikacja do nauki bezpieczeństwa AI. Rozpakuj archiwum i skopiuj całą jego zawartość do katalogu głównego repozytorium, tak aby plik `index.html` był obok katalogów `assets` i `zagrozenia`.

## GitHub Pages

1. Zapisz pliki na gałęzi `main`.
2. Otwórz **Settings → Pages** w repozytorium.
3. W **Build and deployment → Source** wybierz **Deploy from a branch**, następnie **main**, **/ (root)** i **Save**.
4. Po zakończeniu publikacji otwórz adres pokazany przez GitHub Pages.

## Edycja

- `index.html`, `style.css` i `pulpit.js` obsługują pulpit. Pozostałe moduły mają własne katalogi. Strony można otwierać za pomocą ich adresów lub menu aplikacji.
- `zagrozenia/<nazwa>/index.html` zawiera przewodnik, źródła i porównanie przebiegów. Własny `style.css` steruje wyglądem lekcji. W `scenariusze.js` znajdują się jej ćwiczenia, przykładowe wejścia w dwóch językach i omówienia odpowiedzi.
- `assets/css/wspolne.css` odpowiada za wspólny układ, a `assets/js/` za nawigację i obsługę postępów.
- `sprawy-do-zbadania/dane.js` zawiera treść spraw. Oceny i preferencje języka są zapisywane lokalnie w przeglądarce dla danego adresu witryny.
