import { Incident_Interface } from "../assets/types/Types";

import { useState } from "react";

import Card from "react-bootstrap/Card";
import { incident_data } from "../assets/data/incident_data";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { BounceLoader } from "react-spinners";
import ReactMarkDown from "react-markdown";

import HomeButton from "../assets/img/home-button.svg";

import "animate.css";

export default function Incidents() {
  const [Title, setTitle] = useState<string>("");
  const [isFirst, setFirst] = useState<boolean>(true);
  const [Summary, setSummary] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);

  async function handleClick(incident: Incident_Interface) {
    setTitle(incident.title);
    setFirst(false);
    setSummary("");
    setLoading(true);
    setFinished(false);

    const websocket: WebSocket = new WebSocket(
      "ws://localhost:8000/async_summarizer"
    );

    websocket.onopen = () => {
      websocket.send(incident.contents);
    };

    websocket.onmessage = (message: MessageEvent) => {
      const data: any = JSON.parse(message.data);
      if (data.event_type == "on_chat_model_stream") {
        setSummary((prev: string) => prev + data.content);
      }
    };
    websocket.onclose = () => {
      setLoading(false);
      setFinished(true);
    };
  }
  return (
    <div>
      <Row>
        <Col sm={2} className="Incident_Left_Column">
          <div className="Card_Collection">
            <a href="http://localhost:5173/">
              <img src={HomeButton} className="HomeButton"></img>
            </a>
            <h2 className="Sidebar-Title">案件 一覧</h2>
            {incident_data.map((incident, id) => (
              <Card
                className={
                  incident.ball === 1
                    ? "Incident_Card_True animate__animated animate__fadeInLeft animate__delay-1s"
                    : "Incident_Card_False animate__animated animate__fadeInLeft animate__delay-1s"
                }
              >
                <button
                  key={id}
                  className="Incident_Button"
                  onClick={() => {
                    if (!isLoading) {
                      handleClick(incident);
                    }
                  }}
                >
                  {incident.title}
                </button>
              </Card>
            ))}
          </div>
        </Col>
        <Col sm={10} className="Incident_Right_Column">
          {isFirst && (
            <div className="Description animate__animated animate__fadeIn">
              <h3 className="Description-Title">
                <span className="Description-Title-Span">使い方</span>
              </h3>
              <p className="Description-Text">
                このWebアプリでは現在進行中の案件を、Open
                AIのAPIを使用して要約を出力できます。
                <br />
                現在進行中の案件が左に一覧で並んでいるので、クリックをして要約を出力してください。
              </p>
            </div>
          )}
          {isLoading && (
            <div className="loading-animation">
              <BounceLoader color="#c7384b" />
            </div>
          )}
          {Summary && (
            <div className="Summary-Body">
              <Row className="Summary-Text">
                <h2>{Title}の概要</h2>
                <ReactMarkDown>{Summary}</ReactMarkDown>
              </Row>
            </div>
          )}
          {finished && (
            <div className="Additional-Questions">
              <h4>Need More Info?</h4>
              <input
                type="text"
                value={"Coming Soon"}
                className="Form-Input"
              ></input>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}
