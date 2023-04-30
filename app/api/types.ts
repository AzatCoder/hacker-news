export type HNItemProps <Item extends {}> = Item & {
  by: string;
  id: number;
  kids?: number[];
  time: number;
  type: string;
}

export interface HNStory {
  type: 'story';
  title: string;
  descendants: number;
  url: string;
  score: number;
}

export interface HNComment {
  type: 'comment';
  text: string;
}

export type HNItem = HNItemProps<HNStory | HNComment>;
