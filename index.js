 const favicons = [
      { url: "https://filescdn.classlink.com/resources/customlinks/1614876373145-a1c0c502a7f64b38a8d0063691ce15e3.png", type: "image/png" },
      { url: "https://www.wikipedia.org/static/favicon/wikipedia.ico", type: "image/x-icon" },
      { url: "https://ssl.gstatic.com/docs/documents/images/kix-favicon-2023q4.ico", type: "image/x-icon" },
      { url: "https://www.gstatic.com/images/branding/searchlogo/ico/favicon.ico", type: "image/x-icon" }
    ];

    const pageTitles = ['Google', 'My.PPS', 'Wikipedia', 'Google Docs'];

    let currentFavicon = 0;
    let titleIndex = 0;

    const slopeURL = "https://storage.classroomsarecool.mex.com/slope-2/index.html";
    const fruitninjaURL = "https://storage.classroomsarecool.mex.com/fruitninja/index.html";
    const paperminecraftURL = "https://turbowarp.org/402108615/embed";
    const polytrackURL = "https://beta-polytrack.kodub.com/";

    // Sidebar and fullscreen toggle button
    const sidebar = document.querySelector('.sidebar');
    const btn = document.querySelector('#btn');

    document.addEventListener("DOMContentLoaded", () => {
      // Restore theme
      if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.add("dark-mode");
      }

      // Restore favicon
      const savedFavicon = localStorage.getItem("faviconIndex");
      if (savedFavicon !== null) {
        setFavicon(parseInt(savedFavicon));
      }

      // Restore page title
      const savedTitleIndex = localStorage.getItem("titleIndex");
      if (savedTitleIndex !== null) {
        titleIndex = parseInt(savedTitleIndex);
        document.title = pageTitles[titleIndex];
      }

      btn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        if (document.fullscreenElement) exitFullscreen();
      });
    });

    function setFavicon(index) {
      currentFavicon = index;
      document.querySelectorAll('link[rel="icon"]').forEach(el => el.remove());

      const newLink = document.createElement('link');
      newLink.rel = "icon";
      newLink.type = favicons[currentFavicon].type;
      newLink.href = favicons[currentFavicon].url + "?v=" + new Date().getTime();
      document.head.appendChild(newLink);
    }

    function switchFavicon() {
      currentFavicon = (currentFavicon + 1) % favicons.length;
      setFavicon(currentFavicon);
      localStorage.setItem("faviconIndex", currentFavicon.toString());
    }

    function changePageTitle() {
      titleIndex = (titleIndex + 1) % pageTitles.length;
      document.title = pageTitles[titleIndex];
      localStorage.setItem("titleIndex", titleIndex.toString());
    }

    function toggleMode() {
      const html = document.documentElement;
      const isDark = html.classList.toggle("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    }

    function startGame(game) {
      document.getElementById("gameSelection").style.display = "none";
      document.getElementById("secondRow").style.display = "none";
      document.body.style.overflow = "hidden";

      let wrapper, iframeSrc;

      switch (game) {
        case "slope":
          wrapper = document.getElementById("slopeWrapper");
          iframeSrc = slopeURL;
          break;
        case "fruitninja":
          wrapper = document.getElementById("fruitninjaWrapper");
          iframeSrc = fruitninjaURL;
          break;
        case "paperminecraft":
          wrapper = document.getElementById("paperminecraftWrapper");
          iframeSrc = paperminecraftURL;
          break;
        case "polytrack":
          wrapper = document.getElementById("polytrackWrapper");
          iframeSrc = polytrackURL;
          break;
        default:
          return;
      }

      if (!document.getElementById(game + "Game")) {
        const iframe = document.createElement("iframe");
        iframe.src = iframeSrc;
        iframe.allowFullscreen = true;
        iframe.id = game + "Game";

        wrapper.innerHTML = `<button class="exitButton" onclick="exitGame('${game}')">Exit Game</button>`;
        wrapper.appendChild(iframe);
      }

      wrapper.style.display = "flex";
      openFullscreen(document.documentElement);
    }

    function exitGame(game) {
      document.getElementById("gameSelection").style.display = "flex";
      document.getElementById("secondRow").style.display = "block";
      document.body.style.overflow = "auto";

      const wrapper = document.getElementById(game + "Wrapper");
      if (!wrapper) return;

      wrapper.style.display = "none";
      wrapper.innerHTML = `<button class="exitButton" onclick="exitGame('${game}')">Exit Game</button>`;
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
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    }

    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        ["slope", "fruitninja", "paperminecraft", "polytrack"].forEach(exitGame);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        ["slope", "fruitninja", "paperminecraft", "polytrack"].forEach(exitGame);
      }
    });
