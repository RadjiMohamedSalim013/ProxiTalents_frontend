export interface Article {
  id: string;
  titre: string;
  contenu: string;
  date: string;
  resume?: string;
  imageUrl?: string;
}

export const articles: Article[] = [
  {
    id: '1',
    titre: 'Les 7 Compétences Clés pour Réussir en Entreprise en 2024',
    date: '15 mars 2024',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216',
    resume: 'Découvrez les compétences indispensables pour exceller dans le monde professionnel actuel',
    contenu: `Dans un environnement professionnel en constante évolution, certaines compétences se révèlent indispensables pour réussir. Voici les 7 compétences clés à maîtriser en 2024 :

1. Intelligence émotionnelle
La capacité à comprendre et gérer ses émotions, ainsi qu'à interagir efficacement avec les autres, est devenue primordiale. Les leaders émotionnellement intelligents obtiennent de meilleurs résultats d'équipe.

2. Adaptabilité
Face aux changements technologiques rapides, l'agilité professionnelle est cruciale. Les travailleurs capables de se réinventer sont les plus recherchés.

3. Maîtrise des données
Savoir analyser et interpréter des données, même basiques, donne un avantage concurrentiel dans presque tous les secteurs.

4. Communication digitale
Avec le télétravail, la capacité à communiquer clairement par écrit et via les outils digitaux est essentielle.

5. Pensée critique
Dans un monde d'informations surabondantes, trier l'essentiel du superflu devient une compétence professionnelle majeure.

6. Gestion du temps
Prioriser efficacement et éviter les distractions sont devenus des atouts indispensables.

7. Apprentissage continu
La capacité à apprendre rapidement de nouvelles compétences est la compétence mère qui permet d'acquérir toutes les autres.

Pour développer ces compétences, commencez par un auto-diagnostic honnête, puis établissez un plan de développement progressif. La régularité prime sur l'intensité.`
  },
  {
    id: '2',
    titre: 'Réseautage Professionnel : Stratégies Efficaces pour 2024',
    date: '22 février 2024',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    resume: 'Comment construire un réseau professionnel puissant et authentique',
    contenu: `Le réseautage reste l'un des moyens les plus efficaces pour faire progresser sa carrière. Voici comment réseauter intelligemment en 2024 :

1. Approche qualitative
Privilégiez la qualité à la quantité. Mieux vaut 10 contacts solides que 100 relations superficielles.

2. Donner avant de recevoir
Offrez votre aide, partagez des ressources ou faites des mises en relation avant de demander quoi que ce soit.

3. Utilisez LinkedIn stratégiquement
- Personnalisez chaque demande de connexion
- Partagez du contenu pertinent
- Interagissez régulièrement avec votre réseau

4. Participez aux événements sectoriels
Les conférences et meetups restent d'excellentes opportunités, à condition d'y aller préparé :
- Fixez-vous des objectifs
- Préparez votre pitch court
- Suivez systématiquement après l'événement

5. Créez votre cercle maître
Identifiez 5-8 personnes clés avec qui entretenir des relations régulières et mutuellement bénéfiques.

6. Digital networking
Les communautés en ligne spécialisées (Slack, Discord) offrent des opportunités moins exploitées que LinkedIn.

7. Soyez authentique
Le réseautage efficace repose sur des relations vraies. Montrez votre personnalité et vos valeurs.

Rappel : Un bon réseau se construit dans la durée. Consacrez-y 30 minutes par semaine minimum.`
  },
  {
    id: '3',
    titre: 'Productivité Profonde : Techniques Scientifiquement Prouvées',
    date: '8 janvier 2024',
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
    resume: 'Méthodes fondées sur la science pour maximiser votre efficacité au travail',
    contenu: `La productivité réelle ne se mesure pas en heures travaillées, mais en résultats obtenus. Voici les techniques les plus efficaces :

1. Méthode Pomodoro (25/5)
Travailler par intervalles de 25 minutes suivis de 5 minutes de pause augmente la concentration de 40%.

2. Règle des 2 minutes
Si une tâche prend moins de 2 minutes, faites-la immédiatement. Cela réduit l'accumulation de micro-tâches.

3. Time blocking
Planifiez chaque heure de votre journée, en incluant les pauses. Cela réduit les temps morts de 30%.

4. Loi de Parkinson
Fixez des délais artificiellement courts pour éviter que le travail ne s'étale inutilement.

5. Eat the frog
Commencez par la tâche la plus difficile. Cela libère l'esprit pour le reste de la journée.

6. Batch processing
Regroupez les tâches similaires (emails, appels, etc.) pour minimiser les changements de contexte.

7. 80/20
Identifiez les 20% d'activités qui génèrent 80% des résultats et concentrez-vous dessus.

Outils recommandés :
- Forest (anti-distraction)
- Toggl (tracking du temps)
- Notion (organisation)

Important : La productivité durable inclut des pauses régulières, une bonne hygiène de vie et des limites claires entre vie pro et perso.`
  }
];