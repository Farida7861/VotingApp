const options = ["JavaScript", "Python", "Java", "C++"];
let votes =
  JSON.parse(localStorage.getItem("votes")) || Array(options.length).fill(0);
const hasVoted = JSON.parse(localStorage.getItem("hasVoted")) || false;

const optionsDiv = document.getElementById("options");
const message = document.getElementById("vote-message");
const totalVotesDisplay = document.getElementById("total-votes");

function renderOptions() {
  optionsDiv.innerHTML = "";
  const totalVotes = votes.reduce((a, b) => a + b, 0);
  totalVotesDisplay.textContent = `Total Votes: ${totalVotes}`;

  options.forEach((option, index) => {
    const count = votes[index];
    const percent = totalVotes ? ((count / totalVotes) * 100).toFixed(1) : 0;

    const optionDiv = document.createElement("div");
    optionDiv.className = "option";
    optionDiv.innerHTML = `
      ${option}
      <span class="count">${count} votes (${percent}%)</span>
      <div class="bar" style="width:${percent}%;"></div>
    `;

    optionDiv.onclick = () => {
      if (localStorage.getItem("hasVoted") === "true") {
        message.textContent = "⚠️ You have already voted!";
        message.style.color = "red";
        return;
      }

      votes[index]++;
      localStorage.setItem("votes", JSON.stringify(votes));
      localStorage.setItem("hasVoted", "true");
      message.textContent = "✅ Thank you for voting!";
      message.style.color = "green";
      renderOptions();
    };

    optionsDiv.appendChild(optionDiv);
  });
}

renderOptions();
