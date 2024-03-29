import React, { useState } from "react";
import { QRModal } from "../../components/modals/QRModal";
import EventListData from "../../db/EventData.json";
import { Title, BodyRegular } from "../../styles/fonts/Typography";
import EventBox from "./EventBox";
import styled from "styled-components";
import SizedBox from "../../components/SizedBox";
import { id } from "date-fns/locale";
import EventService from "../../services/EventService";
import { useEffect } from "react";

export default function JoinEventPage() {
  const [QRModalVisible, setQRModalVisible] = useState(false);

  const [joinEvents, setJoinEvents] = useState([]);
  const [focusedEventName, setFocusedEventName] = useState("");
  const handleQRClick = (name) => {
    setQRModalVisible(true);
    setFocusedEventName(name);
  };

  useEffect(() => {
    EventService.getJoinEvents("LEE")
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setJoinEvents(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  return (
    <JoinEventPageLayout>
      <Row>
        <Title>{userInfo.name} </Title>
        <BodyRegular> 님께서 참여하신 행사 목록입니다.</BodyRegular>
      </Row>

      <EventList>
        {joinEvents.map((event) => (
          <EventBox
            event={event}
            id={event.event_id}
            type={"join"}
            onClick={() => handleQRClick(event.event_name)}
          />
        ))}
      </EventList>
      <QRModal
        title={focusedEventName}
        isOpen={QRModalVisible}
        closeModal={() => setQRModalVisible(false)}
      />
    </JoinEventPageLayout>
  );
}
const JoinEventPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  width: 100%;
  height: 100%;
  padding: 30px 0px;
`;
const EventList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 2rem 0;
  height: 100%;
  width: 100%;
  gap: 3rem;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100%;
  gap: 10px;
`;
