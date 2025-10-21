import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

function FirstPart(){
    return (
        <Container className='bg-secondary py-5' fluid>
            <Row lg={5}>
                <Col lg={6} md={8} className='mx-auto'>
                <h1 className=''>Example</h1>
                <p className='lead'>Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
                <Button>Main call to action</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default FirstPart