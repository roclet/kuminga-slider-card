import React from "react";
import "./style.css";
import "./normalize.css";
import gsap from "gsap";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Logo from "./mtnlogo.png";
import dot from "./dot.png";
import search from "./search.svg";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
      status : true,
      searchStatus : false
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

    var cellWidth = 320;
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
      return Math.round(x / cellWidth) * cellWidth;
    }

    function updateProgress() {
      animation.progress(wrapProgress(this.x / wrapWidth));
    }

    function initCell(element, index) {
      gsap.set(element, {
        width: cellWidth,
        scale: 0.6,
        //rotationX: rotationX,
        x: -cellWidth,
        margin: "auto"
      });

      var tl = gsap
        .timeline({ repeat: 1 })
        .to(
          element,
          1,
          {
            x: "+=" + wrapWidth /*, rotationX: -rotationX*/,
            marginLeft: "0px",
          },
          0
        )
        .to(
          element,
          cellStep,
          {
            color: "#000000",
            borderBottom: "5px solid #ffc300",
            fontSize: "25px",
            height: "600px",
            fontWeight: 700,
            scale: 1,
            repeat: 1,
            yoyo: true,
          },
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
      status: false
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
      status: false
    });
  };

  getContent = (index) => {
    let data = this.state.data;
    return data[index].title;
  };

  openSearch = () => {
   this.setState({
    searchStatus: true
   })
  }

  render() {
    let data = this.state.data;
    return (
      <div class="content" role="main">
        <nav class="navbar navbar-expand-lg navbar-light bg-light l-navbar">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a class="navbar-brand" href="#">
              <img src={Logo} alt="" class="img-fluid" />
            </a>
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  Store <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Products & Services
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Help & Support
                </a>
              </li>
            </ul>
            <form class="d-flex">
              <ul class="list-inline mt-4 mb-2 mtn-search">
                <li class="list-inline-item me-4" onClick={this.openSearch}>
                  <i class="fa fa-search"></i>
                  <img src={search} />
                </li>
                <li class="list-inline-item me-4">
                  <div class="input-group mb-2">
                  {this.state.searchStatus &&<TextField id="standard-basic" label="" />}
                    <a
                      href="#"
                      id="navbarDropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-expanded="true"
                      class="nav-link dropdown-toggle"
                    >
                      <img src={dot} style={styles.img} />
                      Personal
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                      <li>
                        <a href="#" class="dropdown-item">
                          individual
                        </a>
                      </li>
                      <li>
                        <a href="#" class="dropdown-item">
                          business
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </form>
          </div>
        </nav>
        <main>
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
                <div class="card-title">{this.getContent(0)}</div>
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
                <div class="card-title">{this.getContent(1)}</div>
              </div>
            </div>
            <div className="cell">
              <div className="cell-content">
                <div class="middle-card">
                  <img
                    class="card-sm-image"
                    src="http://www.bilingo.co.za/mtn-digital/assets/small-card.png"
                  />
                </div>
                <br />
                <div class="card-title">{this.getContent(2)}</div>
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
                <div class="card-title">{this.getContent(3)}</div>
                <div class="btn-start">
                  {this.state.status && <a class="card-action">
                    START HERE
                    <NavigateNextIcon />
                  </a>}
                </div>
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
                <div class="card-title">{this.getContent(4)}</div>
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
                <div class="card-title">{this.getContent(5)}</div>
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
                <div class="card-title">{this.getContent(6)}</div>
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
                <div class="card-title">{this.getContent(7)}</div>
              </div>
            </div>
          </div>
          <div style={styles.navSlide}>
            <div style={styles.midleBox}>
              <button style={styles.btn1} onClick={this.backSlide}>
                <ChevronLeftIcon />
              </button>
              <button style={styles.btn2} onClick={this.nextSlide}>
                <NavigateNextIcon />
              </button>
            </div>
          </div>
        </main>
      </div>
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
  btn1: {
    marginRight: 250,
    minHeight: 50,
    maxHeight: 50,
    minWidth: 50,
    maxWidth: 50,
    borderRadius: 25,
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 60,
  },
  btn2: {
    marginLeft: 250,
    minHeight: 50,
    maxHeight: 50,
    minWidth: 50,
    maxWidth: 50,
    borderRadius: 25,
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 60,
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
    padding: 20,
  },
};
