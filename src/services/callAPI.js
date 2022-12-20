import config from "../content/config.json"

/**
 * This function should return a token if the user is in the database
 * and should return null if none user found
 * 
 * @param {string} username 
 * @param {string} password 
 * 
 * @return token of the user
 */
export async function login(username, password, setToken) {
    const response = await fetch(config.urlApi+'/user/login', {
        method: 'POST',
        headers: new Headers({
                'Content-Type': 'application/json'
            }),
        body:JSON.stringify({
              email: username,
              password: password,
          }),
        })
    const data = await response.json()

    // localstorage du token
    setToken(data.body.token)
}

/**
 * This function should return user's datas of the connected user
 * 
 * @param {string} token - token of the user 
 * 
 * @returns profile datas of connected user
 */
export async function profile(token) {
    const response = await fetch(config.urlApi+'/user/profile', {
        method: 'POST',
        headers: new Headers({
                'Content-Type': 'application/json',
                Authorization : 'Bearer '+token
                
            }),
        })
    const data = await response.json()
    return data
}

/**
 * This function should return a token if the user is in the database
 * and should return null if none user found
 * 
 * @param {string} token
 * @param {Object} datas - the new datas for user update 
 */
export async function update(token, {firstName, lastName}) {
    const response = await fetch(config.urlApi+'/user/profile', {
        method: 'PUT',
        headers: new Headers({
                'Content-Type': 'application/json',
                Authorization : 'Bearer '+token
                
            }),
            body:JSON.stringify({
              firstName,
              lastName,
          }),
        })
        const data = await response.json()
        return data
}




