import { get, post, put, del } from 'aws-amplify/api';

export const getItem = async function getItem() {
    try {
      const restOperation = get({ 
        apiName: 'api-krishna',
        path: 'items' 
      });
      const response = await restOperation.response;
      console.log('GET call succeeded: ', response);
    } catch (error) {
      handleError(error);
    }
  }


  function handleError(error:any) {
    if (error instanceof Error) {
        console.log('GET call failed: ', error.message);
    } else if (typeof error === 'object' && error !== null && 'response' in error) {
        console.log('GET call failed: ', JSON.parse((error as any).response.body));
    } else {
        console.log('GET call failed: ', error);
    }
}