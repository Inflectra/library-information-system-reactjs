import permissions from './permissions';

const users = [
    {
        id: 1, 
        username: "librarian", 
        password: "librarian", 
        name: "Librarian", 
        active: true, 
        permission: permissions.edit
    },
    {
        id: 2, 
        username: "visitor", 
        password: "visitor", 
        name: "Wally West", 
        active: true, 
        permission: permissions.view
    },
    {
        id: 3, 
        username: "member", 
        password: "member", 
        name: "Clark Kent", 
        active: true, 
        permission: permissions.view
    },
    {
        id: 4, 
        username: "banned", 
        password: "banned", 
        name: "Evil Doer", 
        active: false, 
        permission: permissions.view
    },
    {
        id: 5, 
        username: "admin", 
        password: "admin", 
        name: "administrator", 
        active: true, 
        permission: permissions.admin
    },
    {
        id: 6, 
        username: "borrower", 
        password: "borrower", 
        name: "Bella Borrower", 
        active: true,
        permission: permissions.view
    }
];

export default users;
