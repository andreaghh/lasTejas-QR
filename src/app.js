// Simple flipbook rendering with PDF.js + Turn.js
(function () {
  const flipbookElement = document.getElementById("flipbook");

  // Show a basic message if required libraries are missing
  if (!flipbookElement || typeof pdfjsLib === "undefined" || typeof $ === "undefined") {
    if (flipbookElement) {
      flipbookElement.textContent = "Flipbook viewer could not be initialized.";
    }
    return;
  }

  // Ensure Turn.js plugin is available
  if (typeof $.fn.turn !== "function") {
    flipbookElement.innerHTML =
      '<p style="padding:1rem;text-align:center;">' +
      "Flipbook script (Turn.js) is not available.<br />" +
      '<a href="public/asset/LasTejas - Menu.pdf">Open the PDF directly</a>' +
      "</p>";
    return;
  }

  // PDF.js cannot load files from file:// URLs in most browsers
  if (window.location.protocol === "file:") {
    flipbookElement.innerHTML =
      '<p style="padding:1rem;text-align:center;">' +
      "To see the flipbook, please open this page from a web server " +
      "(for example Netlify or a local dev server).<br />" +
      '<a href="public/asset/LasTejas - Menu.pdf">Open the PDF directly</a>' +
      "</p>";
    return;
  }

  const pdfUrl = "public/asset/LasTejas - Menu.pdf";

  // Configure PDF.js worker
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js";

  // Show a simple loading message
  flipbookElement.textContent = "Loading menu…";

  pdfjsLib
    .getDocument(pdfUrl)
    .promise.then((pdf) => {
      const totalPages = pdf.numPages;
      const renderPromises = [];

      for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
        renderPromises.push(
          pdf.getPage(pageNumber).then((page) => {
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            return page
              .render({ canvasContext: context, viewport })
              .promise.then(() => {
                const pageDiv = document.createElement("div");
                pageDiv.className = "page";
                pageDiv.appendChild(canvas);
                flipbookElement.appendChild(pageDiv);
              });
          })
        );
      }

      return Promise.all(renderPromises).then(() => {
        const pageWidth = window.innerWidth / 2;
        const pageHeight = window.innerHeight;

        $(flipbookElement).turn({
          width: pageWidth * 2,
          height: pageHeight,
          autoCenter: true,
        });
      });
    })
    .catch((err) => {
      console.error("Error loading PDF for flipbook", err);
      flipbookElement.innerHTML =
        '<p style="padding:1rem;text-align:center;">' +
        "There was a problem loading the flipbook.<br />" +
        '<a href="public/asset/LasTejas - Menu.pdf">Open the PDF directly</a>' +
        "</p>";
    });
})();
