const Employee=require('../lib/employee')


//test for the employee object
test('creates an employee object',()=> {
    const employee=new Employee('Antonia', 1,'toni@me.com');

    expect(employee.name).toEqual(expect.any(String));
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toEqual(expect.any(String));

});

//test for the getName()
test('gets employee name',()=>{
    const employee=new Employee('Antonia', 1, 'toni@me.com');

    expect(employee.getName()).toEqual(expect.any(String));

});

//test for the getId()
test('gets employee ID',()=>{
    const employee=new Employee('Antonia', 1, 'toni@me.com');

    expect(employee.getId()).toEqual(expect.any(Number));

});

//test for the getEmail
test('gets employee email',()=>{
    const employee=new Employee('Antonia',1,'toni@me.com');

    expect(employee.getEmail()).toEqual(expect.stringContaining(employee.email.toString()));
});

//test for the getRole
test('gets role of employee',()=>{
    const employee=new Employee('Antonia',1,'toni@me.com');

    expect(employee.getRole()).toEqual('Employee');

});