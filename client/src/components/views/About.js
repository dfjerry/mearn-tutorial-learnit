import {Row, Col, Button} from "react-bootstrap";

const About = () => {
    return (
        <Row className='mt-5' style={{marginRight: 0}}>
            <Col className="text-center">
                <Button
                    variant='primary'
                    href='google.com'
                    size='lg'
                >
                    Visit google
                </Button>
            </Col>
        </Row>
    )
}
export default About
