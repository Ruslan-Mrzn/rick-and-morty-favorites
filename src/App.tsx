import { useState } from "react";

import FavoriteCharacters from "@/widgets/FavoriteCharacters";
import type {
  TFavoriteCharacter,
  TFavoriteCharactersLabels,
} from "@/widgets/FavoriteCharacters/types";

const MOCK_FAVORITES: TFavoriteCharacter[] = [
  { id: 1, name: "Rick Sanchez" },
  { id: 2, name: "Morty Smith" },
  { id: 3, name: "Summer Smith" },
  { id: 4, name: "Beth Smith" },
  { id: 5, name: "Jerry Smith" },
  { id: 6, name: "Abadango Cluster Princess" },
  { id: 7, name: "Abradolf Lincler" },
  { id: 8, name: "Adjudicator Rick" },
  { id: 9, name: "Agency Director" },
  { id: 10, name: "Alan Rails" },
  { id: 11, name: "Albert Einstein" },
];

const LABELS: TFavoriteCharactersLabels = {
  open: "Открыть избранное",
  close: "Закрыть избранное",
  title: "Избранные персонажи",
  remove: "Удалить из избранного",
  empty: "Сначала добавьте персонажей в избранное",
};

type TTheme = "light" | "dark";

const App = () => {
  const [favorites, setFavorites] =
    useState<TFavoriteCharacter[]>(MOCK_FAVORITES);
  const [theme, setTheme] = useState<TTheme>("light");

  const handleRemove = (id: number) => {
    setFavorites((current) =>
      current.filter((character) => character.id !== id),
    );
  };

  const handleThemeToggle = () => {
    const nextTheme: TTheme = theme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);
  };

  return (
    <div className="standalone">
      <header className="standalone__header">
        <span className="standalone__logo">remote_app</span>
        <div className="standalone__controls">
          <FavoriteCharacters
            favorites={favorites}
            labels={LABELS}
            onRemove={handleRemove}
          />
          <button
            type="button"
            className="standalone__themeToggle"
            onClick={handleThemeToggle}
          >
            {theme === "dark" ? "Светлая тема" : "Тёмная тема"}
          </button>
        </div>
      </header>
      <main className="standalone__main">
        <p>Микрофронтенд избранных персонажей. Данные моковые.</p>
        <p>В избранном: {favorites.length}</p>
      </main>
    </div>
  );
};

export default App;
