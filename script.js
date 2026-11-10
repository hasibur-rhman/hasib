/**
 * Hasib ur Rahman - Academic & ML Engineer Portfolio
 * Interactive Functionality & Visualizations
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNeuralCanvas();
  initNavbarScroll();
  initFilters();
  initMriSimulator();
  initBibtexModals();
  initPdfModal();
  initContactActions();
  initSmoothScroll();
});

/* ==========================================================================
   1. Theme Management (Dark / Light)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const toggleIcon = document.getElementById('theme-toggle-icon');
  const html = document.documentElement;

  // Retrieve saved or preferred theme (default to dark)
  const savedTheme = localStorage.getItem('hasib-portfolio-theme') || 'dark';
  setTheme(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = html.classList.contains('light') ? 'light' : 'dark';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    });
  }

  function setTheme(theme) {
    if (theme === 'light') {
      html.classList.add('light');
      html.classList.remove('dark');
      if (toggleIcon) {
        toggleIcon.className = 'fa-solid fa-moon text-slate-700';
      }
    } else {
      html.classList.remove('light');
      html.classList.add('dark');
      if (toggleIcon) {
        toggleIcon.className = 'fa-solid fa-sun text-amber-400';
      }
    }
    localStorage.setItem('hasib-portfolio-theme', theme);
  }
}

/* ==========================================================================
   2. Neural Constellation Canvas (Hero Background)
   ========================================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.parentElement.offsetWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight);

  let mouse = { x: null, y: null, radius: 140 };
  let particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 9500), 75);

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
    initParticles();
  });

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    if (
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom &&
      e.clientX >= rect.left &&
      e.clientX <= rect.right
    ) {
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    } else {
      mouse.x = null;
      mouse.y = null;
    }
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1.2;
      this.baseColor = Math.random() > 0.4 ? 'rgba(6, 182, 212, ' : 'rgba(99, 102, 241, ';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const dirX = (dx / dist) * force * 1.5;
          const dirY = (dy / dist) * force * 1.5;
          this.x += dirX;
          this.y += dirY;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.baseColor + '0.7)';
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines (synapses)
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 115) {
          const alpha = (1 - dist / 115) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }
    }

    // Connect to cursor
    if (mouse.x !== null && mouse.y !== null) {
      for (let i = 0; i < particles.length; i++) {
        const dx = mouse.x - particles[i].x;
        const dy = mouse.y - particles[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.35;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  initParticles();
  animate();
}

/* ==========================================================================
   3. Navbar Scroll Active Link & Sticky Glass Effect
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('main-navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('shadow-lg', 'bg-slate-900/90', 'backdrop-blur-md');
    } else {
      navbar.classList.remove('shadow-lg');
    }

    // Highlight active link
    let current = '';
    const scrollPosition = window.scrollY + 180;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('text-cyan-400', 'font-semibold');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-cyan-400', 'font-semibold');
      }
    });
  });

  // Mobile Menu Toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu on click link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach((l) =>
      l.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      })
    );
  }
}

/* ==========================================================================
   4. Filter Tabs for Publications and Projects
   ========================================================================== */
