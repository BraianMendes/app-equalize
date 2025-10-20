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
};

export async function getHomeData(): Promise<{
  upcoming: UpcomingProcedure;
  news: NewsItem[];
  results: ResultItem[];
  unreadCount: number;
}> {
  // mock async
  await new Promise((r) => setTimeout(r, 50));
  return {
    upcoming: { dateLabel: '25 de agosto', name: 'Fio Silhouett' },
    news: [
      {
        title: 'Chegou nova onda de calor, como proceder',
        subtitle: 'Confira aqui 10 dicas de cuidados com seus procedimentos',
        imageUrl:
          'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=1200&q=60&auto=format&fit=crop',
      },
    ],
    results: Array.from({ length: 6 }).map(() => ({
      imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=60&auto=format&fit=crop',
    })),
    unreadCount: 3,
  };
}
