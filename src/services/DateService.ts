import moment from "moment";

class DateService {
  private today: Date = new Date();
  public previousDay(date: Date): Date {
    const previousDay = moment(date).subtract(1, "day");
    return new Date(previousDay.toISOString());
  }
  public nextDay(date: Date): Date {
    const nextDay = moment(date).add(1, "day");
    return new Date(nextDay.toISOString());
  }
  public todayNoTime(): Date {
    return this.dateNoTime(this.today);
  }
  public day7AgoNoTime(): Date {
    return this.dateNoTime(
      moment(this.today).add(1, "day").subtract(8, "day").toDate()
    );
  }
  public day30AgoNoTime(): Date {
    return this.dateNoTime(
      moment(this.today).add(1, "day").subtract(31, "day").toDate()
    );
  }
  public day90AgoNoTime(): Date {
    return moment(this.today).add(1, "day").subtract(91, "day").toDate();
  }
  public dateNoTime(date: Date): Date {
    return new Date(moment(date).format(moment.HTML5_FMT.DATE));
  }
}

export const dateService = new DateService();
