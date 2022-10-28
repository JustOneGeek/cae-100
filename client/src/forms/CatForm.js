import React, {useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import TextField from '@mui/material/TextField'
import Button from '../components/Button'
import useDelete from '../hooks/useDelete'
import useCreate from '../hooks/useCreate'
import useEdit from '../hooks/useEdit'

const FormSchema = Yup.object(
    {
        name: Yup.string().required(),
    }
)


export default function CatForm({ category }) {
    const [createCat, setCreateCat] = useState()
    const [editCat, setEditCat] = useState()
    const [delCat, setDelCat] = useState()
    useCreate(createCat)
    useEdit(category?.id, editCat)
    useDelete(delCat)

    const initialValues={
        name:category?.name ?? '',
    }

    const handleSubmit=(values, resetForm)=>{
        if(category) {
            console.log("Editing", values)
            setEditCat(values)
        }else{
            console.log("Creating", values)
            setCreateCat(values)
        }
        resetForm(initialValues)

    }

    const handleDelete=()=>{
        console.log("deleting category: ", category.name)
        setDelCat(category)
    }

    const formik = useFormik({
        initialValues,
        validationSchema:FormSchema,
        onSubmit: (values,{resetForm})=> handleSubmit(values, resetForm),
        enableReinitialize:true,
    })

  return (
    <form onSubmit={formik.handleSubmit}>
    <TextField
        id= "name"
        name="name"
        fullWidth
        sx={{mb:2, mt:2}}
        label="Category Name"
        placeholder = "Name"
        value={formik.values.name}
        onChange = {formik.handleChange}
        error = {formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
    />

    <Button type="submit" sx={{width:"100%", my:1}}>{category ? "Edit Category":"Create Category"}</Button>
    {category ?
    <Button color="error" sx={{width:"100%"}} onClick={()=>handleDelete()}>Delete</Button>
    : ''}
</form>
  )
}
