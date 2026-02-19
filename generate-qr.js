const path = require("path");
const QRCode = require("qrcode");

// 1) After your site is deployed on Netlify,
//    replace this with your real site URL.
//    Example: https://lastejas-menu.netlify.app
const urlToEncode = "https://YOUR-SITE-URL-HERE.netlify.app";

const outputPath = path.join(__dirname, "public", "asset", "menu-qr.png");

QRCode.toFile(
  outputPath,
  urlToEncode,
  {
    width: 512,
    margin: 2,
    color: {
      dark: "#000000",
      light: "#ffffff",
    },
  },
  (err) => {
    if (err) {
      console.error("Error generating QR code:", err);
      process.exit(1);
    }

    console.log(`QR code created at: ${outputPath}`);
    console.log(`Contents: ${urlToEncode}`);
  }
);

