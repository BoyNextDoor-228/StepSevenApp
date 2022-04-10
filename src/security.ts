export const isAuthenticated = (): boolean => {
    const value: any = localStorage.getItem("skeletonSession")
    if (!value) { return false }
    if (value - new Date().getTime() <= 0) 
    {
        localStorage.removeItem("skeletonSession")
        return false
    }
    if(value - new Date().getTime() >= 0) { return true }
    return false
}