describe('service is available', function() {
    before(() => {
        cy.visit('http://localhost:3000');
    });

    it('open ingredient modal', () => {
        cy.get('div').contains('Краторная булка N-200i').click();
        cy.get('section').contains('Детали ингредиента');
    });
    
    it('check ingredient details', () => {
        cy.get('p').contains('420');
        cy.get('p').contains('80');
        cy.get('p').contains('24');
        cy.get('p').contains('53');
    });
    
    it('close ingredient modal', () => {
        cy.get('#closeIcon').click();
        cy.get('#root').not('section');
    });

    //it('check cabinet button loaded', () => {
    //    cy.contains('Личный кабинет');
    //});
    
    //it('turn to auth page', () => {
    //   cy.get('NavLink').contains('Личный кабинет').click();
    //    cy.contains('Вход');
    //});
  }); 