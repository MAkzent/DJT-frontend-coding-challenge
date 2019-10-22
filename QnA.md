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

As a general comment, nuxt comes with great separations of concerns which boosted my velocity and thinking around architectural design. To start, stores and services struck me as fundamental to data retrieval and storage. Although a store in this challenge wasn't strictly necessary, having committed to Universal Mode (SSR), I was at the behest of nuxt's siloing of page state. This made an `issues` store a major convenience (and big reduction in cognitive load) to share state across top level views. Regarding Universal mode, the choice to go with Nuxt's SSR over an SPA wasn't one about tradeoffs but rather a wholesome improvement thanks to Nuxt's approach herein. After initial load and hydration, the app in Universal Mode behaves very much like an SPA - but with the added benefit of more optimal SEO, faster initial loads with prerendering (and less roundtrips to retrieve JS files vis-a-vis a single index.html), and a guarantee of static markup rendering in cases where JS isn't enabled. SPAs are great but shouldn't be the ultimate aim! Coming from React, layouts were a new addition to UI composition for me. If given the chance to refactor, I would use these to further separate the presentational elements of the app (Cards, Inputs, NavLinks - i.e. Filters) from the logic heavy parts (Search, Issues). Furthermore, I would couple media queries with specific layouts relative to device screen sizes to better modularize and aid maintaining the overall UI design responsiveness. As for my component architecture, Search / Issues were a natural fit between data querying and retrieval. With a shared store, I was able to simplify the amount of props passing and keep child components as stateless as possible - keeping the top level parents as 'aware' as possible which can boost code reuse quite a bit as the app grows.

> ## How long did the assignment take (in hours)? Please break down your answer into buckets (e.g. "Learning Framework", "Coding", "Debugging").

Learning Nuxt / Vue - 2 hours
System Design - 2 hours
Implementation - 1 hour
Debugging / Tweaking CSS! - 1 hour

> ## If you could go back and give yourself advice at the beginning of the project, what would it be?

- Design for mobile first! It makes adjusting styles for larger screens more intuitive as you tweak rather than wholesale adjust (which is hard to avoid if going from large -> small).
- Deprioritize smaller parts of the UI Design and stay disciplined in focus towards the core parts of the scaffold (tweak last).
- Decouple Design and Logic as much as possible -> priortize base UI components that can funnel into logical components (and use layouts!)

> ## Did you learn anything new?

- That I was foolish in not learning Vue / Nuxt earlier ;) While I find the file structure and markup syntax odd, Nuxt's scaffolding and convenience features for common frontend considerations (form handling / validation, conditional rendering, component composition - slots!) were a godsend relative to React's ecosystem.
- SSR made me rethink an almost subconscious assumption I have that SPAs are the de facto standard. Universal mode definitely grew my understanding of the limitations of SPAs and why/when you should use them.

> ## Do you feel that this assignment allowed you to showcase your abilities effectively?

- Yes! I thoroughly enjoyed this challenge and will follow up with the additional bonus tasks. Although Vue / Nuxt were new to me, frontend realities remained the same albeit in a different form. I would love to become a Vue expert regardless.

> ## Are there any significant web development-related skills that you possess that were not demonstrated in this exercise? If so, what are they?

- The challenge being relatively simple, there are many design decisions that arise when working on larger apps that were absent here. These are hard to gauge to begin with, but I feel a contract trial would further shed light on my ability contribute to production, mid to large scale apps.
- Data modelling, although again relatively simple here, is another area that I would love to showcase my depth in.
