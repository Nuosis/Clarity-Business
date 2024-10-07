import { useFindRecordQuery } from '../../pages/api/clarityApi';

const findRecordMethod = async ({ layout, params}) => {
  const [findRecord] = useFindRecordQuery();
  try {
    const response = await findRecord({
      server: process.env.NEXT_PUBLIC_API_URL,
      database: 'clarityData',
      layout,
      params,
    });
      console.log('Record found:', response);
      return response
  } catch (error) {
      console.error('Error finding record:', error);
      return error.message
  }
};

export default findRecordMethod;
