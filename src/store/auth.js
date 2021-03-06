import { reactive, toRefs } from 'vue'

export default function useAuth() {

  const state = reactive({
    currentUser: null,
    token: null,
  })

  const getM365User = async(x, y) => {
    console.log('action.getM365User()')

    if(!(state.token)) {
      let client = x;
      let request = y;

      let tokenResponse = null
      let currentUser = null
      try {
        tokenResponse = await client.acquireTokenSilent(request)
        console.log('tokenResponseAuthJS', tokenResponse)
        currentUser = tokenResponse.account.userName
        console.log('currentUserAuthJS', currentUser)
        state.currentUser = (!tokenResponse) ? null : currentUser
        state.token = tokenResponse;
        // state.commit('setToken', tokenResponse);
      } catch (e) {
        console.error(e)
      }
    }
  }

  return { ...toRefs(state), getM365User } 
}