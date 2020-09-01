import { $, $$, browser, ExpectedConditions, Key } from 'protractor';

describe('When: Use the search feature', () => {
  it('Then: I should be able to search books by title', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const items = await $$('[data-testing="book-item"]');
    expect(items.length).toBeGreaterThan(1);
  });

  it('Then: I should see search results as I am typing', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');

    await browser.sleep(500);

    let items = await $$('[data-testing="book-item"]');
    expect(items.length).toBeGreaterThan(1);

    await input.sendKeys(Key.chord(Key.CONTROL, 'a'));
    await input.sendKeys(Key.chord(Key.BACK_SPACE));

    await browser.sleep(500);

    items = await $$('[data-testing="book-item"]');
    expect(items.length).toEqual(0);

    await input.sendKeys('python');

    await browser.sleep(500);

    items = await $$('[data-testing="book-item"]');
    expect(items.length).toBeGreaterThan(1);
  });
});
