import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Product from '../../features/product'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Quản lý thuốc"}))
      }, [])


    return(
        <Product />
    )
}

export default InternalPage