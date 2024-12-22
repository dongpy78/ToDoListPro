const app = require("./app/app");

// server -> app -> routes -> controllers -> services -> Models
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

