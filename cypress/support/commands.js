import { loginPage } from "./selectors/loginPage";

Cypress.Commands.add("getByDataTest", (selector, ...args) => {
    return cy.get(`[data-test = ${selector}]`, ...args);
});

Cypress.Commands.add("fillLoginForm", (email, password) => {
    cy.getByDataTest(loginPage.loginInput).clear().type(email);
    cy.getByDataTest(loginPage.passwordInput).clear().type(password);
    cy.getByDataTest(loginPage.loginButton).click();
});

Cypress.Commands.add("checkValidation", (validation) => {
    cy.getByDataTest(loginPage.errorMessage).should("contain", validation)
})