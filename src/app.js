// Simple PDF.js viewer with custom "flip" UI (prev/next) showing two pages (spread)
(function () {
  const pdfUrl = "public/asset/LasTejas - Menu.pdf";

  const canvasLeft = document.getElementById("pdfCanvasLeft");
  const canvasRight = document.getElementById("pdfCanvasRight");
  const pageInfo = document.getElementById("pageInfo");
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");
  const container = document.getElementById("pageContainer");

  if (
    !canvasLeft ||
    !canvasRight ||
    !pageInfo ||
    !prevBtn ||
    !nextBtn ||
    !container
  ) {
    return;
  }

  const ctxLeft = canvasLeft.getContext("2d");
  const ctxRight = canvasRight.getContext("2d");

  // PDF.js must be loaded
  if (typeof pdfjsLib === "undefined") {
    pageInfo.textContent = "PDF viewer library not loaded.";
    return;
  }

  // Opening from file:// will not work reliably for PDF.js
  if (window.location.protocol === "file:") {
    pageInfo.textContent =
      "Open this page from Netlify or a local web server to see the menu.";
    return;
  }

  // Configure the worker script
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js";

  let pdfDoc = null;
  let currentPage = 1; // left page of the spread: 1,3,5...
  let isRendering = false;
  let pendingPage = null;

  function isSinglePageMode() {
    const w =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      container.clientWidth;
    return w < 768;
  }

  function updatePageInfo() {
    if (!pdfDoc) {
      pageInfo.textContent = "Loading menu…";
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }

    const single = isSinglePageMode();

    if (single) {
      pageInfo.textContent = `Page ${currentPage} / ${pdfDoc.numPages}`;
    } else {
      const left = currentPage;
      const right = Math.min(currentPage + 1, pdfDoc.numPages);

      if (left === right) {
        pageInfo.textContent = `Page ${left} / ${pdfDoc.numPages}`;
      } else {
        pageInfo.textContent = `Pages ${left}–${right} / ${pdfDoc.numPages}`;
      }
    }

    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = single
      ? currentPage >= pdfDoc.numPages
      : currentPage + 1 >= pdfDoc.numPages;
  }

  function getScale(page, pagesPerRow) {
    const viewport = page.getViewport({ scale: 1 });
    const containerWidth = container.clientWidth || window.innerWidth;
    const containerHeight = container.clientHeight || window.innerHeight;

    let pages = pagesPerRow;
    if (!pages) {
      pages = isSinglePageMode() ? 1 : 2;
    }

    const maxWidthPerPage = containerWidth / pages;

    const scale = Math.min(
      maxWidthPerPage / viewport.width,
      containerHeight / viewport.height
    );

    return scale || 1;
  }

  function clearCanvas(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function renderSpread(leftPageNumber) {
    if (!pdfDoc) return;

    const single = isSinglePageMode();

    isRendering = true;
    canvasLeft.style.opacity = "0";
    canvasRight.style.opacity = "0";

    const promises = [];

    // Render left page (or single page in mobile)
    promises.push(
      pdfDoc.getPage(leftPageNumber).then((page) => {
        const scale = getScale(page);
        const viewport = page.getViewport({ scale });

        canvasLeft.width = viewport.width;
        canvasLeft.height = viewport.height;

        const renderCtx = {
          canvasContext: ctxLeft,
          viewport,
        };

        return page.render(renderCtx).promise;
      })
    );

    // Render right page if it exists and we're in two-page mode
    const rightPageNumber = leftPageNumber + 1;
    if (!single && rightPageNumber <= pdfDoc.numPages) {
      promises.push(
        pdfDoc.getPage(rightPageNumber).then((page) => {
          const scale = getScale(page);
          const viewport = page.getViewport({ scale });

          canvasRight.width = viewport.width;
          canvasRight.height = viewport.height;

          const renderCtx = {
            canvasContext: ctxRight,
            viewport,
          };

          return page.render(renderCtx).promise;
        })
      );
    } else {
      // No right page (odd last page or single-page mode)
      clearCanvas(canvasRight, ctxRight);
    }

    return Promise.all(promises)
      .then(() => {
        isRendering = false;
        canvasLeft.style.opacity = "1";
        if (!single && rightPageNumber <= pdfDoc.numPages) {
          canvasRight.style.opacity = "1";
        }
        updatePageInfo();

        if (pendingPage !== null) {
          const p = pendingPage;
          pendingPage = null;
          renderSpread(p);
        }
      })
      .catch((err) => {
        console.error("Error rendering pages", err);
        pageInfo.textContent = "There was a problem showing the menu.";
      });
  }

  function queueRender(leftPageNumber) {
    if (isRendering) {
      pendingPage = leftPageNumber;
    } else {
      renderSpread(leftPageNumber);
    }
  }

  function triggerFlipAnimation(direction) {
    // Clear any previous animation classes
    canvasLeft.classList.remove("page-flip-next", "page-flip-prev");
    canvasRight.classList.remove("page-flip-next", "page-flip-prev");

    // Force reflow so animation restarts
    void canvasLeft.offsetWidth;
    void canvasRight.offsetWidth;

    const single = isSinglePageMode();

    if (single) {
      // En móvil (una página), animamos siempre la izquierda
      canvasLeft.classList.add(
        direction === "next" ? "page-flip-next" : "page-flip-prev"
      );
    } else if (direction === "next") {
      // Al avanzar, solo se anima la página derecha
      canvasRight.classList.add("page-flip-next");
    } else {
      // Al retroceder, solo se anima la página izquierda
      canvasLeft.classList.add("page-flip-prev");
    }
  }

  function showPrev() {
    if (!pdfDoc || currentPage <= 1) return;

    const single = isSinglePageMode();
    if (single) {
      currentPage = Math.max(1, currentPage - 1);
    } else {
      currentPage = Math.max(1, currentPage - 2);
    }

    triggerFlipAnimation("prev");
    queueRender(currentPage);
  }

  function showNext() {
    if (!pdfDoc) return;

    const single = isSinglePageMode();

    if (single) {
      if (currentPage >= pdfDoc.numPages) return;
      currentPage += 1;
    } else {
      const nextLeft = currentPage + 2;
      if (nextLeft > pdfDoc.numPages) return;
      currentPage = nextLeft;
    }

    triggerFlipAnimation("next");
    queueRender(currentPage);
  }


  prevBtn.addEventListener("click", showPrev);
  nextBtn.addEventListener("click", showNext);

  // Keyboard arrows
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  });

  // Re-render on resize to keep the spread fitting the screen
  window.addEventListener("resize", () => {
    if (pdfDoc) {
      queueRender(currentPage);
    }
  });

  // Initial state
  updatePageInfo();

  // Load the PDF
  pdfjsLib
    .getDocument(pdfUrl)
    .promise.then((pdf) => {
      pdfDoc = pdf;
      currentPage = 1;
      updatePageInfo();
      return renderSpread(currentPage);
    })
    .catch((err) => {
      console.error("Error loading PDF", err);
      pageInfo.textContent = "Could not load the menu.";
    });
})();
