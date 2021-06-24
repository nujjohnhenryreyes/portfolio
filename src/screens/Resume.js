import React from 'react';
import classnames from "classnames";
import { Link } from 'react-router-dom';
import {
  Row,
  Col, 
  Card,
  CardBody,
  Button  
} from 'reactstrap';
import SplashScreen from '../components/SplashScreen';
import SideNav from '../components/SideNav';
import Background from '../components/Background';
import Theme from '../constants/Theme';
import SkillBar from 'react-skillbars';
import Images from '../constants/Images'; 
import Information from '../constants/Information'; 
import Files from '../constants/Files'; 

const Resume = () => {
  const mode = localStorage.getItem("light-mode");
  
  /* States */
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLightMode, setIsLightMode] = React.useState(([null, `true`].includes(mode))? true : false);
  const education = [
    { title: "BS in Information Technology", school: "Cavite State University - Imus Campus", dateInterval: "October 2015 - June 2020" },
    { title: "NC II in Computer Systems Servicing", school: "Christ The King College", dateInterval: "January 2019" }
  ];
  const experience = [
    { 
      title: "Mid Software Engineer", company: "Xypher Solutions Inc.", dateInterval: "March 2021 - Present", 
      reponsibilities: [
          "Develop scalable application using MERN Stack.",
          "Develop a cross-platform mobile app using React Native Framework.",
          "Led and supervised the backend department and team project.",
          "Oversaw all major database practices with best systematic methods in MongoDB.",
          "Planning to resolve technical issues and other problems of the team.",
          "Responsible for maintaining good server performance.",
          "Responsible for reviewing code structure and convention."
        ] 
      },
    { 
      title: "Junior Software Engineer", company: "Xypher Solutions Inc.", dateInterval: "July 2020 - March 2021", 
      reponsibilities: [
          "Develop scalable application using MERN Stack.",
          "Develop a cross-platform mobile app using React Native Framework.",
          "Oversaw all major database practices with best systematic methods in MongoDB.",
          "Reviewing code structure and convention of other developers.",
        ] 
    },
    { 
      title: "Quality Assurance Intern ", company: "iLLimitado Inc.", dateInterval: "July 2019 - August 2019", 
      reponsibilities: [
        "Monitor system performance.",
        "Tests every feature of the system and encode bugs and issues encountered in Google Spread Sheet.",
        "Creating wireframes using Power Point Presentation.",
        "Creating wireframes using Power Point Presentation.",
        "Designing payslip for the clients.",
        "Creating flow chart for the future process.",
      ] 
    },
  ];
  const frontend = [
    { "type": "React.js", "level": 90 },
    { "type": "Javascript", "level": 90 },
    { "type": "JQuery", "level": 87 },
    { "type": "HTML/CSS", "level": 89 },
    { "type": "Bootstrap", "level": 85 },
    { "type": "SASS", "level": 82 },
  ];
  const backend = [
    { "type": "Node.js", "level": 92 },
    { "type": "PHP", "level": 89 },
    { "type": "SQL", "level": 91 },
    { "type": "MongoDB", "level": 93 },
  ];
  const miscellaneous = [
    { "type": "Git", "level": 88 },
    { "type": "Design", "level": 84 },
  ];
  const interest = [
    { title: "Movies", icon: "fa-film" },
    { title: "Music", icon: "fa-headphones" },
    { title: "Swim", icon: "fa-swimmer" },
    { title: "Chess", icon: "fa-chess" },
  ];

  /* Effects */
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  /* Handles */
  const handleMouseHover = (e, color) => {
    e.target.style.backgroundColor = color;
  } 

  /* Components */
  const getEducationItems = () => {
    const listItems = education.map((item, index) =>
      <div className="col-6" style={styles.educationContainer} key={index}>
        <div style={styles.educationGroup}>
          <label style={styles.educationTitle}>{item.title}</label>
          <p style={styles.educationSchool}>{item.school}</p>
          <label style={styles.dateLabel}>{item.dateInterval}</label>
        </div>
      </div>
    );

    return listItems;
  }

  const getWorkItems = () => {
    const listItems = experience.map((item, index) =>
      <div className="col-12" style={styles.workContainer} key={index}>
        <div style={styles.workContainerHeader}>
            <label style={styles.workTitle}>{item.title}</label>
            <p style={styles.workCompany}>{item.company}</p>
            <label style={styles.dateLabel}>{item.dateInterval}</label>
        </div>
        <div style={styles.workBody}>
          <ul>
            { getReponsibilitiesItems(item.reponsibilities)}
          </ul>
        </div>
      </div>
    );

    return listItems;
  }
  
  const getReponsibilitiesItems = (array) => {
    const listItems = array.map((item, index) =>
      <li key={index}>{item}</li>
    );

    return listItems;
  }

  const getInterestItems = () => {
    const listItems = interest.map((item, index) =>
      <div style={styles.interestBox} key={index}>
        <label className={`fa ${item.icon}`} style={styles.interestsIconContent} />
        <p>{item.title}</p>
    </div>
    );

    return listItems;
  }

  const switchMode = (e) => {
    setIsLightMode(e.target.checked);
    localStorage.setItem("light-mode", e.target.checked);
  }

  if(!isLoading){
    return (
      <div className="main">  
        <Background />
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
                          Resume
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
                      <Col sm={8} style={styles.colLeft}>
                            <Row>
                                <Col sm={12} style={styles.personalInfoColumn}>
                                    <div style={styles.flexBox}>
                                        <div>
                                            <img src={`${Images.FormalAttireBackground}`} alt="" style={styles.image}/>
                                            <div align="center">
                                              <Link to={Files.CurriculumVitaePdf} target="_blank" download>
                                                <Button 
                                                    onMouseEnter={(e) => handleMouseHover(e, "#325083")} 
                                                    onMouseLeave={(e) => handleMouseHover(e, "#263f6a")}
                                                    style={styles.downloadResumeBtn}>
                                                    <i className="fa fa-download"/> Download Resume
                                                </Button>  
                                              </Link>
                                            </div>  
                                        </div>
                                        <div style={styles.nameSection}>
                                            <div style={styles.nameLabelDiv}>
                                                <label className="fa fa-user" style={styles.userIcon} />
                                                <span style={styles.spanLabel}>PERSONAL INFORMATION</span>
                                            </div>
                                            <div style={styles.infoDiv}>
                                                <div style={styles.infoGroup}>
                                                    <label style={styles.infoGroupLabel}>Name: </label> 
                                                    <span>{`${Information.firstName} ${Information.middleName.charAt(0)}. ${Information.lastName}`}</span>
                                                </div>
                                                <div style={styles.infoGroup}>
                                                    <label style={styles.infoGroupLabel}>Phone: </label> 
                                                    <span>{Information.mobileNumber}</span>
                                                </div>
                                                <div style={styles.infoGroup}>
                                                    <label style={styles.infoGroupLabel}>Email: </label> 
                                                    <span>{Information.emailAddress}</span>
                                                </div>
                                                <div style={styles.infoGroup}>
                                                    <label style={styles.infoGroupLabel}>Address: </label> 
                                                    <span>{Information.completeAddress}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={12} style={styles.educationColumn}>
                                    <div style={styles.educationHeader}>
                                        <label className="fa fa-graduation-cap" style={styles.educationIcon} />
                                        <span style={styles.spanLabel}>EDUCATION</span>
                                    </div>
                                    <div className="row">
                                        { getEducationItems() }
                                    </div>
                                </Col>             
                                <Col sm={12} style={styles.workColumn}>
                                    <div style={styles.workHeader}>
                                        <label className="fa fa-briefcase" style={styles.workIcon} />
                                        <span style={styles.spanLabel}>Work Experience</span>
                                    </div>
                                    <div className="row">
                                        { getWorkItems() }
                                    </div>
                                </Col>                                                   
                            </Row>
                      </Col>
                      <Col sm={4} style={styles.colRight}> 
                            <div className="row">
                                <div className="col-12" style={styles.skillContainer}>
                                    <div style={styles.skillHeader}>
                                        <label className="fa fa-laptop-code"  style={styles.skillsIcon} />
                                        <span style={styles.spanLabel}>SKILLS & TOOLS</span>
                                    </div>
                                    <div style={styles.skillBox}>
                                        <label style={styles.spanLabel}>Frontend</label>
                                        <SkillBar skills={frontend} colors={{
                                        "bar": "#3498db",
                                        "title": {
                                        "text": "#fff",
                                        "background": "#2980b9"
                                        }}} animationDuration={500} animationDelay={100} height={'2vh'}/>
                                    </div>
                                    <div style={styles.skillBox}>
                                        <label style={styles.spanLabel}>Backend</label>
                                        <SkillBar skills={backend} colors={{
                                        "bar": "#da5a7e",
                                        "title": {
                                        "text": "#fff",
                                        "background": "#b93a5e"
                                        }}} animationDuration={500} animationDelay={100} height={'2vh'}/>
                                    </div>
                                    <div style={styles.skillBox}>
                                        <label style={styles.spanLabel}>Miscellaneous</label>
                                        <SkillBar skills={miscellaneous} colors={{
                                        "bar": "#93c66a",
                                        "title": {
                                        "text": "#fff",
                                        "background": "#7baf52"
                                        }}} animationDuration={500} animationDelay={100} height={'2vh'}/>
                                    </div>
                                </div>
                                <div className="col-12" style={styles.interestContainer}>
                                    <div style={styles.interestHeader}>
                                        <label className="fa fa-clock"  style={styles.interestsIcon} />
                                        <span style={styles.spanLabel}>INTERESTS</span>
                                    </div>
                                    <div style={styles.interestFlexBox}>
                                        { getInterestItems() }
                                    </div>
                                </div>
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
  workIcon: { 
    backgroundColor: Theme.COLORS.LABEL_ICON,
    color: Theme.COLORS.WHITE, 
    fontSize: "16px", 
    padding: "8px 9px", 
    borderRadius: "50%", 
    marginRight: "7px", 
    marginBottom: "0px"
  },
  educationIcon: { 
    backgroundColor: Theme.COLORS.LABEL_ICON,
    color: Theme.COLORS.WHITE, 
    fontSize: "16px", 
    padding: "8px 7px 8px 7px", 
    borderRadius: "50%", 
    marginRight: "7px", 
    marginBottom: "0px"
  },
  userIcon: { 
    backgroundColor: Theme.COLORS.LABEL_ICON,
    color: Theme.COLORS.WHITE, 
    fontSize: "16px", 
    padding: "7px 9px 7px 9px", 
    borderRadius: "50%", 
    marginRight: "7px", 
    marginBottom: "0px"
  },
  skillsIcon: { 
    backgroundColor: Theme.COLORS.LABEL_ICON,
    color: Theme.COLORS.WHITE, 
    fontSize: "16px", 
    padding: "8px", 
    borderRadius: "50%", 
    marginRight: "7px", 
    marginBottom: "0px"
  },
  interestsIcon: { 
    backgroundColor: Theme.COLORS.LABEL_ICON,
    color: Theme.COLORS.WHITE, 
    fontSize: "16px", 
    padding: "8px", 
    borderRadius: "50%", 
    marginRight: "7px", 
    marginBottom: "0px"
  },
  interestsIconContent: { 
    backgroundColor: Theme.COLORS.LABEL_ICON,
    color: Theme.COLORS.WHITE, 
    fontSize: "29px", 
    padding: "8px", 
    borderRadius: "50%", 
    marginRight: "7px", 
    marginBottom: "0px"
  },
  spanLabel: { 
    fontWeight: "bold" 
  },
  downloadResumeBtn: { 
    backgroundColor: "#263f6a", 
    border: "0px", width: "190px", 
    marginTop: "7px",
    width: "100%",
    marginBottom: "15px"
  },
  dateLabel: { 
      backgroundColor: "#7192c2", 
      padding: "3px 10px", 
      color: Theme.COLORS.WHITE, 
      borderRadius: "13px", 
      margin: "0px", 
      textAlign: "center",
      margin: "0px",
      fontSize: "11px"
  },
  nameSection: { 
    marginLeft: "7px",
    marginBottom: "7px" 
  },
  nameLabelDiv: { 
    paddingBottom: "20px" 
  },
  colLeft: { 
    padding: "15px" 
  },
  personalInfoColumn: { 
    borderBottom: "1px solid " + Theme.COLORS.BORDER_DIVIDER, 
    paddingRight: "0px" 
  },
  flexBox: { 
    display: "flex", 
    flexWrap: "wrap" 
  },
  image: { 
    height: "170px", 
    border: "1px solid #dee2e9", 
    backgroundColor: "white" 
  },
  infoDiv: { 
    fontSize: "15px" 
  },
  infoGroup: { 
    paddingLeft: "15px" 
  },
  infoGroupLabel: { 
    fontWeight: "bold", 
    width: "70px" 
  },
  educationColumn: { 
    borderBottom: "1px solid " + Theme.COLORS.BORDER_DIVIDER, 
    paddingBottom: "5px" 
  },
  educationHeader: { 
    paddingBottom: "15px", 
    marginTop: "15px" 
  },
  educationContainer: { 
    padding: "0px 30px 0px 30px"
  },
  educationGroup: { 
    marginBottom: "15px" 
  },
  educationTitle: { 
    fontWeight: "bold", 
    marginBottom: "4px" 
  },
  educationSchool: { 
    padding: "0px", 
    margin: "0px 0px 4px 0px" 
  },
  workColumn: { 
    paddingBottom: "5px" 
  },
  workHeader: { 
    paddingBottom: "15px", 
    marginTop: "15px" 
  },
  workContainer: { 
    padding: "0px 30px 5px 30px" 
  },
  workContainerHeader: { 
    marginBottom: "15px" 
  },
  workTitle: { 
    fontWeight: "bold", 
    marginBottom: "4px" 
  },
  workCompany: { 
    padding: "0px",
    margin: "0px 0px 4px 0px" 
  },
  workBody: { 
    marginBottom: "15px" 
  },
  colRight: { 
    padding: "15px" 
  },
  skillContainer: { 
    borderBottom: "1px solid " + Theme.COLORS.BORDER_DIVIDER 
  },
  skillHeader: { 
    paddingBottom: "10px" 
  },
  skillBox: { 
    padding: "0px 10px 10px 10px" 
  },
  interestContainer: { 
    paddingTop: "15px" 
  },
  interestFlexBox: { 
    padding: "0px 10px 10px 10px", 
    display: "flex", 
    flexWrap: "wrap" 
  },
  interestHeader: { 
    paddingBottom: "10px" 
  },
  interestBox: { 
    display: "block", 
    textAlign: "center",
    width: "70px" 
  }
}

export default Resume;