function initFilters() {
  // Publications Filter
  const pubButtons = document.querySelectorAll('.pub-filter-btn');
  const pubCards = document.querySelectorAll('.pub-card');

  pubButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      pubButtons.forEach((b) => b.classList.remove('active', 'bg-cyan-500', 'text-slate-950'));
      pubButtons.forEach((b) => b.classList.add('bg-slate-800/80', 'text-slate-300'));
      btn.classList.add('active', 'bg-cyan-500', 'text-slate-950');
      btn.classList.remove('bg-slate-800/80', 'text-slate-300');

      const filter = btn.getAttribute('data-filter');
      pubCards.forEach((card) => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 200);
        }
      });
    });
  });

  // Projects Filter
  const projButtons = document.querySelectorAll('.project-filter-btn');
  const projCards = document.querySelectorAll('.project-card');

  projButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      projButtons.forEach((b) => b.classList.remove('active', 'bg-cyan-500', 'text-slate-950'));
      projButtons.forEach((b) => b.classList.add('bg-slate-800/80', 'text-slate-300'));
      btn.classList.add('active', 'bg-cyan-500', 'text-slate-950');
      btn.classList.remove('bg-slate-800/80', 'text-slate-300');

      const filter = btn.getAttribute('data-filter');
      projCards.forEach((card) => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   5. Interactive NeuroScan XAI Simulator
   ========================================================================== */
function initMriSimulator() {
  const caseButtons = document.querySelectorAll('.mri-case-btn');
  const modeButtons = document.querySelectorAll('.xai-mode-btn');

  const canvas = document.getElementById('xai-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const labelDiagnosis = document.getElementById('sim-diagnosis');
  const labelConfidence = document.getElementById('sim-confidence');
  const labelLatency = document.getElementById('sim-latency');
  const labelXaiMethod = document.getElementById('sim-xai-method');
  const progressBar = document.getElementById('sim-progress-bar');
  const explanationBox = document.getElementById('sim-explanation');

  // Case Definitions with synthetic MRI & heatmap parameters
  const casesData = {
    glioma: {
      name: 'Glioma (High Grade)',
      confidence: '96.4%',
      barWidth: '96.4%',
      latency: '13.8 ms',
      tumorX: 180,
      tumorY: 130,
      tumorRadius: 42,
      tumorColor: 'rgba(239, 68, 68, ',
      explanation:
        'Grad-CAM++ identifies high activation density in the right frontal lobe cortex with hyperintense margin characteristic of glioblastoma infiltrative margins.',
      differential: 'Secondary hypothesis: Anaplastic Astrocytoma (3.1%)'
    },
    meningioma: {
      name: 'Meningioma',
      confidence: '94.8%',
      barWidth: '94.8%',
      latency: '14.2 ms',
      tumorX: 230,
      tumorY: 175,
      tumorRadius: 36,
      tumorColor: 'rgba(245, 158, 11, ',
      explanation:
        'Attribution maps isolate a dural-based extra-axial mass with distinct contrast enhancement and dural tail sign.',
      differential: 'Secondary hypothesis: Schwannoma (4.2%)'
    },
    pituitary: {
      name: 'Pituitary Tumor',
      confidence: '95.1%',
      barWidth: '95.1%',
      latency: '14.0 ms',
      tumorX: 160,
      tumorY: 220,
      tumorRadius: 28,
      tumorColor: 'rgba(168, 85, 247, ',
      explanation:
        'Sellar/suprasellar mass extension detected near the optic chiasm. LIME superpixel segments confirm localized pituitary fossa enlargement.',
      differential: 'Secondary hypothesis: Craniopharyngioma (3.8%)'
    },
    notumor: {
      name: 'No Tumor (Healthy)',
      confidence: '98.2%',
      barWidth: '98.2%',
      latency: '13.5 ms',
      tumorX: 0,
      tumorY: 0,
      tumorRadius: 0,
      tumorColor: 'transparent',
      explanation:
        'Bilateral brain parenchyma shows symmetrical ventricular morphology and baseline physiological signal intensity without focal mass effect.',
      differential: 'Normal anatomical variant (1.8%)'
    }
  };

  let currentCase = 'glioma';
  let currentMode = 'heatmap'; // 'raw', 'heatmap', 'lime'

  function renderVisualizer() {
    const data = casesData[currentCase];
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // 1. Draw Simulated Brain Skull & Parenchyma
    ctx.save();
    // Dark background
    ctx.fillStyle = '#060910';
    ctx.fillRect(0, 0, w, h);

    // Outer Skull Oval
    ctx.beginPath();
    ctx.ellipse(w / 2, h / 2, 125, 140, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#1e293b';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#475569';
    ctx.stroke();

    // Inner Brain Parenchyma
    ctx.beginPath();
    ctx.ellipse(w / 2, h / 2, 115, 130, 0, 0, Math.PI * 2);
    const grad = ctx.createRadialGradient(w / 2, h / 2, 20, w / 2, h / 2, 120);
    grad.addColorStop(0, '#334155');
    grad.addColorStop(0.7, '#1e293b');
    grad.addColorStop(1, '#0f172a');
    ctx.fillStyle = grad;
    ctx.fill();

    // Ventricles (cerebrospinal fluid cavities)
    ctx.beginPath();
    ctx.ellipse(w / 2 - 18, h / 2 - 10, 10, 32, -0.15, 0, Math.PI * 2);
    ctx.ellipse(w / 2 + 18, h / 2 - 10, 10, 32, 0.15, 0, Math.PI * 2);
    ctx.fillStyle = '#0a0e17';
    ctx.fill();

    // Cortical Gyri & Sulci Texture lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1.8;
    for (let r = 35; r < 105; r += 20) {
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, r, 0, Math.PI * 2);
      ctx.setLineDash([12, 16]);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // 2. Draw Lesion / Tumor Mass (if not healthy)
    if (currentCase !== 'notumor') {
      ctx.beginPath();
      ctx.arc(data.tumorX, data.tumorY, data.tumorRadius * 0.75, 0, Math.PI * 2);
      ctx.fillStyle = '#64748b';
      ctx.fill();

      // Hyperintense core
      ctx.beginPath();
      ctx.arc(data.tumorX, data.tumorY, data.tumorRadius * 0.45, 0, Math.PI * 2);
      ctx.fillStyle = '#cbd5e1';
      ctx.fill();
    }

    // 3. Render Explainability Overlay Based on Mode
    if (currentMode === 'heatmap' && currentCase !== 'notumor') {
      // Grad-CAM++ Glow Heatmap
      const heatGrad = ctx.createRadialGradient(
        data.tumorX,
        data.tumorY,
        5,
        data.tumorX,
        data.tumorY,
        data.tumorRadius * 1.6
      );
      heatGrad.addColorStop(0, 'rgba(239, 68, 68, 0.85)'); // Red hotspot
      heatGrad.addColorStop(0.4, 'rgba(245, 158, 11, 0.7)'); // Orange mid
      heatGrad.addColorStop(0.7, 'rgba(16, 185, 129, 0.4)'); // Green periphery
      heatGrad.addColorStop(1, 'rgba(6, 182, 212, 0)'); // Cyan fade

      ctx.beginPath();
      ctx.arc(data.tumorX, data.tumorY, data.tumorRadius * 1.6, 0, Math.PI * 2);
      ctx.fillStyle = heatGrad;
      ctx.fill();

      // Draw crosshairs / bounding circle
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(data.tumorX, data.tumorY, data.tumorRadius * 1.1, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Label on overlay
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillStyle = '#f87171';
      ctx.fillText('Grad-CAM++ Saliency Max', data.tumorX - 60, data.tumorY - data.tumorRadius - 8);
    } else if (currentMode === 'lime') {
      // LIME Superpixel segmentation overlay
      if (currentCase !== 'notumor') {
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2.2;
        ctx.strokeRect(
          data.tumorX - data.tumorRadius,
          data.tumorY - data.tumorRadius,
          data.tumorRadius * 2,
          data.tumorRadius * 2
        );

        ctx.fillStyle = 'rgba(16, 185, 129, 0.35)';
        ctx.fillRect(
          data.tumorX - data.tumorRadius,
          data.tumorY - data.tumorRadius,
          data.tumorRadius * 2,
          data.tumorRadius * 2
        );

        ctx.font = '11px JetBrains Mono, monospace';
        ctx.fillStyle = '#34d399';
        ctx.fillText('+ LIME Positive Superpixel', data.tumorX - 65, data.tumorY + data.tumorRadius + 18);
      } else {
        ctx.font = '12px JetBrains Mono, monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('No focal superpixel attribution detected', 30, h / 2);
      }
    }

    ctx.restore();

    // Update UI Stats
    if (labelDiagnosis) labelDiagnosis.innerText = data.name;
    if (labelConfidence) labelConfidence.innerText = data.confidence;
    if (labelLatency) labelLatency.innerText = data.latency;
    if (progressBar) progressBar.style.width = data.barWidth;
    if (labelXaiMethod) {
      labelXaiMethod.innerText =
        currentMode === 'heatmap'
          ? 'Grad-CAM++ Weighted Activation Map'
          : currentMode === 'lime'
          ? 'LIME Local Interpretable Superpixels'
          : 'Raw Axial T1-Gd MRI Slice';
    }
    if (explanationBox) {
      explanationBox.innerHTML = `<strong>Clinical Insight:</strong> ${data.explanation} <span class="block mt-1 text-xs text-slate-400 font-mono">${data.differential}</span>`;
    }
  }

  // Event Listeners for Case Selection
  caseButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      caseButtons.forEach((b) => b.classList.remove('active', 'border-cyan-400', 'bg-cyan-500/10'));
      btn.classList.add('active', 'border-cyan-400', 'bg-cyan-500/10');
      currentCase = btn.getAttribute('data-case');
      renderVisualizer();
    });
  });

  // Event Listeners for XAI Mode Selection
  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      modeButtons.forEach((b) => b.classList.remove('active', 'bg-cyan-500', 'text-slate-950'));
      modeButtons.forEach((b) => b.classList.add('bg-slate-800', 'text-slate-300'));
      btn.classList.add('active', 'bg-cyan-500', 'text-slate-950');
      btn.classList.remove('bg-slate-800', 'text-slate-300');
      currentMode = btn.getAttribute('data-mode');
      renderVisualizer();
    });
  });

  // Initial draw
  renderVisualizer();
}

