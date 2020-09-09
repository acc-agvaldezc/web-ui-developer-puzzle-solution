import { $, $$, browser, ExpectedConditions, Key, ElementFinder } from 'protractor';
import { read } from 'fs';

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

    let searchInputText = 'javascript';

    const input = await $('input[type="search"]');
    await input.sendKeys(searchInputText);

    await browser.sleep(500);

    let items = await $$('[data-testing="book-item"]');
    expect(items.length).toBeGreaterThan(1);

    [...searchInputText].forEach(async () => {
      await input.sendKeys(Key.chord(Key.BACK_SPACE))
    });


    await browser.sleep(500);

    items = await $$('[data-testing="book-item"]');
    expect(items.length).toEqual(0);

    searchInputText = 'python';
    await input.sendKeys(searchInputText);

    await browser.sleep(500);

    items = await $$('[data-testing="book-item"]');
    expect(items.length).toBeGreaterThan(1);
  });

  it('Then: I should be able to search books and add them to reading list and undo that action.', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const items = await $$('[data-testing="book-item"]');
    expect(items.length).toBeGreaterThan(0);

    const addToReadingListButtons = $$('[data-testing="add-book-to-reading-list"]');
    expect(addToReadingListButtons).not.toBeUndefined();

    const availableReadingListButtons = addToReadingListButtons.filter(
      async (el: ElementFinder) => (await el.isEnabled())
    );

    let readingListItemElements = await $$('[data-testing="reading-list-item"]');
    const initialReadingListItemCount = readingListItemElements.length;

    await availableReadingListButtons.first().click();
    await browser.sleep(500);

    readingListItemElements = await $$('[data-testing="reading-list-item"]');
    expect(readingListItemElements.length).toBeGreaterThan(initialReadingListItemCount);

    const undoAddToReadingListButton = $('[data-testing="undo-add"]');
    expect(undoAddToReadingListButton).not.toBeUndefined();

    await undoAddToReadingListButton.click();
    await browser.sleep(500);

    readingListItemElements = await $$('[data-testing="reading-list-item"]');
    expect(readingListItemElements.length).toEqual(initialReadingListItemCount);
  });
});
