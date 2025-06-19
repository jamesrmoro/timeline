let swiper;

function generateColorPalette(total) {
  const colors = [];
  const hueStart = 230;
  const hueEnd = 360;
  for (let i = 0; i < total; i++) {
    const hue = hueStart + ((hueEnd - hueStart) * i) / (total - 1);
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }
  return colors;
}

function renderSlides(consoles) {
  const container = document.getElementById("timeline-container");
  const mask = document.querySelector(".mask");
  container.innerHTML = '';
  const colors = generateColorPalette(consoles.length);

  consoles.forEach((item, index) => {
    const imageUrl = item.image.filename || item.image;

    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.setAttribute("data-bg", imageUrl);
    slide.setAttribute("data-color", colors[index]);

    slide.style.backgroundColor = colors[index];
    slide.style.boxShadow = `0 0 20px ${colors[index]}88`;

    slide.innerHTML = `
      <div class="image-wrapper">
        <img src="${imageUrl}" alt="${item.title}">
      </div>
      <div class="header">
        <img class="icon-card" src="icons/game.svg">
        <div class="textos">
          <div class="year">${item.year}</div>
          <div class="title">${item.title}</div>
        </div>
      </div>
      <div class="description">${item.description}</div>
    `;

    slide.addEventListener('mouseenter', () => {
      document.body.style.backgroundImage = `url('${imageUrl}')`;
      mask.style.backgroundColor = colors[index] + "77";
    });

    slide.addEventListener('mouseleave', () => {
      mask.style.backgroundColor = "#00000073";
    });

    slide.addEventListener('click', () => {
      document.body.style.backgroundImage = `url('${imageUrl}')`;
      swiper.slideTo(index);
    });

    container.appendChild(slide);
  });
}

async function loadTimelineData() {
  const TOKEN = 'w5MnJMaLwfXAHn1qB4aMvQtt';
  const SLUG = 'game';
  const VERSION = 'draft';

  const res = await fetch(`https://api.storyblok.com/v2/cdn/stories/${SLUG}?version=${VERSION}&token=${TOKEN}`);
  const data = await res.json();

  const content = data.story.content;
  const consoles = content.consoles || [];

  document.getElementById("page-title").textContent = content.title || "Sem título";
  document.getElementById("page-description").textContent = content.description || "";

  if (!consoles.length) {
    console.warn("Nenhum item encontrado em 'consoles'. Verifique o conteúdo no Storyblok.");
    return;
  }

  renderSlides(consoles);

  const isMobile = window.innerWidth <= 480;

  const swiperOptions = {
    slidesPerView: isMobile ? 1 : 4,
    slidesPerGroup: isMobile ? 1 : 4,
    spaceBetween: isMobile ? 0 : 20,
    loop: false,
    grabCursor: true,
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true
    },
    on: {
      afterInit: function () {
        const activeSlide = this.slides[this.activeIndex];
        document.body.style.backgroundImage = `url('${activeSlide.getAttribute('data-bg')}')`;
      },
      slideChange: function () {
        const activeSlide = this.slides[this.activeIndex];
        document.body.style.backgroundImage = `url('${activeSlide.getAttribute('data-bg')}')`;
      }
    }
  };

  if (isMobile) {
    swiperOptions.effect = 'cards';
    swiperOptions.cardsEffect = {
      perSlideRotate: 5,
      perSlideOffset: 8,
      rotate: true,
      slideShadows: false
    };
  } else {
    swiperOptions.navigation = {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    };
    swiperOptions.mousewheel = {
      forceToAxis: true,
      sensitivity: 1
    };
    swiperOptions.breakpoints = {
      0: { slidesPerView: 1, slidesPerGroup: 1 },
      480: { slidesPerView: 2, slidesPerGroup: 1 },
      768: { slidesPerView: 3, slidesPerGroup: 1 },
      1024: { slidesPerView: 4, slidesPerGroup: 4 }
    };
  }

  swiper = new Swiper(".swiper", swiperOptions);
}

window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
  loadTimelineData();
});

// 🔁 BRIDGE: Preview realtime no editor visual do Storyblok
if (typeof StoryblokBridge !== "undefined") {
  const storyblokBridge = new StoryblokBridge();

  storyblokBridge.on(['change', 'published'], () => location.reload(true));

  storyblokBridge.on('input', (event) => {
    const content = event.story.content;
    document.getElementById("page-title").textContent = content.title || "Untitled";
    document.getElementById("page-description").textContent = content.description || "";

    const consoles = content.consoles || [];
    renderSlides(consoles);
    swiper.update();
  });
}
