import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";

export class Games {
  constructor() {
    this.getGames("mmorpg");

    document.querySelectorAll(".menu a").forEach((link) => {
      link.addEventListener("click", (e) => {
        document.querySelector(".menu .active").classList.remove("active");
        e.target.classList.add("active");
        this.getGames(e.target.dataset.category);
      });
    });

    this.ui = new Ui();
  }

  async getGames(category) {
    const loading = document.querySelector(".loading");
    loading.classList.remove("d-none");
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "b085667f4dmsh2c93ebea327df12p1de6efjsn46e511406ba8",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    const response = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      options
    );
    const date = await response.json();
    this.ui.displayDataGame(date);
    this.startEvent();
    loading.classList.add("d-none");
  }

  startEvent() {
    document.querySelectorAll(".card").forEach((item) => {
      item.addEventListener("click", () => {
        const id = item.dataset.id;
        this.showDetails(id);
      });
    });
    document.querySelectorAll(".card").forEach((item) => {
      item.addEventListener("mouseleave", () => {
        this.stopVideo(item);
      });
    });
    document.querySelectorAll(".card").forEach((item) => {
      item.addEventListener("mouseenter", () => {
        this.startVideo(item);
      });
    });
  }

  showDetails(idGame) {
    const details = new Details(idGame);
    document.querySelector(".games").classList.add("d-none");
    document.querySelector(".details").classList.remove("d-none");
  }
  async startVideo(e) {
     const video = e.querySelector("video");
     video.classList.remove("d-none");
     video.muted = true;
     try {
       await video.play();
     } catch (error) {
       console.error("Error playing video:", error);
     }
  }

  async stopVideo(e) {
     const video = e.querySelector("video");
     try {
       await video.pause();
       video.currentTime = 0; 
     } catch (error) {
       console.error("Error pausing video:", error);
     }
     video.classList.add("d-none");
  }
}
