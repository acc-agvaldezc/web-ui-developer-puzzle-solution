import { $, $$, browser, ElementFinder, ExpectedConditions } from 'protractor';

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

  xit('Then: I should see search results as I am typing', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    // TODO: Implement this test!
  });

  it('Then: I should be able to search books, add one to reading list and marked them as read with new label on button.', async () => {
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

    const selectedBookId = await availableReadingListButtons.first().getAttribute('id');
    await availableReadingListButtons.first().click();
    await browser.sleep(500);

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
    
    const markAsReadButtons = $$('[data-testing="mark-finished"]');
    expect((await markAsReadButtons).length).toBeGreaterThan(0);

    await markAsReadButtons.last().click();

    expect((await $(`#${selectedBookId}`).getText())).toEqual('Finished');
  });
});
