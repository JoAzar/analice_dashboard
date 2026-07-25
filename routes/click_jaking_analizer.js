const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

router.get('/', async (req, res) => {
    const url = req.query.url || 'https://example.com';

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: 'networkidle2' });

        const result = await page.evaluate(() => {
            const elementos = document.querySelectorAll("iframe, div, button");

            let sospechoso = false;
            let detalles = [];

            elementos.forEach(el => {
                const style = window.getComputedStyle(el);
                const rect = el.getBoundingClientRect();

                const opacity = parseFloat(style.opacity);
                const position = style.position;
                const zIndex = parseInt(style.zIndex);

                if (
                    opacity === 0 &&
                    (position === "absolute" || position === "fixed") &&
                    zIndex > 10 &&
                    rect.width > window.innerWidth * 0.5 &&
                    rect.height > window.innerHeight * 0.5
                ) {
                    sospechoso = true;
                    detalles.push({
                        tag: el.tagName,
                        opacity,
                        position,
                        zIndex
                    });
                }
            });

            return { sospechoso, detalles };
        });

        await browser.close();

        res.json({
            url,
            alerta: result.sospechoso,
            mensaje: result.sospechoso
                ? "⚠️ posible clickjacking"
                : "✅ sin señales claras",
            detalles: result.detalles
        });

    } catch (err) {
        res.status(500).json({ error: 'Error analizando la página' });
    }
});

module.exports = router;