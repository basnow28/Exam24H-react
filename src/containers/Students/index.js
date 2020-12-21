import React, { PureComponent } from 'react'
import StudentsList from '../StudentsList/index';
import { Button } from 'react-bootstrap'
import CreateStudentModal from './CreateStudentModal'

class Students extends PureComponent {
    state = {
        isCreateStudentModalVisible: false
    }

    onHide = () => {
        this.setState({ isCreateStudentModalVisible: false })
        window.location.reload()
    }

    render() {
        return (
            <div>
                <StudentsList />
                <Button style={{marginLeft:'100px', marginBottom:'100px'}} onClick={() => this.setState({ isCreateStudentModalVisible: true })}>Create a new student</Button>
                <CreateStudentModal
                    show={this.state.isCreateStudentModalVisible}
                    onHide={this.onHide}
                />
            </div>
        )
    }
}

export default Students;