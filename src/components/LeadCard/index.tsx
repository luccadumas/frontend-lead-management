import React from 'react';
import { Card, Header, Avatar, Row, Name, Info, Description, Price, PriceAccepted, Button, Divider, Icon } from './styles';
import type { LeadCardProps } from './types';
import LocationIcon from '@/assets/icons/location.svg?react';
import BriefcaseIcon from '@/assets/icons/briefcase.svg?react';
import PhoneIcon from '@/assets/icons/phone.svg?react';
import EmailIcon from '@/assets/icons/email.svg?react';

const LeadCardComponent: React.FC<LeadCardProps> = ({
  name, date, suburb, category, jobId, description, price, onAccept, onDecline, accepted, phone, email
}) => (
  <Card data-testid="card">
    <Header data-testid="header">
      <Avatar data-testid="avatar">{name.charAt(0).toUpperCase()}</Avatar>
      <div>
        <Name data-testid="name">{name}</Name>
        <Info data-testid="info">{date}</Info>
      </div>
    </Header>
    <Divider data-testid="divider" />
    <Row data-testid="row">
      <Info data-testid="info">
        <Icon data-testid="icon">
          <LocationIcon aria-label="Location icon" />
        </Icon>
        {suburb}
      </Info>
      <Info data-testid="info">
        <Icon data-testid="icon">
          <BriefcaseIcon aria-label="Category icon" />
        </Icon>
        {category}
      </Info>
      <Info data-testid="info">
        <Icon data-testid="icon" />
        Job ID: {jobId}
      </Info>
      {accepted && (
        <Info data-testid="info">
          <PriceAccepted>${price.toFixed(2)} Lead Invitation</PriceAccepted>
        </Info>
      )}
    </Row>
    <Divider data-testid="divider" />
    {accepted && (
      <Row data-testid="row">
        {phone && (
          <Info data-testid="info">
            <Icon data-testid="icon">
              <PhoneIcon aria-label="Phone icon" />
            </Icon>
            <a href={`tel:${phone}`} aria-label={`Call ${phone}`}>{phone}</a>
          </Info>
        )}
        {email && (
          <Info data-testid="info">
            <Icon data-testid="icon">
              <EmailIcon aria-label="Email icon" />
            </Icon>
            <a href={`mailto:${email}`} aria-label={`Send email to ${email}`}>{email}</a>
          </Info>
        )}
      </Row>
    )}
    <Description data-testid="description">{description}</Description>
    {!accepted && (
      <Row data-testid="row">
        <Button data-testid="accept-button" primary onClick={onAccept}>Accept</Button>
        <Button data-testid="decline-button" onClick={onDecline}>Decline</Button>
        <Price data-testid="price">${price.toFixed(2)} <span>Lead Invitation</span></Price>
      </Row>
    )}
  </Card>
);

export const LeadCard = React.memo(LeadCardComponent); 
