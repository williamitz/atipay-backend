import moment from "moment"

/**
 * Function get current date to ISO8601
 * @returns date to String
 */
const onGetXDate = (): string => moment().utc().format();

const onCurrentYear = (): number => moment().year();
const onCurrentYearIsoTwo = (): string => moment().format('yy');

export {
    onGetXDate,
    onCurrentYear,
    onCurrentYearIsoTwo
};