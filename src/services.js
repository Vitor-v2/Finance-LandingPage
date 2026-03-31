import { protectedApi, publicApi } from './lib/axios'

export const userServices = {
  /**
   * @param {Object} data campos do form
   * @param {string} data.first_name nome do usuário
   * @param {string} data.last_name sobrenome do usuário
   * @param {string} data.email email do usuario
   * @param {string} data.password senha do usuário
   * @param {string} data.tokens tokens para validação
   * @returns {object}
   */
  signIn: async (data) => {
    const response = await publicApi.post('/users', {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
    })
    return {
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
      password: response.data.password,
      tokens: response.data.tokens,
    }
  },
  /**
   * @param {Object} data campos do form
   * @param {string} data.first_name primeiro nome
   * @param {string} data.last_name sobrenome
   * @param {string} data.email email do usuário
   * @param {string} data.password senha do usuário
   * @param {string} data.tokens tokens para validação
   * @returns {object}
   */
  login: async (data) => {
    const response = await publicApi.post('/users/login', {
      email: data.email,
      password: data.password,
    })
    return {
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      tokens: response.data.tokens,
    }
  },

  me: async () => {
    const response = await protectedApi.get('/users/me')
    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
      tokens: response.data.tokens,
    }
  },

  /**
   * @param {Object} variables campos do form
   * @param {string} variables.first_name primeiro nome
   * @param {string} variables.last_name sobrenome
   * @param {string} variables.email email do usuário
   * @param {string} variables.password senha do usuário
   * @param {string} variables.tokens tokens para validação
   * @returns {object}
   */
  getBalance: async (date) => {
    const queryParams = new URLSearchParams()
    queryParams.set('from', date.from)
    queryParams.set('to', date.to)
    const response = await protectedApi.get(
      `/users/me/balance?${queryParams.toString()}`
    )
    return response.data
  },
}

export const transactionServices = {
  create: async (data) => {
    const transaction = {
      name: data.nameTransaction,
      type: data.typeTransaction,
      date: data.dateTransaction,
      amount: data.valueTransaction,
    }
    const response = await protectedApi.post('/transactions/me', transaction)
    return response.data
  },
}