/* ==========================================================================
   6. BibTeX Citation Modal & Clipboard Copy
   ========================================================================== */
function initBibtexModals() {
  const bibtexData = {
    diastackbd: `@inproceedings{rahman2026diastackbd,
  title={DiaStackBD: An Explainable Machine Learning Framework for Type 2 Diabetes Prediction in Bangladesh with Lightweight Web Deployment},
  author={Rahman, Hasib ur and Kamal, Imtiaz Ibna and Maruf, Md Abdullah Al and Mondal, Dhroubo Jyoti},
  booktitle={5th IEEE International Conference on Biomedical Engineering, Computer and Information Technology for Health (BECITHCON)},
  year={2026},
  organization={IEEE}
}`,
    braintumor: `@article{rahman2026knowledgedistillation,
  title={Knowledge Distillation from Multi-Teacher CNNs for Explainable and Lightweight Brain Tumor MRI Classification in Low-Resource Settings},
  author={Rahman, Hasib ur and Hossain, Md Babul and Kamal, Imtiaz Ibna and Shihab, Imranul Islam and Tuhin, Izaz Ahmmed and Mia, Md Rajib},
  journal={7th International Conference on Electrical Engineering and Information & Communication Technology (ICEEICT)},
  year={2026},
  note={Under Review}
}`,
    polyp: `@article{rahman2026polyp,
  title={A Lightweight and Deployable Tool for Real-Time Polyp Segmentation in Colonoscopy Images Using Deep Learning},
  author={Rahman, Hasib ur and Kamal, Imtiaz Ibna and Hridoy, Rashidul Hassan and Shihab, Imranul Islam and Mondal, Dhroubo Jyoti},
  journal={7th International Conference on Electrical Engineering and Information & Communication Technology (ICEEICT)},
  year={2026},
  note={Under Review}
}`,
    breastcancer: `@article{rahman2026breastcancer,
  title={Automated Breast Cancer Detection in Mammography Using Preprocessed Transfer Learning Architectures and Feature Fusion},
  author={Rahman, Hasib ur and Kamal, Imtiaz Ibna and Hira, Mahbub Hassan and Mondal, Dhroubo Jyoti and Maruf, Md Abdullah Al},
  journal={7th International Conference on Electrical Engineering and Information & Communication Technology (ICEEICT)},
  year={2026},
  note={Under Review}
}`
  };

  const modal = document.getElementById('bibtex-modal');
  const codeArea = document.getElementById('bibtex-code');
  const copyBtn = document.getElementById('copy-bibtex-btn');
  const closeBtn = document.getElementById('close-bibtex-btn');
  const citeBtns = document.querySelectorAll('.cite-btn');

  citeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-paper');
      if (bibtexData[key]) {
        codeArea.innerText = bibtexData[key];
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(codeArea.innerText).then(() => {
        showToast('BibTeX citation copied to clipboard!');
        copyBtn.innerText = 'Copied!';
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fa-solid fa-copy mr-2"></i>Copy BibTeX';
        }, 2000);
      });
    });
  }
}

/* ==========================================================================
   7. CV Preview Modal
   ========================================================================== */
function initPdfModal() {
  const modal = document.getElementById('cv-modal');
  const openBtns = document.querySelectorAll('.preview-cv-btn');
  const closeBtn = document.getElementById('close-cv-btn');

  openBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    });
  }
}

/* ==========================================================================
   8. Contact Actions & Toast Notification
   ========================================================================== */
function initContactActions() {
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  const email = 'hasiburrahman.official333@gmail.com';

  copyEmailBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!');
      });
    });
  });

  // Contact Form handler
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const emailVal = document.getElementById('form-email').value;
      const subject = document.getElementById('form-subject').value;
      const message = document.getElementById('form-message').value;

      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
        `[Portfolio Inquiry] ${subject} - ${name}`
      )}&body=${encodeURIComponent(
        `Hi Hasib,\n\n${message}\n\nBest regards,\n${name}\n${emailVal}`
      )}`;

      showToast('Opening default mail client...');
      window.location.href = mailtoLink;
    });
  }
}

function showToast(message) {
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.innerText = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   9. Smooth Scroll for Anchor Links
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
