/*
  Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except
  in compliance with the License. A copy of the License is located at

      http://aws.amazon.com/apache2.0/

  or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
  specific language governing permissions and limitations under the License.
*/

import * as dynamodb from '../helpers/dynamodb';
import { success, failure } from '../helpers/response';
import { removeEmptyStringElements } from '../helpers/wipEmpty';

export const main = async (event, context, callback) => {
  const pet = JSON.parse(event.body);
  const tableName = 'IotPetUsers';
  const identityId = event.requestContext.identity.cognitoIdentityId;

  removeEmptyStringElements(pet)

  const params = {
    TableName: tableName,
    Key: {
      identityId,
    },
    UpdateExpression: 'set #pets = list_append(if_not_exists(#pets, :empty_list), :pet)',
    ExpressionAttributeNames: {
      '#pets': 'pets'
    },
    ExpressionAttributeValues: {
      ':pet': [pet],
      ':empty_list': []
    },
    ReturnValues:"UPDATED_NEW"
  };

  const queryParams = {
    TableName: 'IotPetUsers',
    Key: {
      identityId: event.requestContext.identity.cognitoIdentityId,
    },
  };

  try {
    await dynamodb.call('update', params);
    const result = await dynamodb.call('get', queryParams);
    callback(null, success(result.Item));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false, error: e }));
  }
};
