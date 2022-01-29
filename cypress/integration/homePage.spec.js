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
    
    it('to auth page', () => {
       cy.get('#toProfile').contains('Личный кабинет').click();
       cy.contains('Вход');
    });

    it('record auth data', () => {
        cy.get('input').first().as('email');
        cy.get('input').last().as('password');
    
        cy.get('@email').type('vino@yandex.ru');
        cy.get('@password').type('12101');
    
        cy.get('@email').should('have.value', 'vino@yandex.ru');
        cy.get('@password').should('have.value', '12101');
    });
    
    it('authorization', () => {
        cy.get('button').contains('Войти').click();
        cy.contains('Соберите бургер');
    });
  }); 