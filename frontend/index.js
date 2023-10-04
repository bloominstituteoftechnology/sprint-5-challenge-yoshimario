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
  
  let selectedCard = null; // Keep track of the selected card
  
  learnersData.forEach(learner => {
    const learnerCard = buildLearnerCard(learner, mentorsData);
    cards.appendChild(learnerCard);
  
    learnerCard.addEventListener("click", () => {
      if (selectedCard === learnerCard) {
        // If the same card is clicked again, deselect it
        selectedCard.classList.remove("selected");
        selectedCard = null;
        cardInfo.textContent = "No learner is selected";
      } else {
        if (selectedCard) {
          // Deselect the previously selected card
          selectedCard.classList.remove("selected");
        }
        selectedCard = learnerCard; // Set the current card as selected
        learnerCard.classList.add("selected");
        cardInfo.textContent = `The selected learner is ${learner.fullName}, ID: ${learner.id}`;
        const learnerIdElement = learnerCard.querySelector("h3");
        if (learnerIdElement) {
          learnerIdElement.textContent = `${learner.fullName}, ID: ${learner.id}`;
        }
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
    mentorListUl.classList.add("mentors-list"); // Add a class for easy selection
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
      mentorListUl.classList.toggle("open"); // Toggle the visibility class
    });
  
    return card;
  }
  

  // 👆 WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE BELOW
if (typeof module !== "undefined" && module.exports)
  module.exports = { sprintChallenge5 };
else sprintChallenge5();
