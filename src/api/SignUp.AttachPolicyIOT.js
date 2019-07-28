import Amplify, { API } from 'aws-amplify';

const api = {
  signUpIot: function(body){
    API.post('api', '/signup-iot', {body}).then(response => {
      console.log('OK: ',response)
    }).catch(error => {
        console.log(error.response)
    })

  },
}

export default api;