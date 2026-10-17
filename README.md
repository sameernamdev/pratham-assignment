# LearnSpace - Training Course Dashboard


## Features
- Course list with title, category and progress.
- Live search by title.
- Category filter; both filters work together.
- Progress percentage and progress bar.
- Course details screen.
- Mark course as completed.
- Empty state when there are no matches.
- Responsive desktop and mobile design.

## Run it
1. Install Node.js.
2. Open this folder in VS Code.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the localhost URL shown in the terminal.

Run `npm run build` to check the production build.

## Main files
- `src/App.jsx`: state, filtering, completion logic, and screen selection.
- `src/data/courses.js`: sample course data.
- `src/components/CourseCard.jsx`: one course card.
- `src/components/CourseDetails.jsx`: course details.
- `src/components/ProgressBar.jsx`: reusable progress bar.
- `src/styles.css`: design and responsive layout.

## Simple logic
- `useState` stores courses, search text, selected category and selected course ID.
- `filter()` searches by title. A second `filter()` applies the category.
- `map()` updates the selected course's progress to 100.
- `find()` gets the selected course from the latest course array.
- Conditional rendering shows the dashboard, details, or empty message.

The project uses sample data and has no backend. Changes reset when the page reloads.