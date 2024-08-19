/* eslint-disable @typescript-eslint/no-explicit-any */
import { Op, type WhereOptions } from 'sequelize';

export const queryIn = <T>(values: T | T[]): WhereOptions | undefined => {
  if (values != null) {
    if (Array.isArray(values)) {
      switch ((values as Array<T>).length) {
        case 0:
          return undefined;
        case 1:
          return { [Op.eq as symbol]: values[0] };
        default:
          return { [Op.in as symbol]: values };
      }
    }
    return values;
  }
  return undefined;
};

export const optionalSet = <T extends Record<any, any>>(
  obj: T,
  key: string,
  value: any,
) => {
  if (value == null) return false;
  (obj as any)[key] = value;
  return true;
};

/**
 * #### Builder for Querying Date Fields
 * @param field - The name of the field in the database to filter from
 * @param dateFilter - An optional object containing the date filter options:
 * - `before` - Filters records before the given date
 * - `after` - Filters records after the given date
 * - `exact` - Filters records on the given date
 * @param precision - The precision of the date filter. Defaults to 'hour'
 * - `day` - 'day': Matches only by day (ignores time)
 * - `hour` - 'hour': Matches only by hour (ignores minutes and seconds)
 * - `minute` - 'minute': Matches only by minute (ignores seconds)
 * - `second` - 'second': Matches down to the second
 * @returns A `WhereOptions` object to be used in a Sequelize query
 */
export const buildDateQuery = (
  field: string,
  dateFilter?: { before?: Date; after?: Date; exact?: Date },
  precision: 'day' | 'hour' | 'minute' | 'second' = 'hour',
): WhereOptions | undefined => {
  if (!dateFilter) return undefined;

  const query: WhereOptions = {};

  // Adjusts the date based on the specified precision level.
  const adjustDate = (
    date: Date,
    precision: 'day' | 'hour' | 'minute' | 'second',
  ) => {
    const adjustedDate = new Date(date);

    switch (precision) {
      case 'day':
        adjustedDate.setHours(0, 0, 0, 0);
        break;
      case 'hour':
        adjustedDate.setMinutes(0, 0, 0);
        break;
      case 'minute':
        adjustedDate.setSeconds(0, 0);
        break;
    }

    return adjustedDate;
  };

  // Build query based on the provided dateFilter.
  if (dateFilter.exact) {
    // Exact match for the date with specified precision.
    query[field] = { [Op.eq]: adjustDate(dateFilter.exact, precision) };
  } else {
    // Range query for before and after dates.
    if (dateFilter.before) {
      query[field] = {
        ...query[field],
        [Op.lt]: adjustDate(dateFilter.before, precision),
      };
    }
    if (dateFilter.after) {
      query[field] = {
        ...query[field],
        [Op.gt]: adjustDate(dateFilter.after, precision),
      };
    }
  }

  return { [field]: query };
};

/**
 * Builds a query object for filtering records based on duration from a start date
 *
 * @param fieldStartDate - The name of the field representing the start date in the database
 * @param fieldEndDate - The name of the field representing the end date in the database
 * @param duration - The duration in days. This duration is used to calculate the end date from the current date
 * @returns A `WhereOptions` object for Sequelize queries or `undefined` if duration is not provided
 */
export const buildDurationQuery = (
  fieldStartDate: string,
  fieldEndDate: string,
  duration?: number,
): WhereOptions | undefined => {
  if (duration == null) return undefined;

  const query: WhereOptions = {};

  const currentDate = new Date();
  const endDate = new Date(
    currentDate.getTime() + duration * 24 * 60 * 60 * 1000, // Calculate end date based on duration
  );

  // Query to ensure the start date is less than or equal to the current date.
  query[fieldStartDate] = { [Op.lte as symbol]: currentDate };
  // Query to ensure the end date is greater than or equal to the calculated end date.
  query[fieldEndDate] = { [Op.gte as symbol]: endDate };

  return query;
};
