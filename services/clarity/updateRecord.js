import { useEditRecordMutation } from '../../pages/api/clarityApi';

const editRecordMethod = async ({ layout, recordID, fieldData }) => {
    const [editRecord] = useEditRecordMutation();
    try {
        const response = await editRecord({
        server: process.env.NEXT_PUBLIC_API_URL,
        database: 'clarityData',
        layout,
        recordID,
        fieldData,
        }).unwrap();

        console.log('Record edited:', response);
        return response
    } catch (error) {
        console.error('Error editing record:', error);
        return error.message
    }
};

export default editRecordMethod;
