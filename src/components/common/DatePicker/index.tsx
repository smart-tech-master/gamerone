import React from 'react';
import * as dateFns from 'date-fns';
import cn from 'classnames';

import './style.scss';
import { Nullable } from 'interfaces';
import Icon, { IconNameEnum } from '../Icon';

// Helpers
const getDaysForCalendar = (date = new Date(), calendarSize = 42) => {
  const visibleCalendarDays: Date[] = [];
  const monthStartDate = dateFns.startOfMonth(date);
  const monthEndDate = dateFns.endOfMonth(date);
  const monthStartDayOfWeek = monthStartDate.getDay();
  const daysInMonth = dateFns.getDaysInMonth(date);
  const numOfDaysToAddBefore = monthStartDayOfWeek - 1;
  const calendarStartDate = dateFns.subDays(
    monthStartDate,
    numOfDaysToAddBefore,
  );
  const calendarEndDate = dateFns.addDays(
    monthEndDate,
    calendarSize - daysInMonth - numOfDaysToAddBefore,
  );

  dateFns
    .eachDayOfInterval({ start: calendarStartDate, end: calendarEndDate })
    .forEach((date) => visibleCalendarDays.push(date));

  return visibleCalendarDays;
};

const getDaysByWeek = (days: Date[] = []) => {
  const DAYS_IN_WEEK = 7;
  const result = [];
  let weekOfDays: Date[] = [];

  days.forEach((day) => {
    if (weekOfDays.length === DAYS_IN_WEEK) {
      result.push(weekOfDays);
      weekOfDays = [];
    }

    weekOfDays.push(day);
  });

  result.push(weekOfDays);
  return result;
};

const getMonthAsWord = (date: Date) => date.toString().split(' ')[1];

interface CalendarProps {
  className: string;
  date: Date;
  onDatePick: (e: any) => void;
}

interface CalendarState {
  date: Date;
}
// View
class Calendar extends React.Component<CalendarProps, CalendarState> {
  state: CalendarState;

  constructor(props: CalendarProps) {
    super(props);
    this.state = { date: props.date };
  }

  addMonth = () =>
    this.setState({ date: dateFns.addMonths(this.state.date, 1) });
  subMonth = () =>
    this.setState({ date: dateFns.subMonths(this.state.date, 1) });
  addYear = () => this.setState({ date: dateFns.addYears(this.state.date, 1) });
  subYear = () => this.setState({ date: dateFns.subYears(this.state.date, 1) });
  showCurrentDate = () => this.setState({ date: new Date() });

  renderControls() {
    const { date } = this.state;
    return (
      <div className="calendar__controls-row">
        <div className="calendar__controls">
          <Icon
            name={IconNameEnum.ARROW_LEFT}
            style={{
              cursor: 'pointer',
              marginLeft: '0.5rem',
              marginRight: '0.5rem',
            }}
            onClick={this.subMonth}
          />
          <Icon
            name={IconNameEnum.ARROW_LEFT_DOUBLE}
            style={{
              cursor: 'pointer',
              marginLeft: '0.5rem',
              marginRight: '1rem',
            }}
            onClick={this.subYear}
          />
        </div>
        <div
          className="calendar__month-with-year"
          onClick={this.showCurrentDate}
        >
          {getMonthAsWord(date)} {date.getFullYear()}
        </div>
        <div className="calendar__controls">
          <Icon
            name={IconNameEnum.ARROW_RIGHT_DOUBLE}
            style={{
              cursor: 'pointer',
              marginLeft: '1rem',
              marginRight: '0.5rem',
            }}
            onClick={this.addYear}
          />
          <Icon
            name={IconNameEnum.ARROW_RIGHT}
            style={{ cursor: 'pointer', marginRight: '0.5rem' }}
            onClick={this.addMonth}
          />
        </div>
      </div>
    );
  }

  renderDaysOfWeek() {
    return (
      <div className="calendar__days-of-week">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((letter, i) => (
          <div className="calendar__day-of-week" key={i}>
            {letter}
          </div>
        ))}
      </div>
    );
  }

  renderDate(date: Date) {
    return (
      <div
        className={cn('calendar__day', {
          'calendar__day--pale': !dateFns.isSameMonth(date, this.state.date),
          'calendar__day--emphasize': dateFns.isToday(date),
        })}
        onClick={() => this.props.onDatePick(date)}
        key={date.toString()}
      >
        {date.getDate()}
      </div>
    );
  }

  render() {
    const weeksWithDaysInside = getDaysByWeek(
      getDaysForCalendar(this.state.date),
    );

    return (
      <div className={cn('calendar', this.props.className)}>
        {this.renderControls()}
        {this.renderDaysOfWeek()}
        {weeksWithDaysInside.map((week, i) => (
          <div className="calendar__week" key={i}>
            {week.map(this.renderDate, this)}
          </div>
        ))}
      </div>
    );
  }
}

interface Props {
  initValue: any;
  name: string;
  dateFormat: string;
  register: any;
  onDatePick: (e: any) => void;
}

interface DatePickerState {
  isCalendarOpen: boolean;
  selectedDate: Nullable<Date>;
}
export default class DatePicker extends React.Component<
  Props,
  DatePickerState
> {
  static defaultProps = {
    dateFormat: 'yyyy-MM-dd',
    initValue: '',
  };

  state: DatePickerState;

  constructor(props: Props) {
    super(props);

    this.state = {
      isCalendarOpen: false,
      selectedDate: props.initValue ? dateFns.parseISO(props.initValue) : null,
    };
  }

  handleClick = (event: any) => {
    event.preventDefault();
    event.target.blur();
    this.setState({ isCalendarOpen: !this.state.isCalendarOpen });
  };

  handleDatePick = (date: Date) => {
    this.setState({
      isCalendarOpen: false,
      selectedDate: date,
    });
    this.props.onDatePick(date);
  };

  render() {
    const { name, dateFormat, register } = this.props;
    const { isCalendarOpen, selectedDate } = this.state;

    const formatted = (date: Nullable<Date>) => {
      if (date && !isNaN(date.getTime()))
        return dateFns.format(date, dateFormat);
      return '';
    };

    return (
      <div className="date-picker">
        <div className="date-picker__date-selection" onClick={this.handleClick}>
          {/* <i className="far fa-calendar-alt"></i> */}
          <input
            className="date-picker__input"
            type="text"
            name={name}
            ref={register}
            aria-label="date-picker"
            value={formatted(selectedDate)}
            readOnly
          />
        </div>
        {isCalendarOpen && (
          <Calendar
            className="date-picker__calendar"
            date={selectedDate || new Date()}
            onDatePick={this.handleDatePick}
          />
        )}
      </div>
    );
  }
}

// todo vadim
// export default class DatePicker extends React.Component {
//   render() {
//     return <div>Fix Date Picker</div>;
//   }
// }
