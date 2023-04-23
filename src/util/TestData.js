export const testRecipe = {
  id: 0,
  name: 'Chicken Pasta with tomato and spinach crap',
  description: 'super duper yummy meal',
  imgURL: 'https://www.jocooks.com/wp-content/uploads/2022/01/tomato-spinach-chicken-pasta-1-9.jpg',
  ingredients: ['spinach (1 cup)','chicken (1 cup)','tomato (1 cup)'],
  steps: ['chop stuff into really tiny pieces', 'cook stuff', 'serve stuff'],
  time: '45 min',
  tags: ['dinner'],
  servings: 4,
  date: null
}

export const testInProgress = {
  id: 0,
  name: 'Chicken Pasta with tomato and spinach crap',
  description: 'super duper yummy meal',
  imgURL: 'https://www.jocooks.com/wp-content/uploads/2022/01/tomato-spinach-chicken-pasta-1-9.jpg',
  time: '45 min',
  tags: ['dinner'],
  servings: 4,
  date: null,
  versions: [
    {
      ingredients: ['spinach (1 cup)','spinach (1 cup)','tomato (1 cup)'],
      steps: ['chop stuff into really tiny pieces', 'cook stuff', 'serve stuff'],
    },
    {
      ingredients: ['spinach (1 cup)','chicken (1 cup)','tomato (1 cup)', 'butter','spinach (1 cup)','chicken (1 cup)','tomato (1 cup)', 'butter','spinach (1 cup)','chicken (1 cup)','tomato (1 cup)', 'butter'],
      steps: ['chop stuff into really tiny pieces', 'cook stuff', 'serve stuff'],
    },
    {
      ingredients: ['spinach (1 cup)','chicken (1 cup)','tomato (1 cup)', 'butter'],
      steps: ['chop stuff into really tiny pieces', 'cook stuff', 'serve stuff'],
    }
  ]
  
  
}

