import React from 'react'
import 'carda.css'
import pc from "../assets/pc person.png"
const Carda = () => {
  return (
    <div className="card-box">
        <div className="img-card">
            <img src={pc} alt="" className="img-box" />
        </div>
      <h3 className="box-title">Document Verification</h3>
      <p className="box-description">this is the section for document verification and 
        explains well.
      </p>
    </div>
  )
}

export default Carda
