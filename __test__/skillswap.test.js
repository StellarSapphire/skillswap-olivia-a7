const { filterSkillsByCategory, calculateTotalCosts, matchSkillsToUser } = require('../skillswap-functions');

describe('filterSkillsByCategory', () => {
    const skills = [
        { title: 'Biology', category: 'Science', price: 25 },
        { title: 'Algebra', category: 'Math', price: 20 },
        { title: 'Physics', category: 'Science', price: 30 },
    ];

    test('filters skills by category', () => {
        const result = filterSkillsByCategory(skills, 'Science');
        expect(result).toEqual([
        { title: 'Biology', category: 'Science', price: 25 },
        { title: 'Physics', category: 'Science', price: 30 }
        ]);
    });

    test('filters skills by category', () => {
        const result = filterSkillsByCategory(skills, 'Math');
        expect(result).toEqual([
            { title: 'Algebra', category: 'Math', price: 20 }
        ]);
    });

    test('handles "All" category', () => {
        const result = filterSkillsByCategory(skills, 'All');
        expect(result).toEqual(skills);
    });

    test('returns empty array when no matches', () => {
        const result = filterSkillsByCategory(skills, 'Cooking');
        expect(result).toEqual([]);
    });
});

describe('calculateTotalCosts', () => {

    test('calculates total costs per hour', () => {
        expect(calculateTotalCosts(20, 2)).toEqual(40);
        expect(calculateTotalCosts(15, 3)).toEqual(45);
    });

    test('handles free sessions and zero hours', () => {
        expect(calculateTotalCosts(0, 5)).toEqual(0);
        expect(calculateTotalCosts(25, 0)).toEqual(0);
    });
});

// The VS Code AI helper suggested the following tests
describe('matchSkillsToUser', () => {
    const skills = [
        { title: 'Biology', category: 'Science', price: 25 },
        { title: 'Algebra', category: 'Math', price: 20 },
        { title: 'Physics', category: 'Science', price: 30 },
    ];

    test('matches Science skills to within budget', () => {
        const userSkills = { category: 'Science', maxPrice: 30 };
        const result = matchSkillsToUser(userSkills, skills);
        expect(result).toEqual([
            { title: 'Biology', category: 'Science', price: 25 },
            { title: 'Physics', category: 'Science', price: 30 }
        ]);
    });

    test('matches Math skills to within budget', () => {
        const userSkills = { category: 'Math', maxPrice: 25 };
        const result = matchSkillsToUser(userSkills, skills);
        expect(result).toEqual([
            { title: 'Algebra', category: 'Math', price: 20 }
        ]);
    });

    test('includes free skills', () => {
        const freeSkills = [
            ...skills,
            { title: 'Resume Review', category: 'Career', price: 0 }
        ];
        const userSkills = { category: 'Career', maxPrice: 0 };
        const result = matchSkillsToUser(userSkills, freeSkills);
        expect(result).toEqual([
            { title: 'Resume Review', category: 'Career', price: 0 }
        ]);
    });

    test('returns empty array when no matches', () => {
        const userSkills = { category: 'Cooking', maxPrice: 15 };
        const result = matchSkillsToUser(userSkills, skills);
        expect(result).toEqual([]);
    });
});