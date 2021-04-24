import {Modal, Button, Form} from 'react-bootstrap';
import {useContext, useState} from 'react'
import {PostContext} from "../../contexts/PostContext";

const AddPostModal = () => {
    //Contexts
    const {showAddPostModal, setShowAddPostModal, addPost, setShowToast} = useContext(PostContext)
    //state
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN',
    })
    const {title, description, url, status} = newPost

    const onChangeNewPostForm = event => setNewPost({...newPost, [event.target.name]: event.target.value})
    const closeDialog = () => {
        resetAddPostData()
    }
    const onSubmit = async event => {
        event.preventDefault()
        const {success, message} = await addPost(newPost)
        resetAddPostData()
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
    }
    const resetAddPostData = () => {
        setNewPost({title: '', description: '', url: '', status: 'TO LEARN'})
        setShowAddPostModal(false)
    }
    return (
        <Modal show={showAddPostModal}  onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>
                    What do you want to learn?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Control type='text' placeholder='Title' name='title' value={title} onChange={onChangeNewPostForm} required aria-describedby='title-help'/>
                            <Form.Text id='title-help' muted>
                                Required
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control as='textarea' placeholder='Description' value={description} onChange={onChangeNewPostForm} rows={3} name='description' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='text' placeholder='Youtube Tutorial URL' value={url} onChange={onChangeNewPostForm} name='url' />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={closeDialog} variant='secondary'>Cancel</Button>
                        <Button variant='primary' type='submit'>LearnIt</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default AddPostModal
