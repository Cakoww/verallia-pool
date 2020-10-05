const express = require('express'); 
const routes = require('./routes')
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const port = process.env.port || 5000; 



app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});