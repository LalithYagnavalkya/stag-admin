import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import baseUrl from "../baseUrl"
import { setCustomers } from "../features/customers/customerSlice"

const useCustomers = (pageNum, filter, query) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const [hasNextPage, setHasNextPage] = useState(false);
    const { customers } = useSelector((state) => state.customers)
    useEffect(() => {
        const controller = new AbortController()
        const { signal } = controller
        setIsLoading(true);
        console.log("here");
        const getCustomers = async () => {
            return await baseUrl.get(`admin/customers?page=${pageNum}&filter=${filter}&query=${query}`, { signal })
        }
        getCustomers().then((res) => {
            console.log(res)
            dispatch(setCustomers([...customers, ...res.data.foundQuery]))
            console.log(res?.data?.page <= res?.data?.last_page)
            setHasNextPage(res?.data?.page <= res?.data?.last_page)
            setIsLoading(false)
        }).catch((err) => {
            setIsLoading(false);
            if (controller.abort) return;
        })
        return () => controller?.abort();
    }, [dispatch, filter, pageNum, query])

    return { isLoading, hasNextPage }
}

export default useCustomers