# QnA

### Planning

> What do you think are the greatest areas of risk in completing the project?

- Haven't done any vue in a while so pretty rusty.
- Safely parsing the data from the API into useable models. Api changes and weird type conversion can easily break things if not handled gracefully.

> What changes/additions would you make to the design?

- As it is generally easier and more recommended to go from mobile design to desktop a mobile first approach to the mocks would be useful.
- The title of each issue has a dynamic height while the issue card itself is a static height. This can lead to issues with sizing of the text in the body when it
has to be clamped.
- Clickable search buttons are usually more UX friendly in most cases than only pressing enter.

> List a two or three features that you would consider implementing in the future that would add significant value to the project.

- More detail on either the cards or a new page with a broader overview of the project
- Being search available repos by organization
- Validation of input url on input
- More filters / search e.g by user, date, etc

---

### Looking Back

> Describe the major design/build decisions and why you made them.

- Moving the API logic outside of the components to improve reusability and make changes easy as well as controlling flow of data end errors into the UI.
- Trying to minimize state, keeping as much in parent components and using functional components to help reduce complexity
- The styling is grouped by component into the files, with more general rules lifted into higher components for speed. Probably could be a lot cleaner.
- Decided to make a new query to the API for each filter in order not have weird interactions with pagination. This could definitely be handled more efficiently though.

> How long did the assignment take (in hours)? Please break down your answer into buckets (e.g. "Learning Framework", "Coding", "Debugging").

- Reviewing Vue and getting to grips with the cli, webpack config ~ 1hrs
- MVP (no transitions, console.log error handling, no input validation) ~ 3.5hrs
- Tests ~ 1hr
- Having fun with css, transitions, simple error handling, input validation, infinite scrolling etc ~ 3hr
- Overall ~ 8.5hrs

> If you could go back and give yourself advice at the beginning of the project, what would it be?

- As usual write tests earlier even if it means getting to MVP slower. (bit rushed this time)

> Did you learn anything new?

- That transitions and routing in view is easier and smoother than React.
- Other than that not so much but had a lot of fun playing with it.

> Do you feel that this assignment allowed you to showcase your abilities effectively?

- Definitely allowed me to showcase frontend skills.

> Are there any significant web development-related skills that you possess that were not demonstrated in this exercise? If so, what are they?

- My experience and skill with backend development, servers, databases and cloud platforms. Familiarity and fondness of typescript and other typed frontend languages
such as Elm and Reason.