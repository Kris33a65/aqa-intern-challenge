import { test, expect } from '@playwright/test';
import {WidgetPage} from "./widget.page";

test.describe('Uchi.ru widget ', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({page}) => {
    widgetPage = new WidgetPage(page);

    // open uchi.ru main page
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // close cookies popup
    const cookieButton = page.locator('._UCHI_COOKIE__button');
    if (await cookieButton.isVisible().catch(() => false)) {
      await cookieButton.click();
    }

  });

  test('opens', async ({page}) => {
    await widgetPage.openWidget();

    await expect(widgetPage.getWidgetBody()).toBeVisible()
  });

  test('has correct title', async ({ page }) => {
    await widgetPage.openWidget();

    const articles = widgetPage.getPopularArticles();

    await expect(articles.first()).toBeVisible();
    await articles.first().click();

    await widgetPage.clickWriteToUs();

    expect(await widgetPage.getTitle()).toEqual('Связь с поддержкой');
  });

  test('has popular articles', async () => {
    await widgetPage.openWidget();

    const articles = widgetPage.getPopularArticles();

    await expect(articles.first()).toBeVisible();
  });
});
