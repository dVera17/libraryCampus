import app from "./app.js";

const main = () => app.listen(app.get('port'), app.get('host_name'), () => console.log(`Server Running...\n\nhttp://${app.get('host_name')}:${app.get('port')}`))

main();