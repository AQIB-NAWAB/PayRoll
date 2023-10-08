const Employee = require("../Models/employee");
const Attendance = require("../Models/attendance");

const verifyUser  = require("../middleware");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const router=require("express").Router()
const  multer =require ('multer');
const  path =require ('path');




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})


// {Employee}
//  EMPLOYEE CREATE 
router.route('/create').post(upload.single('image'), async (req, res) => {
    try {
      const { name, email, password, address, salary, gender, designation, dateOfJoined, hra, da, ma, tax, deductionForLeave, welfareFund } = req.body;
      const hashedPassword = await bcrypt.hash(password.toString(), 10);
      const newEmployee = new Employee({
        name,
        email,
        password: hashedPassword,
        address,
        salary,
        image: req.file.filename,
        gender,
        designation,
        dateOfJoined,
        hra,
        da,
        ma,
        tax,
        deductionForLeave,
        welfareFund
      });
      await newEmployee.save();
      return res.json({ Status: "Success" });
    } catch (err) {
      return res.json({ Error: "Error in signup process" });
    }
  });
  

// employee login
router.route("/employeelogin").post(async (req, res) => {
    try {
        const employee = await Employee.findOne({ email: req.body.email });
        if (!employee) {
            return res.json({ Status: "Error", Error: "Wrong Email or Password" });
        }
        const isPasswordValid = await bcrypt.compare(req.body.password.toString(), employee.password);
        if (!isPasswordValid) {
            return res.json({ Status: "Error", Error: "Wrong Email or Password" });
        }
        const token = jwt.sign({ role: "employee", id: employee._id }, "jwt-secret-key", { expiresIn: '1d' });
        res.cookie('token', token);
        return res.json({ Status: "Success", id: employee._id });
    } catch (err) {
        return res.json({ Status: "Error", Error: "Error in running query" });
    }
});

// logout

router.route("/logout").get( (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
});
// Get All Empleoye
router.route("/getEmployee").get( async (req, res) => {
    try {
        const employees = await Employee.find({role:"employee"});
        return res.json({ Status: "Success", Result: employees });
    } catch (err) {
        return res.json({ Error: "Get employee error in MongoDB" });
    }
});
// Get single Employe 
router.route("/get/:id").get( async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        return res.json({ Status: "Success", Result: employee });
    } catch (err) {
        return res.json({ Error: "Get employee error in MongoDB" });
    }
});

// UPDATE EMPLOYEE  
router.route("/update/:id").put(async (req, res) => {
    try {
      const { name, email,  address, salary, gender, designation, dateOfJoined, hra, da, ma, tax, deductionForLeave, welfareFund } = req.body;
      const updatedEmployee = {
        name,
        email,
        address,
        salary,
        gender,
        designation,
        dateOfJoined,
        hra,
        da,
        ma,
        tax,
        deductionForLeave,
        welfareFund
      };
      await Employee.findByIdAndUpdate(req.params.id, updatedEmployee);
      return res.json({ Status: "Success" });
    } catch (err) {
      return res.json({ Error: "Update employee error in MongoDB" });
    }
  });
  
// DELETE Route
router.route("/delete/:id").delete( async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        return res.json({ Status: "Success" });
    } catch (err) {
        return res.json({ Error: "Delete employee error in MongoDB" });
    }
});


// Dashboard
router.route("/dashboard").get(verifyUser, (req, res) => {
    return res.json({ Status: "Success", email: req.email,id:req.id });
});
// Get All admins
router.route('/getAdmins').get( async (req, res) => {
    try {
        const employees = await Employee.find({role:"admin"});
        return res.json({ Status: "Success", Result: employees });
    } catch (err) {
        return res.json({ Error: "Get employee error in MongoDB" });
    }
});
//  Admin Count
router.route('/adminCount').get( async (req, res) => {
    try {
        const adminCount = await Employee.find({role:"admin"});
        return res.json({ admin: adminCount.length });
    } catch (err) {
        return res.json({ Error: "Error in running query" });
    }
});
//  Salary Count
router.route('/salary').get (async (req, res) => {
    try {
        // Find employees with role "employee" using $match stage
        const employees = await Employee.aggregate([
            {
                $match: { role: "employee" }
            },
            {
                $group: {
                    _id: null,
                    sumOfSalary: { $sum: "$salary" }
                }
            }
        ]);

        if (employees.length === 0) {
            return res.json({ sumOfSalary: 0 });
        }

        return res.json({ sumOfSalary: employees[0].sumOfSalary });
    } catch (err) {
        return res.json({ Error: "Error in running query" });
    }
});

//  Emplooye Count
router.route('/employeeCount').get( async (req, res) => {
    try {
        const employeeCount = await Employee.find({role:"employee"});
        console.log(employeeCount)
        return res.json({ employee: employeeCount.length });
    } catch (err) {
        console.log(err)
        return res.json(err);
    }
});


//  Login
router.route('/login').post( async (req, res) => {
    try {
       if(req.body.email=="admin@gmail.com" && req.body.password=="adminpassword"){

           const token = jwt.sign({ email: req.body.email }, "jwt-secret-key", { expiresIn: '1d' });
           res.cookie('token', token);
           return res.json({ Status: "Success" });
        }else{
            return res.json({Status:"Error",Error:"Invalid Email or Password"})
        }
    } catch (err) {
        console.log(err)
        return res.json({ Status: "Error", Error: "Error in running query" });
    }
});
// Create Attendance Record
router.route("/attendance").post(async(req,res)=>{
    try {
        const { employeeId, date, status } = req.body;
        
        // Here you can validate the data if needed before saving it to the database
    
        const newAttendance = new Attendance({
            employeeId: employeeId,
          date: date,
          status: status
        });
    
        await newAttendance.save();
        return res.json({ Status: "Success" });
      } catch (err) {
        console.log(err);
        return res.json({ Status: "Error", Error: "Error in running query" });
      }
    }
)
// get all attenadnces
router.route("/attendances").get(async(req,res)=>{
    try{
const attendances=await Attendance.find({})
return res.json({Status:"Success",attendances})
    }catch(err){
        console.log(err)
        return res.json({ Status: "Error", Error: "Error in running query" });
    }
})

// Get single attendecnse
router.route("/attendace").get(async (req, res) => {
    const { id } = req.query; // Use req.query to access query parameters
    try {
      console.log(id);
      const attenadnce = await Attendance.find({ employeeId: id });
      return res.json({ Status: "Success", attenadnce });
    } catch (err) {s
      console.log(err);
      return res.json({ Status: "Error", Error: "Error in running query" });
    }
  });
  
module.exports=router