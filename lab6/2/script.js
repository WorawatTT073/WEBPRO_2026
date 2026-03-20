function displayStudents(data) {
    const block = document.getElementById('result');

    data.forEach((student, index) => {
        const card = document.createElement('div');
        card.className = 'card';

        const avatar = document.createElement('div');
        avatar.className = 'avatar';

        const img = document.createElement('img');
        img.src =
            student.gender === 'Male'
                ? 'img_male.png'
                : 'img_female.png';
        img.alt = student.gender;

        avatar.appendChild(img);

        const name = document.createElement('h3');
        name.textContent = `${index + 1}. ${student.name || '-'}`;

        const scores = document.createElement('div');
        scores.className = 'scores';

        const pPhysics = document.createElement('p');
        pPhysics.textContent = `Physics : ${student.physics ?? '-'}`;

        const pMaths = document.createElement('p');
        pMaths.textContent = `Mathematics : ${student.maths ?? '-'}`;

        const pEnglish = document.createElement('p');
        pEnglish.textContent = `English : ${student.english ?? '-'}`;

        scores.appendChild(pPhysics);
        scores.appendChild(pMaths);
        scores.appendChild(pEnglish);

        card.appendChild(avatar);
        card.appendChild(name);
        card.appendChild(scores);

        block.appendChild(card);
    });
}

fetch('student-score.json')
    .then(response => response.json())
    .then(data => displayStudents(data))
    .catch(error => console.log('error', error));