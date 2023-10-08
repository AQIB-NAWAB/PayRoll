import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
function EmployeeDetail() {
    const pdfRef=useRef()
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [attendanceDataFetched, setAttendanceDataFetched] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8081/api/v1/get/${id}`)
      .then(res => {
        setEmployee(res.data.Result);
        axios.get(`http://localhost:8081/api/v1/attendace?id=${res.data.Result._id}`)
          .then(res => {
            setAttendances(res.data.attenadnce);
            setAttendanceDataFetched(true); // Mark attendance data as fetched
            console.log(res.data);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleLogout = () => {
    axios.get('http://localhost:8081/api/v1/logout')
      .then(res => {
        navigate('/start');
      })
      .catch(err => console.log(err));
  };
  const downloadPDF = () => {

    const input = pdfRef.current;
    
    html2canvas(input).then((canvas) => {
    
    const imgData = canvas.toDataURL('image/png');
     const pdf = new jsPDF('p', 'mm', 'a4', true);
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const imgWidth = canvas.width;
     const imgHeight= canvas.height;
    
    const ratio= Math.min(pdfWidth / imgWidth, pdfHeight/imgHeight);
    
    const imgx= (pdfWidth - imgWidth * ratio) / 2;
    
    const imgY= 30;
    
    pdf.addImage(imgData, 'PNG', imgx, imgY, imgWidth *ratio, imgHeight* ratio); pdf.save('invoice.pdf');
    })
  }
  return (
    <div className="container py-4">
        <div className='pdf' ref={pdfRef}>

        <div className="d-flex  align-items-center my-5" style={{gap:"100px"}}> 
        <img
            src={`http://localhost:8081/images/${employee.image}`}
            alt="Employee"
            className='empImg'
            style={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "50%" }}
            />
          <h2>Dear {employee.name}</h2>
        </div>
      <div className='d-flex  flex-sm-column flex-md-column flex-xl-row  justify-content-between  mb-4'>
        <div className="general">
          
          <div className='d-flex gap-2 flex-column mt-3'>
            <h2>General Information</h2>
            <h5>Name: {employee.name}</h5>
            <h5>Email: {employee.email}</h5>
            <h5>Salary: {employee.salary}</h5>
            <h5>Address: {employee.address}</h5>
            <h5>Gender: {employee.gender}</h5>
          </div>
        </div>
        <div className="job_related d-flex gap-2 flex-column mt-3">
            <h2>Job Information</h2>
          <h5>Designation: {employee.designation}</h5>
          <h5>Date of Joined: {employee.dateOfJoined}</h5>
          <h5>HRA: {employee.hra}</h5>
          <h5>DA: {employee.da}</h5>
          <h5>MA: {employee.ma}</h5>
          <h5>Tax: {employee.tax}</h5>
          <h5>Deduction for Leave: {employee.deductionForLeave}</h5>
          <h5>Welfare Fund: {employee.welfareFund}</h5>
        </div>
      </div>

        </div>
      <button className='btn btn-danger' style={{position:"absolute",top:"30px",right:"30px"}} onClick={handleLogout}>Logout</button>
<button className='btn btn-primary' onClick={downloadPDF}>Download PDF</button>
      <div className='table-responsive mt-4'>
        <h2>Attendance History</h2>
        {attendanceDataFetched ? (
            <table className='table table-striped'>
            <thead>
              <tr>
                <th>History Id</th>
                <th>Name</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendances.map((attendance, index) => (
                <tr key={index}>
                  <td>{attendance._id}</td>
                  <td>{employee.name}</td>
                  <td>{attendance.date}</td>
                  <td
                    style={
                      attendance.status === "present"
                        ? { color: "green", fontWeight: "bold" }
                        : { color: "red", fontWeight: "bold" }
                    }
                  >
                    {attendance.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading attendance data...</p>
        )}
      </div>
    </div>
  );
}

export default EmployeeDetail;
