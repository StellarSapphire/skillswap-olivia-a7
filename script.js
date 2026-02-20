/*  Author: Olivia Haag
 *  Date: 2/12/26
 *  Class: Rize - Software Development
 *  Purpose:Assignment: Assign. 5 - SkillSwap JavaScript
 */

/*alert("JavaScript is working!");*/

function filterSkillsByCategory(skills, category) {
    if (category === 'All') {
        return skills;
    }
    return skills.filter(skill => skill.category === category);
}

const allSkills = [
    {
        title: 'Biology',
        category: 'Science',
        price: 25,
        provider: 'Shelby Cannon',
        description: 'Learn about cellular processes, genetics, ecosystems, and much more!'
    },
    {
        title: 'Algebra',
        category: 'Math',
        price: 20,
        provider: 'Ryan Digby',
        description: 'Learn about algebraic expressions, equations, and functions.'
    },
    {
        title: 'Physics',
        category: 'Science',
        price: 30,
        provider: 'Chelsie Brown',
        description: 'Learn about mechanics, thermodynamics, electromagnetism, and much more!'
    },
];

function displaySkills(skills) {
    const container = document.getElementById('skills-container');

    if (!container) {
        console.error('skills-container not found');
        return;
    }

    container.innerHTML = '';

    skills.forEach(skill => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h2>${skill.title}</h2>
            <p class="category">${skill.category}</p>
            <p class="price">$${skill.price}</p>
            <p class="provider">Provider: ${skill.provider}</p>
            <p class="description">${skill.description}</p>
        `;

        card.addEventListener('click', function() {
            const title = this.querySelector('h2').textContent;
            const provider = this.querySelector('.provider').textContent;
            const price = this.querySelector('.price').textContent;
            const description = this.querySelector('.description').textContent;

            alert(`Title: ${title}\n${provider}\nPrice: ${price}\nDescription: ${description}`);
        });

        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll(".skill-container");

    //I utilized AI to assist with the card expansion and collapse functionality when a user clicks on multiple cards.
    cards.forEach(card => {
        card.addEventListener("click", function() {
            const isExpanded = this.classList.contains("expanded");
            cards.forEach(c => c.classList.remove("expanded"));
            if (!isExpanded) {
                this.classList.add("expanded");
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.getAttribute('data-category');
            const filteredSkills = filterSkillsByCategory(allSkills, category);
            displaySkills(filteredSkills);
        });
    });

    displaySkills(allSkills);
});

function calculateTotalCosts(hourlyRate, hours) {
    return hourlyRate * hours;
}

// I utilized AI to assist with the this button click event listener 
document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('calculate-btn');

    button.addEventListener('click', function() {
        const rate = parseFloat(document.getElementById('rate-input').value);
        const hours = parseFloat(document.getElementById('hours-input').value);
        const result = document.getElementById('total-cost');

        if (isNaN(rate) || isNaN(hours) || rate < 0 || hours < 0) {
            result.textContent = 'Please enter valid non-negative numbers for rate and hours.';
            return;
        }
        
        const total = calculateTotalCosts(rate, hours);
        document.getElementById('total-cost').textContent = `Total Cost: $${total.toFixed(2)}`;
    });
});

function matchSkillsToUser(userSkills, skills) {
    return skills.filter(skill =>
        skill.category.toLowerCase() === userSkills.category.toLowerCase() && skill.price <= userSkills.maxPrice
    );
}

document.addEventListener('DOMContentLoaded', function() {
    const matchButton = document.getElementById('match-btn');

    matchButton.addEventListener('click', function() {
        const category = document.getElementById('user-category').value.trim().toLowerCase();
        const maxPrice = parseFloat(document.getElementById('user-max-price').value);
        const container = document.getElementById('matched-skills-container');

        if (isNaN(maxPrice) || maxPrice < 0) {
            container.textContent = 'Please enter a valid non-negative number for max price.';
            return;
        }

        const userSkills = { category, maxPrice };
        const matchedSkills = matchSkillsToUser(userSkills, allSkills);
        container.innerHTML = '';

        if (matchedSkills.length === 0) {
            container.textContent = 'No matching skills found.';
            return;
        }

        matchedSkills.forEach(skill => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h2>${skill.title}</h2>
                <p class="category">${skill.category}</p>
                <p class="price">$${skill.price}</p>
                <p class="provider">Provider: ${skill.provider}</p>
                <p class="description">${skill.description}</p>
            `;
            container.appendChild(card);
        });
    });
});