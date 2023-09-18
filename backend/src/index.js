import app from "./app.js";

const main = () => app.listen(app.get('port'), () => console.log(`Server listenning on port ${app.get('port')}`))

main();