const Manager=require('../lib/manager')

//test for manager object
test('creates a Manager object',()=>{
    const manager=new Manager('Antonia',1,'toni@me.com',1234567890);

    expect(manager.number).toEqual(expect.any(Number));

});

//test for getRole
test('get role from employee',()=>{
    const manager=new Manager('Antonia',1,'toni@me.com');

    expect(manager.getRole()).toEqual('Manager');
})