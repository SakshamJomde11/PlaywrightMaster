//Load playwright module

const {test, expect } = require('@playwright/test')

// Write a test

test('Create POST api request using static body', async({request}:any)=>{

    //Create Post API request
    const postAPIResonse = await request.post(`/booking`, {
        data : 
        {
            "firstname" : "Test",
            "lastname" : "Brown AP1I",
            "totalprice" : 10000,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
            },
             "additionalneeds" : "Breakfast"
        }
    })

    await expect(postAPIResonse.ok()).toBeTruthy();

    await expect(postAPIResonse.status()).toBe(200);

    const postAPIResonseBody = await postAPIResonse.json();


    console.log(postAPIResonseBody);

    
    //validate API response 

    await expect(postAPIResonseBody).toHaveProperty("firstname","Test");

});
