/**
 * Utility functions for working with dates in the Redux store
 */

/**
 * Ensures a value is a proper Date object
 * @param date - Date to normalize
 */
export const normalizeDate = (date: Date | string | undefined): Date | undefined => {
  if (!date) return undefined;
  
  if (date instanceof Date) {
    return date;
  }
  
  try {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      console.error('Invalid date provided:', date);
      return undefined;
    }
    return parsedDate;
  } catch (error) {
    console.error('Error normalizing date:', error);
    return undefined;
  }
};

/**
 * Prepares a todo object for Redux by ensuring dates are properly handled
 * @param todo - Todo object to prepare
 */
export const prepareTodoForRedux = (todo: any): any => {
  return {
    ...todo,
    createdAt: normalizeDate(todo.createdAt) || new Date(),
    updatedAt: normalizeDate(todo.updatedAt),
  };
};
