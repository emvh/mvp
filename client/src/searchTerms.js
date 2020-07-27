const searchIds = (category) => {
  let search = [];
  if (category === 'social') {
    search = ['family_fun_kids', 'festivals_parades', 'food', 'community', 'singles_social', 'animals', 'other'];
  }
  if (category === 'classes') {
    search = ['learning_education', 'conference'];
  }
  if (category === 'adoption') {
    search = ['adoption'];
  }
  if (category === 'puppy therapy') {
    search = ['therapy'];
  }
  if (category === 'fitness') {
    search = ['support', 'outdoors_recreation'];
  }
  return search;
};

export default searchIds;
