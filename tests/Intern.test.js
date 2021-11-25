const Intern=require('../lib/intern')

//test for intern object

test('creates intern object',(=>{
    const intern=new Intern('Antonia',3,'toni@me.com','UM');

    expect(intern.school).toEqual(expect.any(String));

}));

//test for getSchool
test('gets employees school',()=>{
    const intern=new Intern('Antonia',3,'toni@me.com','UM');

    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()));

});

//test for getRole
test('get role from employee',()=>{
    const manager=new Manager('Antonia',1,'toni@me.com');

    expect(manager.getRole()).toEqual('Manager');
})