let students = [
    "สมชาย","สมหญิง","สมศรี","สมปอง",
    "สมเกียรติ","สมบัติ","สมดี","สมจิตร"
];

let scores = [];

function calculateGrade() {
    scores = [];
    let tbody = "";

    for (let i = 0; i < 8; i++) {
        let score = Math.floor(Math.random() * 61) + 40;
        scores.push(score);

        let grade = "";
        if (score >= 80) grade = "A";
        else if (score >= 70) grade = "B";
        else if (score >= 60) grade = "C";
        else if (score >= 50) grade = "D";
        else grade = "F";

        tbody += `
        <tr>
            <td>${i+1}</td>
            <td>${students[i]}</td>
            <td>${score}</td>
            <td>${grade}</td>
        </tr>`;
    }

    document.getElementById("tableBody").innerHTML = tbody;
}
