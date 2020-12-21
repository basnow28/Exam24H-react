import React, { Component } from 'react'
import * as _ from 'lodash'
import './style.css'
import request from '../../utils/request';
import UpdateStudentModal from './UpdateStudentModal';
import { Button } from 'react-bootstrap'

class Student extends Component {
    state = {
        isUpdateModalVisible: false
    }

    onHide = () => {
        this.setState({ isUpdateModalVisible: false })
        window.location.reload()
    }

    render() {
        const { student } = this.props;
        const deleteStudent = () => {
            var answer = window.confirm("Are you sure that you want to delete " + _.get(student, 'student_name'));

            if (answer) {
                request(`${process.env.REACT_APP_URL}/students/${_.get(student, 'student_id')}`,
                    {
                        method: 'delete'
                    }).then(response => window.location.reload());
            }
        }

        return (
            <div className='student-container'>
                <div className='student-property'>{_.get(student, 'student_name')}</div>
                <div className='student-property'>{_.get(student, 'student_email')}</div>
                <div className='student-property'>{_.get(student, 'supervisor.supervisor_name')}</div>
                <Button className='student-property' onClick={() => deleteStudent()}>Delete</Button>
                <Button className='student-property' onClick={() => this.setState({ isUpdateModalVisible: true })}>Update</Button>
                <UpdateStudentModal
                    show={this.state.isUpdateModalVisible}
                    student={student}
                    onHide={this.onHide}
                />
            </div>
        )
    }
}

export default Student;