import React, { useState, useRef } from "react";
import Dropdown from "./componentes/dropDown";
import { TabletList, MobileList } from "./util/ListNav";
import { AiOutlineCompress } from "react-icons/ai";
import { AiOutlineReload } from "react-icons/ai";
import "./StylesApp.css";
import { toast } from "react-toastify";
import logo from "./assets/logo.jpeg";
import Separator from "./componentes/separator";


function App() {
  const [widthScreen, setWidthScreen] = useState("1024");
  const [heightScreen, setHeightScreen] = useState("600");
  const [url, setUrl] = useState();
  const [handleUrl, sethandleUrl] = useState(false);

  const [widthCustom, setWidthCustom] = useState();
  const [heightCustom, setHeightCustom] = useState();

  const [customScreen, setCustomScreen] = useState(false);
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  const [rotateAnimation, setRotateAnimation] = useState(false);

  function screenSizeSelect(data) {
    setWidthScreen(data.largura);
    setHeightScreen(data.altura);
  }

  function handleChangeUrl(event) {
    event.preventDefault();
    //Verifica se é uma url válida
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (url && url.match(urlRegex)) {
      console.log("URL válida:", url);
      sethandleUrl(true);
    } else {
      setUrl("https://" + url);
      sethandleUrl(true);
    }
  }

  function handleCustomSize(e) {
    e.preventDefault();

    if (
      (!widthCustom && !heightCustom) ||
      (!widthCustom && heightCustom) ||
      (widthCustom && !heightCustom)
    ) {
      return toast.error("Width and Height must be informed");
    }
    setWidthScreen(widthCustom);
    setHeightScreen(heightCustom);
  }

  function handleRefresh() {
    // Verifica se a referência do iframe existe antes de chamar reload()
    if (iframeRef.current) {
      setRotateAnimation(true);
      iframeRef.current.src = "";

      setTimeout(() => {
        iframeRef.current.src = url;
        // Remove a classe de animação após a recarga
        setRotateAnimation(false);
      }, 300);
    }
  }



  return (
    <body>
      <header>
        <aside>
          <Dropdown
            icon="tablet"
            list={TabletList()}
            screenSize={screenSizeSelect}
          />
          <Separator />
          <Dropdown
            icon="mobile"
            list={MobileList()}
            screenSize={screenSizeSelect}
          />
          <Separator />
          <div className="itemContainer">
            <p>CUSTOM SIZE</p>
            <AiOutlineCompress
              onClick={() => setCustomScreen(!customScreen)}
              size={50}
            />
            <div className="customContainer">
              {customScreen ? (
                <form
                  onSubmit={handleCustomSize}
                  style={{ flexDirection: "column", marginTop: 10 }}
                >
                  <input
                  placeholder="Width"
                    onChange={(e) => setWidthCustom(e.target.value)}
                    type="number"
                  />
                  <input
                  placeholder="Height"
                    onChange={(e) => setHeightCustom(e.target.value)}
                    type="number"
                  />
                  <button type="submit" id="btnCustom">
                    APPLY
                  </button>
                </form>
              ) : null}
            </div>
            <Separator />
          </div>
          <div className="itemContainer">
            <p>REFRESH</p>
            <AiOutlineReload
              style={{marginTop: 0}}
              className={` ${rotateAnimation ? "rotate" : ""}`}
              size={50}
              onClick={() => handleRefresh()}
            />
            <Separator />
          </div>
        </aside>
      </header>
      <main>
        <div ref={containerRef}>
          {!handleUrl ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={logo} alt="logo" />
              <form onSubmit={handleChangeUrl}>
                <input
                  placeholder="https://"
                  type="texte"
                  onChange={(e) => setUrl(e.target.value)}
                ></input>
                <button type="submit">Ir</button>
              </form>
            </div>
          ) : null}

          {handleUrl ? (
            <div className="iframe">
              <iframe
                ref={iframeRef}
                title={url}
                width={widthScreen}
                height={heightScreen}
                src={url}
                allowFullScreen
              ></iframe>

              <div className="infoScreen" style={{ width: `${widthScreen}px` }}>
                <p>{url}</p>
                <p>
                  {widthScreen} X {heightScreen}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </body>
  );
}

export default App;
