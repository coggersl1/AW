document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('pension-form');
  const resultsDiv = document.getElementById('projection-results');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Gather form data
    const age = parseInt(form.age.value, 10);
    const retirementAge = parseInt(form.retirementAge.value, 10);
    const currentPension = parseFloat(form.currentPension.value);
    const contribution = parseFloat(form.contribution.value);
    const returnRate = parseFloat(form.returnRate.value) / 100;
    const riskProfile = form.riskProfile.value;

    // Projection logic
    let years = retirementAge - age;
    let balance = currentPension;
    let projection = [];

    for (let i = 0; i <= years; i++) {
      if (i > 0) {
        balance = (balance + contribution) * (1 + returnRate);
      }
      projection.push({
        year: new Date().getFullYear() + i,
        age: age + i,
        value: balance
      });
    }

    // Display results
    let html = `
      <h3>Projection Results</h3>
      <table class="data-grid">
        <thead>
          <tr>
            <th>Year</th>
            <th>Age</th>
            <th>Projected Value (£)</th>
          </tr>
        </thead>
        <tbody>
          ${projection.map(row => `
            <tr>
              <td>${row.year}</td>
              <td>${row.age}</td>
              <td>£${row.value.toLocaleString(undefined, {maximumFractionDigits: 0})}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <p class="tagline">Assumes annual contributions and a constant return rate. For illustration only.</p>
    `;
    resultsDiv.innerHTML = html;
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
  });
});
