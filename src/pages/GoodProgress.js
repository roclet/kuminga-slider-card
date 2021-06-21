import React from "react";
import "./style.css";
import "./normalize.css";
import gsap from "gsap";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Logo from "./mtnlogo.png";
import dot from "./dot.png";

export default class GoodProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draggable: null,
      index: 1,
      data: [
        { title: "Home Internet" },
        { title: "Add a Phone-line" },
        { title: "Home Internet" },
        { title: "Get a device" },
        { title: "Upgrade" },
        { title: "Mobile Internet" },
        { title: "Home Internet" },
        { title: "Add a Phone-line" },
      ],
      wrapWidth: 0,
    };
  }

  componentDidMount() {
    this.initJavascript();
  }

  initJavascript = () => {
    let gsap = window.gsap;
    let Draggable = window.Draggable;
    // let InertiaPlugin = window.InertiaPlugin;

    gsap.registerPlugin(Draggable);

    gsap.defaults({ ease: "none" });

    var picker = document.querySelector(".picker");
    var cells = gsap.utils.toArray(".cell");
    var proxy = document.createElement("div");

    var cellWidth = 450;
    //var rotationX = 90;
    var numCells = cells.length;
    var cellStep = 1 / numCells;
    var wrapWidth = cellWidth * numCells;

    var baseTl = gsap.timeline({ paused: true });
    var wrapProgress = gsap.utils.wrap(0, 1);

    gsap.set(picker, {
      //perspective: 1100,
      width: wrapWidth - cellWidth,
    });

    for (var i = 0; i < cells.length; i++) {
      initCell(cells[i], i);
    }

    var animation = gsap
      .timeline({ repeat: -1, paused: true })
      .add(baseTl.tweenFromTo(1, 2, { immediateRender: true }));

    var draggable = new Draggable(proxy, {
      // allowContextM enu: true,
      type: "x",
      trigger: picker,
      inertia: true,
      onDrag: updateProgress,
      onThrowUpdate: updateProgress,
      snap: {
        x: snapX,
      },
      onThrowComplete: function () {
        let biggestElement = cells
          .slice(0)
          .sort(
            (a, b) =>
              gsap.getProperty(a, "scaleX") - gsap.getProperty(b, "scaleX")
          )
          .pop();
        console.log("onThrowComplete. Biggest element:", biggestElement);
      },
    });

    this.setState({
      draggable: draggable,
      gsap: gsap,
      baseTl: baseTl,
      cellStep: cellStep,
      cells: cells,
      wrapWidth: wrapWidth,
    });

    function snapX(x) {
      console.log("snapX > ", Math.round(x / cellWidth) * cellWidth);
      return Math.round(x / cellWidth) * cellWidth;
    }

    function updateProgress() {
      console.log("updateProgress X > ", this.x);
      animation.progress(wrapProgress(this.x / wrapWidth));
    }

    function initCell(element, index) {
      console.log("initCell>>> ", element, " > ", index);
      gsap.set(element, {
        width: cellWidth,
        scale: 0.6,
        //rotationX: rotationX,
        x: -cellWidth,
      });

      var tl = gsap
        .timeline({ repeat: 1 })
        .to(element, 1, { x: "+=" + wrapWidth /*, rotationX: -rotationX*/ }, 0)
        .to(
          element,
          cellStep,
          { color: "#000000", scale: 1, repeat: 1, yoyo: true },
          0.5 - cellStep
        );
      baseTl.add(tl, i * -cellStep);
    }
  };

  backSlide = () => {
    let i = this.state.index;
    let nextPosition = i - 0.1;
    let element = this.state.baseTl.tweenFromTo(i, nextPosition, {
      immediateRender: true,
      duration: 2,
    });
    let tl = this.state.gsap
      .timeline({ repeat: 100 })
      .to(element, 1, { x: "+=" + this.state.wrapWidth }, 0)
      .to(element, this.state.cellStep, { repeat: 100, yoyo: false }, i);
    i = i - 0.1;
    let baseTl = this.state.baseTl.add(tl, i);
    this.setState({
      index: i,
      baseTl: baseTl,
    });
  };

  nextSlide = () => {
    let i = this.state.index;
    let nextPosition = i + 0.1;
    let el = this.state.cells[i];
    let element = this.state.baseTl.tweenFromTo(i, nextPosition, {
      immediateRender: true,
      duration: 2,
    });
    let tl = this.state.gsap
      .timeline({ repeat: 100 })
      .to(element, 1, { x: "+=" + this.state.wrapWidth }, 0)
      .to(element, this.state.cellStep, { repeat: 100, yoyo: false }, i);
    i = i + 0.1;
    let baseTl = this.state.baseTl.add(tl, i);
    this.setState({
      index: i,
      baseTl: baseTl,
    });
  };

  getContent = (index) => {
    let data = this.state.data;
    return data[index].title;
  };

  render() {
    let data = this.state.data;
    return (
      <main>
        <div class="navbar-brand">
          <a href="#home" class="active">
            <img src={Logo} alt="" class="img-fluid" height="100" />
          </a>
          <a href="#news">Store</a>
          <a href="#contact">Products & Services</a>
          <a href="#about">Help & Support</a>
          <div
            class="w3-bar w3-theme w3-xlarge"
            style={styles.navStylew3xlarge}
          >
            <a class="w3-bar-item w3-button w3-right" href="#">
              <i class="fa fa-search"></i>
            </a>
            <span class="w3-bar-item" style={styles.w3BarItem}>
              <img src={dot} style={styles.img} />
              Personal
            </span>
          </div>
        </div>
        <div id="picker" className="picker">
          <div className="cell">
            <div className="cell-content">
              <div>
                <img
                  class="card-sm-image"
                  src="http://www.bilingo.co.za/mtn-digital/assets/small-card.png"
                />
              </div>
              <br />
              <div>{this.getContent(0)}</div>
            </div>
          </div>
          <div className="cell">
            <div className="cell-content">
              <div>
                <img
                  class="card-sm-image"
                  src="http://www.bilingo.co.za/mtn-digital/assets/small-card.png"
                />
              </div>
              <br />
              <div>{this.getContent(1)}</div>
            </div>
          </div>
          <div className="cell">
            <div className="cell-content">
              <div>
                <img
                  class="card-sm-image"
                  src="http://www.bilingo.co.za/mtn-digital/assets/small-card.png"
                />
              </div>
              <br />
              <div>{this.getContent(2)}</div>
            </div>
          </div>
          <div className="cell">
            <div className="cell-content">
              <div>
                <img
                  class="card-sm-image"
                  src="http://www.bilingo.co.za/mtn-digital/assets/small-card.png"
                />
              </div>
              <br />
              <div>{this.getContent(3)}</div>
            </div>
          </div>
          <div className="cell">
            <div className="cell-content">
              <div>
                <img
                  class="card-sm-image"
                  src="http://www.bilingo.co.za/mtn-digital/assets/small-card.png"
                />
              </div>
              <br />
              <div>{this.getContent(4)}</div>
            </div>
          </div>
          <div className="cell">
            <div className="cell-content">
              <div>
                <img
                  class="card-sm-image"
                  src="http://www.bilingo.co.za/mtn-digital/assets/small-card.png"
                />
              </div>
              <br />
              <div>{this.getContent(5)}</div>
            </div>
          </div>
          <div className="cell">
            <div className="cell-content">
              <div>
                <img
                  class="card-sm-image"
                  src="http://www.bilingo.co.za/mtn-digital/assets/small-card.png"
                />
              </div>
              <br />
              <div>{this.getContent(6)}</div>
            </div>
          </div>
          <div className="cell">
            <div className="cell-content">
              <div>
                <img
                  class="card-sm-image"
                  src="http://www.bilingo.co.za/mtn-digital/assets/small-card.png"
                />
              </div>
              <br />
              <div>{this.getContent(7)}</div>
            </div>
          </div>
        </div>
        <div style={styles.navSlide}>
          <div style={styles.midleBox}>
            <button style={styles.btn} onClick={this.backSlide}>
              <ChevronLeftIcon />
            </button>
            <button style={styles.btn} onClick={this.nextSlide}>
              <NavigateNextIcon />
            </button>
          </div>
        </div>
      </main>
    );
  }
}

