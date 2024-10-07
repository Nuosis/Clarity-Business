import { useCreateRecordMutation } from '../../pages/api/clarityApi';

const createRecordMethod = async ({layout, fieldData}) => {
  const [createRecord] = useCreateRecordMutation();

  try {
    const response = await createRecord({
      server: process.env.NEXT_PUBLIC_API_URL,
      database: 'clarityData',
      layout,
      fieldData, //object of fieldName:fieldValue pairs
    }).unwrap();
7
    console.log('Record created:', response);
    return response
  } catch (error) {
    console.error('Error creating record:', error);
    return error.message
  }
};

export default createRecordMethod;
