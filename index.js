    const favicons = [
      "https://filescdn.classlink.com/resources/customlinks/1614876373145-a1c0c502a7f64b38a8d0063691ce15e3.png",
      "https://www.wikipedia.org/static/favicon/wikipedia.ico",
      "https://ssl.gstatic.com/docs/documents/images/kix-favicon-2023q4.ico",
      "https://www.gstatic.com/images/branding/searchlogo/ico/favicon.ico"
    ];

    const pageTitles = ['Google', 'My.PPS', 'Wikipedia', 'Google Docs'];

    document.addEventListener("DOMContentLoaded", () => {
      if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.add("dark-mode");
      }

      const savedFavicon = localStorage.getItem("faviconIndex");
      if (savedFavicon !== null) setFavicon(parseInt(savedFavicon));

      const savedTitleIndex = localStorage.getItem("titleIndex");
      if (savedTitleIndex !== null) document.title = pageTitles[parseInt(savedTitleIndex)];

      document.querySelector('#btn').addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('active');
      });

      window.toggleMode = function () {
        const html = document.documentElement;
        const isDark = html.classList.toggle("dark-mode");
        localStorage.setItem("theme", isDark ? "dark" : "light");
      };

      window.slopeWrapper = document.getElementById("slopeWrapper");
      window.fruitninjaWrapper = document.getElementById("fruitninjaWrapper");
      window.slopeIframe = document.getElementById("slopeGame");
      window.fruitninjaIframe = document.getElementById("fruitninjaGame");
      window.slopeExit = document.getElementById("exitSlope");
      window.fruitninjaExit = document.getElementById("exitFruitninja");

      slopeExit.addEventListener("click", () => exitGame("slope"));
      fruitninjaExit.addEventListener("click", () => exitGame("fruitninja"));
    });

    function setFavicon(index) {
      let oldLink = document.getElementById("favicon");
      if (oldLink) oldLink.remove();

      let newLink = document.createElement("link");
      newLink.id = "favicon";
      newLink.rel = "icon";
      newLink.type = "image/x-icon";
      newLink.href = favicons[index];

      document.head.appendChild(newLink);
      localStorage.setItem("faviconIndex", index.toString());
    }

    function changePageTitle() {
      let titleIndex = (parseInt(localStorage.getItem("titleIndex") || "0") + 1) % pageTitles.length;
      document.title = pageTitles[titleIndex];
      localStorage.setItem("titleIndex", titleIndex.toString());
    }

    function startGame(game) {
      document.getElementById("gameSelection").style.display = "none";

      if (game === "slope") {
        slopeWrapper.style.display = "flex";
        slopeIframe.style.display = "block";
        slopeExit.style.display = "block";
        openFullscreen(slopeWrapper);
      } else if (game === "fruitninja") {
        fruitninjaWrapper.style.display = "flex";
        fruitninjaIframe.style.display = "block";
        fruitninjaExit.style.display = "block";
        openFullscreen(fruitninjaWrapper);
      }
    }

    function exitGame(game) {
      document.getElementById("gameSelection").style.display = "flex";

      if (game === "slope") {
        slopeWrapper.style.display = "none";
        slopeIframe.style.display = "none";
        slopeExit.style.display = "none";
        slopeIframe.src = slopeIframe.src;
      } else if (game === "fruitninja") {
        fruitninjaWrapper.style.display = "none";
        fruitninjaIframe.style.display = "none";
        fruitninjaExit.style.display = "none";
        fruitninjaIframe.src = fruitninjaIframe.src;
      }

      exitFullscreen();
    }

    function openFullscreen(elem) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    }

    function exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }

    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        if (slopeWrapper && slopeWrapper.style.display === "flex") exitGame("slope");
        if (fruitninjaWrapper && fruitninjaWrapper.style.display === "flex") exitGame("fruitninja");
      }
    });