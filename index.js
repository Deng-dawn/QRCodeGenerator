import express from "express"
import bodyParser from "body-parser"
import qr from "qr-image"

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, ()=> {
    console.log(`Listening on ${port}`)
});

app.get("/", (req, res) => {
    res.render("index.ejs", {qrCode: null});    // provide default value to the input
});


app.post("/generateQR", (req, res) => {
    const URL = req.body.url;
    let qrImage = qr.image(URL, { type: 'png' });
    let chunks = [];

    qrImage.on('data', (chunk) => {
        chunks.push(chunk);
    });

    qrImage.on('end', () => {
        const qrBase64 = Buffer.concat(chunks).toString('base64');
        res.render("index.ejs", { qrCode: `data:image/png;base64,${qrBase64}` });   // convert stream to a base64 string
    });
});




