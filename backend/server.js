const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors")
const { error_handler } = require("./middleware/error_middleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/recycling_form", require("./routes/recycling_form_routes"));

// // Serve frontend
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')));

//   app.get('*', (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
//     )
//   );
// } else {
//   app.get('/', (req, res) => res.send('Please set to production'));
// }

app.use(error_handler);

app.listen(port, () => console.log(`[INFO] Server started on port ${port}`));
