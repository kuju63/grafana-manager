import { Manager } from "../src/Manager";

describe("Manager Test", () => {
    it("initialize", () => {
        const manager = new Manager("sample");
        expect(manager._token).toBe("sample");
        expect(manager.apiInstance).toBeDefined();
    });
});
