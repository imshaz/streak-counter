export interface IStreak {
  currentCount: number;
  startDate: string;
  lastLoginDate: string;
}

export function formattedDate(date: Date): string {
  return date.toLocaleDateString("en-US");
}

export function buildStreak(
  date: Date,
  overrideStreak: Partial<IStreak>
): IStreak {
  const defaultStreak = {
    currentCount: 1,
    startDate: formattedDate(date),
    lastLoginDate: formattedDate(date),
  };

  return {
    ...defaultStreak,
    ...overrideStreak,
  };
}
