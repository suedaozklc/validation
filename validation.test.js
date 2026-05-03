const { createAccount, isValidEmail, isValidPassword } = require('./validation');

describe("Create Account Tests", () => {

    test("Valid input should pass", () => {
        expect(createAccount("Sueda","Ozkilic","test@gmail.com","2000-01-01","Abc123","Abc123")).toBe(true);
    });

    test("Empty fields should fail", () => {
        expect(createAccount("","","","","","")).toBe(false);
    });

    test("Invalid email should fail", () => {
        expect(isValidEmail("abc.com")).toBe(false);
    });

    test("Valid email should pass", () => {
        expect(isValidEmail("test@gmail.com")).toBe(true);
    });

    test("Password too short", () => {
        expect(isValidPassword("123")).toBe(false);
    });

    test("Password valid", () => {
        expect(isValidPassword("Abc123")).toBe(true);
    });

    test("Password mismatch", () => {
        expect(createAccount("Sueda","Ozkilic","test@gmail.com","2000-01-01","Abc123","123abc")).toBe(false);
    });

    test("Future DOB should fail", () => {
        expect(createAccount("Sueda","Ozkilic","test@gmail.com","2999-01-01","Abc123","Abc123")).toBe(false);
    });

    test("Name with numbers should fail", () => {
        expect(createAccount("Sueda1","Ozkilic","test@gmail.com","2000-01-01","Abc123","Abc123")).toBe(false);
    });

    test("SQL injection should fail", () => {
        expect(createAccount("' OR 1=1","Ozkilic","test@gmail.com","2000-01-01","Abc123","Abc123")).toBe(false);
    });

    test("XSS attack should fail", () => {
        expect(createAccount("<script>","Ozkilic","test@gmail.com","2000-01-01","Abc123","Abc123")).toBe(false);
    });

    test("Email uppercase should pass", () => {
        expect(createAccount("Sueda","Ozkilic","TEST@GMAIL.COM","2000-01-01","Abc123","Abc123")).toBe(true);
    });

    test("Password without number should fail", () => {
        expect(isValidPassword("abcdef")).toBe(false);
    });

    test("Password without letter should fail", () => {
        expect(isValidPassword("123456")).toBe(false);
    });

    test("Long name should fail", () => {
        const longName = "a".repeat(300);
        expect(createAccount(longName,"Ozkilic","test@gmail.com","2000-01-01","Abc123","Abc123")).toBe(false);
    });

});