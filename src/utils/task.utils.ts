export class TaskUtils {
  public static async isWithin3Days(deadline: Date, date: Date) {
    const deadlineDate = deadline;
    const currentDate = date;
    const timeDiff = deadlineDate.getTime() - currentDate.getTime();

    const daysDiff = timeDiff / (1000 * 3600 * 24);
    
    if (daysDiff < 0) {
      return -1; // Deadline is in the past
    } else if (daysDiff <= 3) {
      return 0; // Deadline is within 3 days
    } else {
      return 1; // Deadline is beyond 3 days
    }
  }

  // Input always >= 0
  public static async isWithin1Days(deadline: Date, date: Date) {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date(date);
    const timeDiff = deadlineDate.getTime() - currentDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    
    return daysDiff <= 1;
  }
}