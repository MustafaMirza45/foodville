/*eslint-disable*/
import { nodeName } from 'jquery';
import React, { Component } from 'react';
import { Link, Redirect , withRouter} from 'react-router-dom';
import { Card, CardImg, CardTitle, CardHeader, Breadcrumb, BreadcrumbItem, CardBody, CardText ,Button, Media, CardImgOverlay, Row,  Label, Col, Modal,ModalBody,ModalHeader} from 'reactstrap';
import { fetchManagers, fetchRestaurant, imgupl} from '../redux/ActionCreators';
import { connect } from 'react-redux';

import Tabs from "./tab/Tabs"; 
const baseUrl='http://localhost:3003/'

const filterBySize = (file) => {
    //filter out images larger than 5MB
    return file.size <= 5242880;
  };
const mapStateToProps = state=>{
    
    return{
        manager: state.managers,
        restaurant: state.restaurants,
    };
  }
  const mapDispatchToProps = dispatch => ({
    fetchManagers: (m)=>{dispatch(fetchManagers(m))},
    fetchRestaurant: (m)=>{dispatch(fetchRestaurant(m))},
    imgupl: (m)=>{dispatch(imgupl(m))}
  });

function Rendermanagersitem(props){
    const restaurant =props.rest.map((res)=>{
        return(
           
            <div key={res.Restaurant_ID} label={res.Rest_Name} >
                <Card className="cards bord" body  style={{borderColor: '#0000' }}>
                  
                        <div className="block    mx-auto">
                           
                            {res.img_src === null?
                            <CardImg className="cut" width="100%" src={baseUrl + "images/default.jpg"} alt={res.Rest_Name} />
                            :    
                            <CardImg className="cut" width="100%"  src={baseUrl + res.img_src} alt={res.Rest_Name} />  
                            }

                            <Row className="form-group">
                                    <Col md={{size: 12, offset: 0}}>
                                    <Button outline onClick={props.toggleModal}><span className="fa fa-image"></span>Upload image</Button>
                                                                                
                                <Modal className=" tfont shadows " isOpen={props.ismodalopen} toggle={props.toggleModal}>
                                    
                                    <ModalBody className=" shadows">
                                       {props.file}
                                        <Button outline onClick={props.toggleModal}><span className="fa fa-backward"></span>Back</Button>
                                    </ModalBody>
                                    
                                </Modal>
                                   
                                    </Col>
                            </Row>

                            
                        </div>
                   
                   
                   
                    <CardHeader className="center"><CardTitle><h3 className="tfont"><b>{res.Rest_Name}</b></h3></CardTitle></CardHeader>
                    <CardBody className="card-body">
                        <CardText><b>Cuisine:</b> {res.Cuisine_Type}</CardText>
                        {res.Rating?
                         <CardText><b>Rating:</b>{res.Rating}</CardText>:
                         <CardText><b>Rating:</b>No Ratings</CardText>}
                       
                        <CardText><b>Contact_no:</b>{res.Contact_no}</CardText>
                        <CardText><b>Website:</b><a href={"https://"+ res.Website} target="_blank">{res.Website}</a></CardText>
                    </CardBody>
                </Card>
            </div>)
    })
    
    if (props.rest.length != 0){
        return(
            <Tabs>
               {restaurant}
            </Tabs>
        )
    }else{
        return(
            <Tabs>
                <div className="cards bord" label="None Registered">
                    <h1>why dont you register your first restaurant now</h1>
                </div>
                <div label=""> 
                </div> 
            </Tabs>
        )
    }
   
}
class Manager extends Component {// same as making a  menu function
    constructor(props){
        super(props);
        this.state={
              
            ismodalopen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }
    handleSubmit(event) {
        event.preventDefault();
        const formdata= new FormData();
        formdata.append("image",this.fileInput.current.files[0]);
        if(this.fileInput.current.files[0]){
            this.props.imgupl(formdata);
            this.setState({
                ismodalopen: !this.state.ismodalopen

            });
        }
        else{
            alert("please upload photo")
        }
      }
     toggleModal(){
            this.setState({
                ismodalopen: !this.state.ismodalopen
    
            });
        }
    componentDidMount(){
        this.props.fetchManagers(this.props.login.Id);
        this.props.fetchRestaurant(this.props.login.Id);
    }
     render(){
       
        const file= (a)=>{
            return (
                <>
                  <div>
                    <form onSubmit={this.handleSubmit}>
                    <label>
                        Upload file:
                        <input type="file" ref={this.fileInput} />
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                    </form>
                </div>
                </>
              );
        }
       
           const manager = this.props.manager.managers.map((manager)=>{

            
                return (
                <div key={manager.Manager_ID} className="col-10 col-md-8 m-8 tfont text mx-auto">
                    
                    
                    <Card className="cards2  row">   
                        <CardBody>
                            
                                <CardTitle><b className="colort">'  Name:    </b>{manager.Manager_Name}</CardTitle>
                                <div className="row">
                                    <div className=" col-12 col-md-6">
                                        <CardText><b className="colort">'  Email:  </b>{manager.Manager_Email}</CardText> 
                                    </div>
                                    <div className=" col-12 col-md-6">
                                        <CardText><b className="colort">' Joined on:   </b>{manager.Join_date.split("T")[0]}</CardText> 
                                    </div>
                                    <div className=" col-12 col-md-12">
                                        <CardText><b className="colort1">'Restaurants registered:   </b>{this.props.restaurant.restaurants.length}</CardText> 
                                    </div>
                                    <div className=" col-2 mx-auto">
                                    <Link to="/addres">
                                        <Button outline>
                                            <span className="fa fa-delicious"  >Add Restaurant</span>
                                        </Button>
                                    </Link>
                                        
                                    </div>
                                    
                                    <div className=" col-12 col-md-12 center">
                                        <CardHeader><b>OVERVIEW</b></CardHeader> 
                                    </div>
                                </div>
                                {console.log(this.props.restaurant.restaurants.length)}
                                <Rendermanagersitem rest={this.props.restaurant.restaurants} ismodalopen={this.state.ismodalopen} toggleModal={this.toggleModal} file={file()}/>
                                
                                
                        </CardBody>
                    </Card>
                </div>
                );
                })
            if(this.props.manager.loading){
                return(
                    <div>
                        <h1>loading</h1>
                    </div>
                )
            }else{
                return(
                    <div className="row-content">
                        {manager}
                    </div>
                )
    
            }
            
    };



}
export  default withRouter(connect(mapStateToProps,mapDispatchToProps)(Manager));
/**/