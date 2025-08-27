export type UpcomingProcedure = {
  dateLabel: string;
  name: string;
};

export type NewsItem = {
  title: string;
  subtitle: string;
  imageUrl: string;
};

export type ResultItem = {
  imageUrl: string;
  dateLabel?: string;
};

export type MessageItem = {
  id: string;
  title: string;
  preview: string;
  dateLabel: string;
  read: boolean;
};

export type ProcedureItem = {
  dateLabel: string;
  title: string;
  status: 'scheduled' | 'done' | 'cancelled';
};

export type HomeData = {
  upcoming: UpcomingProcedure;
  news: NewsItem[];
  results: ResultItem[];
  unreadCount: number;
  care: ProcedureItem[];
  regeneration: ProcedureItem[];
  maintenance: ProcedureItem[];
  messages: MessageItem[];
};

export interface HomeRepository {
  getHomeData(): Promise<HomeData>;
}
