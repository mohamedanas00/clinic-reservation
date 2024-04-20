import joi from 'joi'
const reqMethods = ['body','query','headers',`params`]

export const generalFields={
    email: joi.string().email({
    minDomainSegments:2,
    maxDomainSegments:4,
    tlds: { allow: ['com', 'net', 'org'] } })
    .required(),
    password: joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    id:joi.number().required(),
    name:joi.string().min(3).max(30).required(),
}
export const ValidationCoreFunction =(schema)=>{
    return(req,res,next)=>{
        const ValidationErrArray=[]
        for(const key of reqMethods){
            if(schema[key])
            {
                const ValidateResults = schema[key].validate(req[key],{
                    abortEarly:false,
                })
                if(ValidateResults.error)
                {
                    ValidationErrArray.push(ValidateResults.error.details)
                }
            }
        }

        if (ValidationErrArray.length) {
            return res
            .status(400)
            .json({ message: 'Validation Error', Errors: ValidationErrArray })
        }
    
        next()
 }
}

// /^                 // Start of the string
//   (?=.*\d)         // Positive lookahead to ensure there's at least one digit
//   (?=.*[a-z])      // Positive lookahead to ensure there's at least one lowercase letter
//   (?=.*[A-Z])      // Positive lookahead to ensure there's at least one uppercase letter
//   (?=.*[a-zA-Z])   // Positive lookahead to ensure there's at least one letter
//   .{8,}            // Match any character (except newline) at least 8 times
// $/                 // End of the string