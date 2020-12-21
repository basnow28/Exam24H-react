import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import request from '../../utils/request';

class UpdateStudentModal extends Component {
    state = {
        supervisors: [],
        student_name: this.props.student.student_name,
        student_email: this.props.student.student_email,
        supervisor_name: this.props.student.supervisor.supervisor_name,
        supervisor_id: this.props.student.supervisor.supervisor_id
    }

    updateStudent = () => {
        const student = {
            student_name:this.state.student_name,
            student_email:this.state.student_email,
            supervisor:{
                supervisor_id: this.state.supervisor_id
            }
        }

        request(`${process.env.REACT_APP_URL}/students/${this.props.student.student_id}`,
        {
            method: 'put',
            data: student
        }).then(response => alert("Student updated successfully"))
    }

    componentDidMount(){
        request(`${process.env.REACT_APP_URL}/supervisors`, {
            method:'get'
        }).then(response => this.setState({supervisors: response}))
    }

    render() {
        const { supervisors } = this.state;

        return (
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                {...this.props}>
                <Modal.Header>
                    Update Student Information
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                Student Name
                            </Form.Label>
                            <Form.Control type="text" placeholder="Type Student's name"
                                onChange={e => {
                                    this.setState({ student_name: e.target.value })
                                }}
                                value={this.state.student_name}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Student Email
                            </Form.Label>
                            <Form.Control type="text" placeholder="Type Student's email"
                                onChange={e => {
                                    this.setState({ student_email: e.target.value })
                                }}
                                value={this.state.student_email}
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Teacher</Form.Label>
                            <Form.Control as="select"
                                value={this.state.supervisor_id}
                                onChange={e => {
                                    this.setState({ supervisor_id: e.target.value})
                                }}>
                                {supervisors && supervisors.map(s => (<option value={s.supervisor_id}>{s.supervisor_name}</option>))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.props.onHide()}>Close</Button>
                    <Button onClick={() => this.updateStudent()} >Update</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default UpdateStudentModal