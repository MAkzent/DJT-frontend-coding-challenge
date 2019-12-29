# QnA

### Planning

> What do you think are the greatest areas of risk in completing the project?

- Lack of VueJS/NuxtJS experience
- Lack of GitHub API experience

> What changes/additions would you make to the design?

- Use Zeplin to communicate the design to developer instead of what's provided in the repo.
- URL at the top right is very hard to notice. Probably make it more like a page title
- Add input color for the first page (only placeholder color is provided)

> List a two or three features that you would consider implementing in the future that would add significant value to the project.

- Issue page
- Click label to filter by them
- Search suggestion

---

### Looking Back (1)

> Describe the major design/build decisions and why you made them.

- Always render the loading screen first then make a call to our own API, which will fetch every issues from GitHub API and return them back to the client. The reason are:
  - We want to see every issues on the "All Issues" page, some repository has 3000+ issues, so pagination is a must.
  - I decided to use pagination instead of infinite scrolling so I could let a user share their current page via URL accurately.
  - We'll need every issues to calculate page number for each filter correctly.
  - Because we can only fetch 100 items max from GitHub for each request, we have to make multiple requests to GitHub in order to get everything we want.
  - GitHub API has a rate limit of 60 reqs/hour. We can increase that to 5000 reqs/hour by authenticating our request.
  - In order for the authentication token not to be leaked to a user, we have to make a request in the server.
  - This will also improve our time to first paint as well.
  - So the pagination and loading screen is actually crucial for the app IMO, not something that should be just a bonus. Without them, the app will feel very broken on the large repository.

> How long did the assignment take (in hours)? Please break down your answer into buckets (e.g. "Learning Framework", "Coding", "Debugging").

- ~12 hours.
  - Learning the NuxtJS / VueJS / GitHub API + Planning ~ 6 hours
  - Coding + Debugging ~ 6 hours

> ## If you could go back and give yourself advice at the beginning of the project, what would it be?

- Warn myself about GitHub API and just use `@octokit/rest`. I spent too much time there. I even tried making the requests in parallel, just to face the "abusing the rate limit" issue, not that I hit the rate limit. Then I tried to do it concurrently, then reduce the concurrent, so on.
- Don't try composite API in this project.

> ## Did you learn anything new?

- A lot! At first I only barely used VueJS before. I don't even know what SFC is, just know a bit how the data flow. But now, I'm pretty confident in take on any VueJS / NuxtJS project now.

> ## Do you feel that this assignment allowed you to showcase your abilities effectively?

- Yes. This is a very solid project covering the entire flow from user interaction to communicating with the api.
- But
  - 4 hours that's stated in the README.md seems to be too low IMO. I still want to do more stuff; e.g. writing more test especially E2E, setting CI, deploy it. But I'm afraid I'm spending too much time already.
  - I don't see how Vuex could be useful in this project scope. So if we have to demonstrate that, this project wouldn't cover it well. I thought maybe we can use it to cache the data so when we browse back and forward, we won't have to load the issues again. But then we will need to think about invalidating the cache. But we don't have time for that (the 4 hours in the readme) so I didn't do it since it's not crucial for a app to work.

> ## Are there any significant web development-related skills that you possess that were not demonstrated in this exercise? If so, what are they?

- The thing this exercise doesn't cover:
  - How we would architecting for a large project
  - How we handle data mutation, optimistic update
- The thing that could apply to this exercise and I wish I could have more time to do:
  - E2E testing
  - More unit testing
  - CI/CD
  - Caching
  - i18n? (based on browser language)

### Looking Back (continue)

There're some misunderstanding so I talked with Michael and we came into a conclusion that I'm going to update the code accordingly.

> Describe the major design/build decisions and why you made them.

- Store data for each page in the store
  - This will improve the UX which a user won't have to load the data again for the same page while navigating.
  - This comes with the tradeoff, the data won't always be new, so we'll need a way to check if the data is staled or not and tell a user to refresh the page.
- Show PRs on "All Issues", "Open Issues", and "Closed Issues" page.
  - To solve the issue of loading for too long on a huge repo, we decided to use the data as the GitHub API provide so that we can do the pagination correctly.
  - To improve the loading time, the data will be fetched per-page.

> How long did the assignment take (in hours)? Please break down your answer into buckets (e.g. "Learning Framework", "Coding", "Debugging").

- +4 hours.
  - Learning GitHub API / Vuex + Planning ~ 2 hours
  - Coding + Debugging ~ 2 hours

> ## If you could go back and give yourself advice at the beginning of the project, what would it be?

- Talk with Michael more so we can avoid this requirement misunderstanding.

> ## Did you learn anything new?

- A lot about Vuex.
- `@octokit/rest.js` generate type definition in an interesting way.

> ## Do you feel that this assignment allowed you to showcase your abilities effectively?

- Yes!

> ## Are there any significant web development-related skills that you possess that were not demonstrated in this exercise? If so, what are they?

- The thing this exercise doesn't cover:
  - How we would architecting for a large project
  - How we handle data mutation, optimistic update
- The thing that could apply to this exercise and I wish I could have more time to do:
  - CI/CD
  - Persist data in browser DB (local storage / IndexedDB / SW)
  - Invalidate session cache (show nagger that the data has been updated, please refresh the page)
  - i18n? (based on browser language)
