import { useState } from 'react';
import { Col, Form, FormControl, InputGroup, Row, Table, Button } from 'react-bootstrap';
import './App.css';

function App() {
  const [request, setRequest] = useState({ amount:0, rate:0, terms:0 });
  const [payments, setPayments] = useState([]);

  const handleChange = (e) => {
    console.log(e.target);
    setRequest({ ...request,[e.target.name]:e.target.value});
    console.log(request);
  }
  const handleSubmit = async (event) => {
    console.log(request);

    fetch('/payments',
      {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(request)
    }).then(async response => {
      const data = await response.json();
      if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }
      setPayments(data)
  })
  .catch(error => {
      this.setState({ errorMessage: error.toString() });
      console.error('There was an error!', error);
  });
  };
  return (
    <div className="App">
<Form onSubmit={handleSubmit}>
  <Row>
    <Col>
        <InputGroup className="mb-3">
        <InputGroup.Text>$</InputGroup.Text>
        <FormControl aria-label="Amount " defaultValue={0} name="amount" onChange={handleChange} />
        <InputGroup.Text>.00</InputGroup.Text>
      </InputGroup>
    </Col>
    <Col>
    <InputGroup className="mb-3">
    <FormControl aria-label="Rate" defaultValue={0}  name="rate" onChange={handleChange}/>
    <InputGroup.Text>%</InputGroup.Text>
  </InputGroup>
    </Col>
    <Col>
    <InputGroup className="mb-3">
    <FormControl aria-label="Terms"  defaultValue={0}  name="terms" onChange={handleChange}/>
    <InputGroup.Text> Weeks</InputGroup.Text>
  </InputGroup>
    </Col>
    <Col>
    <Button  variant="secondary" onClick={handleSubmit}>Calculate</Button>

    </Col>
  </Row>
</Form>
<Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Payment</th>
      <th>Pending</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
    {payments.map( (pay,index) => (
      <tr>
          <td>{pay.payment_number}</td>
          <td>{pay.payment_amount}</td>
          <td>{pay.pending_amount}</td>
          <td>{pay.payment_date}</td>
        </tr>
       )
      )
    }
  </tbody>
</Table>
    </div>
  );
}

export default App;
