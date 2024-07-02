import moment from "moment"

/**
 * Function get current date to ISO8601
 * @returns date to String
 */
const onGetXDate = (): string => moment().utc().format();


export {
    onGetXDate
};