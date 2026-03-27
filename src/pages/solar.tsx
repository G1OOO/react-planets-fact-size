import "./solar.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SourceIcon from "../assets/icon-source.svg";
import CelestialData from "../data.json";
import MenuIcon from "../assets/icon-hamburger.svg";
import ChevronIcon from "../assets/icon-chevron.svg";

import MercuryImg from "../assets/planet-mercury.svg";
import VenusImg from "../assets/planet-venus.svg";
import EarthImg from "../assets/planet-earth.svg";
import MarsImg from "../assets/planet-mars.svg";
import JupiterImg from "../assets/planet-jupiter.svg";
import SaturnImg from "../assets/planet-saturn.svg";
import UranusImg from "../assets/planet-uranus.svg";
import NeptuneImg from "../assets/planet-neptune.svg";

import MercuryInternalImg from "../assets/planet-mercury-internal.svg";
import VenusInternalImg from "../assets/planet-venus-internal.svg";
import EarthInternalImg from "../assets/planet-earth-internal.svg";
import MarsInternalImg from "../assets/planet-mars-internal.svg";
import JupiterInternalImg from "../assets/planet-jupiter-internal.svg";
import SaturnInternalImg from "../assets/planet-saturn-internal.svg";
import UranusInternalImg from "../assets/planet-uranus-internal.svg";
import NeptuneGeologyImg from "../assets/geology-neptune.png";

import MercuryGeologyImg from "../assets/geology-mercury.png";
import VenusGeologyImg from "../assets/geology-venus.png";
import EarthGeologyImg from "../assets/geology-earth.png";
import MarsGeologyImg from "../assets/geology-mars.png";
import JupiterGeologyImg from "../assets/geology-jupiter.png";
import SaturnGeologyImg from "../assets/geology-saturn.png";
import UranusGeologyImg from "../assets/geology-uranus.png";
import NeptuneInternalImg from "../assets/planet-neptune-internal.svg";

type TPlanetAssets = {
  main: string;
  inner: string;
  surface: string;
};

const assetMap: Record<string, TPlanetAssets> = {
  mercury: {
    main: MercuryImg,
    inner: MercuryInternalImg,
    surface: MercuryGeologyImg,
  },
  venus: { main: VenusImg, inner: VenusInternalImg, surface: VenusGeologyImg },
  earth: { main: EarthImg, inner: EarthInternalImg, surface: EarthGeologyImg },
  mars: { main: MarsImg, inner: MarsInternalImg, surface: MarsGeologyImg },
  jupiter: {
    main: JupiterImg,
    inner: JupiterInternalImg,
    surface: JupiterGeologyImg,
  },
  saturn: {
    main: SaturnImg,
    inner: SaturnInternalImg,
    surface: SaturnGeologyImg,
  },
  uranus: {
    main: UranusImg,
    inner: UranusInternalImg,
    surface: UranusGeologyImg,
  },
  neptune: {
    main: NeptuneImg,
    inner: NeptuneInternalImg,
    surface: NeptuneGeologyImg,
  },
};

