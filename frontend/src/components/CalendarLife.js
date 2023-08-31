import React, { useState, useEffect, useContext } from 'react';
import { TranslationContext } from '../context/TranslationContext';

const CalendarLife = ({ userData }) => {
  const translation = useContext(TranslationContext);
  const [weeksLived, setWeeksLived] = useState(0);
  const totalWeeksInLife = 90 * 52; // 90 years * 52 weeks a year

  // Function to calculate the number of weeks lived
  const calculateWeeksLived = () => {
    if (!userData.age) return 0;

    const birthDate = new Date(userData.age);
    const currentDate = new Date();

    const differenceInMillis = currentDate - birthDate.getTime();
    const weeksLived = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24 * 7));

    return weeksLived;
  };


  useEffect(() => {    
    const livedWeeks = calculateWeeksLived();
    setWeeksLived(livedWeeks);
  }, [userData.age]);

  const calculateYearsMonthsWeeks = (weeks) => {
    const years = Math.floor(weeks / 52);
    const remainingWeeks = weeks % 52;
    const months = Math.floor(remainingWeeks / 4);
    const days = remainingWeeks % 7;
    return { years, months, weeks: remainingWeeks - months * 4, days };
  };

  const formatWord = (number, oneForm, fewForm, manyForm) => {
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return manyForm;
    }

    if (lastDigit === 1) {
      return oneForm;
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      return fewForm;
    }

    return manyForm;
  };

  const { years, months, weeks, days } = calculateYearsMonthsWeeks(weeksLived);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {!userData.age ? (
        <p>{translation.calendar.err}</p>
      ) : (
        <>
          <h1 className='calendar__title'>{translation.calendar.title}</h1>
          <p className='calendar__text' style={{width: '50%', textAlign:'center'}}>
            {translation.calendar.subtitle}
          </p>
          {translation.lang === 'ru' ? (
            <>
            <h3 style={{width: '100%', textAlign:'center', marginBottom: '0'}}>{translation.calendar.isLived}:</h3>
            <h3 style={{width: '100%', textAlign:'center', fontSize:'15px', fontWeight: '200'}}>
              {' '}
              {years > 0 ? `${years} ${formatWord(years, 'год', 'года', 'лет')}` : ''}
              {months > 0 ? ` ${months} ${formatWord(months, 'месяц', 'месяца', 'месяцев')}` : ''}
              {weeks > 0 ? ` ${weeks} ${formatWord(weeks, 'неделя', 'недели', 'недель')}` : ''}
              {days > 0 ? ` ${days} ${formatWord(days, 'день', 'дня', 'дней')}` : ''}
            </h3>
            </>
            ) : ( 
              <h3 style={{width: '90%', textAlign:'center'}}>
                {translation.calendar.isLived}:{' '}
                {`${years} ${years > 1 ? 'years' : 'year'} `}
                {`${months} ${months > 1 ? 'months' : 'month'} `}
                {`${weeks} ${weeks > 1 ? 'weeks' : 'week'} `}
                {`${days} ${days > 1 ? 'days' : 'day'} `}
              </h3>
              )
            }
          

          <div className="calendar-container">
            {[...Array(91)].map((_, yearIndex) => (
              <React.Fragment key={yearIndex}>
                {[...Array(53)].map((_, weekIndex) => {
                  const isLived = yearIndex * 52 + weekIndex < weeksLived;
                  const isFifthCell = weekIndex === 0 && yearIndex % 5 === 0;
                  return (
                    <div
                      key={weekIndex}
                      className={`calendar-cell ${isLived ? 'calendar-cell-lived' : ''} ${
                        isFifthCell ? 'calendar-cell-five-year' : ''
                      }`}
                    ></div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CalendarLife;
