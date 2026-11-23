# Grosik – case study UI/UX

Strona projektu aplikacji do edukacji finansowej młodzieży (zaliczenie: UI/UX Design).

## Struktura

```
index.html        – strona główna (prezentacja aplikacji)
case-study.html   – dokumentacja procesu: research → UX → UI → walidacja
css/style.css     – style (tokeny kolorów/odstępów na górze pliku)
js/main.js        – menu mobilne, slider
img/logo.svg      – logo
```

Treści do podmiany oznaczone są w kodzie komentarzem `TODO`.

## Podgląd lokalny

Wystarczy otworzyć `index.html` w przeglądarce.

## Publikacja na GitHub Pages

1. Zainstaluj Git: `winget install --id Git.Git -e`
2. Utwórz puste repozytorium na github.com (np. `grosik`).
3. W folderze projektu:
   ```
   git init
   git add .
   git commit -m "Pierwsza wersja strony"
   git branch -M main
   git remote add origin https://github.com/TWOJ_LOGIN/grosik.git
   git push -u origin main
   ```
4. Na GitHubie: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save**.
5. Po ok. minucie strona będzie pod adresem `https://TWOJ_LOGIN.github.io/grosik/`.

Każda kolejna zmiana: `git add . ; git commit -m "opis" ; git push` – strona zaktualizuje się sama.
