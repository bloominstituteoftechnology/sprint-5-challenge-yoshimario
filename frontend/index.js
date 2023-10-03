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

  const cards = document.querySelector(".cards");
  const cardInfo = document.querySelector(".info");
  cardInfo.textContent = "No learner is selected";

  learnersData.forEach((learner) => {
    const learnerCard = buildLearnerCard(learner, mentorsData);
    cards.appendChild(learnerCard);
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
    learner.mentors.forEach((mentorName) => {
      mentorsData.forEach((mentor) => {
        if (mentorName === mentor.id) {
          const mentorItemList = document.createElement("li");
          mentorItemList.textContent = mentor.firstName + " " + mentor.lastName;
          mentorListUl.appendChild(mentorItemList);
        }
      });
    });

    [learnerNameH3, emailDiv, mentorNameH4, mentorListUl].forEach((element) => {
      card.appendChild(element);
    });

    mentorNameH4.addEventListener("click", () => {
      mentorNameH4.classList.toggle("open");
      mentorNameH4.classList.toggle("closed");
    });

    card.addEventListener("click", () => {
      // Toggle the "selected" class on the clicked card
      card.classList.toggle("selected");
      
   // Loop through all cards and deselect them, except for the clicked card
   const allCards = document.querySelectorAll(".card");
   allCards.forEach((otherCard) => {
     if (otherCard !== card) {
       otherCard.classList.remove("selected");
     }
   });

   if (card.classList.contains("selected")) {
     // If the card is selected, update cardInfo
     cardInfo.textContent = `The selected learner is ${learner.fullName}, ID: ${learner.id}`;
     learnerNameH3.textContent = `${learner.fullName}, ID: ${learner.id}`; // Update name with ID
   } else {
     // If the card is deselected, update cardInfo to the default text
     cardInfo.textContent = "No learner is selected";
     learnerNameH3.textContent = learner.fullName; // Restore the original name
   }
 });
    return card;
  }

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// Export the sprintChallenge5 function for testing
if (typeof module !== "undefined" && module.exports)
  module.exports = { sprintChallenge5 };
else {
  // Wait for the DOMContentLoaded event before running the code
  document.addEventListener("DOMContentLoaded", sprintChallenge5);
}
