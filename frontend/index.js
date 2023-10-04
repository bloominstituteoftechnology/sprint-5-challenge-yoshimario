async function sprintChallenge5() {
  const footer = document.querySelector("footer");
  const currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;

  // Declare learnerCard here
  let learnerCard;

  const learnersResponse = await fetch("http://localhost:3003/api/learners");
  const learnersData = await learnersResponse.json();
  const mentorsResponse = await fetch("http://localhost:3003/api/mentors");
  const mentorsData = await mentorsResponse.json();

  const cards = document.querySelector(".cards");
  const cardInfo = document.querySelector(".info");
  cardInfo.textContent = "No learner is selected";

  learnersData.forEach(learner => {
    learnerCard = buildLearnerCard(learner, mentorsData);
    cards.appendChild(learnerCard)
  
    learnerCard.addEventListener("click", () => {
      if (!learnerCard.classList.contains("selected")) {
        // Deselect all other cards
        document.querySelectorAll(".card.selected").forEach(card => {
          card.classList.remove("selected");
        });
  
        learnerCard.classList.add("selected");
        cardInfo.textContent = `The selected learner is ${learner.fullName}`;
        const learnerIdElement = learnerCard.querySelector("h3");
        if (learnerIdElement) {
          learnerIdElement.textContent = `${learner.fullName}, ID: ${learner.id}`;
        }
      } else {
        learnerCard.classList.remove("selected");
        cardInfo.textContent = "No learner is selected";
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
      if (learnerCard.classList.contains("selected")) {
        learnerCard.classList.remove("selected");
        cardInfo.textContent = "No learner is selected";
        const learnerIdElement = learnerCard.querySelector("h3");
        if (learnerIdElement) {
          learnerIdElement.textContent = learner.fullName;
        }
      } else {
        learnerCard.classList.add("selected");
        cardInfo.textContent = `The selected learner is ${learner.fullName}`;
        const learnerIdElement = learnerCard.querySelector("h3");
        if (learnerIdElement) {
          learnerIdElement.textContent = `${learner.fullName}, ID: ${learner.id}`;
        }
      }
    });
    
    return card;
  }
}

if (typeof module !== "undefined" && module.exports)
  module.exports = { sprintChallenge5 };
else sprintChallenge5();