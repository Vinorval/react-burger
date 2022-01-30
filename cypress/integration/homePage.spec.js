import fixture from '../fixtures/example.json';
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
    
    it('close modal', () => {
        cy.get('#closeIcon').click();
        cy.get('#root').not('section');
    });
    
    it('to auth page', () => {
       cy.get('button').contains('Оформить заказ').click();
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

    it('DnD testing', () => {
        cy.get('div').contains('Краторная булка N-200i').as('bun');
        cy.get('div').contains('Соус Spicy-X').as('ingredient');
        cy.get('div').contains('Мини-салат Экзо-Плантаго').as('salat');
        cy.get('div').get('#burger').as('contructor_container');
    
        cy.get('@bun').trigger('dragstart');
        cy.get('@contructor_container').trigger('drop');
    
        cy.get('@ingredient').trigger('dragstart');
        cy.get('@contructor_container').trigger('drop');

        cy.get('@salat').trigger('dragstart');
        cy.get('@contructor_container').trigger('drop');
    
        cy.get('@contructor_container').contains('Соус Spicy-X');
        cy.get('@contructor_container').contains('Мини-салат Экзо-Плантаго');
      });

    it('check order', () => {
        cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', { fixture: 'example.json' }).as('order');
        cy.get('button').contains('Оформить заказ').click();
        cy.wait('@order').then(res => expect(res.response.body.order.number).equal(fixture.order.number)); // eslint-disable-line
        cy.get('section').contains(`${fixture.order.number}`);
    });

    it('close order modal', () => {
        cy.get('#closeIcon').click();
        cy.get('#root').not('section');
    });
  }); 