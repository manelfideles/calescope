import Calendar from 'react-calendar';
import { FormInput } from '../Forms/FormInput';
import {
  DATE_FORMAT,
  MONTHS,
  WEEKDAYS,
  convertDateToTimestamptz as dateConverter,
} from '../../utils/misc';
import { useFormContext } from 'react-hook-form';
import { useGraphSlider } from '../../hooks/useGraphSlider';

export const CustomCalendar = () => {
  const { mode } = useGraphSlider();
  const { setValue } = useFormContext();
  const formatInsertedDate = (date: any) => {
    return Array.isArray(date)
      ? date.map((d) => dateConverter(d))
      : dateConverter(date);
  };
  return (
    <FormInput name='time' fieldError={undefined} label={''}>
      <Calendar
        formatLongDate={(_, date) => DATE_FORMAT[date.getDate()]}
        formatMonthYear={(_, date) =>
          MONTHS[date.getMonth()] +
          " '" +
          date.getFullYear().toString().substring(2)
        }
        formatMonth={(_, date) => MONTHS[date.getMonth()]}
        formatShortWeekday={(_, date) => WEEKDAYS[date.getDay()]}
        defaultValue={new Date()}
        selectRange={mode === 'range'}
        onChange={(d: any) => setValue('time.val', formatInsertedDate(d))}
      />
    </FormInput>
  );
};
