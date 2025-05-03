# Hacker News Playwright Sorting

This project is a simple **JavaScript script** that uses **Playwright** to verify the sorting of articles on the Hacker News "newest" page. It checks whether the articles are sorted from the **newest** to the **oldest**.

## Project Structure

- `index.js`: The main script that navigates to the Hacker News "newest" page and verifies the sorting order of articles.

## Prerequisites

- Node.js (v14 or later)
- Playwright

## Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/sreeharikadatla/hacker-news-playwright-sorting.git
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the script:
    ```bash
    node index.js
    ```

## How It Works

1. The script launches a **headless browser** using Playwright.
2. It navigates to the Hacker News "newest" page and grabs the timestamps of the first 100 articles.
3. It checks if the timestamps are sorted in order from **newest** to **oldest**.
4. The result (success or failure) is printed to the console.

## License

This project is open-source and available under the [MIT License](LICENSE).
