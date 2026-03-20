function showFormula(n) {
  document.querySelectorAll('.formula')
    .forEach(f => f.style.display = 'none');

  document.getElementById('f' + n).style.display = 'block';
}

