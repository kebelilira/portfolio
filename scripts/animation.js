const initLightMode = () => {
  document.querySelector('input[type="checkbox"]').addEventListener('change', () => {
    document.body.classList.toggle('light-mode') 
  })

}

const initOpenMenu = () => {
  const menuBtn = document.querySelector('header .menu i')
  const closeBtn = document.querySelector('header .menu i:nth-child(2)')
  const menu = document.querySelector('.menuOpen');
  const header = document.querySelector('header')

  const close = () => {
    menu.classList.add('hidden')
    menuBtn.classList.remove('hidden')
    closeBtn.classList.add('hidden')
    document.body.style.overflow = 'visible';
    header.classList.remove('open')

  }

  const open = () => {
    menu.classList.remove('hidden')
    menuBtn.classList.add('hidden')
    closeBtn.classList.remove('hidden')
    document.body.style.overflow = 'hidden';
    header.classList.add('open')
  }

  menuBtn.addEventListener('click', open)

  closeBtn.addEventListener('click', close)

  document.addEventListener('keydown', ({ key }) => key === "Escape" && close());

  const links = document.querySelectorAll('nav a')

  links.forEach(link => {
    link.addEventListener('click', close)
  })

}

const initAnimationScroll = () => {
  const sections = document.querySelectorAll('.js-section')

  const windowHalfSize = window.innerHeight * 0.6

  const animateScroll = () => {
    sections.forEach(item => {
      const sectionTop = item.getBoundingClientRect().top

      const isSectionVisible = (sectionTop - windowHalfSize) < 0

      if (isSectionVisible) {
        item.classList.add('active')
      } else {
        item.classList.remove('active')
      }

    })

  }

  animateScroll()
  window.addEventListener('scroll', animateScroll)

}

const initScrollSmooth = () => {

  const linksInternos = document.querySelectorAll('nav a')

  linksInternos.forEach(item => {
    const scrollToSection = (event) => {
      event.preventDefault()
      const href = event.currentTarget.getAttribute('href');
      const section = document.querySelector(href)

      window.scrollTo({
        top: section.offsetTop - 100
      })
    }
    item.addEventListener('click', scrollToSection)
  })
}

const initTypingAnimation = () => {
  const title = document.querySelector('#sobre .banner h1')
  const span = document.querySelector('#sobre .banner span')
  const paragraph = document.querySelector('#sobre .banner p')

  const typingAnimation = (element) => {

    if (element == title) {
      element.innerHTML = 'Olá, eu sou o '
      const textToArray = element.innerHTML.split('')
      element.innerHTML = ''

      textToArray.forEach((item, index) => {
        setTimeout(() => element.innerHTML += item, 120 * index)
      })

    } else if (element == span) {
      element.innerHTML = 'Kebeli Rodrigues'
      const textToArray = element.innerHTML.split('')
      element.innerHTML = ''

      textToArray.forEach((item, index) => {
        setTimeout(() => element.innerHTML += item, 150 * index)
      })

    } else {
      element.innerHTML = 'Engenheiro de Software | Desenvolvedor C#, ASP.NET, JavaScript, Python, SQL'
      const textToArray = element.innerHTML.split('')
      element.innerHTML = ''

      textToArray.forEach((item, index) => {
        setTimeout(() => element.innerHTML += item, 75 * index)
      })

    }

  }

  typingAnimation(title)
  setTimeout(() => typingAnimation(span), 1600)
  setTimeout(() => typingAnimation(paragraph), 3700)

}
// Adicionar feedback visual
const initToastNotifications = () => {
  const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };
  
  // Usar ao baixar CV
  document.querySelector('a[download]')?.addEventListener('click', () => {
    showToast('Download iniciado!', 'success');
  });
};
// Usar Intersection Observer para lazy loading
const initLazyLoad = () => {
  const images = document.querySelectorAll('img[loading="lazy"]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        observer.unobserve(img);
      }
    });
  });
  images.forEach(img => observer.observe(img));
};


initOpenMenu()
initAnimationScroll()
initScrollSmooth()
initLightMode()
initTypingAnimation()
