import { $, $$, browser, ExpectedConditions } from 'protractor';

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

  it('Then: I should be able to remove a book from reading list and undo action', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    const readingListCloseButton = await $('[aria-label="Close Reading List"]');

    let readingListItemElements = await $$('[data-testing="reading-list-item"]');

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

    const removeBookButton = await $('[data-testing="remove-book"]');
    expect(removeBookButton).not.toBeUndefined();
    await removeBookButton.click();
    await browser.sleep(500);

    readingListItemElements = await $$('.reading-list-item');
    expect(readingListItemElements.length).toBeLessThan(initialReadingListItemCount);

    const undoRemoveToReadingListButton = $('[data-testing="undo-remove"]');
    expect(undoRemoveToReadingListButton).not.toBeUndefined();

    await undoRemoveToReadingListButton.click();
    await browser.sleep(500);

    readingListItemElements = await $$('.reading-list-item');
    expect(readingListItemElements.length).toEqual(initialReadingListItemCount);
  });
});
