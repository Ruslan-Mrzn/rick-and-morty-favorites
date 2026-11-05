import { useEffect, useRef, useState } from 'react';

import { FavoriteIcon } from '@/assets/icons';

import styles from './FavoriteCharacters.module.scss';
import type { TFavoriteCharactersProps, TLinkComponentProps } from './types';

const MAX_FAVORITES_TO_VIEW = 9;

const DefaultLink = ({
  to,
  className,
  onClick,
  children
}: TLinkComponentProps) => (
  <a
    className={className}
    href={to}
    onClick={onClick}
  >
    {children}
  </a>
);

const FavoriteCharacters = ({
  favorites,
  onRemove,
  labels,
  linkComponent: Link = DefaultLink
}: TFavoriteCharactersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const hasFavorites = favorites.length > 0;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (rootRef.current && !event.composedPath().includes(rootRef.current)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div
      className={styles.favoriteCharacters}
      ref={rootRef}
    >
      <button
        type='button'
        className={styles.favoriteCharacters__toggle}
        aria-label={isOpen ? labels.close : labels.open}
        aria-expanded={isOpen}
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen((open) => !open);
        }}
      >
        <FavoriteIcon
          width={25}
          height={24}
          className={
            hasFavorites
              ? styles.favoriteCharacters__icon_active
              : styles.favoriteCharacters__icon
          }
          aria-hidden='true'
        />
        {hasFavorites && (
          <span className={styles.favoriteCharacters__count}>
            {favorites.length > MAX_FAVORITES_TO_VIEW
              ? `${MAX_FAVORITES_TO_VIEW}+`
              : favorites.length}
          </span>
        )}
      </button>

      {isOpen && (
        <section
          className={styles.favoriteCharacters__panel}
          aria-label={labels.title}
        >
          {hasFavorites ? (
            <ul className={styles.favoriteCharacters__list}>
              {favorites.map((character) => (
                <li
                  className={styles.favoriteCharacters__item}
                  key={character.id}
                >
                  <Link
                    className={styles.favoriteCharacters__link}
                    to={`/character/${character.id}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {character.name}
                  </Link>
                  <button
                    type='button'
                    className={styles.favoriteCharacters__remove}
                    aria-label={`${labels.remove}: ${character.name}`}
                    onClick={() => onRemove(character.id)}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.favoriteCharacters__empty}>{labels.empty}</p>
          )}
        </section>
      )}
    </div>
  );
};

export default FavoriteCharacters;
