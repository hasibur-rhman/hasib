# Hasib ur Rahman - Academic & Machine Learning Portfolio

A modern, responsive, high-performance academic and AI/ML engineer portfolio website for **Hasib ur Rahman** (Machine Learning Engineer & AI Researcher). Built with clean semantic HTML5, modern Tailwind CSS, custom glassmorphic styling, interactive canvas animations, and an embedded Explainable AI (XAI) diagnostic sandbox.

---

## 🌟 Key Features

1. **AI / Healthcare Researcher Aesthetic**: Deep dark theme default with obsidian glassmorphic panels, glowing cyan/indigo accents, and instant light mode switch.
2. **Interactive Neural Constellation Hero**: Real-time canvas rendering particles and neural synapses that interact with the user's cursor.
3. **Interactive XAI Brain Tumor Diagnostic Simulator**:
   - Live clinical cases: Glioma, Meningioma, Pituitary Tumor, Healthy Control.
   - Interactive visual layers: Raw Axial T1-Gd MRI, Grad-CAM++ Saliency Heatmap, and LIME Superpixel masks.
   - Live confidence meters, latency diagnostics (~13.8 ms), and medical interpretability insight.
4. **Scholarly Publications & BibTeX Citation**:
   - Filterable publication cards: *Presented*, *Under Review*, *XAI*, *Medical Imaging*.
   - One-click **BibTeX modal** with direct clipboard copy and animated toast notification.
5. **Ongoing Thesis Spotlight**:
   - Dedicated feature card for **RainLite-YOLO** (Physics-guided feature-space deraining & lightweight edge object detection for autonomous vehicles).
6. **Curriculum Vitae Integration**:
   - One-click interactive **PDF Preview Modal** embedded right inside the portfolio.
   - Direct download button pointing to `Hasib_ur_Rahman_CV.pdf`.
7. **Contact & Social Dispatch**:
   - One-click email clipboard copy with toast feedback.
   - Pre-formatted contact form linked to mailto dispatch.
   - Direct links to GitHub, LinkedIn, and ResearchGate.

---

## 🚀 Instant Local Preview

Since this is a lightweight, zero-dependency static site, you can preview it immediately using Python's built-in HTTP server:

```bash
# In the portfolio directory:
python3 -m http.server 8000
```

Then open your browser at:
```
http://localhost:8000
```

Or simply double-click `index.html` to open it directly in any modern browser!

---

## 📂 Project Structure

```text
portfolio/
├── index.html                   # Main semantic HTML structure & sections
├── style.css                    # Glassmorphism, animations, theme tokens, print CSS
├── script.js                    # Dynamic behavior, XAI sandbox, filters, canvas, modals
├── Hasib ur Rahman_ CV.pdf      # Original CV document
├── Hasib_ur_Rahman_CV.pdf       # Web-optimized URL-friendly copy
└── README.md                    # Documentation & deployment guide
```

---

## 🌐 Free 1-Click Deployment Options

### Option 1: GitHub Pages (Recommended)
1. Initialize git in this directory (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Hasib ur Rahman academic portfolio"
   ```
2. Create a repository on GitHub (e.g. `hasiburrahman.github.io` or `portfolio`).
3. Push your repository:
   ```bash
   git remote add origin https://github.com/hasibur-rhman/portfolio.git
   git branch -M main
   git push -u origin main
   ```
4. In GitHub repository settings -> **Pages**, set source branch to `main` and save. Your site is live!

### Option 2: Netlify / Vercel
- Simply drag and drop the `portfolio` folder directly into [Netlify Drop](https://app.netlify.com/drop) or import from GitHub on Vercel. Zero build configuration required!

---

## 👤 Author Information

- **Name**: Hasib ur Rahman
- **Email**: `hasiburrahman.official333@gmail.com`
- **Phone**: `+880 1310656316`
- **Location**: Dhaka, Bangladesh
- **Institution**: Daffodil International University (July 2023 – July 2027)
