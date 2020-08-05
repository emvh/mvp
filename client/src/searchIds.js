const searchIds = (category) => {
  let searchTerms = [];
  if (category === 'social') {
    searchTerms = ['family_fun_kids', 'food', 'community', 'singles_social', 'other'];
  }
  if (category === 'classes') {
    searchTerms = ['conference', 'learning_education', 'business'];
  }
  if (category === 'adoption') {
    searchTerms = ['animals'];
  }
  if (category === 'puppy therapy') {
    searchTerms = ['animals'];
  }
  if (category === 'fitness') {
    searchTerms = ['support', 'outdoors_recreation'];
  }
  return searchTerms;
};

export default searchIds;
