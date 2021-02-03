/**
 * calendar instance
 */
class Calendar {
    /**
      * 달력
      */
    constructor({
      container = "",
      activeDateClass = "",
      now_date = location.href.split('/')[(location.href.split('/').length-1)],
      initialDate = new Date(now_date)}={}) {
        this.$container = container ? document.querySelector(container) : null;
        this.activeDateClass = activeDateClass;
    
        this.selectedDate = initialDate;
        this.currentMonth = initialDate;
        this.currentMonthDays = [];

        this.monthsNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"];
    
        this.generateMarkup();
        this.bootstrapEvents();
      }
  
    /**
      * 현재 달력의 화면 생성
      */
    buildCurrentMonthDays() {
      var curYear = this.currentMonth.getFullYear(),
      curMonth = this.currentMonth.getMonth(),
      firstMonthDay = new Date(curYear, curMonth, 1),
      lastMonthDay = new Date(curYear, curMonth + 1, 0);
  
      this.currentMonthDays = [];
  
      // 현재 달력의 저번달
      for (let i = -firstMonthDay.getUTCDay(); i < 0; i++) {
        this.currentMonthDays.push(new Date(curYear, curMonth, i));
      }
  
      // 현재 달력의 이번달
      for (let i = 1, lastDay = lastMonthDay.getDate(); i <= lastDay; i++) {
        this.currentMonthDays.push(new Date(curYear, curMonth, i));
      }
  
      // 현재 달력의 다음달
      for (
      let i = 1, daysAppend = 7 - lastMonthDay.getUTCDay();
      i < daysAppend;
      i++)
      {
        this.currentMonthDays.push(new Date(curYear, curMonth + 1, i));
      }
    }
  
