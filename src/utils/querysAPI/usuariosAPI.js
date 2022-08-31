export const usuariosAPI = async() => {
    try {
        const urlUser = '/usuarios'
        const response = await fetch(process.env.REACT_APP_API_URL + urlUser)
        const inforUsuarios = await response.json()
        if(response.status === 200) {
            return inforUsuarios
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
    }
}