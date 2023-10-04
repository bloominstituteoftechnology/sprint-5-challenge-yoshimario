async function sprintChallenge5() {
  // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK BELOW THIS LINE 👇

  const footer = document.querySelector("footer");
  const currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;

  // Fetch learner and mentor data from the API
  const learnersResponse = await fetch("http://localhost:3003/api/learners");
  const learnersData = await learnersResponse.json();
  const mentorsResponse = await fetch("http://localhost:3003/api/mentors");
  const mentorsData = await mentorsResponse.json();

  const cards = document.querySelector(".cards");
  const cardInfo = document.querySelector(".info");
  cardInfo.textContent = "No learner is selected";

  learnersData.forEach(learner => {
    const learnerCard = buildLearnerCard(learner, mentorsData);
    cards.appendChild(learnerCard);

    learnerCard.addEventListener("click", () => {
      const isSelected = learnerCard.classList.contains("selected");

      if (!isSelected) {
        // Deselect all cards first
        document.querySelectorAll(".card").forEach(card => {
          card.classList.remove("selected");
        });
        // Select the clicked card
        learnerCard.classList.add("selected");
        cardInfo.textContent = `The selected learner is ${learner.fullName}`;
        // Check if the learner ID element exists
        const learnerIdElement = learnerCard.querySelector("h3");
        if (learnerIdElement) {
          learnerIdElement.textContent = `${learner.fullName}, ID: ${learner.id}`;
        }
      } else {
        // Deselect the clicked card
        learnerCard.classList.remove("selected");
        cardInfo.textContent = "No learner is selected";
        // Check if the learner ID element exists
        const learnerIdElement = learnerCard.querySelector("h3");
        if (learnerIdElement) {
          learnerIdElement.textContent = learner.fullName;
        }
      }
    });
  });

  function buildLearnerCard(learner, mentorsData) {
    const card = document.createElement("div");
    card.classList.add("card");

    const learnerNameH3 = document.createElement("h3");
    learnerNameH3.textContent = learner.fullName;

    const emailDiv = document.createElement("div");
    emailDiv.textContent = learner.email;

    const mentorNameH4 = document.createElement("h4");
    mentorNameH4.textContent = "Mentors";
    mentorNameH4.classList.add("closed");

    const mentorListUl = document.createElement("ul");
    learner.mentors.forEach(mentorName => {
      mentorsData.forEach(mentor => {
        if (mentorName === mentor.id) {
          const mentorItemList = document.createElement("li");
          mentorItemList.textContent = mentor.firstName + " " + mentor.lastName;
          mentorListUl.appendChild(mentorItemList);
        }
      });
    });

    [learnerNameH3, emailDiv, mentorNameH4, mentorListUl].forEach(element => {
      card.appendChild(element);
    });

    mentorNameH4.addEventListener("click", () => {
      mentorNameH4.classList.toggle("open");
      mentorNameH4.classList.toggle("closed");
    });

    return card;
  }

  // 👆 WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE BELOW
if (typeof module !== "undefined" && module.exports)
  module.exports = { sprintChallenge5 };
else sprintChallenge5();
