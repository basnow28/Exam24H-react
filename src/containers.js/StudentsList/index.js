import React, { PureComponent } from 'react'
import request from '../../utils/request'
import Student from './student'
import './style.css'

class StudentsList extends PureComponent{
    state = {
        students: []
    }

    componentDidMount(){
        request(`${process.env.REACT_APP_URL}/students`,{
            method:'get'
        }).then(response => this.setState({students:response}))
    }

    render(){
        const { students } = this.state;
        return(
            <div className='students-list-container'>
            <div>Students: </div>
            {students.map(student => <Student student={student} />)}
            </div>
        )
    }
}

export default StudentsList;