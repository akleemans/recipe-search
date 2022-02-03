/// <reference types="cypress" />

describe('Recipe search', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('displays title and search bar', () => {
    cy.get('h1').should('have.text', 'rezept-ideen.ch');
    cy.get('input').should('exist');
    cy.get('button').contains('Suchen').should('exist');
  });

  it('can search for recipes', () => {
    cy.get('input').type('apfel,speck');

    cy.get('button').contains('Suchen').click();

    cy.get('app-recipe').should('have.length', 50);

    cy.get('app-recipe').should('contain.text', 'Panzerotti mit Ricotta')
    cy.get('app-recipe').should('contain.text', 'Cannelloni mit Pilz')
    cy.get('app-recipe').should('contain.text', 'Oster-Pies')
  });
});
