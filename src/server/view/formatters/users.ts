export const getUsername = (data: {firstname: string; lastname: string}):
    string => data.firstname + ' ' + data.lastname;
