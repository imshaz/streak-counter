import { streakCounter } from "../src";
import { JSDOM } from "jsdom";
import { formattedDate } from "../src/utils";
describe("Streak counter", () => {
  let mockLocalStorage: Storage;

  beforeEach(() => {
    const mockJSDom = new JSDOM("", { url: "https://localhost" });
    mockLocalStorage = mockJSDom.window.localStorage;

    const date = new Date("8/7/2022");

    const streak = {
      currentCount: 1,
      startDate: formattedDate(date),
      lastLoginDate: formattedDate(date),
    };

    mockLocalStorage.setItem("streak", JSON.stringify(streak));
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

    const streakAsString = mockLocalStorage.getItem(key);
    expect(streakAsString).not.toBeNull();
  });

  it("should return the streak from localStorage", () => {
    const date = new Date("8/7/2022");
    const streak = streakCounter(mockLocalStorage, date);

    expect(streak.startDate).toBe("8/7/2022");
  });

  it("should increment the streak", () => {
    const date = new Date("8/8/2022");

    const streak = streakCounter(mockLocalStorage, date);
    expect(streak.currentCount).toBe(2);
  });

  it("should not increment the streak when login days not consecutive", () => {
    const date = new Date("8/14/2021");
    const streak = streakCounter(mockLocalStorage, date);
    expect(streak.currentCount).toBe(1);
  });

  it("should reset if not consecutive", () => {
    const date = new Date("8/8/2022");
    const streak = streakCounter(mockLocalStorage, date);

    expect(streak.currentCount).toBe(2);
    // skip a day break the streak
    const updatedDate = new Date("8/15/2022");
    const streakUpdated = streakCounter(mockLocalStorage, updatedDate);
    expect(streakUpdated.currentCount).toBe(1);
  });

  it("should save the reset strek to localStorage", () => {
    const key = "streak";
    const date = new Date("8/8/2022");
    streakCounter(mockLocalStorage, date);

    const dateUpdated = new Date("8/20/2022");
    const streakUpdated = streakCounter(mockLocalStorage, dateUpdated);

    try {
      const streakAsString = mockLocalStorage.getItem(key);
      const streak = JSON.parse(streakAsString || "");
      expect(streak.currentCount).toBe(1);
    } catch (error) {
      console.log("someThing went wrong");
    }
  });
});
