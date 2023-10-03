async function sprintChallenge5() {
  // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector("footer");
  const currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;

  // Fetch learner and mentor data from the API
  const learnersResponse = await fetch("http://localhost:3003/api/learners");
  const learnersData = await learnersResponse.json();
  const mentorsResponse = await fetch("http://localhost:3003/api/mentors");
  const mentorsData = await mentorsResponse.json();
  const cardsContainer = document.querySelector(".cards");
  const cardInfo = document.querySelector(".info");
  cardInfo.textContent = "No learner selected";

  learnersData.forEach((learner) => {
    const learnerCard = buildLearnerCard(learner, mentorsData);
    cardsContainer.appendChild(learnerCard);
  });
}
function buildLearnerCard(learner, mentorsData) {
  const cards = document.createElement("div");
  cards.classList.add("cards");

  const learnerNameH3 = document.createElement("h3");
  learnerNameH3.textContent = learner.fullName;

  const emailDiv = document.createElement("div");
  emailDiv.textContent = learner.email;

  const idElement = document.createElement("div");
  idElement.textContent = `ID: ${learner.id}`;
  idElement.classList.add("info");

  const mentorNameH4 = document.createElement("h4");
  mentorNameH4.textContent = "Mentors";
  mentorNameH4.classList.add("closed");

  const learnerInfoH2 = document.createElement("h2");
  learnerInfoH2.textContent = "Learner Info";
  learnerInfoH2.classList.add("info");

  const mentorListUl = document.createElement("ul");
  learner.mentorsArray.forEach((mentorName) => {
    const mentorItemList = document.createElement("li");
    mentorItemList.textContent = mentorName;
    mentorListUl.appendChild(mentorItemList);
  });
  [
    learnerNameH3,
    emailDiv,
    idElement,
    mentorNameH4,
    mentorListUl,
    learnerInfoH2,
  ].forEach((element) => {
    cards.appendChild(element);
  });

  mentorNameH4.addEventListener("click", () => {
    mentorNameH4.classList.toggle("closed");
    mentorNameH4.classList.toggle("open");
  });

  card.addEventListener("click", (evt) => {
    if (!cards.classList.contains("selected")) {
      document.querySelectorAll('.cards').forEach(cards => {
        cards.classList.remove("selected");
      });
      cards.classList.add("selected");
      cardInfo.textContent = `The selected learner is ${learner.fullName}`;
      cards.querySelector('h3').textContent = `${learner.fullName}, ID: ${learner.id}`;
      else{
        cards.classList.remove("selected");
        cardInfo.textContent = "No learner is selected";
        cards.querySelectorAll('h4').textContent = learner.fullName;
      }
    })
  return card
}
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== "undefined" && module.exports)
  module.exports = { sprintChallenge5 };
else sprintChallenge5();
