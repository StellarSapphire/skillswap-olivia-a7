function filterSkillsByCategory(skills, category) {
    if (category === 'All') {
      return skills;
    }
    return skills.filter(skill => skill.category === category);
}

function calculateTotalCosts(hourlyRate, hours) {
    return hourlyRate * hours;
}

function matchSkillsToUser(userSkills, skills) {
    return skills.filter(skill =>
        skill.category === userSkills.category && skill.price <= userSkills.maxPrice
    );
}

module.exports = { filterSkillsByCategory, calculateTotalCosts, matchSkillsToUser };