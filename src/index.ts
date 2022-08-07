import { formattedDate } from "./utils";
import { IStreak } from "./utils";
function shouldIncrementOrResetStreamCount(
  currentDate: Date,
  lastLoginDate: string
): "increment" | "reset" {
  const difference =
    currentDate.getDate() - parseInt(lastLoginDate.split("/")[1]);

  if (difference == 1) {
    return "increment";
  }

  return "reset";
}
const KEY = "streak";
export function streakCounter(storage: Storage, date: Date): IStreak {
  const streakInLocalStorage = storage.getItem(KEY);

  if (streakInLocalStorage) {
    try {
      const streak = JSON.parse(streakInLocalStorage);
      const state = shouldIncrementOrResetStreamCount(
        date,
        streak.lastLoginDate
      );

      const SHOULD_INCREMENT = state === "increment";
      const SHOULD_RESET = state === "reset";

      if (SHOULD_INCREMENT) {
        const updatedStreak = {
          ...streak,
          currentCount: streak.currentCount + 1,
          lastLoginDate: formattedDate(date),
        };
        storage.setItem(KEY, JSON.stringify(updatedStreak));
        return updatedStreak;
      }
      if (SHOULD_RESET) {
        const updatedStreak: IStreak = {
          currentCount: 1,
          startDate: formattedDate(date),
          lastLoginDate: formattedDate(date),
        };
        storage.setItem(KEY, JSON.stringify(updatedStreak));

        return updatedStreak;
      }
      return streak;
    } catch (error) {
      console.log("Failed to parse streak from localStorage", error);
    }
  }
  const streak = {
    currentCount: 1,
    startDate: formattedDate(date),
    lastLoginDate: formattedDate(date),
  };

  storage.setItem(KEY, JSON.stringify(streak));
  return streak;
}