export default function Planets() {
  const { planetName } = useParams();

  const currentPlanet =
    CelestialData.find(
      (item) => item.name.toLowerCase() === planetName?.toLowerCase(),
    ) || CelestialData[0];

  const [viewTab, setViewTab] = useState<"overview" | "internal" | "surface">(
    "overview",
  );

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--planet-color",
      currentPlanet.color,
    );
  }, [currentPlanet]);

  const displayData =
    viewTab === "overview"
      ? currentPlanet.overview
      : viewTab === "internal"
        ? currentPlanet.structure
        : currentPlanet.geology;

  const primaryImage =
    viewTab === "overview"
      ? assetMap[currentPlanet.name.toLowerCase()].main
      : viewTab === "internal"
        ? assetMap[currentPlanet.name.toLowerCase()].inner
        : assetMap[currentPlanet.name.toLowerCase()].main;

  const overlayImage =
    viewTab === "surface"
      ? assetMap[currentPlanet.name.toLowerCase()].surface
      : "";

  const dynamicSize =
    screenWidth <= 768
      ? currentPlanet.responsive.mobile
      : screenWidth <= 1000
        ? currentPlanet.responsive.tablet
        : currentPlanet.responsive.desktop;

  return (
    <div>
      <div className="pages" style={{ display: isMenuOpen ? "block" : "none" }}>
        <div className="pages-top">
          <h1>THE PLANETS</h1>

          <img
            src={MenuIcon}
            alt="menu toggle"
            className="list"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>

        <div className="planets">
          {CelestialData.map((item) => (
            <Link
              key={item.name}
              to={`/${item.name.toLowerCase()}`}
              className="mobile-planet"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="mobile-planet-left">
                <div
                  style={{
                    backgroundColor: item.color,
                    height: "20px",
                    width: "20px",
                    borderRadius: "50%",
                  }}
                ></div>
                {item.name.toUpperCase()}
              </div>
              <img src={ChevronIcon} alt="" className="arrow" />
            </Link>
          ))}
        </div>
      </div>

      <header>
        <div className="top-mobile">
          <h1>THE PLANETS</h1>

          <div className="planets">
            {CelestialData.map((p) => (
              <Link key={p.name} to={`/${p.name.toLowerCase()}`}>
                <p>{p.name.toUpperCase()}</p>
              </Link>
            ))}
          </div>

          <img
            src={MenuIcon}
            alt="menu toggle"
            className="list"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>

        <div className="buttons-list-mobile">
          <p
            style={{
              borderBottom:
                viewTab === "overview"
                  ? `solid 4px ${currentPlanet.color}`
                  : "",
              opacity: viewTab === "overview" ? "" : "75%",
            }}
            onClick={() => setViewTab("overview")}
          >
            OVERVIEW
          </p>
          <p
            style={{
              borderBottom:
                viewTab === "internal"
                  ? `solid 4px ${currentPlanet.color}`
                  : "",
              opacity: viewTab === "internal" ? "" : "75%",
            }}
            onClick={() => setViewTab("internal")}
          >
            STRUCTURE
          </p>
          <p
            style={{
              borderBottom:
                viewTab === "surface" ? `solid 4px ${currentPlanet.color}` : "",
              opacity: viewTab === "surface" ? "" : "75%",
            }}
            onClick={() => setViewTab("surface")}
          >
            SURFACE
          </p>
        </div>
      </header>

      <div className="main">
        <div className="top">
          <div className="planet">
            <img
              src={primaryImage}
              alt={currentPlanet.name}
              style={{ width: dynamicSize }}
            />

            <img
              src={overlayImage}
              alt=""
              className="geology"
              style={{
                display: overlayImage === "" ? "none" : "block",
                left: currentPlanet.left,
              }}
            />
          </div>

          <div className="info">
            <div className="infos">
              <h1 className="title">{currentPlanet.name.toUpperCase()}</h1>
              <p className="details">{displayData.content}</p>
              <p className="source">
                Source: <a href={displayData.source}>Wikipedia</a>{" "}
                <img src={SourceIcon} alt="source icon" />
              </p>
            </div>

            <div className="buttons-overview">
              <button
                style={{
                  backgroundColor:
                    viewTab === "overview" ? currentPlanet.color : "",
                }}
                onClick={() => setViewTab("overview")}
              >
                <p>01</p> <span>OVERVIEW</span>
              </button>

              <button
                style={{
                  backgroundColor:
                    viewTab === "internal" ? currentPlanet.color : "",
                }}
                onClick={() => setViewTab("internal")}
              >
                <p>02</p> <span>INTERNAL STRUCTURE</span>
              </button>

              <button
                style={{
                  backgroundColor:
                    viewTab === "surface" ? currentPlanet.color : "",
                }}
                onClick={() => setViewTab("surface")}
              >
                <p>03</p> <span>SURFACE GEOLOGY</span>
              </button>
            </div>
          </div>
        </div>

        <div className="specifics">
          <div>
            <p>ROTATION TIME</p>
            <h1>{currentPlanet.rotation}</h1>
          </div>
          <div>
            <p>REVOLUTION TIME</p>
            <h1>{currentPlanet.revolution}</h1>
          </div>
          <div>
            <p>RADIUS</p>
            <h1>{currentPlanet.radius}</h1>
          </div>
          <div>
            <p>AVERAGE TEMP</p>
            <h1>{currentPlanet.temperature}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
