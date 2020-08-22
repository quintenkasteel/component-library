import React, {
  useState,
  useEffect,
  useRef,
  createRef,
  useReducer,
} from 'react';
import './css.css';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const getDateStringFromTimestamp = timestamp => {
  let dateObject = new Date(timestamp);
  let month = dateObject.getMonth() + 1;
  let date = dateObject.getDate();
  return (
    dateObject.getFullYear() +
    '-' +
    (month < 10 ? '0' + month : month) +
    '-' +
    (date < 10 ? '0' + date : date)
  );
};

const daysMap = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const monthMap = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getNumberOfDays = (year, month) => {
  return 40 - new Date(year, month, 40).getDate();
};

const getDayDetails = args => {
  let date = args.index - args.firstDay;
  let day = args.index % 7;
  let prevMonth = args.month - 1;
  let prevYear = args.year;
  if (prevMonth < 0) {
    prevMonth = 11;
    prevYear--;
  }
  let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
  let _date =
    (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
  let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
  let timestamp = new Date(args.year, args.month, _date).getTime();
  return {
    date: _date,
    day,
    month,
    timestamp,
    dayString: daysMap[day],
  };
};

const getMonthDetails = (year, month) => {
  let firstDay = new Date(year, month).getDay();
  let numberOfDays = getNumberOfDays(year, month);
  let monthArray = [];
  let rows = 6;
  let currentDay = null;
  let index = 0;
  let cols = 7;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      currentDay = getDayDetails({
        index,
        numberOfDays,
        firstDay,
        year,
        month,
      });
      monthArray.push(currentDay);
      index++;
    }
  }
  return monthArray;
};

/** We'll use useReducer to manage our state **/
const date = new Date();
const oneDay = 60 * 60 * 24 * 1000;
const todayTimestamp =
  date.getTime() -
  (date.getTime() % oneDay) +
  date.getTimezoneOffset() * 1000 * 60;

const initialState = {
  todayTimestamp: todayTimestamp, // or todayTimestamp, for short
  year: date.getFullYear(),
  month: date.getMonth(),
  selectedDay: todayTimestamp,
  monthDetails: getMonthDetails(date.getFullYear(), date.getMonth()),
};

