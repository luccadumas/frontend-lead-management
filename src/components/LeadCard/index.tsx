import React from 'react';
import { Card, Header, Avatar, Row, Name, Info, Description, Price, PriceAccepted, Button, Divider, Icon } from './styles';
import type { LeadCardProps } from './types';
import LocationIcon from '@/assets/icons/location.svg?react';
import BriefcaseIcon from '@/assets/icons/briefcase.svg?react';
import PhoneIcon from '@/assets/icons/phone.svg?react';
import EmailIcon from '@/assets/icons/email.svg?react';

/**
 * LeadCard Component
 * 
 * Displays a lead's information in a card format with different states:
 * - Invited: Shows basic info and Accept/Decline buttons
 * - Accepted: Shows full contact info and no action buttons
 * 
 * @component
 * @param {LeadCardProps} props - Component props
 * @param {string} props.name - Lead's name
 * @param {string} props.date - Creation date
 * @param {string} props.suburb - Lead's suburb
 * @param {string} props.category - Job category
 * @param {number} props.jobId - Job identifier
 * @param {string} props.description - Job description
 * @param {number} props.price - Job price
 * @param {boolean} props.accepted - Whether the lead is accepted
 * @param {string} [props.phone] - Contact phone (only shown when accepted)
 * @param {string} [props.email] - Contact email (only shown when accepted)
 * @param {() => void} [props.onAccept] - Accept button handler
 * @param {() => void} [props.onDecline] - Decline button handler
 * 
 * @example
 * ```tsx
 * <LeadCard
 *   name="John Doe"
 *   date="2024-02-20"
 *   suburb="Sydney"
 *   category="Plumbing"
 *   jobId={12345}
 *   description="Fix leaking pipe"
 *   price={100}
 *   accepted={false}
 *   onAccept={() => handleAccept()}
 *   onDecline={() => handleDecline()}
 * />
 * ```
 */
export const LeadCard: React.FC<LeadCardProps> = ({
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
