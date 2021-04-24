import {Modal, Button, Form} from 'react-bootstrap';
import {useContext, useEffect, useState} from 'react'
import {PostContext} from "../../contexts/PostContext";

const UpdatePostModal = () => {
    //Contexts
    const {
        postState: {post},
        showUpdatePostModal,
        setShowUpdatePostModal,
        updatePost,
        setShowToast} = useContext(PostContext)
    //state
    const [updatedPost, setUpdatedPost] = useState(post)

    useEffect(() => setUpdatedPost(post), [post])
    const {title, description, url, status} = updatedPost

    const onChangeUpdatedPostForm = event => setUpdatedPost({...updatedPost, [event.target.name]: event.target.value})
    const closeDialog = () => {
        setUpdatedPost(post)
        setShowUpdatePostModal(false)
    }
    const onSubmit = async event => {
        event.preventDefault()
        const {success, message} = await updatePost(updatedPost)
        setShowUpdatePostModal(false)
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
    }
    return (
        <Modal show={showUpdatePostModal} onHide={closeDialog} >
            <Modal.Header closeButton>
                <Modal.Title>
                    Making progress
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Control type='text' placeholder='Title' name='title' value={title} onChange={onChangeUpdatedPostForm} required aria-describedby='title-help'/>
                            <Form.Text id='title-help' muted>
                                Required
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control as='textarea' placeholder='Description' value={description} onChange={onChangeUpdatedPostForm} rows={3} name='description' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='text' placeholder='Youtube Tutorial URL' value={url} onChange={onChangeUpdatedPostForm} name='url' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control as='select' value={status} onChange={onChangeUpdatedPostForm} name='status'>
                                <option value="TO LEARN">TO LEARN</option>
                                <option value="LEARNING">LEARNING</option>
                                <option value="LEARNED">LEARNED</option>
                            </Form.Control>
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

export default UpdatePostModal