    /**
      * 현재 달력 일 계산
      */
    getDayClass(date) {
      var classes = ["calendar_days-list_item"],
      curYear = this.currentMonth.getFullYear(),
      curMonth = this.currentMonth.getMonth(),
      firstMonthDay = new Date(curYear, curMonth, 1),
      lastMonthDay = new Date(curYear, curMonth + 1, 0);
  
      if (date.toDateString() === this.selectedDate.toDateString()) {
        classes = classes.concat([
        "calendar_days-list_item--active",
        this.activeDateClass]);
      }
      if (date.getMonth() === 11 && this.currentMonth.getMonth() === 0) {
        classes.push("calendar_days-list_item--prev-month");
      } else if (date.getMonth() === 0 && this.currentMonth.getMonth() === 11) {
        classes.push("calendar_days-list_item--next-month");
      } else if (date.getMonth() < this.currentMonth.getMonth()) {
        classes.push("calendar_days-list_item--prev-month");
      } else if (date.getMonth() > this.currentMonth.getMonth()) {
        classes.push("calendar_days-list_item--next-month");
      }
      return classes.join(" ");
    }
    /**
      * 년 월 변환
      */
    getFormattedDate(date) {
      return `${date.getFullYear()} ${this.monthsNames[date.getMonth()]}`;
    }
    /**
      * 현재 달력 생성
      */
    generateDaysMarkup() {
      var days = [];
      this.buildCurrentMonthDays();
      this.currentMonthDays.forEach(
      function (day) {
        days.push(
        `<li data-date="${day.toLocaleDateString()}" class="${this.getDayClass(
        day)
        }">${day.getDate()}</li>`);
  
      }.bind(this));
  
      return days.join("");
    }
    getFormatDate(date){
      var year = date.getFullYear();
      var month = (1 + date.getMonth());
      month = month >= 10 ? month : '0' + month;
      var day = date.getDate();
      day = day >= 10 ? day : '0' + day;
      return year + '-' + month + '-' + day;
    }
    /**
      * 달력 새로고침
      */
    refreshCalendar() {
      this.$container.querySelector(
      ".calendar_days-list").
      innerHTML = this.generateDaysMarkup();
      this.$container.querySelector(
      ".calendar_header_date").
      innerHTML = this.getFormattedDate(this.currentMonth);
    }
    /**
      * 저번달
      */
    prevMonth() {
      var curYear = this.currentMonth.getFullYear(),
      curMonth = this.currentMonth.getMonth();
      this.currentMonth = new Date(curYear, curMonth - 1, 1);
      this.refreshCalendar();
    }
    /**
      * 다음달
      */
    nextMonth() {
      var curYear = this.currentMonth.getFullYear(),
      curMonth = this.currentMonth.getMonth();
      this.currentMonth = new Date(curYear, curMonth + 1, 1);
      this.refreshCalendar();
    }
    /**
      * 달력 업데이트
      */
    update(option, value) {
      if (option === "selectedDate") {
        let date = new Date(value);
  
        if (!isNaN(date.getTime())) {
          this.selectedDate = new Date(value);
          this.currentMonth = this.selectedDate;
        } else {
          throw new Error("Invalid date format");
        }
      } else if (option === "activeDateClass") {
        this.activeDateClass = value;
      }
  
      this.refreshCalendar();
    }
    /**
      * 특정 일 선택
      */
    selectDay(event) {
      var $target = event.target;
      if ($target.classList.contains("calendar_days-list_item")) {
        let isPrevMonth = $target.classList.contains(
        "calendar_days-list_item--prev-month"),
  
        isNextMonth = $target.classList.contains(
        "calendar_days-list_item--next-month");
  
  
        this.selectedDate = new Date($target.dataset.date);
  
        if (isPrevMonth || isNextMonth) {
          if (isPrevMonth) {
            this.prevMonth();
          } else {
            this.nextMonth();
          }
          $target = this.$container.querySelector(
          `[data-date="${this.selectedDate.toLocaleDateString()}"]`);
  
        } else {
          let $activeItem = this.$container.querySelector(
          ".calendar_days-list_item--active");
  
          if ($activeItem) {
            $activeItem.classList.remove("calendar_days-list_item--active");
            this.activeDateClass &&
            $activeItem.classList.remove(this.activeDateClass);
          }
        }

        $target.classList.add("calendar_days-list_item--active");
        this.activeDateClass && $target.classList.add(this.activeDateClass);

        window.location.href = `./${this.getFormatDate(this.selectedDate)}`;
      }
    }
    /**
      * 달력 출력
      */
    generateMarkup() {
      if (!this.$container) {
        let fragment = document.createDocumentFragment(),
        calendarContainer = document.createElement("div");
        fragment.appendChild(calendarContainer);
        document.body.appendChild(calendarContainer);
        this.$container = calendarContainer;
      }
      this.$container.classList.add("calendar");
      this.$container.innerHTML = `
      <div class="calendar_header">
        <button class="calendar_btn calendar_btn--prev">Prev</button>
        <div class="calendar_header_date">${this.getFormattedDate(
          this.currentMonth)
          }</div>
        <button class="calendar_btn calendar_btn--next">Next</button>
      </div>
      <div class="calendar_body">
        <ul class="calendar_days-names">
          <li class="calendar_days-names_item">Mon</li>
          <li class="calendar_days-names_item">Tue</li>
          <li class="calendar_days-names_item">Wed</li>
          <li class="calendar_days-names_item">Thu</li>
          <li class="calendar_days-names_item">Fri</li>
          <li class="calendar_days-names_item">Sat</li>
          <li class="calendar_days-names_item">Sun</li>
        </ul>
        <ul class="calendar_days-list">
          ${this.generateDaysMarkup()}
        </ul>
      </div>
      `;
    }
    /**
      * 버튼 이벤트
      */
    bootstrapEvents() {
      this.$container.
      querySelector(".calendar_btn--prev").
      addEventListener("click", this.prevMonth.bind(this));

      this.$container.
      querySelector(".calendar_btn--next").
      addEventListener("click", this.nextMonth.bind(this));

      this.$container.
      querySelector(".calendar_days-list").
      addEventListener("click", this.selectDay.bind(this));
    }}
  
  
  var calendar = new Calendar({
    container: ".calendar" 
  });