const app = require("./app");
const config = require("./config");
const PORT = config.port
console.log(PORT)
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
