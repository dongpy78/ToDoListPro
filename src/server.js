const app = require("./app/app");
const appConfig = require("./app/share/configs/app.config");

// server -> app -> routes -> controllers -> services -> Models
const PORT = appConfig.Port || 30001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

