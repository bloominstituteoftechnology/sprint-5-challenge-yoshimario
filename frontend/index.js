async function sprintChallenge5() {
  // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK BELOW THIS LINE 👇

  const footer = document.querySelector("footer");
  const currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;

    // Fetch learner and mentor data from the API
    const learnersResponse = await fetch("http://localhost:3003/api/learners");
    if (!learnersResponse.ok) {
      throw new Error("Failed to fetch learner data");
    }
    const learnersData = await learnersResponse.json();
    const mentorsResponse = await fetch("http://localhost:3003/api/mentors");
    if (!mentorsResponse.ok) {
      throw new Error("Failed to fetch mentor data");
    }
    const mentorsData = await mentorsResponse.json();
  
    const cards = document.querySelector(".cards");
    const selectedLearnerInfo = document.querySelector(".info");
    selectedLearnerInfo.textContent = "No learner is selected";
  
    // Add a variable to track the selected card
    let selectedCard = null;
  
    learnersData.forEach((learner) => {
      const learnerCard = buildLearnerCard(learner, mentorsData);
      cards.appendChild(learnerCard);
  
      learnerCard.addEventListener("click", async () => {
        const isSelected = learnerCard.classList.contains("selected");
  
        // Deselect all cards first
        document.querySelectorAll(".card").forEach((card) => {
          card.classList.remove("selected");
          const learnerIdElement = card.querySelector("h3");
          if (learnerIdElement) {
            learnerIdElement.textContent = learner.fullName; // Remove the ID
          }
        });
  
        if (!isSelected) {
          // Select the clicked card
          learnerCard.classList.add("selected");
          selectedCard = learnerCard; // Update the selected card
        } else {
          // Deselect the clicked card
          learnerCard.classList.remove("selected");
          selectedCard = null; // No card is selected
        }
  
        // Update selectedLearnerInfo with the selected learner's name
        selectedLearnerInfo.textContent = selectedCard
          ? `The selected learner is ${learner.fullName}`
          : "No learner is selected";
      });
    });
  
    function buildLearnerCard(learner, mentorsData) {
      const card = document.createElement("div");
      card.classList.add("card");
  
      const learnerNameH3 = document.createElement("h3");
      learnerNameH3.textContent = learner.fullName;
  
      const learnerIdElement = document.createElement("span");
      learnerIdElement.textContent = learner.id;
    
      if (selectedCard === card) {
        learnerNameH3.appendChild(learnerIdElement);
      }
    

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
            mentorItemList.textContent =
              mentor.firstName + " " + mentor.lastName;
            mentorListUl.appendChild(mentorItemList);
          }
        });
      });
  
      [learnerNameH3, emailDiv, mentorNameH4, mentorListUl].forEach(
        (element) => {
          card.appendChild(element);
        }
      );
      mentorNameH4.addEventListener("click", () => {
        mentorNameH4.classList.toggle("open");
        mentorNameH4.classList.toggle("closed");
      
        if (selectedCard === card) {
          selectedCard = null;
          card.classList.remove("selected");
        }
      });
      return card;
    }
  

  // 👆 WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE BELOW
if (typeof module !== "undefined" && module.exports)
  module.exports = { sprintChallenge5 };
else sprintChallenge5();
