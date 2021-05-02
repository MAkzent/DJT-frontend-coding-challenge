# QnA

### Planning

> What do you think are the greatest areas of risk in completing the project?

- I have three main areas of concern with this project. First, it will be my first time using Nuxt so getting used to all of the new functionality. Second, I've never used the GitHub issues API, so making sure I know what data I'm getting. Finally, I am pretty design focused with my frontends and falling into the trap of obsessing over every little detail. Reminding myself that this is MVP and doesn't need to be perfect helps!

> What changes/additions would you make to the design?

- There are some small things related to accessability. For example, in the nav bar, the url is not a very high contrasting color so it may be difficult for some people to read. Similarly, the icons in the issues cards for pull requests and closed issues are pretty small and could also be hard for some to see.

> List a two or three features that you would consider implementing in the future that would add significant value to the project.

- I think it would be nice to have the issues cards be clickable and display a modal card with the full body of the issue. Since we are potentially having the text overflow hidden, there could be some issues that you can't see the full description. Also, in the card, adding a link to the original issue would be interesting.

---

### Looking Back

> Describe the major design/build decisions and why you made them.

- A lot of my decisions were made through learning Nuxtjs. I decided to make a layout for the issues page rather than just rendering different components into the default layout. This helped compartmentalize a bit more.
- The biggest decision was going changing the way the API call was happening. Originally, I planned to have the search bar feed it's value to the Vuex Store and run the API call from there. I then changed course to make the Search bar create a dynamic URL that the dynamic page could parse and make the API call at mount. This was something I didn't know was possible until I researched a bit more about Nuxt! Very cool!

- For styling, I didn't do anything too special. I could have used flex for the columns of the issue cards, but I really like using grid sometimes.

> How long did the assignment take (in hours)? Please break down your answer into buckets (e.g. "Learning Framework", "Coding", "Debugging").

- Learning Framework - (2+ hours) I spent about an hour watching videos and about another hour reading about nuxt transitions and pages/layouts before I started the project. During the coding I referenced the documentation quite a bit.

- Template Coding - (40 - 50 mins) the templates for the components and pages/layouts came together quickly. I spent around 40-50 mins on this.
- Logic Coding - (40 - 50 mins) similar to templates the logic of moving around the state and parsing the url didn't take terribly long. 40-50 minutes.
- Style Coding - (1 hour 30-50 mins) styling! Just like in my pre-QnA, I ended up spending a lot more time getting things to look right. Setting up the card styling and making sure it looked okay on phone.

> If you could go back and give yourself advice at the beginning of the project, what would it be?

- I think I would have told myself about the asyncData function and how pages can utilize their url to make an API call. With the time saved with not going down the different path first, I would have had more time to implement more transitions for page changes. Would also like to see how to make skeleton loads!

> Did you learn anything new?

- A lot! It was really cool to see all of the things nuxt helps you do! Being able to easily use all of the vue benefits and also easily get routing and that asyncData function was helpful!

> Do you feel that this assignment allowed you to showcase your abilities effectively?

- Yes, it had just about everything, handling state, styling, API implementation, routing, and transitions.

> Are there any significant web development-related skills that you possess that were not demonstrated in this exercise? If so, what are they?

- I don't think so. The assignment was flexible enough that if there was something that I wanted to show off, I had the chance. Implementing parsing url for params and queries for example. The project could have worked without it, but it was something I wanted to experiment with so I did!
