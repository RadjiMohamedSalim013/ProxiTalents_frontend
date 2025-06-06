export interface Article {
  id: string;
  titre: string;
  contenu: string;
}

export const articles: Article[] = [
  {
    id: '1',
    titre: 'Comment réussir dans le monde professionnel',
    contenu: 'Voici quelques conseils pour réussir dans le monde professionnel...'
  },
  {
    id: '2',
    titre: 'L\'importance du réseautage',
    contenu: 'Le réseautage est essentiel pour développer sa carrière...'
  },
  {
    id: '3',
    titre: 'Gérer son temps efficacement',
    contenu: 'La gestion du temps est une compétence clé pour la réussite...'
  }
];
