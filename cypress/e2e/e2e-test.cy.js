import { faker } from "@faker-js/faker";

const firstname = faker.person.firstName();
const lastname = faker.person.lastName();
const username = faker.internet.userName();
const email = faker.internet.email();

const password = "Parola123!";
const baseUrl = "https://automationteststore.com";

describe("Register User", () => {

    it("Register", () => {
        cy.visit(baseUrl);
        cy.get("#customer_menu_top a").click();
        cy.get('button[title="Continue"]').click();
        cy.get("#AccountFrm_firstname").type(firstname);
        cy.get("#AccountFrm_lastname").type(lastname);
        cy.get("#AccountFrm_email").type(email);
        cy.get("#AccountFrm_address_1").type("Fortului 17F");
        cy.get("#AccountFrm_city").type("Ilfov");
        cy.get("#AccountFrm_country_id").select("Romania");
        cy.get("#AccountFrm_zone_id").select("Ilfov");
        cy.get("#AccountFrm_postcode").type("046771");
        cy.get("#AccountFrm_loginname").type(username);
        cy.get("#AccountFrm_password").type(password);
        cy.get("#AccountFrm_confirm").type(password);
        cy.get("#AccountFrm_newsletter0").click();
        cy.get("#AccountFrm_agree").click();
        cy.get(".btn.btn-orange.pull-right").click();
        cy.get(".maintext").contains("Your Account Has Been Created!");
    })

    it("Change the username", () => {
        cy.visit(baseUrl);
        cy.get("#customer_menu_top").click();
        cy.get("#loginFrm_loginname").type(username);
        cy.get("#loginFrm_password").type(password);
        cy.get("#loginFrm button").click();
        cy.get("div.col-md-9 li i.fa.fa-edit").click();
        cy.get("#AccountFrm_firstname").clear().type("Andrei");
        cy.get("button.btn.btn-orange.pull-right.lock-on-click").click();
    cy.get(".alert.alert-success").contains("Success: Your account has been successfully updated.");
    })

    it("Log in + Log Out", () => {
        cy.visit(baseUrl);
        cy.get("#customer_menu_top").click();
        cy.get("#loginFrm_loginname").type(username);
        cy.get("#loginFrm_password").type(password);
        cy.get("#loginFrm button").click();
        cy.get("div.col-md-9 li i.fa.fa-unlock").click();
        cy.get(".mb40 p").contains("You have been logged off your account. It is now safe to leave the computer.");
    })

    it("Place Order", () => {
        cy.visit(baseUrl);
        cy.get("#customer_menu_top").click();
        cy.get("#loginFrm_loginname").type(username);
        cy.get("#loginFrm_password").type(password);
        cy.get("#loginFrm button").click();
        cy.get(".logo").click();
        cy.get('[title="Add to Cart"]').first().click();
        cy.get("ul.nav.topcart.pull-left").click();
        cy.get("#cart_checkout1").click();
        cy.get("#checkout_btn").click();
        cy.get(".maintext").contains("Your Order Has Been Processed!");
    })
})