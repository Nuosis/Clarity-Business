import { useDeleteRecordMutation } from '../../pages/api/clarityApi';

const deleteRecordMethod = async ({layout, recordID}) => {
  const [deleteRecord] = useDeleteRecordMutation();

  try {
    const response = await deleteRecord({
      server: process.env.NEXT_PUBLIC_API_URL,
      database: 'clarityData',
      layout,
      recordID,
    }).unwrap();
7
    console.log('Record created:', response);
    return response
  } catch (error) {
    console.error('Error creating record:', error);
    return error.message
  }
};

export default deleteRecordMethod;
