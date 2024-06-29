import { Ui } from "./ui.module.js";

export class Details {
  constructor(id) {
    this.ui = new Ui();

    document.getElementById("btnClose").addEventListener("click", () => {
      document.querySelector(".games").classList.remove("d-none");
      document.querySelector(".details").classList.add("d-none");
    });

    this.getDetails(id);
  }

  async getDetails(idGames) {
    const loading = document.querySelector(".loading");
    loading.classList.remove("d-none");
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "b085667f4dmsh2c93ebea327df12p1de6efjsn46e511406ba8",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    try {
      let response = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idGames}`,
        options
      );
      if (response.ok) {
        let date = await response.json();
        this.ui.displayDetails(date);
        loading.classList.add("d-none");
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
