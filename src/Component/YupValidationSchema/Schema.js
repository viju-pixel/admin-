import * as yup from "yup";

export const addingBreakingNewsSchema = yup.object().shape({
    SrNo : yup.number().required(),
    Tittle : yup.string().required(),
    BreakingNews : yup.string().required()

})

// const isValid = await addingBreakingNewsSchema.isValid(data)
// console.log("data",isValid);