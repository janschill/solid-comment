const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default class Time {
  static format(format, time) {
    switch (format) {
      case "M d":
        const month = this.shortMonthName(monthNames[time.getMonth()]);
        const date = time.getDate();
        return `${month} ${date}`;
      default:
        return time;
    }
  }

  static shortMonthName(month) {
    return month[0] + month[1] + month[2];
  }
}
