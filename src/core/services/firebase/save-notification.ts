export default function makeSaveNotification({
    addInCollection
}: any = {}){
    return  async ({
        receiversIds,
        notification
    }:any = {}) => {
       return receiversIds.forEach( async (receiverId) => {
           return await addInCollection('users', receiverId.toString(), 'notifications', notification)
       });
    }
}
