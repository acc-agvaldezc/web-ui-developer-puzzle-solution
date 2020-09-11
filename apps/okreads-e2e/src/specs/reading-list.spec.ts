import { $, $$, browser, ElementArrayFinder, ElementFinder, ExpectedConditions } from 'protractor';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  it('Then: I should be able to mark as read or unread a book on reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    const readingListCloseButton = await $('[aria-label="Close Reading List"]');

    let readingListItemElements = await $$('.reading-list-item');

    if (readingListItemElements.length === 0) {
      await readingListCloseButton.click();

      const form = await $('form');
      const input = await $('input[type="search"]');
      await input.sendKeys('javascript');
      await form.submit();

      const items = await $$('[data-testing="book-item"]');
      expect(items.length).toBeGreaterThan(0);

      const addToReadingListButton = $('[data-testing="add-book-to-reading-list"]');
      expect(addToReadingListButton).not.toBeUndefined();

      addToReadingListButton.click();
      await browser.sleep(500);
      expect(await addToReadingListButton.isEnabled()).toEqual(false);
    }

    const initialReadingListItemCount = readingListItemElements.length;

    readingListItemElements = await $$('.reading-list-item');
    expect(initialReadingListItemCount).toBeGreaterThan(0);

    if ((await readingListItemElements[0].getAttribute('class')).includes('finished')) {
      const markAsUnreadButtons = await $$('[data-testing="mark-unfinished"]');
      expect(markAsUnreadButtons.length).toBeGreaterThan(0);

      await markAsUnreadButtons[0].click();
      readingListItemElements = await $$('.reading-list-item');
      expect((await readingListItemElements[0].getAttribute('class'))).not.toContain('finished');

    } else {
      const markAsReadButtons = await $$('[data-testing="mark-finished"]');
      expect(markAsReadButtons.length).toBeGreaterThan(0);

      await markAsReadButtons[0].click();
      readingListItemElements = await $$('.reading-list-item');
      expect((await readingListItemElements[0].getAttribute('class'))).toContain('finished');
    }
  });
});
