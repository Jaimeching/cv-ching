const express = require("express");
const req = require("express/lib/request");
const path = require("path");

const app = express();
const port = process.env.PORT || "3000";

const { sendMail } = require("./services/mailer");
const { handle } = require("./services/utils");

const bodyParser = require("body-parser");
/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json({ limit: "100mb", extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Coming Soon!",
    mainText: "Eventually Podcast",
    subText: `Drop your email address below and we will let you know when we launch the Eventually podcast. 
      <br>Brought to you by amazing people`,
  });
});
app.get("/es", (req, res) => {
  res.render("index-es", {
    title: "Coming Soon!",
    mainText: "Eventually Podcast",
    subText: `Drop your email address below and we will let you know when we launch the Eventually podcast. 
      <br>Brought to you by amazing people`,
  });
});
app.post("/sendMail", async function (req, res) {
  const response = {
    ok: true,
    message: "",
    code: 200,
  };
  const message = req.body.message;
  const subject = req.body.subject;
  const phone = req.body.phone;
  const mail = req.body.email;
  const name = req.body.name;
  const htmlBody = `<h4>Nuevo contacto de ${name}</h4>
    <p>Télefono de contacto: <strong>${phone}</strong></p>
    <p>Correo de contacto: <strong>${mail}</strong></p>
    <p>${message}</p>`;

  const [data, error] = await handle(
    sendMail({
      to: "jaimechivas2@hotmail.com",
      text: htmlBody,
      subject: subject,
    })
  );
  if (error) {
    response.message = error;
    response.ok = false;
    response.code = 500;
  }
  res.send(response);
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
  // sendMail({to: 'jaimechivas2@hotmail.com', subject : 'test', text: '<p>For clients that do not support AMP4EMAIL or amp content is not valid</p>',})
});
