const usrSchema = require("./schema/user.model")
const rtoSchema = require("./schema/rto.model")
const serviceCenteraSchema = require("./schema/serviceCenter.model")
async function AddUsers({name,address,phno,email,password,vhcNo,dob,district,country,pincode,state}){
    try{
        const dt= await usrSchema.create ({
            password:password,
            email:email,
            DOB: Date.now(),
            name: name,
            address: address,
            phNo :phno,
            vhcNo: vhcNo,
            district: district,
            state: state,
            country: country,
            pincode: pincode,
        })
        console.log('Data added Successfully');
        return 'Data added Successfully'
    }catch(e){
        console.log(e.message);
        return `ERROR!: ${e.message}`
    }
}



async function AddRto({
    country,
    district,
    password,
    pincode,
    rtoAddress,
    rtoID,
    rtoName,
    state,
    email
    }){
    try{
        const dt = await rtoSchema.create({
            rotName:rtoName,
            country:country,
            address:rtoAddress,
            state:state,
            district:district,
            password:password,
            pincode:pincode,
            rtoId:rtoID,
            email:email 
    
        })
        log(dt)
        console.log('Data added Successfully');
        return 'Data added Successfully'
    }
    catch(err){
        console.log(err.message);
        return `ERROR!: ${err.message}`
    }
};

async function AddServiceCenter({serCenAddress,serCenName,password,district,country,pincode,state,email}){
    try{
        const dt = await serviceCenteraSchema.create({
            password:password, 
            serCenAddress:serCenAddress,
            serCenName:serCenName,
            district:district,
            country:country,
            pincode:pincode,
            state:state,
            email:email 
        });
    }
    catch(err){
        console.log(err.message);
        return `ERROR!: ${err.message}`
    }
}

module.exports = {AddUsers,AddRto,AddServiceCenter};