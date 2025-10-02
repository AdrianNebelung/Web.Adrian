document.addEventListener("DOMContentLoaded", () => {
  const searchToggle = document.getElementById("search-toggle");
  const searchBox = document.getElementById("search-box");
  const searchInput = document.getElementById("search-input");
  const suggestions = document.getElementById("suggestions");
  const articles = document.querySelectorAll(".articles article");
  const keywordsList = [
  "HTML", "HTML5", "doctype", "head", "body", "div", "span", "a", "img", "table", "form", "input", "button", "section", "article", "header", "footer", "nav",
  "CSS", "CSS3", "flexbox", "grid", "position", "margin", "padding", "color", "background", "font-family", "font-size", "border", "border-radius", "transition", "animation", "box-shadow",
  "JavaScript", "JS", "variable", "let", "const", "function", "arrow function", "object", "array","DOM", "event", "listener", "querySelector", "addEventListener", "innerHTML", "fetch"
  ]; 

  if (!searchToggle || !searchBox || !searchInput || articles.length === 0) {
    return;
  };

  
  searchToggle.addEventListener("click", (e) => {
    searchBox.classList.toggle("active");
    searchBox.style.display = searchBox.classList.contains("active") ? "block" : "none";
    if (searchBox.classList.contains("active")) searchInput.focus();

    e.stopPropagation();
  });

  document.addEventListener("click", (e) => {
    if (!searchBox.contains(e.target) && !searchToggle.contains(e.target)) {
      searchBox.style.display = "none";
      searchBox.classList.remove("active");
    }
  });

  searchBox.addEventListener("click", (e) => e.stopPropagation());

  
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    let found = false;

    
    articles.forEach(article => {
      const keywords = (article.dataset.keywords || "").toLowerCase();
      const content = article.innerText.toLowerCase();

      if (!query || keywords.includes(query) || content.includes(query)) {
        article.style.display = "";
        found = true;
      } else {
        article.style.display = "none";
      }
    });

    
    suggestions.innerHTML = "";
    if (query) {
      const filteredKeywords = keywordsList.filter(k =>
        k.toLowerCase().startsWith(query)
      );

      filteredKeywords.forEach(k => {
        const li = document.createElement("li"); 
        li.textContent = k;
        li.addEventListener("click", () => {
          searchInput.value = k;                       
          searchInput.dispatchEvent(new Event("input")); 
          suggestions.style.display = "none";          
        });
        suggestions.appendChild(li);
      });

      suggestions.style.display = filteredKeywords.length ? "block" : "none";
    } else {
      suggestions.style.display = "none";
    }
  });

  
  document.addEventListener("click", e => {
    if (!searchInput.contains(e.target) && !suggestions.contains(e.target)) {
      suggestions.style.display = "none";
    }
  });
});

const menuToggle = document.getElementById("menu-toggle");
const menuList = document.getElementById("menu-list");

if (menuToggle && menuList) {
  menuToggle.addEventListener("click", (e) => {
    menuList.classList.toggle("active");
    menuList.style.display = menuList.classList.contains("active") ? "block" : "none";

    e.stopPropagation();
  });

  document.addEventListener("click", e => {
    if (!menuList.contains(e.target) && !menuToggle.contains(e.target)) {
      menuList.style.display = "none";
      menuList.classList.remove("active");
    }
  });
}

document.getElementById("ovelse").addEventListener("submit", function(e) {
  e.preventDefault();

  const userCode = document.getElementById("ov-her").value;
  const feedback = document.getElementById("feedback");

  const checks =  [
    { name: "<!doctype html>", re: /<!doctype\s+html>/i },
    { name: "<html lang=\"no\">", re: /<html[^>]*lang\s*=\s*["']?no["']?[^>]*>/i },
    { name: "<head>", re: /<head>/i },
    { name: "<meta charset>", re: /<meta\s+charset\s*=\s*["']?utf-8["']?>?/i },
    { name: "<title>", re: /<title>.*min første nettside.*<\/title>/i },
    { name: "<body>", re: /<body>/i },
    { name: "<h1>", re: /<h1>.*hei.*verden.*<\/h1>/i },
    { name: "<p>", re: /<p>.*første avsnitt.*<\/p>/i },
    { name: "</body>", re: /<\/body>/i },
    { name: "</html>", re: /<\/html>/i }
  ];

  const missing = checks.filter(c => !c.re.test(userCode)).map(c => c.name);

  if (missing.length === 0) {
    feedback.textContent = "🎉 Riktig! HTML-koden din er korrekt!";
    feedback.style.color = "green";
  } else {
    feedback.innerHTML = "⚠️ Mangler eller feil i:<ul>" + missing.map(m => `<li>${m}</li>`).join("") + "</ul>";
    feedback.style.color = "red";
  }
});
