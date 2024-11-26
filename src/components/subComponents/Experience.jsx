import "../../Css/subComponents.css";

function Experience() {
  return (
    <div id="Experience" className="Experience">
      <h1 className="SectionHeader">experience.</h1>
      <div className="SectionContent">
        <div className="SubSection">
          <div className="ExpInfo">
            <div className="ExpInfoHeader">
              <span>Virtusa</span>
              <span className="SubText">Aug 2019 - Aug 2021</span>
            </div>
            <div className="ExpInfoContent">
              <p>Software Engineer [Fullstack]</p>
              <span className="SubText">
                At Virtusa, I contributed to the design, development, and
                implementation of application code while actively participating
                in Agile activities like grooming, sprint planning, demos, and
                retrospectives. I honed my skills in database architecture by
                creating efficient structures and writing complex SQL queries to
                support data analysis. My work involved customizing and
                maintaining user interface components for frameworks like Smart
                Disputes and CPM, integrating responsive web designs to enhance
                functionality and usability. Additionally, I focused on
                optimizing application performance, defect resolution, and unit
                testing to ensure the delivery of high-quality applications with
                100% test coverage.
              </span>
            </div>
          </div>
          <div className="ExpInfo" style={{ alignSelf: "flex-start" }}>
            <div className="ExpInfoHeader">
              <span>Oklahoma State University</span>
              <span className="SubText">Feb 2022 - May 2022</span>
            </div>
            <div className="ExpInfoContent">
              <p>Software Engineer [Front-end]</p>
              <span className="SubText">
                As a part-time developer at Oklahoma State University, I
                maintained and enhanced the university's web application. I
                resolved technical issues, improved functionality, and optimized
                the user experience to align with stakeholder needs. This
                experience allowed me to refine my problem-solving skills and
                strengthen my ability to deliver high-quality solutions under
                time constraints, all while balancing academic responsibilities.
              </span>
            </div>
          </div>
          <div className="ExpInfo">
            <div className="ExpInfoHeader">
              <span>Empyra</span>
              <span className="SubText">May 2022 - Present</span>
            </div>
            <div className="ExpInfoContent">
              <p>Software Engineer [Fullstack]</p>
              <span className="SubText">
                At Empyra, I played a key role in building the foundation of the
                myOneFlow cross-platform mobile application using React Native
                and Redux. I developed app components utilizing React Native
                hooks, migrated existing code, and created responsive user
                interfaces inspired by Figma designs. I also worked on critical
                features like Biometric Login using React Native Touch ID and
                encrypted storage libraries, ensuring secure and seamless user
                access. Beyond mobile, I contributed as a full-stack developer,
                maintaining a legacy ASP.NET web app while developing new
                modules in React as part of a transition to modern technologies.
                My efforts included managing a shared API project in C# that
                supports both web and mobile platforms, ensuring consistency
                across applications. I also spearheaded app releases on the
                Google Play Store and iOS App Store, while using BrowserStack
                for rigorous cross-platform testing.
              </span>
            </div>
          </div>
        </div>
        <img src="assets/Experience.png" className="exp-img" />
      </div>
    </div>
  );
}

export default Experience;
