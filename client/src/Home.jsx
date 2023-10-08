import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { ArcElement} from 'chart.js'
import Chart from 'chart.js/auto';
Chart.register(ArcElement);
function Home() {
  const [adminCount, setAdminCount] = useState()
  const [employeeCount, setEmployeeCount] = useState()
  const [salary, setSalary] = useState()
  const [admins,setAdmins]=useState([])
  const doughnutState = {
    labels: ["Total", "Salary"],
    datasets: [
      { 
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [400000, salary], // Update with dynamic values
      },
    ],
  };
  useEffect(() => {
    axios.get('http://localhost:8081/api/v1/adminCount')
		.then(res => {
			setAdminCount(res.data.admin)
		}).catch(err => console.log(err));

    axios.get('http://localhost:8081/api/v1/employeeCount')
		.then(res => {
			setEmployeeCount(res.data.employee)
		}).catch(err => console.log(err));

    axios.get('http://localhost:8081/api/v1/salary')
		.then(res => {
			setSalary(res.data.sumOfSalary)
		}).catch(err => console.log(err));
axios.get('http://localhost:8081/api/v1/getAdmins').then(res=>{
  setAdmins(res.data.Result)
}).catch(err => console.log(err));
  } , [])
  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Budget</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total:400000</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {employeeCount}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {salary}</h5>
          </div>
        </div>
      </div>

      <div className="doughnutChart w-100   py-5 ">
        <Doughnut data={doughnutState} className='m-auto' />
      </div>

    </div>
  )
}

export default Home