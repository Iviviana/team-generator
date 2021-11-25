const Engineer=require('../lib/engineer')

//test for engineer object
test('creates engineer object',()=>{
    const engineer=new Engineer('Antonia',2,'toni@me.com','iviviana');

    expect(engineer.github).toEqual(expect.any(String));

});

//gets the engineers github
test('gets the engineers github',()=>{
    const engineer=new Engineer('Antonia',2,'toni@me.com','iviviana');

    expect(engineer.github).toEqual(expect.stringContaining(engineer.github.toString()));

});

//test for getRole
test('get role from employee',()=>{
    const engineer=new Engineer('Antonia',1,'toni@me.com', 'iviviana');

    expect(engineer.getRole()).toEqual('Engineer');
})