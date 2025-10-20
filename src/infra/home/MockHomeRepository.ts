import type { HomeData, HomeRepository } from '../../domain/home/types';

export class MockHomeRepository implements HomeRepository {
  async getHomeData(): Promise<HomeData> {
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
      results: [
        {
          imageUrl:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=60&auto=format&fit=crop',
          dateLabel: '21 de maio de 2025',
        },
        {
          imageUrl:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=60&auto=format&fit=crop',
          dateLabel: '10 de setembro de 2024',
        },
        {
          imageUrl:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=60&auto=format&fit=crop',
          dateLabel: '5 de março de 2024',
        },
        {
          imageUrl:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=60&auto=format&fit=crop',
          dateLabel: '8 de janeiro de 2024',
        },
        {
          imageUrl:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=60&auto=format&fit=crop',
          dateLabel: '16 de novembro de 2023',
        },
      ],
      unreadCount: 3,
      messages: [
        {
          id: '1',
          title: 'Chegou nova onda de calor, como proceder',
          preview:
            'As altas temperaturas registradas neste verão têm causado impactos diretos na saúde da pele...',
          dateLabel: '01 de agosto de 2025',
          read: false,
        },
        {
          id: '2',
          title: 'Monica, seu procedimento é semana que vem!',
          preview: 'A primavera é uma estação de renovação, e sua pele merece acompanhar esse ciclo...',
          dateLabel: '01 de agosto de 2025',
          read: false,
        },
        {
          id: '3',
          title: 'Skinboosters com ácido hialurônico são destaque',
          preview:
            'Uma das grandes inovações deste ano são os skinboosters com ácido hialurônico de liberação prolongada...',
          dateLabel: '01 de agosto de 2025',
          read: false,
        },
        {
          id: '4',
          title: 'Autoestima em alta: renove sua pele',
          preview: 'Em dias muito quentes, a pele precisa de cuidados especiais para se manter saudável...',
          dateLabel: '01 de agosto de 2025',
          read: true,
        },
        {
          id: '5',
          title: 'Chegou nova onda de calor, como proceder',
          preview: 'Em dias muito quentes, a pele precisa de cuidados especiais para se manter saudável...',
          dateLabel: '01 de agosto de 2025',
          read: true,
        },
      ],
      care: [
        { dateLabel: '08 de agosto de 2025', title: 'Receita manipulados', status: 'scheduled' },
        { dateLabel: '08 de agosto de 2025', title: 'Receita manipulados', status: 'cancelled' },
        { dateLabel: '08 de agosto de 2025', title: 'Receita manipulados', status: 'cancelled' },
      ],
      regeneration: [
        { dateLabel: '06 de outubro de 2025', title: 'Fio Silhouett', status: 'scheduled' },
        { dateLabel: '21 de maio de 2025', title: 'Fotona 4D', status: 'scheduled' },
        { dateLabel: '12 de dezembro de 2023', title: 'Fotona 2D', status: 'done' },
        { dateLabel: '10 de novembro de 2023', title: 'Fotona 2D', status: 'done' },
      ],
      maintenance: [
        { dateLabel: '06 de junho de 2026', title: 'Ultrafomer MPT - Completo', status: 'scheduled' },
        { dateLabel: '28 de novembro de 2025', title: 'Botox - Face + Pescoço', status: 'scheduled' },
        { dateLabel: '10 de julho de 2025', title: 'Laser CO2- Fracionado', status: 'cancelled' },
      ],
    };
  }
}
