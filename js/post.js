const container = document.getElementById("post-container");
const params = new URLSearchParams(window.location.search);
const file = params.get("id");
//sekcja błędów 
if (!file) {
  container.innerHTML = "<p>No post selected.</p>";
} else {
  fetch(`blog/${file}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("File not found.");
      }
      return response.text();
    })
    .then(markdown => {
      const html = marked.parse(markdown);
      container.innerHTML = html;
    })
    .catch(error => {
      console.error(error);
      container.innerHTML = "<p>Post loading error.</p>";
    });
}
