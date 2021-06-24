import React from 'react';
import classnames from "classnames";
import {
  Row,
  Col, 
  Card,
  CardBody,
  CardImg, 
} from 'reactstrap';
import SplashScreen from '../components/SplashScreen';
import SideNav from '../components/SideNav';
import Background from '../components/Background';
import Theme from '../constants/Theme';
import Lightbox from 'react-image-lightbox';
import Images from '../constants/Images'; 
import Information from '../constants/Information'; 

const Index = (props) => {
  const mode = localStorage.getItem("light-mode");
  
  /* States */
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLightMode, setIsLightMode] = React.useState(([null, `true`].includes(mode))? true : false);
  const [imageViewer, setImageViewer] = React.useState({ photoIndex: 0, isOpen: false });
  const [projectCode, setProjectCode] = React.useState(null);
  const [images, setImages] = React.useState([]);
  const projects = [
    { 
      title: "THESIS: eJOBCAV", 
      finishedOn: "July 2019",
      stack: "HTML5 / CSS3 / Javascript / PHP / MySQL",        
      selectedImage: Images.Thesis[0],
      projectCode: "PROJECT1",
      images: Images.Thesis
    },
  ];

  /* Effects */
  React.useEffect(() => {
    if(props.location.latestProject && projects.length){
      const index = projects.length - 1;

      setImages(projects[index].images);    
      setImageViewer({ ...imageViewer, isOpen: true });
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  /* Handles */
  const handleMouseHover = (e, status) => {
      setProjectCode(status);
      return e.target.style.backgroundColor = (!status) ? "transparent" : "#767777";     
  }

  const handleOnClick = (e, index) => {
    setImages(projects[index].images);    
    setImageViewer({ ...imageViewer, isOpen: true });
  }

  const onCloseRequest = () => {
    setImages([]);
    setImageViewer({ photoIndex: 0, isOpen: false });
  }

  const switchMode = (e) => {
    setIsLightMode(e.target.checked);
    localStorage.setItem("light-mode", e.target.checked);
  }

  /* Components */
  const getProjectItems = () => {
    const listItems = projects.map((item, index) =>
      <div className="col-md-12 col-xl-4" style={styles.portfolioColumn} key={index}>
        <Card body style={styles.portfolioBox}>
            <div style={styles.boxBody} align="center">
                <div 
                  onMouseEnter={(e) => handleMouseHover(e, item.projectCode)}
                  onMouseLeave={(e) => handleMouseHover(e, null)}     
                  onClick={(e) => handleOnClick(e, index)}                                        
                  style={styles.imageContainer} />
                  <CardImg src={`${item.selectedImage}`} 
                  alt=""
                  className={classnames({
                      "portfolio-on": (projectCode === item.projectCode),
                      "portfolio-off": (projectCode !== item.projectCode),
                    })}
                  style={styles.image} />
              </div>
            <div style={styles.boxFooter}>
               <div>
                <label>{item.title}</label>
                  <label style={styles.dateLabel} >{item.finishedOn}</label>
               </div>
               <div>
                <label>STACK:</label>
                <span> {item.stack}</span>
            </div>
            </div>   
          </Card>                                                        
      </div>
    );

    return listItems;
  }

  if(!isLoading){
    return (
      <div className="main">  
        <Background />
        {imageViewer.isOpen && images.length && (
              <Lightbox
                  mainSrc={images[imageViewer.photoIndex]}
                  nextSrc={images[(imageViewer.photoIndex + 1) % images.length]}
                  prevSrc={images[(imageViewer.photoIndex + images.length - 1) % images.length]}
                  onCloseRequest={() => onCloseRequest()}
                  onMovePrevRequest={() =>
                      setImageViewer({ ...imageViewer, ["photoIndex"]: (imageViewer.photoIndex + images.length - 1) % images.length})
                  }
                  onMoveNextRequest={() =>
                      setImageViewer({ ...imageViewer, ["photoIndex"]: (imageViewer.photoIndex + 1) % images.length })
                  }
              />
          )}
        <div style={styles.frontScreen}>
           <Row style={styles.mainRow}> 
              <Col md={5} lg={4} xl={3} style={styles.colSideNav}>
                <SideNav admin={Information} isLightMode={isLightMode} />
              </Col>
              <Col md={7} lg={8} xl={9} style={styles.colBody}>
                <Card body style={(!isLightMode) ? styles.darkCard : styles.lightCard}>
                  <CardBody style={{color: `${(!isLightMode) ? Theme.COLORS.WHITE : Theme.COLORS.DARKTEXT}`}}>
                    <Row style={styles.bodyRow}>
                      <Col style={styles.pageTitle}>
                          PORTFOLIO 
                      </Col>
                      <Col style={styles.noPadding}>
                        <div style={styles.toggleContainer}>
                          <input
                              className="switch-checkbox"
                              id="switch-mode"
                              checked={isLightMode}
                              onChange={e => switchMode(e)}
                              type="checkbox"
                              style={{ display: "none" }}
                            />
                          <label
                              className={classnames({
                                "dark-mode-label": !isLightMode,
                                "light-mode-label": isLightMode,
                              })}
                              htmlFor="switch-mode"
                              style={{ margin: "0px" }}
                            > 
                              <span className={classnames({
                                "dark-mode-button": !isLightMode,
                                "light-mode-button": isLightMode,
                              })} /> 
                          </label>
                        </div>  
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12} style={styles.portfolioSection}>
                        <div className="row">
                            { getProjectItems() }
                        </div>
                      </Col>
                    </Row>
                  </CardBody>     
              </Card>
              </Col>
           </Row>
        </div>
    </div>
    );
  }else{
    return (<SplashScreen />);
  }
}

const styles = {
  frontScreen: { 
    height: "100%", 
    width: "100%", 
    position: "relative", 
    zIndex: "2",
    overflowX: "hidden",
    padding: "2%"
  },
  lightCard: { 
    height: "100%", 
    paddingTop: "0px",
    overflow: "auto" 
  },
  darkCard: { 
    height: "100%", 
    paddingTop: "0px" ,
    overflow: "auto",
    backgroundColor: Theme.COLORS.DARKMODE
  },
  mainRow: { 
    height: "100%", 
    padding: "3px"
  },
  colSideNav: { 
    paddingRight: "10px", 
    marginBottom: "10px"
  },
  colBody: { 
    marginBottom: "10px", 
    height: "100%" 
  },
  bodyRow: { 
    borderBottom: "1px solid " + Theme.COLORS.MUTED 
  },
  pageTitle: { 
    padding: "0px", 
    fontSize: "23px", 
    fontWeight: "bold" 
  },
  noPadding: { 
    padding: "0px"
  },
  toggleContainer: { 
    padding: "0px", 
    float: "right"  
  },
  portfolioSection: { 
    padding: "15px",
    marginBottom: "15px" 
  },
  dateLabel: { 
    backgroundColor: "#7192c2", 
    padding: "2px 10px", 
    color: Theme.COLORS.WHITE, 
    borderRadius: "13px", 
    margin: "0px", 
    textAlign: "center",
    margin: "0px",
    fontSize: "11px",
    float: "right"
  },
  portfolioColumn: { 
    padding: "5px",
    minWidth: "400px" 
  },
  portfolioBox: { 
    padding: "7px", 
    color: Theme.COLORS.DARKTEXT 
  },
  boxBody: { 
    height: "250px", 
    backgroundColor: "#eff1ef", 
    position: "relative", 
    overflow: "hidden" 
  },
  imageContainer: { 
    position: "absolute", 
    height: "100%", 
    width: "100%", 
    zIndex: "1", 
    backgroundColor: "transparent", 
    opacity: "0.3", 
    cursor: "pointer" 
  },
  image: { 
    height: "100%", 
    width: "auto", 
    maxWidth: "100%", 
    cursor: "pointer", 
    position: "relative", 
    zIndex: "0" 
  },
  boxFooter: { 
    paddingTop: "7px", 
    fontSize: "12px", 
    fontWeight: "bold" 
  }
}

export default Index;
