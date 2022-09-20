import { useForm } from "react-hook-form";
import "./App.css"
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import React, { useEffect, useState} from 'react'
// import axios from 'axios'
import { Col, Button, Alert, Container, Row } from 'react-bootstrap';


function App() {

const [response, setResponse] = useState([])
const [width, setWidth] = useState()
const [height, setHeight] = useState()
const [length, setLength] = useState()
const [show, setShow] = useState()
const [weight, setWeight] = useState()
const [sposobNadania, setSposobNadania] = useState()
const [sposobOdbioru, setSposobOdbioru] = useState()

const Nadanie = (event) => {
  setSposobNadania(event.target.value)
}
const Odbior = (event) => {
  setSposobOdbioru(event.target.value)
}

useEffect(() => {
  console.log("fromPointShipment", sposobNadania)
    console.log( "sposobOdbioru", sposobOdbioru)

}, [sposobNadania, sposobOdbioru])

const checkFromDoorTest = (testOne, testTwo) => {
  if(sposobNadania === "podjazd" && testOne === true){return true}
  if(sposobNadania === "podjazd" && testOne === false){return false}
  if(sposobNadania === "punkt" && testTwo === true){return true}
  if(sposobNadania === "punkt" && testTwo === false){return false}
}

const checkToDoorDeliveryTest = (testOne, testTwo) => {
  if(sposobOdbioru === "podjazd" && testOne === true){return true}
  if(sposobOdbioru === "podjazd" && testOne === false){return false}
  if(sposobOdbioru === "punkt" && testTwo === true){return true}
  if(sposobOdbioru === "punkt" && testTwo === false){return false}
}

const validationSchema = Yup.object().shape({
  weight: Yup.string()
    .matches( /^([0-9]){1,3}$/, 'Podana waga jest większa niz obsługiwana.')
    .min(1, 'Waga musi liczyć najmniej 1 znak')
        .required('Podanie wagi jest obowiązkowe'),
  
});
const formOptions = { resolver: yupResolver(validationSchema) };

const { register, handleSubmit, control, reset, formState } = useForm(formOptions);
const { errors } = formState;



useEffect(() => {
  fetch('https://ak-frontend-task.vercel.app/api/carriers')
  .then((response) => response.json())
  .then(function (data) {
    
    setResponse(data);
    console.log(data)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

},[])

  return (
    <div className="App">
      <header className="App-header">
        <Container style={{borderStyle: "groove", borderRadius: "5%", paddingLeft: "20px", paddingRight: "20px", paddingBottom: "20px, "}}>
<h2>Wyceń  przesyłkę</h2>

      <Col lg="12" style={{display: "flex", flexDirection: "row"}}>
              <div id="weight" isRequired className="m-t-15" style={{paddingRight: "20px"}}>
              Waga
              <div style={{display: "flex", flexDirection: "row"}}>

                <input
                  {...register("weight")}
                  style={inputStyle}
                  name="weight"
                  placeholder="Waga"
                  type="text"
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                />
                <div style={{backgroundColor: "#d9d6d0",
              width: "50px", display: "flex", justifyContent: "center"}}>kg</div></div>
                {errors.weight && (
                  <Alert variant="danger" show={show}>{errors.weight?.message}
                   <Button onClick={() => setShow(false)} variant="outline-success">
            X
          </Button>
                  </Alert>
                )}{" "}
              </div>
        
          
              <div id="width" isRequired className="m-t-15" style={{paddingRight: "20px"}}> 
              Długość
              <div style={{display: "flex", flexDirection: "row"}}>
                <input
                  {...register("width")}
                  style={inputStyle}
                  name="width"
                  placeholder="Waga"
                  type="text"
                  value={width}
                  onChange={(e) => {
                    setWidth(e.target.value);
                  }}
                />
                          <div style={{backgroundColor: "#d9d6d0",
              width: "50px", display: "flex", justifyContent: "center"}}>cm</div></div>
     
            
                {errors.width && (
                  <Alert variant="danger" show={show}>{errors.width?.message}
                   <Button onClick={() => setShow(false)} variant="outline-success">
            X
          </Button>
                  </Alert>
                )}{" "}
              </div>
        
          
              <div id="height" isRequired className="m-t-15" style={{paddingRight: "20px"}}>
                Wysokość
              <div style={{display: "flex", flexDirection: "row"}}>

                <input
                  {...register("height")}
                  style={inputStyle}
                  name="height"
                  placeholder="Długość"
                  type="text"
                  value={height}
                  onChange={(e) => {
                    setHeight(e.target.value);
                  }}
                />
                                        <div style={{backgroundColor: "#d9d6d0",
              width: "50px", display: "flex", justifyContent: "center"}}>cm</div></div>
     
                {errors.height && (
                  <Alert variant="danger" show={show}>{errors.height?.message}
                   <Button onClick={() => setShow(false)} variant="outline-success">
            X
          </Button>
                  </Alert>
                )}{" "}
              </div>
        
          
              <div id="length" isRequired className="m-t-15" style={{paddingRight: "20px"}}>
                Szerokość
              <div style={{display: "flex", flexDirection: "row"}}>

                <input
                  {...register("length")}
                  name="length"
                  style={inputStyle}
                  placeholder="Waga"
                  type="text"
                  value={length}
                  onChange={(e) => {
                    setLength(e.target.value);
                  }}
                />
                                        <div style={{backgroundColor: "#d9d6d0",
              width: "50px", display: "flex", justifyContent: "center"}}>cm</div></div>
     
                {errors.length && (
                  <Alert variant="danger" show={show}>{errors.length?.message}
                   <Button onClick={() => setShow(false)} variant="outline-success">
            X
          </Button>
                  </Alert>
                )}{" "}
              </div>
            </Col>
<Row style={{display: "flex", flexDirection: "row", paddingTop: "20px", paddingBottom: "20px"}}>
<Col lg={6}>Nadanie:
<div style={{display: "flex", flexDirection: "row"}}  onChange={Nadanie}>
        <input type="radio" value="punkt" name="nadanie"/> W punkcie
        <input type="radio" value="podjazd" name="nadanie"/> Podjazd kuriera
</div>
</Col>
<Col lg={6}>Odbiór
<div style={{display: "flex", flexDirection: "row"}}  onChange={Odbior}>
        <input type="radio" value="punkt" name="Odbior"/> W punkcie
        <input type="radio" value="podjazd" name="Odbior"/> Podjazd kuriera
</div>
</Col>
</Row>

            </Container>
            <Container >
<Col style={{display: "flex", flexDirection: "row", paddingTop: "20px",  flexWrap: "wrap"}}>
   {response.filter((z) =>( z.maxHeight > height  && z.maxWeight > weight && z.maxWidth
 > width && checkFromDoorTest(z.fromDoorShipment, z.fromPointShipment) && checkToDoorDeliveryTest(z.toDoorDelivery, z.toPointDelivery)
)).map((delivery, index)=> {
  const minWidthZ =  index+1
  return (
    <div
      style={{
        paddingLeft: "30px",
        height: "120px",
        display: "flex",
        flexDirection: "column",
        borderStyle: "groove",
        borderRadius: "5%",
        flex: "40%",
        width: "100%",
        // minWidth: "150px",
        // maxWidth: "300px",
        borderColor: `${delivery.color}`,
        marginLeft: "10px",
        marginRight: "10px",
        marginTop: "10px",
        marginBottom: "10px",
        alignSelf: "center",
        gap: 0,
      }}
      key={delivery.id}
    >
      <h3 style={{ fontWeight: 500 }}> {delivery.name}</h3>

      <em
        style={{
          color: `${delivery.color}`,
          paddingBottom: "10px",
          marginTop: "-30px",
          fontSize: "16px",
        }}
      >
        {" "}
        {delivery.price} zł
      </em>
    </div>
  );})}     
   </Col> 


            </Container>
      </header>
    </div>
  );
}

export default App;

const inputStyle = {
  width: "50px",
}