const DatePicker = (props) => {
  const el = useRef(null);
  const inputRef = createRef();
  const [state, dispatch] = useReducer(reducer, initialState);
  /** Maybe you could add this to initialState 🤷🏽‍♂️ */
  const [showDatePicker, setShowDatePicker] = useState(false);

  const addBackDrop = e => {
    if (showDatePicker && el && !el.current.contains(e.target)) {
      setShowDatePicker(false);
    }
  };

  const setDateToInput = timestamp => {
    const dateString = getDateStringFromTimestamp(timestamp);
    inputRef.current.value = dateString;
  };

  useEffect(() => {
    /**
     * Only needed when using SSR ie Next.js
     * Uncomment if you're using SSR:
     * if (!process.browser) { return }
     */

    window.addEventListener('click', addBackDrop);
    setDateToInput(state.selectedDay);

    // returned function will be called on component unmount
    return () => {
      window.removeEventListener('click', addBackDrop);
    };
  }, [showDatePicker]);

  const isCurrentDay = day => day.timestamp === todayTimestamp;
  const isSelectedDay = day => day.timestamp === state.selectedDay;
  const getMonthStr = month =>
    monthMap[Math.max(Math.min(11, month), 0)] || 'Month';

  const onDateClick = day => {
    dispatch({ type: 'selectedDay', value: day.timestamp });
    setDateToInput(day.timestamp);

    /** Pass data to parent */
    props.onChange(day.timestamp);
  };

  const setYear = offset => {
    const year = state.year + offset;
    dispatch({ type: 'year', value: year });
    dispatch({
      type: 'monthDetails',
      value: getMonthDetails(year, state.month),
    });
  };

  const setMonth = offset => {
    let year = state.year;
    let month = state.month + offset;
    if (month === -1) {
      month = 11;
      year--;
    } else if (month === 12) {
      month = 0;
      year++;
    }

    dispatch({ type: 'year', value: year });
    dispatch({ type: 'month', value: month });
    dispatch({ type: 'monthDetails', value: getMonthDetails(year, month) });
  };

  const setDate = dateData => {
    const selectedDay = new Date(
      dateData.year,
      dateData.month - 1,
      dateData.date
    ).getTime();
    dispatch({ type: 'selectedDay', value: selectedDay });

    /** Pass data to parent */
    props.onChange(selectedDay);
  };

  const getDateFromDateString = dateValue => {
    const dateData = dateValue.split('-').map(d => parseInt(d, 10));

    if (dateData.length < 3) {
      return null;
    }

    const year = dateData[0];
    const month = dateData[1];
    const date = dateData[2];
    return { year, month, date };
  };

  const updateDateFromInput = () => {
    const dateValue = inputRef.current.value;
    const dateData = getDateFromDateString(dateValue);

    if (dateData !== null) {
      setDate(dateData);
      dispatch({ type: 'year', value: dateData.year });
      dispatch({ type: 'month', value: dateData.month - 1 });
      dispatch({
        type: 'monthDetails',
        value: getMonthDetails(dateData.year, dateData.month - 1),
      });
    }
  };

  const daysMarkup = state.monthDetails.map((day, index) => (
    <div
      className={
        'c-day-container ' +
        (day.month !== 0 ? ' disabled' : '') +
        (isCurrentDay(day) ? ' highlight' : '') +
        (isSelectedDay(day) ? ' highlight-green' : '')
      }
      key={index}>
      <div className="cdc-day">
        <span onClick={() => onDateClick(day)}>{day.date}</span>
      </div>
    </div>
  ));

  const calendarMarkup = (
    <div className="c-container">
      <div className="cc-head">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d, i) => (
          <div key={i} className="cch-name">
            {d}
          </div>
        ))}
      </div>
      <div className="cc-body">{daysMarkup}</div>
    </div>
  );

  return (
    <div ref={el} className="MyDatePicker">
      <div className="mdp-input" onClick={() => setShowDatePicker(true)}>
        <input type="date" ref={inputRef} onChange={updateDateFromInput} />
      </div>
      {showDatePicker ? (
        <div className="mdp-container">
          <div className="mdpc-head">
            <div className="mdpch-button">
              <div className="mdpchb-inner" onClick={() => setYear(-1)}>
                <span className="mdpchbi-left-arrows"></span>
              </div>
            </div>
            <div className="mdpch-button">
              <div className="mdpchb-inner" onClick={() => setMonth(-1)}>
                <span className="mdpchbi-left-arrow"></span>
              </div>
            </div>
            <div className="mdpch-container">
              <div className="mdpchc-year">{state.year}</div>
              <div className="mdpchc-month">{getMonthStr(state.month)}</div>
            </div>
            <div className="mdpch-button">
              <div className="mdpchb-inner" onClick={() => setMonth(1)}>
                <span className="mdpchbi-right-arrow"></span>
              </div>
            </div>
            <div className="mdpch-button" onClick={() => setYear(1)}>
              <div className="mdpchb-inner">
                <span className="mdpchbi-right-arrows"></span>
              </div>
            </div>
          </div>
          <div className="mdpc-body">{calendarMarkup}</div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

/** Fancy using switch statement? Go ahead */
function reducer(state, action) {
  if (state.hasOwnProperty(action.type)) {
    return {
      ...state,
      [`${action.type}`]: action.value,
    };
  }

  console.log(`Unknown key in state: ${action.type}`);
}

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
};

const DatePickerContainer = styled.div``;

const DatePickerInput = styled.input`
  position: relative;
  border: 1px solid #cacaca;
  border-radius: 5px;
  line-height: 25px;
  padding: 0.5rem;
  width: 100%;
  outline: none;
`;


export default DatePicker