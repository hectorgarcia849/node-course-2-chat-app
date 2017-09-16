
class Users extends Array {

    constructor(){
        super();
    }

    addUser(id, name, room){
        const user = {id, name, room};
        this.push(user);
        return user;
    }

    removeUser(id){
        var user = this.getUser(id);
        if(user){
            this.splice(this.indexOf(user), 1);
            //this.filter((user) => user.id !== id);
        }
        return user;
    }

    getUser(id){
        return this.filter((user) => user.id === id)[0];
    }

    getUserList(room){
        var users = this.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);
        return namesArray;
    }


}

module.exports = {Users};