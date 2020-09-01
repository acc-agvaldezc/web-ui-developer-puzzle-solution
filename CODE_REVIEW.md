# Alan Valdez's Code Review

## API Level (lib/api/books)
* Inside the `books.service.ts` file, when the API response from Google gets retrieved, we have a manual parse of the response to send an array of results to the app, but if this app would extends its functionality and other API calls need to do this pre-processing of the response, we should do a small util method so that it gets used across the app and not change it on different places.

## Book Feature Level (lib/books)
* On the data access section of the code, the code that has to do with all the state management of the app could be divided in different folders so that we can have a better understanding of what are the states that we are affecting and it makes it also a bit easier for the dev team to find files.

* The models file should be divided in  different files names after the models and related models it contains instead of plain `models.ts` becuase that file will get bigger and bigger after the app extends and will be harder to understand and maintain.

* Variable and function naming convention is a bit confusing inside `libs/books/feature/src/lib/book-search/book-search.component.ts`.

* NX Tags should be used to ensure correct dependency on libs.

* There are missing cases of the actions inside the reading list reducer when failing an add or a remove from reading list.
---

# Accessibility

* The submit search button on the search bar doesn't have a descriptive `aria-label` for screen readers so it will be exposed as a simple button to the users.

* The background color and the font color don't have enought contrast ratio so it could be difficult for some users to read the page's content.

* Book images do not a have an `alt` text.

* Mobile experience is not the optimal for the users because of spacing issues.

* Open and close reading list buttons don't have a descriptive aria label.
---