const Employee=require('./employee');

class Engineer extends Employee {
    constructor(name, id, email, github) {
        //super grabs from the parent
        super(name, id, email);

        this.github=github;
    };
    
    getGithub() {
        return this.github;
    };

    getRole() {
        return "Engineer";
    }
};

module.exports=Engineer;