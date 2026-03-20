function randomNumber() {
    let digits = [0,1,2,3,4,5,6,7,8,9];
    let result = [];

    for (let i = 0; i < 6; i++) {
        let index = Math.floor(Math.random() * digits.length);
        result.push(digits.splice(index, 1)[0]);
    }

    let output = "";
    result.forEach((num, i) => {
        let cls = i < 3 ? "blue" : (i === 4 ? "white" : "black");
        output += `<div class="box ${cls}">${num}</div>`;
    });

    document.getElementById("numbers").innerHTML = output;
}
