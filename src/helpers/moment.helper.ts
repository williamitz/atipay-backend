import moment from "moment-timezone"

/**
 * Function get current date to ISO8601
 * @returns date to String
 */
const onGetXDate = (): string => 
    moment().tz('America/Lima').utc().format("yyyy-MM-DD[T]HH:mm:ss[Z]");


export {
    onGetXDate
};