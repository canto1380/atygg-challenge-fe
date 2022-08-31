export const authToken = (inforUsuario) => {
    localStorage.setItem('jwt-token-atygg', JSON.stringify(inforUsuario))
}