import { streakCounter } from "../src";
import { JSDOM } from "jsdom";
import { formattedDate } from "../src/utils";
describe("Streak counter", () => {
  let mockLocalStorage: Storage;

  beforeEach(() => {
    const mockJSDom = new JSDOM("", { url: "https://localhost" });
    mockLocalStorage = mockJSDom.window.localStorage;
  });

  afterEach(() => {
    mockLocalStorage.clear();
  });

  it("it should return current streak object with currentCounter, startDate, lastLoginDate", () => {
    const date = new Date();
    const streak = streakCounter(mockLocalStorage, date);

    expect(streak.hasOwnProperty("currentCount")).toBe(true);
    expect(streak.hasOwnProperty("startDate")).toBe(true);
    expect(streak.hasOwnProperty("lastLoginDate")).toBe(true);
  });

  it("should return a strak starting at 1 and keep track of lastLoginDate", () => {
    const date = new Date();
    const streak = streakCounter(mockLocalStorage, date);

    const dateFormatted = formattedDate(date);

    expect(streak.currentCount).toBe(1);
    expect(streak.lastLoginDate).toBe(dateFormatted);
  });

  it("should store the streak to localStorage", () => {
    const date = new Date();
    const key = "streak";

    streakCounter(mockLocalStorage, date);

    const streakString = mockLocalStorage.getItem(key);

    expect(streakString).not.toBeNull();
  });

  it("should return the streak from localStorage", () => {
    const date = new Date();
    const streak = streakCounter(mockLocalStorage, date);

    expect(streak.startDate).toBe("8/7/2022");
  });
});
