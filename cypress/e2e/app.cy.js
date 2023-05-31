describe('Global', () => {
  it('should load the page successfully', () => {
    cy.visit('http://localhost:3000/');
    cy.get('h2').contains('Star War Z');
    cy.get('#search-field').should('exist')
  });

  it('Search for non existing movie', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#search-field').type('doesnotexist').type('{enter}');
    cy.contains('Your search did not match any documents.')
  });

  it('Search for a specific movie', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#search-field').type('A New Hope').type('{enter}');
    cy.contains('Characters');
    cy.contains('Luke Skywalker');
  });

  it('Check multiple results', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#search-field').type('of').type('{enter}');
    cy.contains('Films');
    cy.contains('Characters').should('not.exist');
    cy.get('[data-cy="Return of the Jedi"]').click();
    cy.contains('Characters');
    cy.contains('Films').should('not.exist')
  });

  it('Check pagination', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#search-field').type('A New Hope').type('{enter}');
    cy.contains('Luke Skywalker');
    cy.get('[data-cy="page-button-2"]').click()
    cy.contains('Wilhuff Tarkin');
    cy.get('[data-cy="page-button-1"]').click()
    cy.contains('Luke Skywalker');
    cy.contains('Wilhuff Tarkin').should('not.exist')
  });
});