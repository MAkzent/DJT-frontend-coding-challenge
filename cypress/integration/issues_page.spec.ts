it('Search issues by repo url page', () => {
  cy.visit('http://localhost:3000')
  cy.findByPlaceholderText('Paste a link to a GitHub repo!').type(
    'https://github.com/styled-components/vue-styled-components\n'
  )
  cy.findAllByTestId('issue-card')
})

it('Open via url directly', () => {
  cy.visit(
    'http://localhost:3000/issues?owner=styled-components&repo=vue-styled-components&menu=closed&page=2'
  )
  cy.findAllByText('https://github.com/styled-components/vue-styled-components')
  cy.findByTestId('active-menu').then(($div) => {
    expect($div).to.have.text('Closed Issues')
  })
  cy.findByTestId('active-page').then(($div) => {
    expect($div).to.have.text('2')
  })
})

it('Show error page', () => {
  cy.visit('http://localhost:3000')
  cy.findByPlaceholderText('Paste a link to a GitHub repo!').type(
    'https://github.com/lukyth/im-pretty-sure-this-repo-doesnt-exist\n'
  )
  cy.findByText(
    'Unable to fetch issues. Please check if the repository name is correct, or try to refresh the page.'
  )
})

it('Show empty page', () => {
  cy.visit('http://localhost:3000')
  cy.findByPlaceholderText('Paste a link to a GitHub repo!').type(
    'https://github.com/lukyth/eslint-config-tslint\n'
  )
  cy.findByText(
    `There's no "all issues" in https://github.com/lukyth/eslint-config-tslint.`
  )
})

it('Go back to search page and go to the same repo again', () => {
  cy.visit('http://localhost:3000')
  cy.findByPlaceholderText('Paste a link to a GitHub repo!').type(
    'https://github.com/styled-components/vue-styled-components\n'
  )
  cy.findAllByTestId('issue-card')
  cy.findByText('GitHub Issue Viewer').click()
  cy.findByPlaceholderText('Paste a link to a GitHub repo!').type(
    'https://github.com/styled-components/vue-styled-components\n'
  )
  cy.findAllByTestId('issue-card')
})
