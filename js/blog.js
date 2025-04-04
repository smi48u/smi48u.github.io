const blogContainer = document.getElementById("blog-posts");

const posts = [
  {
    title: "How I Built This Site",
    date: "2025-04-04",
    file: "post-1.md",
    icon: "fas fa-code",
    preview: "A detailed breakdown of how I created this minimalist cybersecurity blog using HTML, CSS, JS and Markdown.",
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