const styles = {
  navStylew3xlarge: {
    float: "right",
    paddingRight: "200px",
  },
  w3BarItem: {
    marginTop: "20px",
  },
  img: {
    width: "10px",
    marginRight: "10px",
  },
  btn: {
    margin: 30,
    minHeight: 50,
    maxHeight: 50,
    minWidth: 50,
    maxWidth: 50,
    borderRadius: 25,
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  navSlide: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  midleBox: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  cellContent: {},
  cell: {
    position: "relative",
    top: 0,
    left: 0,
    margin: 10,
    /*maxWidth: 450,*/
    minWidth: 450,
    /*maxHeight:450,*/
    minHeight: 650,
    fontSize: 26,
    fontWeight: "500",
    color: "rgba(0, 0, 0, 0.92)",
    userSelect: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee",
    transformOrigin: "center bottom",
    border: "1px solid black",
    borderRadius: 5,
  },
  picker: {
    display: "flex",
    flexDirection: "row",
    /*backgroundColor: "green",*/
    position: "absolute",
    overflow: "hidden",
    width: 400,
    borderRadius: "2px",
    boxShadow:
      "0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),\n" +
      "    0 1px 10px 0 rgba(0, 0, 0, 0.12)",
  },
  main: {
    display: "flex",
    position: "relative",
    flexDirection: "row",
    maxWidth: "90%",
    minWidth: "90%",
    height: "100%",
    /*overflow: "hidden",*/
    alignItems: "center",
    justifyContent: "center",
    /* backgroundColor: "red",*/
    padding: 20,
  },
};
