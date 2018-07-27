const config = {
  Auth: {
  identityPoolId: 'us-east-1:051d18f6-a6bf-4237-af95-33c0f3a45cc1',
  region:  'us-east-1',
  userPoolId: 'us-east-1_yznBlsoTx',
  userPoolWebClientId: '55lhidgnj7jtbo9vn0rrq3c0qa'
  },
  API: {
    endpoints: [
      {
        name: "superqso",
        endpoint: "https://bvi2z1683m.execute-api.us-east-1.amazonaws.com/reactWeb",
       
      }
    ]
  },
  Storage: {
    bucket: 'sqso', //REQUIRED -  Amazon S3 bucket
    region: 'us-east-1', //OPTIONAL -  Amazon service region
    identityPoolId: 'us-east-1:051d18f6-a6bf-4237-af95-33c0f3a45cc1'
}

}
export default config