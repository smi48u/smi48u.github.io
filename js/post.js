const container = document.getElementById("post-container");
const params = new URLSearchParams(window.location.search);
const file = params.get("id");

if (!file) {
  container.innerHTML = "<p>Nie wybrano posta.</p>";
} else {
  fetch(`blog/${file}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Nie znaleziono pliku.");
      }
      return response.text();
    })
    .then(markdown => {
      const html = marked.parse(markdown);
      container.innerHTML = html;
    })
    .catch(error => {
      console.error(error);
      container.innerHTML = "<p>Błąd ładowania posta.</p>";
    });
}
