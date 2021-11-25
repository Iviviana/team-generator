const Employee=require('./employee');

class Manager extends Employee {
    constructor(name, id, email, number) {
        //calling the employee constructor
        super (name, id, email);

        this.number=number;
    }
    //override to manager
    getRole() {
        return "Manager";
    }
};

module.exports=Manager;