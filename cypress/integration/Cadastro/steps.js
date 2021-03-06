/// <reference types="cypress"/>

let Chance = require('chance');
let chance = new Chance();


When(/^informar meus dados$/, () => {
	// type
    cy.get('input[placeholder="First Name"]').type(chance.first());
    cy.get('input[placeholder="Last Name"]').type(chance.last());
    cy.get('input[ng-model="EmailAdress"]').type(chance.email());
    cy.get('input[ng-model="Phone"]').type(chance.phone({formatted: false}));
   
   // check -> radio e checkbox
    cy.get('input[value="Male"]').check();
    cy.get('input[type="checkbox"]').check('Cricket');
    cy.get('input[type="checkbox"]').check('Hockey');

    // select 
    cy.get('select#Skills').select('Javascript');
    cy.get('select#countries').select('Canada');
    cy.get('select#country').select('United States of America', {force: true});
    cy.get('select#yearbox').select('1996');
    cy.get('select[placeholder="Month"]').select('August');
    cy.get('select#daybox').select('8');

    cy.get('input#firstpassword').type('Teste@123');
    cy.get('input#secondpassword').type('Teste@123');
    
    // input filhe
    cy.get('input#imagesrc').attachFile('sol.jpg')
});

When(/^salvar$/, () => {
	cy.get('button#submitbtn').click();
});

Then(/^devo ser cadastrado com sucesso$/, () => {
	cy.wait('@postNewtable').then((resNewtable) => {
        expect(resNewtable.status).to.eq(200)
    });

    cy.wait('@postUsertable').then((resUsertable) => {
        expect(resUsertable.status).to.eq(200)
    })

    cy.wait('@getNewtable').then((resNewtable) => {
        expect(resNewtable.status).to.eq(200)
    })
    
    //validar se foi direcionado para pagina correta
    cy.url().should('contain', 'WebTable')
});
