# Cosine Technologies — Website

CMMC compliance consulting website for cosinetechnologies.net

---

## File Structure

```
cosine-technologies/
├── index.html                    ← The entire website (open this to preview)
├── css/
│   └── style.css                 ← All colors, fonts, layout
├── js/
│   └── main.js                   ← Nav behavior, animations, form
├── .github/
│   └── workflows/
│       └── deploy.yml            ← Auto-publishes site when you push to GitHub
├── CNAME                          ← Your custom domain (cosinetechnologies.net)
└── README.md                     ← This file
```

---

## Part 1 — Set Up on Your Computer

### Step 1 — Install the prerequisites (one-time setup)

You need two free tools installed before anything else:

**A) Git** — lets your computer talk to GitHub
- Go to https://git-scm.com/downloads
- Download and install for your OS (click Next through all the defaults)
- To confirm it worked: open a Terminal (Mac) or Command Prompt (Windows) and type `git --version` — you should see a version number

**B) GitHub account** — where your site will live
- Go to https://github.com and sign up for a free account
- Remember your username — you'll need it below

---

### Step 2 — Open the project folder in VS Code

1. Download the `cosine-technologies` folder Claude gave you (it should be a zip — extract it first)
2. Open **VS Code**
3. Click **File → Open Folder**
4. Select the `cosine-technologies` folder you just extracted
5. You should now see the file tree on the left: `index.html`, `css/`, `js/`, etc.

---

### Step 3 — Preview the site locally

You don't need to publish to GitHub just to see what it looks like.

1. In VS Code, install the **Live Server** extension:
   - Click the Extensions icon on the left sidebar (looks like 4 squares)
   - Search for `Live Server`
   - Click **Install** on the one by Ritwick Dey
2. Right-click `index.html` in the file tree → click **Open with Live Server**
3. A browser tab opens at `http://127.0.0.1:5500` — that's your site running locally
4. Any time you save a file, the browser refreshes automatically

> **To make edits:** open any file in VS Code, make your changes, hit Save (Ctrl+S / Cmd+S), and Live Server updates the preview instantly.

---

## Part 2 — Publish to GitHub

### Step 4 — Create a GitHub repository

1. Go to https://github.com and log in
2. Click the **+** icon (top right) → **New repository**
3. Name it `cosine-technologies` (or anything you want)
4. Leave it set to **Public** (required for free GitHub Pages)
5. Do **NOT** check "Add a README" — you already have one
6. Click **Create repository**
7. GitHub shows you a page with setup commands — keep this tab open, you'll need your repo URL

---

### Step 5 — Connect VS Code to GitHub and push the files

1. In VS Code, open the **Terminal**: click **Terminal → New Terminal** in the top menu bar
   - A panel opens at the bottom of VS Code — this is where you type commands
2. Type these commands one at a time, pressing Enter after each:

```bash
git init
```
*(Turns your folder into a git project)*

```bash
git add .
```
*(Stages all your files to be uploaded — the dot means "everything")*

```bash
git commit -m "Initial site launch"
```
*(Saves a snapshot with a label)*

```bash
git branch -M main
```
*(Names your branch "main")*

```bash
git remote add origin https://github.com/YOUR-USERNAME/cosine-technologies.git
```
⚠️ **Replace `YOUR-USERNAME`** with your actual GitHub username before pressing Enter.
You can also copy this exact line from the GitHub page you left open in Step 4.

```bash
git push -u origin main
```
*(Uploads everything to GitHub)*

3. A login popup may appear — sign in with your GitHub credentials
4. Go back to your GitHub repo page and refresh — you should see all your files there

---

### Step 6 — Turn on GitHub Pages

1. In your GitHub repo, click the **Settings** tab (top of the page)
2. In the left sidebar, click **Pages**
3. Under **Build and deployment → Source**, select **GitHub Actions**
4. That's it — GitHub will now automatically run the deploy workflow every time you push changes
5. After about 60 seconds, click the **Actions** tab to watch it deploy — a green checkmark means it worked
6. Your site is now live at: `https://YOUR-USERNAME.github.io/cosine-technologies`

---

## Part 3 — Connect cosinetechnologies.net

### Step 7 — Add your custom domain in GitHub

1. Go back to **Settings → Pages**
2. Under **Custom domain**, type: `cosinetechnologies.net`
3. Click **Save**
4. A `CNAME` file with your domain is already committed in this repo — don't delete it. (GitHub uses it to keep your custom domain attached on every deploy.)

---

### Step 8 — Update your DNS records

Log in to wherever you bought `cosinetechnologies.net` (GoDaddy, Namecheap, Google Domains, etc.) and add these DNS records:

| Type  | Name | Value                    |
|-------|------|--------------------------|
| A     | @    | 185.199.108.153          |
| A     | @    | 185.199.109.153          |
| A     | @    | 185.199.110.153          |
| A     | @    | 185.199.111.153          |
| CNAME | www  | YOUR-USERNAME.github.io  |

- The `@` symbol means the root domain (cosinetechnologies.net)
- The `www` CNAME handles www.cosinetechnologies.net

> DNS changes take anywhere from 15 minutes to 48 hours to fully propagate. Most registrars update within 30–60 minutes.

---

### Step 9 — Enable HTTPS (free SSL)

1. After DNS propagates, go back to **Settings → Pages**
2. Check the box: **Enforce HTTPS**
3. Your site is now live and secure at `https://cosinetechnologies.net` ✓

---

## Part 4 — Making Changes Later

Whenever you want to update the site:

1. Edit files in VS Code
2. Preview with Live Server to make sure it looks right
3. Open the Terminal in VS Code and run:

```bash
git add .
git commit -m "Describe what you changed"
git push
```

GitHub automatically re-deploys within about 60 seconds.

---

## Part 5 — Make the Contact Form Send Real Emails (Optional)

Right now the form shows a success message but doesn't actually send you an email. To fix that:

1. Go to https://formspree.io and create a free account (50 submissions/month free)
2. Click **New Form**, name it "Contact Form", set the email to yours
3. Copy your form ID — it looks like `xpwzabcd`
4. In VS Code, open `js/main.js`
5. Find the line that says `formBtn.addEventListener('click', (e) => {`
6. Replace the entire click handler with this:

```javascript
formBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const company = document.getElementById('company').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email) {
    alert('Please enter your name and email.');
    return;
  }

  formBtn.textContent = 'Sending...';
  formBtn.disabled = true;

  const response = await fetch('https://formspree.io/f/YOUR-FORM-ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, company, message })
  });

  if (response.ok) {
    formBtn.textContent = '✓ Request Received — We\'ll be in touch!';
    formBtn.style.background = '#10B981';
  } else {
    formBtn.textContent = 'Something went wrong — please email us directly.';
    formBtn.style.background = '#EF4444';
    formBtn.disabled = false;
  }
});
```

7. Replace `YOUR-FORM-ID` with the ID from Formspree
8. Save, commit, and push — form submissions will now land in your inbox
