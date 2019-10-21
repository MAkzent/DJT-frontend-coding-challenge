# QnA

### Planning

> What do you think are the greatest areas of risk in completing the project?

The questions - 'who is this for' and 'what utility does this give' - are open-ended (albeit intentionally so) which leaves a large problem / solution surface area. A more specific scope would allow us to make better-informed assumptions and decisions toward future developments. Consequently, the challenges inherent to this project lie in making poor abstractions at the start that may cause, potentially considerable, friction against future changes. Another risk is designing a rigid component structure that tightly couples business logic to UI-specific elements that in turn leads to unnecessary refactors down the line. Lastly, another cumbersome factor is not having a component libary to facilitate potential changes in theming. The cost therein, is having a inconsistent UI that may lead to drift overtime.

> What changes/additions would you make to the design?

- Turn URL on results page into a link with readable text (URLs work! but present a bit of an eye sore).
- Submit button on search page to make mobile users' lives easier.
- Make Issue titles clickable and clamped into ellipsises with Issue descriptions scrollable. The assumption here being a description would tell a user more about an issue than a title that's more likely to be terse.
- Change the color contrast for the combination of #E91E63 and #FFFFFF (currently 4.34:1) to over 4.5:1 to aid readability.
- Change Issue Icons to white for better contrast against the issue header's San Marino (#3F51B5) background.
- Change Close Icon on Results page to text + icon combo - e.g. 'Return to Search <SearchIcon>` to make it clearer where the user will be directed to if clicked.

> List a two or three features that you would consider implementing in the future that would add significant value to the project.

- Live Search through Github Search API to enable dropdown options as user searches (keeping them on our site instead of navigating away to GitHub proper)
- Issue lifecycle/timeline (most likely linked to a different view) vis-a-vis Github Issues' Events API. This would present a dashboard-like chronological view of an issue's event and milestone history. The hope would be to improve on GitHub's current design which interweaves issue events with comments resulting in information clutter.

### Looking Back

> ## Describe the major design/build decisions and why you made them.

> ## How long did the assignment take (in hours)? Please break down your answer into buckets (e.g. "Learning Framework", "Coding", "Debugging").

> ## If you could go back and give yourself advice at the beginning of the project, what would it be?

> ## Did you learn anything new?

> ## Do you feel that this assignment allowed you to showcase your abilities effectively?

> ## Are there any significant web development-related skills that you possess that were not demonstrated in this exercise? If so, what are they?
