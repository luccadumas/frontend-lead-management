import React from 'react';
import { Card, Header, Avatar, Row, Name, Info, Description, Price, Button, Divider, Icon } from './styles';
import type { LeadCardProps } from './types';
import LocationIcon from './icons/Location.svg?react';
import CategoryIcon from './icons/Category.svg?react';
import JobIdIcon from './icons/JobId.svg?react';
import PhoneIcon from './icons/Phone.svg?react';
import EmailIcon from './icons/Email.svg?react';

export const LeadCard: React.FC<LeadCardProps> = ({
  name, date, suburb, category, jobId, description, price, onAccept, onDecline, accepted, phone, email
}) => (
  <Card>
    <Header>
      <Avatar>{name.charAt(0).toUpperCase()}</Avatar>
      <div>
        <Name>{name}</Name>
        <Info>{date}</Info>
      </div>
    </Header>
    <Divider />
    <Row>
      <Info><Icon><LocationIcon /></Icon>{suburb}</Info>
      <Info><Icon><CategoryIcon /></Icon>{category}</Info>
      <Info>
        <Icon><JobIdIcon /></Icon>Job ID: {jobId}
      </Info>
      <Info>
        {accepted && <Price>${price.toFixed(2)} Lead Invitation</Price>}
      </Info>
    </Row>
    <Divider />
    <Description>{description}</Description>
    <Divider />
    {accepted && (
      <Row>
        {phone && <Info style={{color:'#ff6600'}}><Icon><PhoneIcon /></Icon>{phone}</Info>}
        {email && <Info style={{color:'#ff6600'}}><Icon><EmailIcon /></Icon>{email}</Info>}
      </Row>
    )}
    {!accepted && (
      <Row>
        <Button primary onClick={onAccept}>Accept</Button>
        <Button onClick={onDecline}>Decline</Button>
        <Price>${price.toFixed(2)} <span>Lead Invitation</span></Price>
      </Row>
    )}
  </Card>
); 