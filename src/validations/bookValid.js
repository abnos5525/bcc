import * as yup from 'yup'

export const bookSchema = yup.object().shape({
    name: yup.string().required('نام را وارد کنید'),
    date: yup.date().required('تاریخ را وارد کنید'),
    amount: yup.number().nullable()
})