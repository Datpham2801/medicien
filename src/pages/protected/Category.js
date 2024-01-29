import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Category from '../../features/category'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Danh sách các đơn đặt lịch"}))
      }, [])


    return(
        <Category />
    )
}

export default InternalPage