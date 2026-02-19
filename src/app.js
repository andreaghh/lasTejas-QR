// Set dynamic year in footer
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear().toString();
}

// flipbook rendering using PDF.js and turn.js
(function () {
  const url = 'public/asset/LasTejas - Menu.pdf';
  const flipbook = document.getElementById('flipbook');
  if (!flipbook || typeof pdfjsLib === 'undefined') return;

  // configure worker
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js';

  pdfjsLib.getDocument(url).promise.then((pdf) => {
    const total = pdf.numPages;
    let loaded = 0;
    for (let i = 1; i <= total; i++) {
      pdf.getPage(i).then((page) => {
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        page.render({ canvasContext: context, viewport }).promise.then(() => {
          const pageDiv = document.createElement('div');
          pageDiv.className = 'flip-page';
          pageDiv.appendChild(canvas);
          flipbook.appendChild(pageDiv);
          loaded++;
          if (loaded === total) {
            // initialize turn.js after all pages are added
            $(flipbook).turn({
              width: viewport.width * 2,
              height: viewport.height,
              autoCenter: true,
            });
            // hide original object embed since we now have the flipbook
            const viewer = document.querySelector('.menu-viewer');
            if (viewer) viewer.style.display = 'none';
          }
        });
      });
    }
  }).catch((err) => {
    console.error('Error loading PDF for flipbook', err);
  });
})();
