const { chromium } = require('playwright');

function convertTimeAgoToMinutes(text) {
    const [num, unit] = text.split(' ');
    const value = parseInt(num);
    if (unit.includes('minute')) return value;
    if (unit.includes('hour')) return value * 60;
    if (unit.includes('day')) return value * 1440;
    if (unit.includes('second')) return 0;
    return Infinity;
}

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://news.ycombinator.com/newest');

    let allTimes = [];

    while (allTimes.length < 100) {
        const timestamps = await page.$$eval('.subtext', nodes => {
            return nodes.map(n => {
                const match = n.innerText.match(/\d+ (second|minute|hour|day)s? ago/);
                return match ? match[0] : null;
            }).filter(Boolean);
        });

        allTimes.push(...timestamps.map(convertTimeAgoToMinutes));

        if (allTimes.length < 100) {
            await Promise.all([
                page.waitForNavigation(),
                page.click('a.morelink')
            ]);
        }
    }

    const first100 = allTimes.slice(0, 100);
    const isSorted = first100.every((val, i, arr) => i === 0 || arr[i - 1] <= val);

    if (isSorted) {
        console.log("✅ Articles are sorted from newest to oldest.");
    } else {
        console.log("❌ Articles are NOT sorted correctly.");
    }

    await browser.close();
})();