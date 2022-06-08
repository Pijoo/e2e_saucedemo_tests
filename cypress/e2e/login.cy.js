describe("Login tests", () => {
    before(() => {
        cy.visit("https://www.saucedemo.com");
    });

    it("Check Login form validation", () => {
        cy.fixture("user").then((usersData) => {
            cy.fillLoginForm(usersData.fakeUserName, usersData.fakePassword);
            cy.checkValidation("Epic sadface: Username and password do not match any user in this service");
        })
    })

    it("User is able to Log in to the app", () => {
        cy.fixture("user").then((usersData) => {
            cy.fillLoginForm(usersData.userName, usersData.password);
            cy.url().should("include", "/inventory");
        })
    })

    it("Check If list of product is displayed and have length of 6 items", () => {
        cy.get(".inventory_item").should("have.length", 6);
    })

    it("Add random item from the product list", () => {
        cy.getByDataTest("add-to-cart-sauce-labs-backpack").eq(0).click();
        cy.getByDataTest("remove-sauce-labs-backpack").should("be.visible");
        cy.get(".inventory_item_price").eq(0).invoke("text").as("itemPrice");
    })
    
    it("Check if basket icon is displaying “1” icon", () => {
        cy.get(".shopping_cart_badge").should("contain", "1");
    })

    it("Go to basket and check if number of items and price is correct", () => {
        cy.get("#shopping_cart_container").click();
        cy.url().should("include", "/cart");
        cy.get(".cart_item").should("have.length", 1);
        cy.get("@itemPrice").then((price) => {
            cy.get(".inventory_item_price").should("contain", price);
        })
    })

    it("user is able to checkout", () => {
        cy.getByDataTest("checkout").click();
        cy.url().should("include", "/checkout-step-one");
    })

    it("Check checkout form validation", () => {
        cy.getByDataTest("continue").click();
        cy.checkValidation("Error: First Name is required");
    })

    it("Enter correct data and click continue into the form", () => {
        cy.getByDataTest("firstName").type("Bart");
        cy.getByDataTest("lastName").type("Yyy");
        cy.getByDataTest("postalCode").type("00000");
        cy.getByDataTest("continue").click();
        cy.url().should("include", "/checkout-step-two");
    })

    it("Check if Shipping information is 'FREE PONY EXPRESS DELIVERY!'", () => {
        cy.get(".summary_value_label").contains("FREE PONY EXPRESS DELIVERY!").should("be.visible");
    })

    it("Check if confirmation message is displayed: 'THANK YOU FOR YOUR ORDER'", () => {
        cy.getByDataTest("finish").click();
        cy.get(".complete-header").contains("THANK YOU FOR YOUR ORDER").should("be.visible");
    })
});