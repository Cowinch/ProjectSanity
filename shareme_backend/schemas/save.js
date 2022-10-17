//userId has a lowercase in both fields here. idk why
export default{
    name:'save',
    title: 'Save',
    type: 'document',
    fields: [
        {
            name: 'postedBy',
            title: 'postedBy',
            type: 'postedBy'
        },
        {
            name: 'userId',
            title: 'UserId',
            type: 'string'
        }
    ]
}