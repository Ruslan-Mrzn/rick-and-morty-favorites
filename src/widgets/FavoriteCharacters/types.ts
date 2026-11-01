export type TFavoriteCharacter = {
  id: number;
  name: string;
};

export type TFavoriteCharactersLabels = {
  open: string;
  close: string;
  title: string;
  remove: string;
  empty: string;
};

export type TLinkComponentProps = {
  to: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export type TFavoriteCharactersProps = {
  favorites: TFavoriteCharacter[];
  onRemove: (_id: number) => void;
  labels: TFavoriteCharactersLabels;
  linkComponent?: React.ComponentType<TLinkComponentProps>;
};
