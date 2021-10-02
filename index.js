const app = require("./app");
const config = require("./config");
const PORT = config.db.port

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
