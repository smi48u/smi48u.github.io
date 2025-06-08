const blogContainer = document.getElementById("blog-posts");

const posts = [
  //semple
  //  title: "tytul",
  //  file: "nazwa pliku.md",
  //  date: "data",
  //  preview: "krotki opis",
  //  icon: "styl ikonek",
  //  tags: [tagi po "tag"]
  {
    title: "Web Attack Investigation (LetsDefend Challenge)",
    file: "letsdefend1.md",
    date: "2025-06-08",
    preview: " investigation of a web attack against a vulnerable application called bWAPP.",
    icon: "fas fa-graduation-cap",
    tags: ["letsdefend", "cybersecurity", "soc", "career", "webattack"]
  },
  {
    title: "I Passed the CompTIA Security+ Exam",
    file: "I-pass-security-plus-exam.md",
    date: "2025-04-07",
    preview: "How I prepared for the CompTIA Security+ exam, what I learned, and what’s next.",
    icon: "fas fa-graduation-cap",
    tags: ["security+", "certification", "soc", "career", "exam"]
  },
  {
    title: "How I Built This Site",
    date: "2025-04-04",
    file: "about-site.md",
    icon: "fas fa-code",
    preview: "A detailed breakdown of how I created this minimalist cybersecurity blog using HTML, CSS, JS, Markdown and caffeine:).",
    tags: ["portfolio", "build", "html", "learning"]
  }
];

// Sortuj malejąco po dacie
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

posts.forEach(post => {
  const entry = document.createElement("div");
  entry.className = "blog-entry";

  const postLink = `post.html?id=${post.file}`;
  const icon = post.icon || "fas fa-file-alt";

  // Zamień tagi na HTML
  const tagsHTML = post.tags?.map(tag => `<span class="tag">${tag}</span>`).join(" ") || "";

  entry.innerHTML = `
    <h3><i class="${icon}"></i> <a href="${postLink}">${post.title}</a></h3>
    <p class="post-date">${post.date}</p>
    <p>${post.preview}</p>
    <div class="tags">${tagsHTML}</div>
    <a class="read-link" href="${postLink}">Read →</a>
  `;

  blogContainer.appendChild(entry);
});
