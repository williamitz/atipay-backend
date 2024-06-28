
/**
 * Custom validation for Regexp
 * @param input 
 * @param pattern Regexp
 */
export const patternValidation = ( input: string, pattern: RegExp ): boolean => {

    if( !pattern.test( input ) ) {
        throw new Error(`Invalid input ${input}`);
    }
    
    return true;
};