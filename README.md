# A Little Universe for Eshu 💗

A one-page interactive birthday surprise: envelope reveal, countdown, letter,
17 flip cards, scrapbook, mystery boxes, wish cake, quiz and a final fireworks message.

## 1. Run it
```bash
npm install
npm run dev        # open the URL it prints
npm run build      # makes the ready-to-publish "dist" folder
```

## 2. Edit everything in ONE file: `src/data/eshuData.js`
Letter, reasons, photo captions, mystery box messages, quiz questions and music
are all there. Yellow `[brackets]` in the letter are placeholders.

## 3. Add your photos 📸
1. Copy your pictures into `public/photos/` (e.g. `pic1.jpg`, `pic2.jpg`).
2. Open `src/data/eshuData.js`, find `memories`, and set the paths:
   `{cap:"our favorite conversations", img:"/photos/pic1.jpg"}`
3. Use the exact file name (case matters). Photos starting with `/photos/` always
   come from the `public/photos` folder. Add more rows to add more polaroids.

## 4. Change the music 🎵
Copy a song into `public/music/` and set `music: "/music/song.mp3"` in `eshuData.js`.

## 5. Publish
Run `npm run build`, then drag the **dist** folder to https://app.netlify.com/drop
(or deploy to Vercel / GitHub Pages) to get a public link. Remember to rebuild
after every edit.
