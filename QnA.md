# QnA

### Planning

> What do you think are the greatest areas of risk in completing the project?
- Writing an API call that handles fetching of all issues, when pagination is limited to 100 issues (consider either relying on the pagination and API when changing state, or creating an async function that calls the API multiple times until the full list of issues is fetched)
- Handling loading times and error states for the API call
- Handling different lengths and potential overflow in terms of content (title, number of tags/labels, body content)

> What changes/additions would you make to the design?
- Hover states and entrance/exit animations for the base design
- Consider incorporating borders for a bit more contrast
- Consder making the pull request icon more obvious, and creating a open and closed issue icon for consistency
- Reconsider how each card should grow/shrink based on content

> List a two or three features that you would consider implementing in the future that would add significant value to the project.
- A page that displays that detail of each issue
- An ability to search or filter based on tag 
- An ability for the user (ideally the repo owner) to organize and categorize the issues beyond what is available on Github

---

### Looking Back

> Describe the major design/build decisions and why you made them.
- I decided to use React as a framework as I've really grown to love the cleanliness of functional components and React hooks. While I didn't feel like the application was complex enough to justify more complex use of some of those features (I have a tendency to refactor things out into custom hooks quite often to reduce complexity in components and share logic), I do love modern React. I know Vue is updating to use more of a functional approach as well, but I have mainly worked with single file components to date. 
- I ended up using the API directly to do filtering, because I felt that the user experience was inconsistent for the user if we just worked with the initial X number of issues, filtered based on that, and fetched later. It meant that some tabs may not have a fully populated number of issues upon the initial load, and I wanted users to see all of the relevant issues if they were available. 
- I opted against using a function to continuously call the API to try to pre-fetch all of the data because I thought it would make the application a bit more complex than necessary. It would also still be hard to ensure consistency upon the initial load, because what would shown to the user would still be dependent on when those types of issues were loaded in the order that Github provides. 
- I decided to use a constant size for all of the cards in the application. While I don't love using constant dimensions in most applications, I believed that this was what the spec was looking for and it worked well in a responsive context. 

> How long did the assignment take (in hours)? Please break down your answer into buckets (e.g. "Learning Framework", "Coding", "Debugging").
- Setup and Preparation: 30 minutes doing QnA, looking through specs and reading up on Github API
- First MVP: 30 minutes - 1 hr for repo and create-react-app setup, then fetching and displaying issues
- Basic styling to match specs: 1 hour
- Going in circles on how to best handle cutting off text - 30 minutes
- Adding functionality: 1.5 hours for adding filter functionality, infinite scrolling, then refactoring the filter functionality, plus other little things like the close button, the icons, etc.
- Adding responsive CSS - 30 minutes
- Little details: 30 minutes for error states, cleaning up code, Readme, etc. 

> If you could go back and give yourself advice at the beginning of the project, what would it be?
- Don't worry too much about the text cut off, and just do what you thought in the beginning and implement filtering using the API. 

> Did you learn anything new?
- Inline SVG – I've never used this specific library for implementing inline SVGs. I wanted to be able to color them using the scss variables, and so inline SVG made the most sense. It was pretty straightforward. 
- Different approaches for cutting off text. I'm still not happy with how it's being implemented now, but I still don't think there is a great solution for dealing with multiple-line, variable-height text cutoff. 

> Do you feel that this assignment allowed you to showcase your abilities effectively?
- I think this is a good example of how I might code up a quick MVP. I'm generally happy with the code and it's similar to how I would comparatively simple application. I do tend to structure my styling similarly, as well as use functional components almost all the time. However, there would probably be a lot separation with a lot more folders and shared components for a more complex application that needed it. 
- I am also generally more opinionated about design, but I tried to follow the spec as closely as possible in this context. I do think there are quite a number of tweaks that could have made the experience more polished and usable, but I felt like it was more important to follow the spec to start.
- I didn't feel like there was much to test here, so we're missing that aspect as well. 

> Are there any significant web development-related skills that you possess that were not demonstrated in this exercise? If so, what are they?
- Definitely. My web-development expertise goes well beyond an application of this complexity. 
- From a React point of view, I've built significantly larger applications, mainly in Next.js, React and React Native. What I didn't get to do as much here was managing much more state on the client side, more complex animations and interactions as well as more complex client-side calculations and functions. 
- I've also done a significant amount of backend and DB work in Node.js and Ruby on Rails. Of course, this is frontend coding challenge, and I didn't expect to demonstrate that, but in short, I'm comfortable with designing relatively complex schemas and large, well-tested APIs. (Plus, blockchain!)
- I'm also really looking forward to working on design a lot more. I do believe my design sense is stronger than the average developer, and I am quite proud to call myself a designer as well as a developer. 