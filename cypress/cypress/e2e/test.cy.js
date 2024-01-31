
describe('Visit url', () => {
  it('passes', () => {
    cy.visit(Cypress.env("baseUrl"))
  })
})