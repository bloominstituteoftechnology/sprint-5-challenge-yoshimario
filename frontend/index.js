async function sprintChallenge5() {
  // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK BELOW THIS LINE 👇

  const footer = document.querySelector("footer");
  const currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;

  const learnersResponse = await fetch("http://localhost:3003/api/learners");
  const learnersData = await learnersResponse.json();
  const mentorsResponse = await fetch("http://localhost:3003/api/mentors");
  const mentorsData = await mentorsResponse.json();

  const cards = document.querySelector(".cards");
  const cardInfo = document.querySelector(".info");
  cardInfo.textContent = "No learner is selected";

  let selectedCard; // Declare a variable to track the selected card

  learnersData.forEach(learner => {
    const learnerCard = buildLearnerCard(learner, mentorsData);
    cards.appendChild(learnerCard);

    learnerCard.addEventListener("click", () => {
      if (selectedCard) {
        selectedCard.classList.remove("selected");
      }

      learnerCard.classList.add("selected");
      cardInfo.textContent = `The selected learner is ${learner.fullName}, ID: ${learner.id}`;
      selectedCard = learnerCard;

      const learnerIdElement = learnerCard.querySelector("h3");
      if (learnerIdElement) {
        learnerIdElement.textContent = `${learner.fullName}, ID: ${learner.id}`;
      }
    });
  });

  function buildLearnerCard(learner, mentorsData) {
    const card = document.createElement("div");
    card.classList.add("card");

    const { fullName, email, mentors } = learner;

    const learnerNameH3 = document.createElement("h3");
    learnerNameH3.textContent = fullName;

    const emailDiv = document.createElement("div");
    emailDiv.textContent = email;

    const mentorNameH4 = document.createElement("h4");
    mentorNameH4.textContent = "Mentors";
    mentorNameH4.classList.add("closed");

    const mentorListUl = document.createElement("ul");
    mentorListUl.append(
      ...mentors.map(mentorId => {
        const { firstName, lastName } = mentorsData.find(m => m.id === mentorId);
        const mentorItemList = document.createElement("li");
        mentorItemList.textContent = `${firstName} ${lastName}`;
        return mentorItemList;
      })
    );

    [learnerNameH3, emailDiv, mentorNameH4, mentorListUl].forEach(element => {
      card.appendChild(element);
    });

    mentorNameH4.addEventListener("click", () => {
      mentorListUl.classList.toggle("open");
    });

    return card;
  }
  // 👆 WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE BELOW
if (typeof module !== "undefined" && module.exports)
  module.exports = { sprintChallenge5 };
else sprintChallenge5();