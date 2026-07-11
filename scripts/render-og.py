"""Render og-image.png from scripts/og-card.html. Run from the repo root:
python scripts/render-og.py
"""
from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parent.parent
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1200, 'height': 630})
    page.goto((root / 'scripts' / 'og-card.html').as_uri())
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(800)
    page.screenshot(path=str(root / 'og-image.png'))
    browser.close()
print('wrote og-image.png')
