import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../shared/App";

const app = express();

app.use(express.static("public"));

app.get("*", (req, res) => {
  const htmlMarkup = renderToString(<App />);
  res.send(`
      <!DOCTYPE html>
      <head>
        <title>Universal Reacl</title>
        <link rel="stylesheet" href="/css/main.css">
        <script src="/bundle.js" defer></script>
      </head>

      <body>
        <div id="root">${htmlMarkup}</div>
      </body>
    </html>
  `);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening");
});

// try renderToNodeStream

// import express from "express";
// import React from "react";
// import { renderToNodeStream } from "react-dom/server";
// import App from "../shared/App";

// const app = express();

// app.use(express.static("public"));

// app.get("*", (req, res) => {
//   res.write(`
//       <!DOCTYPE html>
//       <head>
//         <meta http-equiv="content-type" content="text/html; charset=utf-8">
//         <title>Universal Reacl</title>
//         <link rel="stylesheet" href="/css/main.css">
//         <script src="/bundle.js" defer></script>
//       </head>`
//   );
//   res.write("<div id='root'>"); 
//   const stream = renderToNodeStream(<App/>);
//   stream.pipe(res, { end: false });
//   stream.on('end', () => {
//     res.write("</div></body></html>");
//     res.end();
//   });
// });